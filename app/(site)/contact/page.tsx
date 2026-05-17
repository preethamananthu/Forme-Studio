'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { cn } from '@/lib/utils'

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  businessName: z.string().min(2, 'Business name must be at least 2 characters'),
  whatsapp: z.string().min(10, 'Enter a valid 10-digit number').max(10, 'Enter a valid 10-digit number'),
  email: z.string().email('Enter a valid email address'),
  businessType: z.string().min(1, 'Please select your business type'),
  hasWebsite: z.string().min(1, 'Please select an option'),
  budget: z.string().min(1, 'Please select a budget range'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
  _hp: z.string().max(0),
})

type FormValues = z.infer<typeof schema>

const whatsappNumber = process.env.NEXT_PUBLIC_STUDIO_WHATSAPP ?? ''
const studioEmail = process.env.NEXT_PUBLIC_STUDIO_EMAIL ?? ''

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const [serverError, setServerError] = useState('')
  const [submitterName, setSubmitterName] = useState('')

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { _hp: '' },
  })

  const onSubmit = async (data: FormValues) => {
    setServerError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) {
        const json = await res.json() as { error?: string }
        setServerError(json.error ?? 'Something went wrong. Please try again.')
        return
      }
      setSubmitterName(data.name)
      setSubmitted(true)
    } catch {
      setServerError('Network error. Please check your connection and try again.')
    }
  }

  return (
    <div className="section-py">
      <div className="studio-container">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-[1fr_1.6fr]">

          {/* Left: info */}
          <div>
            <SectionLabel>Get in touch</SectionLabel>
            <h1 className="text-display mb-6">Start a project</h1>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Tell us about your business and what you need. We review every enquiry personally
              and reply within 24 hours — usually on WhatsApp.
            </p>

            <div className="space-y-5">
              <div>
                <p className="label-mono mb-1">WhatsApp</p>
                <a
                  href={`https://wa.me/91${whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-studio-rust hover:underline"
                >
                  +91 {whatsappNumber}
                </a>
              </div>
              <div>
                <p className="label-mono mb-1">Email</p>
                <a
                  href={`mailto:${studioEmail}`}
                  className="text-sm text-studio-rust hover:underline"
                >
                  {studioEmail}
                </a>
              </div>
              <div>
                <p className="label-mono mb-1">Response time</p>
                <p className="text-sm text-muted-foreground">
                  Within 24 hours on business days (Mon–Sat)
                </p>
              </div>
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <p className="mb-3 label-mono text-muted-foreground">Not ready to commit?</p>
              <Button asChild variant="outline" size="sm">
                <Link href="/free-audit">Get a free website audit →</Link>
              </Button>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {submitted ? (
              <div className="flex h-full items-center">
                <div className="bg-studio-green-light border border-studio-green p-8">
                  <p className="mb-2 font-serif text-xl text-studio-green">
                    Thanks, {submitterName}!
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {"We'll WhatsApp you within 24 hours to learn more about your project."}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
                {/* Honeypot — visually hidden */}
                <input
                  type="text"
                  tabIndex={-1}
                  aria-hidden="true"
                  autoComplete="off"
                  className="absolute opacity-0 pointer-events-none h-0 w-0"
                  {...register('_hp')}
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Your name *</Label>
                    <Input
                      id="name"
                      placeholder="Priya Sharma"
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
                      placeholder="Sharma Dental Clinic"
                      {...register('businessName')}
                      className={cn(errors.businessName && 'border-destructive')}
                    />
                    {errors.businessName && (
                      <p className="text-xs text-destructive">{errors.businessName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="whatsapp">WhatsApp number *</Label>
                    <Input
                      id="whatsapp"
                      type="tel"
                      placeholder="9876543210"
                      maxLength={10}
                      {...register('whatsapp')}
                      className={cn(errors.whatsapp && 'border-destructive')}
                    />
                    {errors.whatsapp && (
                      <p className="text-xs text-destructive">{errors.whatsapp.message}</p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email address *</Label>
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

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
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
                  <div className="space-y-1.5">
                    <Label>Do you have a website? *</Label>
                    <Select
                      onValueChange={(v) => setValue('hasWebsite', v, { shouldValidate: true })}
                      value={watch('hasWebsite')}
                    >
                      <SelectTrigger className={cn(errors.hasWebsite && 'border-destructive')}>
                        <SelectValue placeholder="Select option" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No website yet</SelectItem>
                        <SelectItem value="yes-needs-work">Yes but it needs work</SelectItem>
                        <SelectItem value="yes-fine">Yes and it&apos;s fine</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.hasWebsite && (
                      <p className="text-xs text-destructive">{errors.hasWebsite.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label>Budget range *</Label>
                  <Select
                    onValueChange={(v) => setValue('budget', v, { shouldValidate: true })}
                    value={watch('budget')}
                  >
                    <SelectTrigger className={cn(errors.budget && 'border-destructive')}>
                      <SelectValue placeholder="Select budget" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="25k-50k">₹25,000 – ₹50,000</SelectItem>
                      <SelectItem value="50k-1l">₹50,000 – ₹1,00,000</SelectItem>
                      <SelectItem value="1l-3l">₹1,00,000 – ₹3,00,000</SelectItem>
                      <SelectItem value="not-sure">Not sure yet</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.budget && (
                    <p className="text-xs text-destructive">{errors.budget.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="message">Tell us about your project *</Label>
                  <Textarea
                    id="message"
                    rows={4}
                    placeholder="What does your business do? What do you want from a website? Any specific pages or features?"
                    {...register('message')}
                    className={cn(errors.message && 'border-destructive')}
                  />
                  {errors.message && (
                    <p className="text-xs text-destructive">{errors.message.message}</p>
                  )}
                </div>

                {serverError && (
                  <p className="text-sm text-destructive">{serverError}</p>
                )}

                <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? 'Sending…' : 'Send enquiry →'}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
