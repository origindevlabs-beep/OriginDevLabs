import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/server"

// Rate limit config
const RATE_LIMIT_WINDOW = 60 // seconds
const RATE_LIMIT_MAX = 5 // requests per window

// In-memory rate limit cache (fallback if DB not ready)
const rateCache = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return "unknown"
}

async function checkRateLimit(ip: string, endpoint: string): Promise<{ allowed: boolean; remaining: number }> {
  // Try in-memory first (always works)
  const key = `${ip}:${endpoint}`
  const now = Date.now()
  const cached = rateCache.get(key)

  if (cached && cached.resetAt > now) {
    if (cached.count >= RATE_LIMIT_MAX) {
      return { allowed: false, remaining: 0 }
    }
    cached.count++
    return { allowed: true, remaining: RATE_LIMIT_MAX - cached.count }
  }

  // Reset window
  rateCache.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW * 1000 })

  // Also try DB-based rate limiting (for distributed setups)
  try {
    await supabase.from("rate_limits").insert({
      ip_address: ip,
      endpoint,
    })

    const { count } = await supabase
      .from("rate_limits")
      .select("*", { count: "exact", head: true })
      .eq("ip_address", ip)
      .eq("endpoint", endpoint)
      .gte("created_at", new Date(now - RATE_LIMIT_WINDOW * 1000).toISOString())

    const total = (count || 1)
    if (total > RATE_LIMIT_MAX) {
      return { allowed: false, remaining: 0 }
    }
    return { allowed: true, remaining: Math.max(0, RATE_LIMIT_MAX - total) }
  } catch {
    // If DB rate limiting fails, in-memory cache is sufficient
    return { allowed: true, remaining: RATE_LIMIT_MAX - 1 }
  }
}

function sanitizeString(input: string): string {
  // Strip HTML tags, trim whitespace, limit length
  return input
    .replace(/<[^>]*>/g, "")
    .trim()
    .slice(0, 5000)
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email) && email.length <= 254
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)

    // Rate limiting
    const { allowed, remaining } = await checkRateLimit(ip, "leads")
    if (!allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: { "X-RateLimit-Remaining": "0", "Retry-After": String(RATE_LIMIT_WINDOW) },
        }
      )
    }

    // Parse and validate body
    const body = await request.json()

    const firstName = sanitizeString(body.firstName || "").slice(0, 100)
    const lastName = sanitizeString(body.lastName || "").slice(0, 100)
    const email = (body.email || "").trim().toLowerCase()
    const phone = sanitizeString(body.phone || "").slice(0, 30)
    const company = sanitizeString(body.company || "").slice(0, 200)
    const services = Array.isArray(body.services) ? body.services.map((s: string) => sanitizeString(s).slice(0, 100)) : []
    const painPoints = Array.isArray(body.painPoints) ? body.painPoints.map((s: string) => sanitizeString(s).slice(0, 500)) : []
    const painCustomText = sanitizeString(body.painCustomText || "").slice(0, 2000)
    const projectDetails = Array.isArray(body.projectDetails) ? body.projectDetails.map((s: string) => sanitizeString(s).slice(0, 500)) : []
    const projectCustomText = sanitizeString(body.projectCustomText || "").slice(0, 2000)
    const contactPreferences = Array.isArray(body.contactPreferences) ? body.contactPreferences.map((s: string) => sanitizeString(s).slice(0, 50)) : []
    const bestTime = sanitizeString(body.bestTime || "").slice(0, 100)
    const budget = sanitizeString(body.budget || "").slice(0, 50)
    const additionalNotes = sanitizeString(body.additionalNotes || "").slice(0, 5000)

    // Validate required fields
    if (!firstName) {
      return NextResponse.json({ error: "First name is required" }, { status: 400 })
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "A valid email is required" }, { status: 400 })
    }
    if (services.length === 0) {
      return NextResponse.json({ error: "At least one service must be selected" }, { status: 400 })
    }

    // Validate budget value if provided
    const validBudgets = ["under-1k", "1k-5k", "5k-10k", "10k-15k", "15k+", "dont-know", "discuss"]
    if (budget && !validBudgets.includes(budget)) {
      return NextResponse.json({ error: "Invalid budget selection" }, { status: 400 })
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("leads")
      .insert({
        first_name: firstName,
        last_name: lastName,
        email,
        phone,
        company,
        services,
        pain_points: painPoints,
        pain_custom_text: painCustomText,
        project_details: projectDetails,
        project_custom_text: projectCustomText,
        contact_preferences: contactPreferences,
        best_time,
        budget,
        additional_notes,
        user_agent: request.headers.get("user-agent") || "",
        ip_address: ip,
        source: "website",
      })
      .select("id, created_at")
      .single()

    if (error) {
      console.error("Supabase insert error:", error)
      // Check for duplicate email
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "We already have your details. Our team will reach out soon!" },
          { status: 409 }
        )
      }
      // Check for missing table (schema not set up)
      if (error.message?.includes("does not exist") || error.code === "42P01") {
        return NextResponse.json(
          { error: "Database not set up yet. Please run POST /api/setup-db first.", setupNeeded: true },
          { status: 503 }
        )
      }
      return NextResponse.json({ error: "Failed to submit. Please try again." }, { status: 500 })
    }

    return NextResponse.json(
      { success: true, id: data?.id },
      {
        status: 201,
        headers: { "X-RateLimit-Remaining": String(remaining) },
      }
    )
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}