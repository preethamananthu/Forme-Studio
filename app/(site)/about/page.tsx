import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Instagram, Linkedin } from 'lucide-react'
import { getTeamMembers } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import type { TeamMember } from '@/lib/sanity/types'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'We are a sibling studio combining design, engineering, and illustration to build websites that local businesses can be proud of.',
}

const VALUES = [
  {
    num: '01',
    title: 'Custom over template',
    desc: 'Every site we build starts from a blank canvas. No themes, no page builders, no "just change the colours". Your business is unique — your website should look like it.',
  },
  {
    num: '02',
    title: 'Design with purpose',
    desc: "We don't add animations or elements because they look cool. Every design decision serves a business goal: guiding a visitor toward calling you, booking an appointment, or walking into your shop.",
  },
  {
    num: '03',
    title: 'Built to be found',
    desc: "A beautiful site that Google can't find is just an expensive brochure. SEO is built into our process from day one — not bolted on at the end.",
  },
  {
    num: '04',
    title: 'Direct, no middlemen',
    desc: 'You work directly with the people building your site. No account managers, no hand-offs, no lost context. You have one point of contact from discovery to launch.',
  },
]

export default async function AboutPage() {
  const team: TeamMember[] = await getTeamMembers().catch(() => [])

  return (
    <div className="section-py">
      <div className="studio-container">

        {/* Studio story */}
        <ScrollReveal>
          <SectionLabel>Who we are</SectionLabel>
          <h1 className="text-display mb-8 max-w-2xl">
            A studio that designs, codes, and illustrates — under one roof.
          </h1>
        </ScrollReveal>

        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-2">
          <ScrollReveal delay={0.1}>
            <p className="mb-5 text-base leading-relaxed text-foreground">
              Forme Studio was founded on a simple frustration: local businesses in India deserve
              websites as good as the global brands they compete with on Google. Most of what's
              out there is either an overpriced agency charging for meetings, or a cheap freelancer
              delivering a WordPress template with a stock photo of a handshake.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We built something different — a small, focused studio combining design, engineering,
              and hand-crafted illustration. Every website we ship is custom-built and SEO-optimised
              from the first line of code.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mb-5 text-sm leading-relaxed text-muted-foreground">
              What makes us unusual is the illustration work. When we design for a dental clinic,
              we create custom illustrations of that clinic's aesthetic — not stock art of teeth.
              When we build for a restaurant, the visual language smells like the food they make.
              This specificity is what makes websites memorable, shareable, and trusted.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              We're async-first and remote-native. No bloated meetings. Updates via Loom.
              Feedback on WhatsApp. You'll always know where your project stands.
            </p>
          </ScrollReveal>
        </div>

        <Separator className="mb-20" />

        {/* Team */}
        {team.length > 0 ? (
          <ScrollReveal>
            <SectionLabel>The team</SectionLabel>
            <h2 className="text-display mb-10">The people behind the work</h2>
            <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2">
              {team.map((member) => {
                const photoSrc = member.photo
                  ? urlForImage(member.photo, 240, 240)
                  : null

                return (
                  <div key={member._id} className="flex gap-6">
                    {photoSrc ? (
                      <Image
                        src={photoSrc}
                        alt={member.photo?.alt ?? member.name}
                        width={80}
                        height={80}
                        className="h-20 w-20 shrink-0 rounded-full object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-secondary">
                        <span className="label-mono text-muted-foreground">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <p className="mb-0.5 font-serif text-lg">{member.name}</p>
                      <p className="label-mono mb-3 text-studio-rust">{member.role}</p>
                      {member.bio && (
                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                          {member.bio}
                        </p>
                      )}
                      {(member.skills ?? []).length > 0 && (
                        <div className="mb-3 flex flex-wrap gap-1.5">
                          {member.skills.map((skill) => (
                            <Badge
                              key={skill}
                              variant="secondary"
                              className="font-mono text-2xs"
                            >
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex gap-3">
                        {member.instagram && (
                          <a
                            href={member.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on Instagram`}
                            className="text-muted-foreground transition-colors hover:text-studio-rust"
                          >
                            <Instagram size={16} />
                          </a>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name} on LinkedIn`}
                            className="text-muted-foreground transition-colors hover:text-studio-rust"
                          >
                            <Linkedin size={16} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        ) : (
          <ScrollReveal>
            <SectionLabel>The team</SectionLabel>
            <h2 className="text-display mb-6">The people behind the work</h2>
            <p className="mb-20 text-sm text-muted-foreground">
              Team profiles coming soon.
            </p>
          </ScrollReveal>
        )}

        <Separator className="mb-20" />

        {/* Values */}
        <ScrollReveal staggerChildren>
          <SectionLabel>What we believe</SectionLabel>
          <h2 className="text-display mb-12">How we think about our work</h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            {VALUES.map((value) => (
              <div key={value.num}>
                <p className="mb-3 font-serif text-4xl text-studio-rust opacity-30">
                  {value.num}
                </p>
                <h3 className="mb-3 font-serif text-xl">{value.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-20 border-t border-border pt-14 text-center">
            <h2 className="text-display mb-4">Work with us</h2>
            <p className="mx-auto mb-8 max-w-sm text-sm text-muted-foreground">
              We take on a small number of projects at a time so every client gets our full attention.
            </p>
            <Button asChild size="lg">
              <Link href="/contact">Start a conversation →</Link>
            </Button>
          </div>
        </ScrollReveal>

      </div>
    </div>
  )
}
