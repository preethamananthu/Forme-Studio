import { sanityClient } from './client'
import type { CaseStudy, BlogPost, Service, TeamMember } from './types'

const REVALIDATE_HOUR = { next: { revalidate: 60 } }
const REVALIDATE_DAY = { next: { revalidate: 86400 } }

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  return sanityClient.fetch(
    `*[_type == "caseStudy" && featured == true] | order(order asc)[0...3] {
      _id, title, slug, client, industry, city, year,
      services, heroImage, metrics, testimonial, order
    }`,
    {},
    REVALIDATE_HOUR
  )
}

export async function getAllCaseStudies(): Promise<CaseStudy[]> {
  return sanityClient.fetch(
    `*[_type == "caseStudy"] | order(order asc) {
      _id, title, slug, client, industry, city, year,
      services, heroImage, metrics, testimonial, featured, order
    }`,
    {},
    REVALIDATE_HOUR
  )
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | null> {
  return sanityClient.fetch(
    `*[_type == "caseStudy" && slug.current == $slug][0]`,
    { slug },
    REVALIDATE_HOUR
  )
}

export async function getAdjacentCaseStudies(order: number) {
  const [prev, next] = await Promise.all([
    sanityClient.fetch<Pick<CaseStudy, '_id' | 'title' | 'slug'> | null>(
      `*[_type == "caseStudy" && order < $order] | order(order desc)[0] { _id, title, slug }`,
      { order },
      REVALIDATE_HOUR
    ),
    sanityClient.fetch<Pick<CaseStudy, '_id' | 'title' | 'slug'> | null>(
      `*[_type == "caseStudy" && order > $order] | order(order asc)[0] { _id, title, slug }`,
      { order },
      REVALIDATE_HOUR
    ),
  ])
  return { prev, next }
}

export async function getLatestBlogPosts(count = 2): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc)[0...$end] {
      _id, title, slug, publishedAt, excerpt, coverImage, tags
    }`,
    { end: count - 1 },
    REVALIDATE_HOUR
  )
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  return sanityClient.fetch(
    `*[_type == "blogPost"] | order(publishedAt desc) {
      _id, title, slug, publishedAt, excerpt, coverImage, tags, targetAudience
    }`,
    {},
    REVALIDATE_HOUR
  )
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return sanityClient.fetch(
    `*[_type == "blogPost" && slug.current == $slug][0]`,
    { slug },
    REVALIDATE_HOUR
  )
}

export async function getAllServices(): Promise<Service[]> {
  return sanityClient.fetch(
    `*[_type == "service"] | order(order asc)`,
    {},
    REVALIDATE_DAY
  )
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  return sanityClient.fetch(
    `*[_type == "teamMember"] | order(_createdAt asc)`,
    {},
    REVALIDATE_DAY
  )
}

export async function getSitemapSlugs() {
  const [cs, bp] = await Promise.all([
    sanityClient.fetch<Array<{ slug: string; date: string }>>(
      `*[_type == "caseStudy"]{"slug": slug.current, "date": _updatedAt}`
    ),
    sanityClient.fetch<Array<{ slug: string; date: string }>>(
      `*[_type == "blogPost"]{"slug": slug.current, "date": _updatedAt}`
    ),
  ])
  return { caseStudies: cs, blogPosts: bp }
}
