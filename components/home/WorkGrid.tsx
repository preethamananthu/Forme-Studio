import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { CaseStudyCard } from '@/components/home/CaseStudyCard'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionLabel } from '@/components/shared/SectionLabel'
import type { CaseStudy } from '@/lib/sanity/types'

type Props = { caseStudies: CaseStudy[] }

export function WorkGrid({ caseStudies }: Props) {
  return (
    <ScrollReveal staggerChildren>
      <SectionLabel>Selected Work</SectionLabel>
      <h2 className="text-display mb-10">Projects that perform</h2>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.length > 0
          ? caseStudies.map((cs) => (
              <CaseStudyCard
                key={cs._id}
                title={cs.title}
                client={cs.client}
                industry={cs.industry}
                city={cs.city}
                metrics={cs.metrics ?? []}
                heroImage={cs.heroImage}
                slug={cs.slug.current}
              />
            ))
          : Array.from({ length: 3 }, (_, index) => (
              <Card
                key={index}
                className="flex h-64 items-center justify-center rounded-none bg-secondary"
              >
                <span className="label-mono">Coming soon</span>
              </Card>
            ))}
      </div>
      <Link href="/work" className="label-mono mt-8 inline-block text-studio-rust hover:underline">
        View all projects →
      </Link>
    </ScrollReveal>
  )
}
