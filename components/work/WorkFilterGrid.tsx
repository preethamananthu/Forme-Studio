'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { CaseStudyCard } from '@/components/home/CaseStudyCard'
import type { CaseStudy, Industry } from '@/lib/sanity/types'

type Filter = 'all' | Exclude<Industry, 'other'>

const FILTERS: Array<{ label: string; value: Filter }> = [
  { label: 'All', value: 'all' },
  { label: 'Clinic', value: 'clinic' },
  { label: 'Legal', value: 'legal' },
  { label: 'Food', value: 'food' },
  { label: 'Architect', value: 'architect' },
  { label: 'Boutique', value: 'boutique' },
  { label: 'Coach', value: 'coach' },
]

type Props = { caseStudies: CaseStudy[] }

export function WorkFilterGrid({ caseStudies }: Props) {
  const [activeFilter, setActiveFilter] = useState<Filter>('all')
  const visibleCaseStudies =
    activeFilter === 'all'
      ? caseStudies
      : caseStudies.filter((caseStudy) => caseStudy.industry === activeFilter)

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((filter) => (
          <Button
            key={filter.value}
            type="button"
            size="sm"
            variant={activeFilter === filter.value ? 'default' : 'outline'}
            onClick={() => setActiveFilter(filter.value)}
          >
            {filter.label}
          </Button>
        ))}
      </div>

      {visibleCaseStudies.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleCaseStudies.map((caseStudy) => (
            <CaseStudyCard
              key={caseStudy._id}
              title={caseStudy.title}
              client={caseStudy.client}
              industry={caseStudy.industry}
              city={caseStudy.city}
              metrics={caseStudy.metrics ?? []}
              heroImage={caseStudy.heroImage}
              slug={caseStudy.slug.current}
            />
          ))}
        </div>
      ) : (
        <p className="text-sm text-muted-foreground">
          Case studies coming soon. Check back after our first projects.
        </p>
      )}
    </>
  )
}
