'use client'

import { forwardRef } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

const city = process.env.NEXT_PUBLIC_STUDIO_CITY ?? 'Bangalore'
const MotionDivBase = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & Record<string, any>
>(function MotionDivBase({ disableTransition, ...props }, ref) {
  return <div ref={ref} {...props} />
})
const MotionDiv = motion.create(MotionDivBase)

const itemTransition = {
  duration: 0.6,
  ease: [0.16, 1, 0.3, 1],
} as const

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-28 text-center md:pt-36">
      <svg
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-1/3 opacity-[0.04] lg:block"
        viewBox="0 0 300 600"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        aria-hidden="true"
      >
        <path d="M220 590C205 490 185 390 194 284C201 199 229 116 277 35" />
        <path d="M193 280C156 251 131 213 118 166" />
        <path d="M202 356C165 334 139 299 125 255" />
        <path d="M211 435C173 413 147 379 132 334" />
        <path d="M238 214C256 189 268 161 275 130" />
        <path d="M180 247C152 238 132 220 119 194C146 196 168 213 180 247Z" />
        <path d="M166 324C138 315 118 297 105 271C132 273 154 290 166 324Z" />
        <path d="M155 404C127 395 107 377 94 351C121 353 143 370 155 404Z" />
        <path d="M235 197C240 166 255 143 280 126C279 156 264 180 235 197Z" />
        <circle cx="111" cy="160" r="6" />
        <circle cx="101" cy="258" r="4" />
        <circle cx="89" cy="346" r="5" />
      </svg>

      <MotionDiv
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={itemTransition}
      >
        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...itemTransition, delay: 0 }}
          className="label-mono mb-5 text-studio-rust"
        >
          Web Design + SEO Studio · {city}
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...itemTransition, delay: 0.1 }}
        >
          <h1 className="text-hero mx-auto mb-6 max-w-2xl font-serif">
            Beautiful websites for
            <br />
            businesses that deserve
            <br />
            <em className="italic text-studio-rust">to be found.</em>
          </h1>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...itemTransition, delay: 0.2 }}
        >
          <p className="mx-auto mb-10 max-w-md text-base text-muted-foreground">
            We design and build fast, custom websites for local businesses — and make sure Google puts them in front of the right customers.
          </p>
        </MotionDiv>
        <MotionDiv
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...itemTransition, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-3"
        >
          <Button asChild size="lg">
            <Link href="/work">See our work</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/free-audit">Get a free audit</Link>
          </Button>
        </MotionDiv>
      </MotionDiv>
    </section>
  )
}
