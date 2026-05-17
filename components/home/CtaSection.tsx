'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SectionLabel } from '@/components/shared/SectionLabel'

type AuditForm = {
  email: string
  url: string
}

export function CtaSection() {
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { register, handleSubmit } = useForm<AuditForm>()

  async function onSubmit(values: AuditForm) {
    setError(null)

    try {
      const response = await fetch('/api/audit-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        throw new Error('Request failed')
      }

      setSubmitted(true)
    } catch {
      setError('Could not send request. Please try again.')
    }
  }

  return (
    <section className="border-t border-border py-20">
      <div className="studio-container grid gap-10 md:grid-cols-2">
        <div className="md:border-r md:border-border md:pr-8">
          <SectionLabel>Ready?</SectionLabel>
          <h2 className="text-display mb-4">Have a project in mind?</h2>
          <p className="mb-8 text-sm text-muted-foreground">
            Tell us about your business. We&apos;ll respond within 24 hours.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Start a project →</Link>
          </Button>
        </div>
        <div className="md:pl-8">
          <p className="label-mono mb-5">Not sure yet? Get a free audit first.</p>
          {submitted ? (
            <p className="text-sm text-studio-green">We&apos;ll send your audit within 48 hours.</p>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
              <Input
                type="email"
                placeholder="your@email.com"
                required
                {...register('email', { required: true })}
              />
              <Input placeholder="yourwebsite.com (or leave blank)" {...register('url')} />
              <Button type="submit" className="w-full">
                Get free audit
              </Button>
              {error && <p className="text-sm text-destructive">{error}</p>}
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
