'use client'

import { forwardRef, useRef, type RefObject } from 'react'
import { motion, useInView } from 'framer-motion'
import { fadeUp, stagger } from '@/lib/animations'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
  delay?: number
  staggerChildren?: boolean
}

const MotionDivBase = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & Record<string, any>
>(function MotionDivBase({ disableTransition, ...props }, ref) {
  return <div ref={ref} {...props} />
})
const MotionDiv = motion.create(MotionDivBase)

export function ScrollReveal({
  children,
  className,
  delay = 0,
  staggerChildren = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as RefObject<Element>, { once: true, margin: '-8% 0px' })

  if (staggerChildren) {
    return (
      <MotionDiv
        ref={ref}
        variants={stagger}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
        className={className}
      >
        {children}
      </MotionDiv>
    )
  }

  return (
    <MotionDiv
      ref={ref}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      transition={{ delay }}
      className={cn(className)}
    >
      {children}
    </MotionDiv>
  )
}
