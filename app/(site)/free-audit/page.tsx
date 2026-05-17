'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const AUDIT_CHECKS = [
  {
    num: '01',
    title: 'Load speed',
    desc: "We test your site on a real 4G mobile connection — the way 80% of your customers will load it. Slow sites lose visitors before the page even appears.",
  },
  {
    num: '02',
    title: 'Mobile experience',
    desc: "We check every page on common Indian device sizes. Broken layouts, tiny text, and hard-to-tap buttons all cost you customers.",
  },
  {
    num: '03',
    title: 'Google ranking',
    desc: "Where does your business show up for your most important search terms? We check your current position and identify the gap between you and the top results.",
  },
  {
    num: '04',
    title: 'Conversion check',
    desc: "Does your site make it easy for a visitor to call you, book, or enquire? We assess your calls-to-action, contact accessibility, and trust signals.",
  },
  {
    num: '05',
    title: 'Competitor comparison',
    desc: "We compare your site against 2 top competitors in your city and category — design, speed, SEO, and content.",
  },
]

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  websiteUrl: z.string().optional(),
  phone: z.string().min(10, 'Enter a valid phone number'),
  businessType: z.string().min(1, 'Please select your business type'),
  email: z.string().email('Enter a valid email address').optional().or(z.literal('')),
})

type FormValues = z.infer<typeof schema>

export default function FreeAuditPage() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormValues) => {
    setServerError('')
    try {
      const res = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json() as { error?: string }
        setServerError(json.error ?? 'Something went wrong. Please try again.')
        return
      }
      setSubmitted(true)
    } catch {
      setServerError('Network error. Please check your connection and try again.')
    }
  }

  return (
    <div className="section-py">
      <div className="studio-container">

        {/* Header */}
        <ScrollReveal>
          <SectionLabel>No cost, no commitment</SectionLabel>
          <h1 className="text-display mb-4 max-w-xl">
            Free website audit for your business
          </h1>
          <p className="mb-14 max-w-lg text-sm text-muted-foreground">
            We record a personalised video walkthrough of your current web presence — or your
            competitors&apos; if you don&apos;t have a site yet — and send it to you within 48 hours.
            No credit card. No sales pressure.
          </p>
        </ScrollReveal>

        {/* What we check */}
        <ScrollReveal staggerChildren>
          <div className="mb-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {AUDIT_CHECKS.map((check) => (
              <div key={check.num} className="bg-secondary border border-border p-5">
                <p className="mb-3 font-serif text-3xl text-studio-rust opacity-25">{check.num}</p>
                <p className="mb-2 font-serif text-base">{check.title}</p>
                <p className="text-xs leading-relaxed text-muted-foreground">{check.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Form */}
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1.2fr_1fr]">
          <div>
            <ScrollReveal>
              {submitted ? (
                <div className="bg-studio-green-light border border-studio-green p-8">
                  <p className="mb-2 font-serif text-xl text-studio-green">
                    {"You're on the list!"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {"We'll send your personalised video audit within 48 hours. Check your WhatsApp or email."}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="name">Your name *</Label>
                      <Input
                        id="name"
                        placeholder="Rohan Mehta"
                        {...register('name')}
                        className={cn(errors.name && 'border-destructive')}
                      />
                      {errors.name && (
                        <p className="text-xs text-destructive">{errors.name.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="businessName">Business name *</Label>
                      <Input
                        id="businessName"
                        placeholder="Mehta &amp; Associates"
                        {...register('businessName')}
                        className={cn(errors.businessName && 'border-destructive')}
                      />
                      {errors.businessName && (
                        <p className="text-xs text-destructive">{errors.businessName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label htmlFor="websiteUrl">
                      Current website URL{' '}
                      <span className="text-muted-foreground font-normal">(leave blank if none)</span>
                    </Label>
                    <Input
                      id="websiteUrl"
                      type="url"
                      placeholder="https://yourbusiness.com"
                      {...register('websiteUrl')}
                    />
                  </div>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <Label htmlFor="phone">Phone / WhatsApp *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="9876543210"
                        {...register('phone')}
                        className={cn(errors.phone && 'border-destructive')}
                      />
                      {errors.phone && (
                        <p className="text-xs text-destructive">{errors.phone.message}</p>
                      )}
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="email">
                        Email{' '}
                        <span className="text-muted-foreground font-normal">(optional)</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        {...register('email')}
                        className={cn(errors.email && 'border-destructive')}
                      />
                      {errors.email && (
                        <p className="text-xs text-destructive">{errors.email.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <Label>Business type *</Label>
                    <Select
                      onValueChange={(v) => setValue('businessType', v, { shouldValidate: true })}
                      value={watch('businessType')}
                    >
                      <SelectTrigger className={cn(errors.businessType && 'border-destructive')}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clinic">Clinic / Hospital</SelectItem>
                        <SelectItem value="legal">Law Firm / CA Firm</SelectItem>
                        <SelectItem value="food">Restaurant / Food Business</SelectItem>
                        <SelectItem value="architect">Architecture / Interior Design</SelectItem>
                        <SelectItem value="boutique">Boutique / Retail</SelectItem>
                        <SelectItem value="coach">Coaching / Consulting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.businessType && (
                      <p className="text-xs text-destructive">{errors.businessType.message}</p>
                    )}
                  </div>

                  {serverError && (
                    <p className="text-sm text-destructive">{serverError}</p>
                  )}

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Sending…' : 'Request my free audit →'}
                  </Button>

                  <p className="text-center text-xs text-muted-foreground">
                    No credit card. No commitment. We&apos;ll send a video audit to your WhatsApp or email within 48 hours.
                  </p>
                </form>
              )}
            </ScrollReveal>
          </div>

          {/* Right: reassurance */}
          <div className="space-y-8">
            <ScrollReveal delay={0.1}>
              <div>
                <p className="label-mono mb-2">What you get</p>
                <ul className="space-y-3">
                  {[
                    'A screen-recorded Loom video (10–15 min) walking through your site',
                    'Our honest assessment of speed, mobile, SEO, and conversion',
                    'A prioritised list of the 3 things most likely costing you customers',
                    'Competitor comparison — what are the top 2 businesses in your category doing better?',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="mt-0.5 shrink-0 text-studio-green">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.15}>
              <div className="bg-secondary border border-border p-5">
                <p className="label-mono mb-2 text-muted-foreground">No catch</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {"We offer this because we believe in earning business, not chasing it. If after the audit you want to work with us — great. If not, the audit is yours to keep."}
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </div>
  )
}
