import { createClient } from "@supabase/supabase-js"

// Server-only client. Uses the service role key, which bypasses RLS —
// never import this file from a "use client" component.
export function getSupabaseAdmin() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}
