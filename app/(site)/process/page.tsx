import type { Metadata } from 'next'
import Link from 'next/link'
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

export const metadata: Metadata = {
  title: 'Our Process',
  description:
    'How we take a local business from discovery to a live, ranking website — in 4 structured phases with no surprises.',
}

const PHASES = [
  {
    num: '01',
    title: 'Discover',
    time: 'Week 1',
    color: 'text-studio-rust',
    what: [
      'A 45-minute kickoff call (Google Meet) to understand your business, your customers, and your goals.',
      'We map out who your customers are, what they search for, and what makes you the right choice over competitors.',
      'We audit your existing web presence if any — Google Business Profile, current site, search rankings.',
      'You receive a Project Brief document summarising everything we agreed on, for your sign-off.',
    ],
    fromClient: [
      'Your business goals — what does a "successful website" look like for you?',
      'Examples of websites you like (3–5 links is fine — just tell us why you like them).',
      'Your target customer profile — who are they, where are they, what do they care about?',
      'Any existing brand assets: logos, brand colours, photos.',
    ],
    communication:
      'One structured call followed by the Project Brief document. No back-and-forth email chains. We move fast.',
  },
  {
    num: '02',
    title: 'Design',
    time: 'Weeks 2–3',
    color: 'text-studio-rust',
    what: [
      'Full UI design in Figma — every page, every state, desktop and mobile.',
      'Custom illustration concepts (for Standard and Premium projects) designed specifically for your business.',
      'Two rounds of revisions included — we send a Loom walkthrough explaining every design decision so feedback is informed, not gut-feel.',
      'Final design sign-off before a single line of code is written.',
    ],
    fromClient: [
      'Your content: service descriptions, team bios, photos, anything you want on the site.',
      'Timely feedback — design rounds have a 48-hour turnaround window on your side.',
      "If you don't have photos: tell us and we'll brief you on what to photograph, or work with the content you have.",
    ],
    communication:
      'Loom walkthrough for each design round. Feedback collected via a shared Notion doc or WhatsApp — whichever you prefer.',
  },
  {
    num: '03',
    title: 'Build',
    time: 'Weeks 4–5',
    color: 'text-studio-rust',
    what: [
      'Development on a private staging URL — you can watch the site come together in real time.',
      'Built with Next.js: fast, mobile-first, and technically optimised for Google from day one.',
      'Cross-browser testing (Chrome, Safari, Firefox, Edge) and multi-device testing.',
      'Performance audit before handoff: Core Web Vitals, image optimisation, accessibility checks.',
      "CMS setup and walkthrough (Standard and Premium): you'll know how to update your own site.",
    ],
    fromClient: [
      'Any final content changes before launch — we freeze content changes during build week.',
      'Domain access (or your registrar login) for deployment setup.',
    ],
    communication:
      'Weekly status update. Staging link shared as soon as the first pages are complete — usually end of Week 4.',
  },
  {
    num: '04',
    title: 'Launch + SEO',
    time: 'Ongoing',
    color: 'text-studio-rust',
    what: [
      'Go-live on your domain with final DNS setup and SSL verification.',
      'Google Search Console and Google Analytics setup and connected.',
      'Google Business Profile claimed, verified, and fully optimised with photos, services, and opening hours.',
      'First keyword ranking baseline report — so you have a "before" to compare against.',
      'Submission to Google for indexing.',
      'For SEO Retainer clients: monthly keyword ranking report, 2 new blog articles, and GBP management each month.',
    ],
    fromClient: [
      'Access to your domain registrar account for DNS update (takes ~15 minutes together).',
      'A Google account to attach your Google Business Profile and Search Console.',
    ],
    communication:
      'Launch day call to walk through everything live. After that: WhatsApp/email for support queries during the included post-launch window.',
  },
]

const COMMUNICATION = [
  {
    title: 'Async-first',
    desc: "We don't schedule meetings for things that can be communicated in writing. Most updates, questions, and decisions happen over WhatsApp or email — on your schedule.",
  },
  {
    title: 'Loom for walkthroughs',
    desc: 'Every major design delivery comes with a screen-recorded Loom walkthrough — we talk you through our decisions so you can give informed feedback, not just gut reactions.',
  },
  {
    title: 'Response time',
    desc: "We respond within 24 hours on business days (Monday–Saturday). For urgent launch-day issues, we're typically available same-day.",
  },
  {
    title: 'One point of contact',
    desc: "You deal with the person doing the work — not an account manager. No lost context. No 'I'll ask the team and get back to you.'",
  },
]

const POST_LAUNCH_FAQS = [
  {
    q: "What if I don't like the design?",
    a: "Every design package includes two rounds of revisions. Before either round, we share a detailed Loom walkthrough explaining every decision — this makes feedback much more productive. If after two rounds something still isn't right, we'll discuss it on a call and find a solution. We've never had a project end without a design both sides were proud of.",
  },
  {
    q: 'What if I need changes after launch?',
    a: "All projects include a post-launch support window (2–60 days depending on tier) for bug fixes and small adjustments at no extra cost. Beyond that, content changes are handled through your CMS independently. For structural changes or new pages, we offer a simple per-hour rate or a small project retainer.",
  },
  {
    q: 'What if I need to pause the project?',
    a: "Life happens. If you need to pause for a week or two, just let us know. We'll pick up where we left off. Extended pauses (over 3 weeks) may require a restart fee to account for context re-loading and schedule re-blocking.",
  },
  {
    q: 'Do you sign an NDA?',
    a: 'Yes, we sign a mutual NDA before any project begins. We also include a standard service agreement covering scope, payment schedule, IP ownership (you own everything), and revision rounds.',
  },
]

export default function ProcessPage() {
  return (
    <div className="section-py">
      <div className="studio-container">

        {/* Header */}
        <ScrollReveal>
          <SectionLabel>How we work</SectionLabel>
          <h1 className="text-display mb-4 max-w-xl">
            A process built for busy business owners
          </h1>
          <p className="mb-16 max-w-lg text-sm text-muted-foreground">
            Four phases. No jargon. No surprises. You'll always know exactly where your project
            stands and what's coming next.
          </p>
        </ScrollReveal>

        {/* Phases */}
        <div className="space-y-20">
          {PHASES.map((phase, index) => (
            <ScrollReveal key={phase.num} delay={index * 0.05}>
              <div className="grid grid-cols-1 gap-10 md:grid-cols-[180px_1fr]">

                {/* Phase number + title */}
                <div>
                  <p className={`mb-2 font-serif text-5xl opacity-25 ${phase.color}`}>
                    {phase.num}
                  </p>
                  <h2 className="mb-1 font-serif text-2xl">{phase.title}</h2>
                  <span className="label-mono text-studio-rust">{phase.time}</span>
                </div>

                {/* Phase detail */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                  <div>
                    <p className="label-mono mb-4">What happens</p>
                    <ul className="space-y-3">
                      {phase.what.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm leading-relaxed">
                          <span className="mt-1 shrink-0 text-studio-rust">→</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="mb-6">
                      <p className="label-mono mb-4">What we need from you</p>
                      <ul className="space-y-3">
                        {phase.fromClient.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-muted-foreground">
                            <span className="mt-1 shrink-0">·</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-secondary border border-border p-4">
                      <p className="label-mono mb-2 text-muted-foreground">Communication</p>
                      <p className="text-xs leading-relaxed text-muted-foreground">
                        {phase.communication}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {index < PHASES.length - 1 && <Separator className="mt-20" />}
            </ScrollReveal>
          ))}
        </div>

        <Separator className="my-20" />

        {/* Communication style */}
        <ScrollReveal>
          <SectionLabel>Working together</SectionLabel>
          <h2 className="text-display mb-10">How we communicate</h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {COMMUNICATION.map((item) => (
              <div key={item.title}>
                <h3 className="mb-3 font-serif text-lg">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        <Separator className="my-20" />

        {/* Post-launch FAQ */}
        <ScrollReveal>
          <SectionLabel>Questions</SectionLabel>
          <h2 className="text-display mb-10">What if something goes wrong?</h2>
          <Accordion type="single" collapsible className="max-w-2xl">
            {POST_LAUNCH_FAQS.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-serif text-left text-lg">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-20 border-t border-border pt-14 text-center">
            <h2 className="text-display mb-4">Sounds good?</h2>
            <p className="mx-auto mb-8 max-w-sm text-sm text-muted-foreground">
              The best next step is a 45-minute discovery call — no commitment required.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Book a discovery call →</Link>
            </Button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}
