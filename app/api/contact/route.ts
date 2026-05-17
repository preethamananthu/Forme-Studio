import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().min(2),
  businessName: z.string().min(2),
  whatsapp: z.string().min(10).max(10),
  email: z.string().email(),
  businessType: z.string().min(1),
  hasWebsite: z.string().min(1),
  budget: z.string().min(1),
  message: z.string().min(10),
  _hp: z.string().max(0),
})

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json()
    const data = schema.parse(body)

    // Honeypot check — silent reject
    if (data._hp.length > 0) {
      return NextResponse.json({ ok: true })
    }

    await resend.emails.send({
      from: 'Studio Contact <onboarding@resend.dev>',
      to: process.env.STUDIO_EMAIL ?? '',
      subject: `New enquiry from ${data.businessName}`,
      text: [
        `Name: ${data.name}`,
        `Business: ${data.businessName}`,
        `WhatsApp: ${data.whatsapp}`,
        `Email: ${data.email}`,
        `Type: ${data.businessType}`,
        `Has website: ${data.hasWebsite}`,
        `Budget: ${data.budget}`,
        `Message: ${data.message}`,
      ].join('\n'),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
