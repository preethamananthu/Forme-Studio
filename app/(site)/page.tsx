import { getFeaturedCaseStudies, getAllServices, getAllCaseStudies } from '@/lib/sanity/queries'
import { HeroSection } from '@/components/home/HeroSection'
import { TrustBar } from '@/components/home/TrustBar'
import { WorkGrid } from '@/components/home/WorkGrid'
import { DifferentiatorSection } from '@/components/home/DifferentiatorSection'
import { ServicesPreview } from '@/components/home/ServicesPreview'
import { ProcessSteps } from '@/components/home/ProcessSteps'
import { TestimonialsSection } from '@/components/home/TestimonialsSection'
import { CtaSection } from '@/components/home/CtaSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forme Studio — Web Design & SEO for Local Businesses in Bangalore',
  description: 'We build beautiful, fast websites for clinics, law firms, restaurants and boutiques in Bangalore — and make sure Google puts them in front of the right customers.',
}

export default async function HomePage() {
  const [featured, services, all] = await Promise.all([
    getFeaturedCaseStudies().catch(() => []),
    getAllServices().catch(() => []),
    getAllCaseStudies().catch(() => []),
  ])

  const testimonials = all
    .filter((cs) => Boolean(cs.testimonial))
    .slice(0, 2)
    .map((cs) => ({
      ...cs.testimonial!,
      industry: cs.industry,
      city: cs.city,
    }))

  return (
    <>
      <HeroSection />
      <TrustBar />
      <section className="section-py">
        <div className="studio-container">
          <WorkGrid caseStudies={featured} />
        </div>
      </section>
      <section className="section-py bg-secondary">
        <div className="studio-container">
          <DifferentiatorSection />
        </div>
      </section>
      <section className="section-py">
        <div className="studio-container">
          <ServicesPreview services={services} />
        </div>
      </section>
      <section className="section-py bg-secondary">
        <div className="studio-container">
          <ProcessSteps />
        </div>
      </section>
      {testimonials.length > 0 && (
        <section className="section-py">
          <div className="studio-container">
            <TestimonialsSection testimonials={testimonials} />
          </div>
        </section>
      )}
      <CtaSection />
    </>
  )
}
