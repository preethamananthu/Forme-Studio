import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllServices } from '@/lib/sanity/queries'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { formatPrice } from '@/lib/utils'
import type { Service } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'Services & Pricing',
  description:
    'Web design and SEO packages built for local Indian businesses — clinics, law firms, restaurants, boutiques, and more.',
}

type FallbackService = Pick<
  Service,
  | '_id'
  | 'name'
  | 'tagline'
  | 'startingPrice'
  | 'includes'
  | 'excludes'
  | 'timeline'
  | 'idealFor'
  | 'featured'
>

const FALLBACK_SERVICES: FallbackService[] = [
  {
    _id: '1',
    name: 'Starter Site',
    tagline: 'Get online fast',
    startingPrice: 25000,
    includes: [
      '3–4 pages (Home, About, Services, Contact)',
      'Mobile-first responsive design',
      'Contact form with email notifications',
      'Basic on-page SEO setup',
      'Google Analytics integration',
      'Fast hosting setup guidance',
    ],
    excludes: [
      'Custom illustrations',
      'CMS / content editing dashboard',
      'Blog or article section',
    ],
    timeline: '2–3 weeks',
    idealFor:
      'New businesses that need a clean, professional web presence quickly — without a large upfront investment.',
    featured: false,
  },
  {
    _id: '2',
    name: 'Standard Site',
    tagline: 'Full web presence',
    startingPrice: 60000,
    includes: [
      '5–8 pages, fully designed',
      'Custom UI design (no templates)',
      'Sanity CMS for easy content editing',
      'Google Business Profile setup',
      'On-page SEO for all pages',
      'Performance optimised (Core Web Vitals)',
      '30-day post-launch support',
    ],
    excludes: ['Custom illustrations', 'Logo design', 'Ongoing SEO retainer'],
    timeline: '4–5 weeks',
    idealFor:
      'Established businesses ready to invest in a site that truly represents them and ranks on Google.',
    featured: true,
  },
  {
    _id: '3',
    name: 'Premium Brand',
    tagline: 'Brand + website + illustrations',
    startingPrice: 140000,
    includes: [
      'Logo & full brand identity',
      'Custom hand-crafted illustrations',
      '8–12 pages, fully custom',
      'Sanity CMS',
      'Full SEO setup + keyword strategy',
      'Google Business Profile management (1 mo)',
      '60-day post-launch support',
    ],
    excludes: [],
    timeline: '7–9 weeks',
    idealFor:
      'Businesses that want to stand out completely — with a visual identity, custom illustrations, and a website no competitor can replicate.',
    featured: false,
  },
  {
    _id: '4',
    name: 'SEO Retainer',
    tagline: 'Keep growing on Google',
    startingPrice: 8000,
    includes: [
      'Monthly keyword ranking report',
      '2 SEO-optimised blog articles',
      'Google Business Profile management',
      'Monthly analytics summary',
      'Technical SEO fixes as needed',
    ],
    excludes: ['Paid ad management (Google/Meta)', 'New page design or development'],
    timeline: 'Month-to-month, min. 3 months',
    idealFor:
      'Businesses that already have a website and want to steadily grow their search visibility and inbound leads.',
    featured: false,
  },
]

const FAQS = [
  {
    q: 'How long does a website take?',
    a: 'A Starter Site typically takes 2–3 weeks from kickoff to launch. A Standard Site takes 4–5 weeks, and a Premium Brand project runs 7–9 weeks. Timelines depend on how quickly you can provide feedback and content — we keep things moving with structured check-ins.',
  },
  {
    q: 'Do I need to provide content?',
    a: "For most projects, yes — you know your business better than anyone. We'll give you a content brief to make it easy: a simple document that asks for your services, differentiators, team info, and any photos you have. If you need help writing, we can refer you to a copywriter, or include a basic copywriting pass on request.",
  },
  {
    q: 'What is SEO and do I really need it?',
    a: "SEO (Search Engine Optimisation) is the practice of making your site rank higher when people search Google for businesses like yours — \"dentist in Koramangala\", \"best biryani in Hyderabad\", etc. Yes, you need it. A beautiful site that no one can find is wasted money. We bake basic SEO into every project and offer a monthly retainer for ongoing growth.",
  },
  {
    q: 'Can I edit the website myself after launch?',
    a: "Standard and Premium projects are built with Sanity CMS — a simple, clean content editor that doesn't require any technical knowledge. You can update text, swap images, add blog posts, and more. We provide a short walkthrough video after launch so you're comfortable doing it yourself.",
  },
  {
    q: 'Do you work with businesses outside your city?',
    a: "Absolutely. We work fully remotely — calls over Google Meet, walkthroughs over Loom, updates on WhatsApp. Most of our process is async-first by design, so location is no barrier. We've worked with clients across India.",
  },
  {
    q: 'What happens after the site goes live?',
    a: "After launch, Starter projects include 2 weeks of bug-fix support. Standard includes 30 days. Premium includes 60 days. After that, you can continue on an optional maintenance or SEO retainer, or manage the site independently. We don't hold your site hostage — you own everything.",
  },
]

export default async function ServicesPage() {
  const fetched = await getAllServices().catch(() => [])
  const services: FallbackService[] = fetched.length > 0 ? fetched : FALLBACK_SERVICES

  return (
    <div className="section-py">
      <div className="studio-container">
        {/* Page header */}
        <ScrollReveal>
          <SectionLabel>What we offer</SectionLabel>
          <h1 className="text-display mb-4">Services &amp; Pricing</h1>
          <p className="mb-16 max-w-xl text-sm text-muted-foreground">
            Every project includes mobile optimisation, fast load times, and on-page SEO as
            standard. No hidden fees — what you see below is what you pay.
          </p>
        </ScrollReveal>

        {/* Services list */}
        <div className="space-y-16">
          {services.map((service, index) => (
            <ScrollReveal key={service._id} delay={index * 0.05}>
              <div
                className={`grid grid-cols-1 gap-8 md:grid-cols-3 ${
                  service.featured
                    ? 'rounded-none border border-studio-rust bg-studio-rust-light p-8'
                    : ''
                }`}
              >
                {/* Left: name + price + meta */}
                <div>
                  {service.featured && (
                    <span className="label-mono mb-3 block text-studio-rust">Most popular</span>
                  )}
                  <h2 className="mb-1 font-serif text-2xl">{service.name}</h2>
                  <p className="label-mono mb-4 text-muted-foreground">{service.tagline}</p>
                  <p className="mb-1 font-serif text-3xl text-studio-rust">
                    {formatPrice(service.startingPrice)}
                    <span className="font-sans text-sm text-muted-foreground">
                      {service.name === 'SEO Retainer' ? '/mo' : ''}
                    </span>
                  </p>
                  {service.timeline && (
                    <p className="label-mono mt-2 text-muted-foreground">
                      Timeline: {service.timeline}
                    </p>
                  )}
                </div>

                {/* Middle: includes + excludes */}
                <div>
                  <p className="label-mono mb-3">What's included</p>
                  <ul className="mb-6 space-y-2">
                    {(service.includes ?? []).map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 shrink-0 text-studio-green">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {(service.excludes ?? []).length > 0 && (
                    <>
                      <p className="label-mono mb-3 text-muted-foreground">Not included</p>
                      <ul className="space-y-2">
                        {(service.excludes ?? []).map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <span className="mt-0.5 shrink-0">✗</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* Right: ideal for + CTA */}
                <div>
                  {service.idealFor && (
                    <>
                      <p className="label-mono mb-3">Ideal for</p>
                      <p className="mb-6 text-sm italic text-muted-foreground leading-relaxed">
                        {service.idealFor}
                      </p>
                    </>
                  )}
                  <Button asChild size="sm">
                    <Link href="/contact">Start a project →</Link>
                  </Button>
                </div>
              </div>
              {index < services.length - 1 && <Separator className="mt-16" />}
            </ScrollReveal>
          ))}
        </div>

        {/* FAQ */}
        <ScrollReveal>
          <div className="mt-24">
            <SectionLabel>Common questions</SectionLabel>
            <h2 className="text-display mb-10">FAQ</h2>
            <Accordion type="single" collapsible className="max-w-2xl">
              {FAQS.map((item, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="font-serif text-left text-lg">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-20 border-t border-border pt-14 text-center">
            <h2 className="text-display mb-4">Ready to start?</h2>
            <p className="mx-auto mb-8 max-w-md text-sm text-muted-foreground">
              Tell us about your business and what you need. We reply within 24 hours.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Start a project →</Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </div>
  )
}
