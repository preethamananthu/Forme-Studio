import Image from 'next/image'
import Link from 'next/link'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { SectionLabel } from '@/components/shared/SectionLabel'
import {
  getAdjacentCaseStudies,
  getAllCaseStudies,
  getCaseStudyBySlug,
} from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'

type PageProps = {
  params: Promise<{ slug: string }>
}

const portableTextComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => <h2 className="mb-4 mt-10 font-serif text-2xl">{children}</h2>,
    normal: ({ children }) => <p className="mb-5 text-sm leading-relaxed">{children}</p>,
  },
}

export async function generateStaticParams() {
  const caseStudies = await getAllCaseStudies().catch(() => [])

  return caseStudies.map((caseStudy) => ({
    slug: caseStudy.slug.current,
  }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug).catch(() => null)

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    }
  }

  return {
    title: `${caseStudy.title} | ${caseStudy.client}`,
    description: caseStudy.overview?.problem ?? `${caseStudy.client} case study`,
  }
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params
  const caseStudy = await getCaseStudyBySlug(slug).catch(() => null)

  if (!caseStudy) {
    notFound()
  }

  const adjacent = await getAdjacentCaseStudies(caseStudy.order).catch(() => ({
    prev: null,
    next: null,
  }))
  const overview = caseStudy.overview ?? {
    problem: '',
    role: '',
    timeline: '',
  }
  const sections = caseStudy.sections ?? []
  const metrics = caseStudy.metrics ?? []
  const techStack = caseStudy.techStack ?? []

  return (
    <>
      <section>
        <div className="relative aspect-video md:aspect-[21/9]">
          <Image
            src={urlForImage(caseStudy.heroImage, 1600, 686)}
            alt={caseStudy.heroImage.alt ?? caseStudy.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="studio-container pt-8">
          <p className="label-mono mb-3 text-muted-foreground">
            {caseStudy.client} · {caseStudy.city}
          </p>
          <h1 className="text-display font-serif">{caseStudy.title}</h1>
        </div>
      </section>

      <section className="my-10 border-y border-border bg-secondary py-8">
        <div className="studio-container grid gap-8 md:grid-cols-3">
          <div>
            <p className="label-mono mb-3">Problem</p>
            <p className="text-sm">{overview.problem}</p>
          </div>
          <div>
            <p className="label-mono mb-3">Our Role</p>
            <p className="text-sm">{overview.role}</p>
          </div>
          <div>
            <p className="label-mono mb-3">Timeline</p>
            <p className="text-sm">{overview.timeline}</p>
          </div>
        </div>
      </section>

      <div className="studio-container">
        <div className="prose mx-auto max-w-2xl">
          <PortableText value={sections} components={portableTextComponents} />
        </div>
      </div>

      <section className="my-10 bg-secondary py-10">
        <div className="studio-container grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map((metric) => (
            <div key={`${metric.value}-${metric.label}`}>
              <p className="font-serif text-3xl text-studio-rust">{metric.value}</p>
              <p className="label-mono">{metric.label}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="studio-container">
        {caseStudy.illustrations && caseStudy.illustrations.length > 0 && (
          <div className="my-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {caseStudy.illustrations.map((illustration, index) => (
              <div key={`${illustration.asset._ref}-${index}`} className="relative aspect-square">
                <Image
                  src={urlForImage(illustration, 720, 720)}
                  alt={illustration.alt ?? `${caseStudy.title} illustration ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        )}

        {caseStudy.testimonial && (
          <Card className="my-10 rounded-none border-studio-rust p-8">
            <p className="mb-4 font-serif text-5xl leading-none text-studio-rust opacity-20">&quot;</p>
            <p className="mb-6 text-sm italic leading-relaxed">{caseStudy.testimonial.quote}</p>
            <p className="font-serif text-sm">{caseStudy.testimonial.name}</p>
            <p className="label-mono text-muted-foreground">
              {caseStudy.testimonial.role}, {caseStudy.testimonial.business}
            </p>
          </Card>
        )}

        {techStack.length > 0 && (
          <section className="my-10">
            <p className="label-mono mb-3">Built with</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((item) => (
                <Badge key={item} variant="secondary" className="font-mono text-2xs">
                  {item}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {caseStudy.lessons && (
          <section className="my-10 border border-studio-rust bg-studio-rust-light p-6">
            <SectionLabel>Lessons learned</SectionLabel>
            <p className="text-sm">{caseStudy.lessons}</p>
          </section>
        )}

        <nav className="flex justify-between gap-8 border-t border-border pt-10">
          <div>
            {adjacent.prev && (
              <>
                <p className="label-mono mb-2">Previous</p>
                <Link
                  href={`/work/${adjacent.prev.slug.current}`}
                  className="font-serif text-xl hover:text-studio-rust"
                >
                  {adjacent.prev.title}
                </Link>
              </>
            )}
          </div>
          <div className="text-right">
            {adjacent.next && (
              <>
                <p className="label-mono mb-2">Next</p>
                <Link
                  href={`/work/${adjacent.next.slug.current}`}
                  className="font-serif text-xl hover:text-studio-rust"
                >
                  {adjacent.next.title}
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </>
  )
}
