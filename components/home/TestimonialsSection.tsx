import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SectionLabel } from '@/components/shared/SectionLabel'
import type { Industry, Testimonial } from '@/lib/sanity/types'

type Props = {
  testimonials: Array<Testimonial & { industry: Industry; city: string }>
}

export function TestimonialsSection({ testimonials }: Props) {
  if (testimonials.length === 0) {
    return (
      <>
        <SectionLabel>What clients say</SectionLabel>
        <h2 className="text-display mb-10">Results that speak for themselves</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.from({ length: 2 }, (_, index) => (
            <Card key={index} className="rounded-none p-8">
              <p className="text-sm text-muted-foreground">Client testimonials coming soon</p>
            </Card>
          ))}
        </div>
      </>
    )
  }

  return (
    <>
      <SectionLabel>What clients say</SectionLabel>
      <h2 className="text-display mb-10">Results that speak for themselves</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <Card key={`${testimonial.name}-${testimonial.business}`} className="rounded-none p-8">
            <p className="mb-4 font-serif text-5xl leading-none text-studio-rust opacity-20">&quot;</p>
            <p className="mb-6 text-sm italic leading-relaxed text-foreground">{testimonial.quote}</p>
            <Separator />
            <p className="mt-4 font-serif text-sm">{testimonial.name}</p>
            <p className="label-mono text-muted-foreground">
              {testimonial.role}, {testimonial.business}
            </p>
          </Card>
        ))}
      </div>
    </>
  )
}
