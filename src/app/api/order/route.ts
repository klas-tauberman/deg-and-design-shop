import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getSupabaseAdmin } from "@/lib/supabase"

const SHOP_EMAIL = "info@tauberman.se"
const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev"
const FROM_EMAIL = `Deg & Design <${FROM_ADDRESS}>`

interface OrderItem {
  id: string
  title: string
  price: string
  qty: number
}

export async function POST(request: Request) {
  const body = await request.json()
  const { email, items, total } = body as { email: string; items: OrderItem[]; total: number }

  if (!email || !items?.length) {
    return NextResponse.json({ error: "Ogiltig beställning" }, { status: 400 })
  }

  // A paused Supabase project must not stop the order: the owner email is the fallback.
  const { data: order, error } = await getSupabaseAdmin()
    .from("orders")
    .insert({ email, items, total })
    .select()
    .abortSignal(AbortSignal.timeout(5000))
    .single()

  if (error) {
    console.error("Supabase insert failed:", error)
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const itemLines = items.map((i) => `${i.qty}x ${i.title} — ${i.price}`).join("\n")
  const orderId: string = order?.id ?? crypto.randomUUID()
  const shortId = orderId.slice(0, 8)
  const notSavedNote = error ? "\n\nOBS: Beställningen kunde inte sparas i Supabase. Spara det här mejlet." : ""

  const ownerEmail = await resend.emails.send({
    from: FROM_EMAIL,
    to: SHOP_EMAIL,
    subject: `Ny beställning från ${email}`,
    text: `Ny beställning #${shortId}:\n\n${itemLines}\n\nTotalt: ${total} kr\nKund: ${email}${notSavedNote}`,
  })

  if (ownerEmail.error) {
    console.error("Resend owner email failed:", ownerEmail.error)
    if (error) {
      return NextResponse.json({ error: "Kunde inte ta emot beställningen" }, { status: 500 })
    }
  }

  const customerEmail = await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: "Din beställning hos Deg & Design",
    text: `Tack för din beställning!\n\n${itemLines}\n\nTotalt: ${total} kr\n\nDu hämtar ditt bröd på Norregatan 1 i Malmö. Vi hör av oss när det är dags för upphämtning.`,
  })

  if (customerEmail.error) {
    // The order is already received — don't fail the request over the confirmation email.
    console.error("Resend customer email failed:", customerEmail.error)
  }

  return NextResponse.json({ success: true, orderId })
}
