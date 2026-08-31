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

  const supabase = getSupabaseAdmin()
  const { data: order, error } = await supabase
    .from("orders")
    .insert({ email, items, total })
    .select()
    .single()

  if (error) {
    console.error("Supabase insert failed:", error)
    return NextResponse.json({ error: "Kunde inte spara beställningen" }, { status: 500 })
  }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const itemLines = items.map((i) => `${i.qty}x ${i.title} — ${i.price}`).join("\n")
  const shortId = order.id.slice(0, 8)

  const [ownerEmail, customerEmail] = await Promise.all([
    resend.emails.send({
      from: FROM_EMAIL,
      to: SHOP_EMAIL,
      subject: `Ny beställning från ${email}`,
      text: `Ny beställning #${shortId}:\n\n${itemLines}\n\nTotalt: ${total} kr\nKund: ${email}`,
    }),
    resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: "Din beställning hos Deg & Design",
      text: `Tack för din beställning!\n\n${itemLines}\n\nTotalt: ${total} kr\n\nDu hämtar ditt bröd på Norregatan 1 i Malmö. Vi hör av oss när det är dags för upphämtning.`,
    }),
  ])

  if (ownerEmail.error || customerEmail.error) {
    console.error("Resend send failed:", ownerEmail.error, customerEmail.error)
    // Order is already saved — don't fail the request over email delivery.
  }

  return NextResponse.json({ success: true, orderId: order.id })
}
