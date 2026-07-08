import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase/server"
import { readFileSync } from "fs"
import { join } from "path"

const DATABASE_URL = process.env.DATABASE_URL
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

export async function POST() {
  try {
    const schemaSql = readFileSync(join(process.cwd(), "supabase/schema.sql"), "utf-8")

    // Approach 1: Direct PostgreSQL connection (if DATABASE_URL is set)
    if (DATABASE_URL) {
      try {
        const postgres = (await import("postgres")).default
        const sql = postgres(DATABASE_URL, { ssl: "require", max: 1 })
        await sql.unsafe(schemaSql)
        await sql.end()
        return NextResponse.json({
          success: true,
          message: "Database schema created successfully via direct connection",
          tables: ["leads", "newsletter_subscribers", "rate_limits"],
        })
      } catch (dbError: unknown) {
        const msg = dbError instanceof Error ? dbError.message : String(dbError)
        console.error("Direct DB connection failed:", msg)
        // Fall through to API approach
      }
    }

    // Approach 2: Use Supabase Management API (if available)
    if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
      try {
        const projectRef = SUPABASE_URL.replace("https://", "").split(".")[0]
        const res = await fetch(
          `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
            },
            body: JSON.stringify({ query: schemaSql }),
          }
        )
        if (res.ok) {
          return NextResponse.json({
            success: true,
            message: "Database schema created successfully via Management API",
            tables: ["leads", "newsletter_subscribers", "rate_limits"],
          })
        }
        // Management API failed, fall through to manual instructions
      } catch {
        // Management API not available
      }
    }

    // Approach 3: Verify tables exist via Supabase client
    try {
      const { error: leadsError } = await supabase
        .from("leads")
        .select("id")
        .limit(1)

      if (!leadsError) {
        // Also check newsletter
        const { error: nlError } = await supabase
          .from("newsletter_subscribers")
          .select("id")
          .limit(1)

        if (!nlError) {
          return NextResponse.json({
            success: true,
            message: "Database tables already exist and are accessible",
            tables: ["leads", "newsletter_subscribers", "rate_limits"],
          })
        }
      }
    } catch {
      // Tables don't exist yet
    }

    // Fallback: Return SQL and instructions for manual setup
    return NextResponse.json(
      {
        success: false,
        message: "Automatic setup requires DATABASE_URL. Please run the SQL manually.",
        instructions: [
          "1. Go to your Supabase Dashboard → SQL Editor",
          "2. Copy and paste the SQL below and click 'Run'",
          "3. Alternatively, add DATABASE_URL to .env.local:",
          "   DATABASE_URL=postgresql://postgres.owhsdxsdghuevutodkvp:[YOUR-DB-PASSWORD]@aws-0-us-east-1.pooler.supabase.com:6543/postgres",
          "4. Then POST to /api/setup-db again",
        ],
        sql: schemaSql,
      },
      { status: 400 }
    )
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error"
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json({
    message: "POST to this endpoint to set up the database tables",
    tables: ["leads", "newsletter_subscribers", "rate_limits"],
  })
}