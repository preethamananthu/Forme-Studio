export type SanityImage = {
  _type: 'image'
  asset: { _ref: string; _type: 'reference' }
  alt?: string
  hotspot?: { x: number; y: number; height: number; width: number }
}

export type Industry =
  | 'clinic'
  | 'legal'
  | 'food'
  | 'architect'
  | 'boutique'
  | 'coach'
  | 'other'

export type Metric = { label: string; value: string }

export type Testimonial = {
  quote: string
  name: string
  role: string
  business: string
}

export type CaseStudy = {
  _id: string
  title: string
  slug: { current: string }
  client: string
  industry: Industry
  city: string
  year: number
  services: string[]
  heroImage: SanityImage
  overview: { problem: string; role: string; timeline: string }
  metrics: Metric[]
  sections: PortableTextBlock[]
  illustrations?: SanityImage[]
  testimonial?: Testimonial
  techStack: string[]
  lessons?: string
  featured: boolean
  order: number
}

export type BlogPost = {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  excerpt: string
  coverImage: SanityImage
  content: unknown[]
  targetAudience: 'business-owner' | 'designer' | 'general'
  tags: string[]
}

export type Service = {
  _id: string
  name: string
  slug: { current: string }
  tagline: string
  startingPrice: number
  description: string
  includes: string[]
  excludes: string[]
  timeline: string
  idealFor: string
  featured: boolean
  order: number
}

export type TeamMember = {
  _id: string
  name: string
  role: string
  bio: string
  photo: SanityImage
  instagram?: string
  linkedin?: string
  skills: string[]
}
import type { PortableTextBlock } from '@portabletext/types'
