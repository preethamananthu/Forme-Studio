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

    const toEmail = process.env.NEXT_PUBLIC_STUDIO_EMAIL || 'hello@formestudio.in'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: toEmail,
      subject: `New enquiry from ${data.businessName}`,
      html: `
        <h2>New Project Enquiry</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Business:</strong> ${data.businessName}</p>
        <p><strong>Type:</strong> ${data.businessType}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>WhatsApp:</strong> +91 ${data.whatsapp}</p>
        <p><strong>Website:</strong> ${data.hasWebsite}</p>
        <p><strong>Budget:</strong> ${data.budget}</p>
        <hr />
        <h3>Project Details</h3>
        <p>${data.message.replace(/\n/g, '<br>')}</p>
      `,
    })

    if (error) {
      console.error('Resend error:', error)
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.issues }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
  }
}
