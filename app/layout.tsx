import type { Metadata } from 'next'
import { Playfair_Display, Plus_Jakarta_Sans, DM_Mono } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
  preload: true,
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
  preload: true,
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
  display: 'swap',
  preload: false,
})

function getSiteUrl(): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl || siteUrl.includes('[')) {
    return 'https://example.com'
  }

  return siteUrl
}

function getEnvValue(value: string | undefined, fallback: string): string {
  if (!value || value.includes('[')) {
    return fallback
  }

  return value
}

const siteUrl = getSiteUrl()
const studioName = getEnvValue(process.env.NEXT_PUBLIC_STUDIO_NAME, 'Forme Studio')
const city = getEnvValue(process.env.NEXT_PUBLIC_STUDIO_CITY, 'Bangalore')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${studioName} — Web Design & SEO Studio, ${city}`,
    template: `%s | ${studioName}`,
  },
  description: `${studioName} builds beautiful, fast websites for local businesses in ${city} and helps them rank on Google. Web design + SEO for clinics, law firms, restaurants, boutiques.`,
  openGraph: {
    type: 'website',
    siteName: studioName,
    url: siteUrl,
    locale: 'en_IN',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${playfair.variable} ${jakarta.variable} ${dmMono.variable}`}
    >
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <a href="#main-content" className="skip-nav">Skip to main content</a>
          <Header />
          <main id="main-content" className="pt-16">
            {children}
          </main>
          <Footer />
          <WhatsAppButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
