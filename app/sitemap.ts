import type { MetadataRoute } from 'next'
import { getSitemapSlugs } from '@/lib/sanity/queries'

const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://formestudio.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { caseStudies, blogPosts } = await getSitemapSlugs().catch(() => ({
    caseStudies: [],
    blogPosts: [],
  }))

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: `${base}/work`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${base}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/process`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/free-audit`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map((cs) => ({
    url: `${base}/work/${cs.slug}`,
    lastModified: new Date(cs.date),
    changeFrequency: 'monthly' as const,
    priority: 0.9,
  }))

  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((bp) => ({
    url: `${base}/blog/${bp.slug}`,
    lastModified: new Date(bp.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [...staticRoutes, ...caseStudyRoutes, ...blogRoutes]
}
