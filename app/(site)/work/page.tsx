import type { Metadata } from 'next'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { WorkFilterGrid } from '@/components/work/WorkFilterGrid'
import { getAllCaseStudies } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'Our Work | Forme Studio',
}

export default async function WorkPage() {
  const caseStudies = await getAllCaseStudies().catch(() => [])

  return (
    <section className="section-py">
      <div className="studio-container">
        <SectionLabel>Portfolio</SectionLabel>
        <h1 className="text-display mb-10">Work we&apos;re proud of</h1>
        <WorkFilterGrid caseStudies={caseStudies} />
      </div>
    </section>
  )
}
