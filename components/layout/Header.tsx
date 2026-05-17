'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { forwardRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NAV = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/about', label: 'About' },
  { href: '/process', label: 'Process' },
  { href: '/blog', label: 'Blog' },
]
const studioName = process.env.NEXT_PUBLIC_STUDIO_NAME?.includes('[')
  ? 'Forme Studio'
  : process.env.NEXT_PUBLIC_STUDIO_NAME ?? 'Forme Studio'
const MotionDivBase = forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<'div'> & Record<string, any>
>(function MotionDivBase({ disableTransition, ...props }, ref) {
  return <div ref={ref} {...props} />
})
const MotionDiv = motion.create(MotionDivBase)

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="studio-container flex h-16 items-center justify-between">

        <Link
          href="/"
          className="font-serif text-xl text-foreground hover:text-studio-rust transition-colors"
        >
          {studioName}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main">
          {NAV.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'label-mono transition-colors duration-150',
                pathname.startsWith(link.href)
                  ? 'text-studio-rust'
                  : 'hover:text-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild size="sm">
            <Link href="/contact">Start a project</Link>
          </Button>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setOpen(!open)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <MotionDiv
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <nav className="studio-container py-5 flex flex-col gap-1" aria-label="Mobile">
              {NAV.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'label-mono py-3 border-b border-border/50 block',
                    pathname.startsWith(link.href) ? 'text-studio-rust' : ''
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Button asChild className="mt-4 w-full">
                <Link href="/contact" onClick={() => setOpen(false)}>
                  Start a project
                </Link>
              </Button>
            </nav>
          </MotionDiv>
        )}
      </AnimatePresence>
    </header>
  )
}
