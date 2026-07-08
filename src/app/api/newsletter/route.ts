import { NextRequest, NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/server"

const RATE_LIMIT_WINDOW = 60
const RATE_LIMIT_MAX = 3

const rateCache = new Map<string, { count: number; resetAt: number }>()

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for")
  if (forwarded) return forwarded.split(",")[0].trim()
  return "unknown"
}

function isValidEmail(email: string): boolean {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email) && email.length <= 254
}

function sanitizeString(input: string): string {
  return input.replace(/<[^>]*>/g, "").trim().slice(0, 254)
}

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const key = `${ip}:newsletter`
    const now = Date.now()

    // Rate limiting
    const cached = rateCache.get(key)
    if (cached && cached.resetAt > now && cached.count >= RATE_LIMIT_MAX) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        { status: 429, headers: { "Retry-After": String(RATE_LIMIT_WINDOW) } }
      )
    }
    rateCache.set(key, {
      count: (cached?.resetAt > now ? cached.count : 0) + 1,
      resetAt: now + RATE_LIMIT_WINDOW * 1000,
    })

    const body = await request.json()
    const email = sanitizeString(body.email || "").toLowerCase()

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 })
    }

    // Upsert: if email exists and inactive, reactivate it
    const { error } = await supabase
      .from("newsletter_subscribers")
      .upsert(
        { email, source: "footer", is_active: true },
        { onConflict: "email" }
      )

    if (error) {
      console.error("Newsletter insert error:", error)
      if (error.message?.includes("does not exist") || error.code === "42P01") {
        return NextResponse.json({ error: "Database not set up yet." }, { status: 503 })
      }
      return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 })
    }

    return NextResponse.json({ success: true, message: "Subscribed successfully!" })
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}