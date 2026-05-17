import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { urlForImage } from '@/lib/sanity/image'
import type { Industry, Metric, SanityImage } from '@/lib/sanity/types'

type Props = {
  title: string
  client: string
  industry: Industry
  city: string
  metrics: Metric[]
  heroImage: SanityImage
  slug: string
}

export const INDUSTRY_LABELS: Record<Industry, string> = {
  clinic: 'Clinic',
  legal: 'Law Firm',
  food: 'Food',
  architect: 'Architect',
  boutique: 'Boutique',
  coach: 'Coach',
  other: 'Other',
}

export function CaseStudyCard({
  title,
  client,
  industry,
  city,
  metrics,
  heroImage,
  slug,
}: Props) {
  return (
    <Link href={`/work/${slug}`}>
      <Card className="studio-card studio-card-hover group cursor-pointer overflow-hidden">
        <div className="relative aspect-video">
          <Image
            src={urlForImage(heroImage, 720, 405)}
            alt={heroImage.alt ?? title}
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 33vw"
          />
        </div>
        <div className="p-5">
          <Badge variant="secondary" className="mb-3 font-mono text-2xs">
            {INDUSTRY_LABELS[industry]}
          </Badge>
          <p className="label-mono mb-1 text-muted-foreground">
            {client} · {city}
          </p>
          <h3 className="mb-3 font-serif text-xl transition-colors group-hover:text-studio-rust">
            {title}
          </h3>
          {metrics?.[0] && (
            <p className="font-mono text-2xs text-studio-rust">
              {metrics[0].value} {metrics[0].label}
            </p>
          )}
        </div>
      </Card>
    </Link>
  )
}
