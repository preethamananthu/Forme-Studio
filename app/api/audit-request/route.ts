import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().min(2),
  businessName: z.string().min(2),
  websiteUrl: z.string().optional(),
  phone: z.string().min(10),
  businessType: z.string().min(1),
  email: z.string().email().optional(),
})

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json()
    const data = schema.parse(body)

    await resend.emails.send({
      from: 'Studio Audit <onboarding@resend.dev>',
      to: process.env.STUDIO_EMAIL ?? '',
      subject: `Free audit request: ${data.businessName}`,
      text: [
        `Name: ${data.name}`,
        `Business: ${data.businessName}`,
        `Website: ${data.websiteUrl ?? 'None'}`,
        `Phone: ${data.phone}`,
        `Type: ${data.businessType}`,
        data.email ? `Email: ${data.email}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
