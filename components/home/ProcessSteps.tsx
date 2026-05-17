import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { SectionLabel } from '@/components/shared/SectionLabel'

const STEPS = [
  { num:'01', title:'Discover', time:'Week 1', desc:'We learn your business, your customers, and what makes you the right choice. 45-minute call, no jargon.' },
  { num:'02', title:'Design', time:'Weeks 2–3', desc:'Custom UI design, illustrations, and your full visual system. You review and approve before we write a line of code.' },
  { num:'03', title:'Build', time:'Weeks 4–5', desc:'Fast, mobile-first, accessible. Built with Next.js and optimized for Google from the first deploy.' },
  { num:'04', title:'Launch + SEO', time:'Ongoing', desc:'We go live, set up Google Business Profile, and begin growing your search ranking every month.' },
]

export function ProcessSteps() {
  return (
    <ScrollReveal staggerChildren>
      <SectionLabel>How we work</SectionLabel>
      <h2 className="text-display mb-14">A process built for busy business owners</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
        {STEPS.map((step) => (
          <div key={step.num}>
            <p className="mb-4 font-serif text-4xl text-studio-rust opacity-40">{step.num}</p>
            <h3 className="mb-2 font-serif text-xl">{step.title}</h3>
            <span className="label-mono mb-3 block text-studio-rust">{step.time}</span>
            <p className="text-xs leading-relaxed text-muted-foreground">{step.desc}</p>
          </div>
        ))}
      </div>
    </ScrollReveal>
  )
}
