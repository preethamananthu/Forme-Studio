import Link from 'next/link'
import { Separator } from '@/components/ui/separator'

const year = new Date().getFullYear()
const studioName = process.env.NEXT_PUBLIC_STUDIO_NAME?.includes('[')
  ? 'Forme Studio'
  : process.env.NEXT_PUBLIC_STUDIO_NAME ?? 'Forme Studio'

const links = {
  Studio: [
    { href: '/work', label: 'Work' },
    { href: '/services', label: 'Services' },
    { href: '/about', label: 'About' },
    { href: '/process', label: 'Process' },
    { href: '/blog', label: 'Blog' },
  ],
  Connect: [
    { href: '/contact', label: 'Start a project' },
    { href: '/free-audit', label: 'Free website audit' },
    { href: `mailto:preethamananthu@gmail.com`, label: 'preethamananthu@gmail.com' },
  ],
}

export function Footer() {
  return (
    <footer className="bg-secondary border-t border-border mt-28">
      <div className="studio-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          <div>
            <p className="font-serif text-xl mb-3">{studioName}</p>
            <p className="text-xs text-muted-foreground leading-relaxed max-w-[200px]">
              Web design and SEO for businesses that deserve to be found.
            </p>
          </div>
          {Object.entries(links).map(([group, items]) => (
            <div key={group}>
              <p className="label-mono mb-4">{group}</p>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-xs text-muted-foreground hover:text-studio-rust transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <Separator className="mb-5" />
        <div className="flex flex-col md:flex-row justify-between gap-2">
          <p className="font-mono text-2xs text-muted-foreground">
            © {year} {studioName} All rights reserved.
          </p>
          <p className="font-mono text-2xs text-muted-foreground">
            Designed and built in Bangalore
          </p>
        </div>
      </div>
    </footer>
  )
}
