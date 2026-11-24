import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"

export const dynamic = "force-dynamic"

// Called by the Vercel cron jobs in vercel.json. Supabase pauses free projects
// with too little database activity over 7 days, which stops orders.
export async function GET() {
  const { error } = await getSupabaseAdmin().from("orders").select("id").limit(1)

  if (error) {
    console.error("Supabase keepalive failed:", error)
    return NextResponse.json({ ok: false }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
