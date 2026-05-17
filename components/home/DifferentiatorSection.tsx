import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { SectionLabel } from '@/components/shared/SectionLabel'

const showcases = ['Custom Illustrations', 'Brand Identity', 'Icon Sets', 'Visual Systems']

export function DifferentiatorSection() {
  return (
    <div className="grid gap-16 md:grid-cols-2">
      <div>
        <SectionLabel>Why choose us</SectionLabel>
        <h2 className="text-display mb-6">Not just a website. A custom-built presence.</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Most web studios use stock photos and templates. We create custom illustrations specific to each business, so a dental clinic looks like no other dental clinic, a bakery feels warm and personal, and a law firm looks authoritative.
        </p>
        <p className="mb-8 text-sm text-muted-foreground">
          Design without SEO wastes money. A beautiful site Google cannot find will not bring customers. We handle both: how the site looks and how it ranks.
        </p>
        <Link href="/services" className="label-mono text-studio-rust hover:underline">
          See our services →
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {showcases.map((showcase) => (
          <Card
            key={showcase}
            className="flex aspect-square items-center justify-center rounded-none border border-border bg-secondary"
          >
            <span className="label-mono text-center">{showcase}</span>
          </Card>
        ))}
      </div>
    </div>
  )
}
