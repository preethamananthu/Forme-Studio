import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { formatPrice } from '@/lib/utils'
import type { Service } from '@/lib/sanity/types'

type PreviewService = Pick<
  Service,
  '_id' | 'name' | 'tagline' | 'startingPrice' | 'includes' | 'featured'
>

const FALLBACK_SERVICES: PreviewService[] = [
  { _id:'1', name:'Starter Site', tagline:'Get online fast', startingPrice:25000, includes:['3–4 pages','Mobile-first','Contact form','Basic on-page SEO'], featured:false },
  { _id:'2', name:'Standard Site', tagline:'Full web presence', startingPrice:60000, includes:['5–8 pages','Custom UI design','Sanity CMS','Google Business Profile setup'], featured:true },
  { _id:'3', name:'Premium Brand', tagline:'Brand + website + illustrations', startingPrice:140000, includes:['Logo & brand identity','Custom illustrations','8–12 pages','Full SEO setup'], featured:false },
  { _id:'4', name:'SEO Retainer', tagline:'Keep growing on Google', startingPrice:8000, includes:['Monthly keyword report','2 SEO blog articles','GBP management','Monthly analytics'], featured:false },
]

type Props = { services: Service[] }

export function ServicesPreview({ services }: Props) {
  const visibleServices: PreviewService[] = services.length > 0 ? services : FALLBACK_SERVICES

  return (
    <>
      <SectionLabel>What we offer</SectionLabel>
      <h2 className="text-display mb-3">Services &amp; Pricing</h2>
      <p className="label-mono mb-10 text-muted-foreground">
        All sites include mobile optimization, fast load times, and on-page SEO as standard.
      </p>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {visibleServices.map((service) => {
          const isRetainer = service.name === 'SEO Retainer'

          return (
            <Card
              key={service._id}
              className={`studio-card flex flex-col rounded-none p-5 ${
                service.featured ? 'border-studio-rust bg-studio-rust-light' : ''
              }`}
            >
              <p className="label-mono mb-2 text-muted-foreground">{service.name}</p>
              <p className="mb-1 font-serif text-2xl">
                {formatPrice(service.startingPrice)}
                <span className="font-sans text-xs text-muted-foreground">
                  {isRetainer ? '/mo' : ''}
                </span>
              </p>
              <p className="mb-4 text-sm text-muted-foreground">{service.tagline}</p>
              <ul className="mb-6 space-y-2">
                {(service.includes ?? []).map((item) => (
                  <li key={item} className="text-xs">
                    ✓ {item}
                  </li>
                ))}
              </ul>
              <Button asChild variant="ghost" size="sm" className="mt-auto justify-start px-0">
                <Link href="/services">Learn more →</Link>
              </Button>
            </Card>
          )
        })}
      </div>
    </>
  )
}
