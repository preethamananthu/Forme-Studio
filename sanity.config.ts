import { defineConfig, type Rule } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  title: 'Forme Studio CMS',
  schema: {
    types: [
      {
        name: 'caseStudy', title: 'Case Study', type: 'document',
        fields: [
          { name: 'title', type: 'string', validation: (r: Rule) => r.required() },
          { name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r: Rule) => r.required() },
          { name: 'client', type: 'string', validation: (r: Rule) => r.required() },
          { name: 'industry', type: 'string', options: { list: ['clinic','legal','food','architect','boutique','coach','other'] } },
          { name: 'city', type: 'string' },
          { name: 'year', type: 'number' },
          { name: 'services', type: 'array', of: [{ type: 'string' }] },
          { name: 'heroImage', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string', validation: (r: Rule) => r.required() }] },
          { name: 'overview', type: 'object', fields: [{ name: 'problem', type: 'text' }, { name: 'role', type: 'text' }, { name: 'timeline', type: 'string' }] },
          { name: 'metrics', type: 'array', of: [{ type: 'object', fields: [{ name: 'label', type: 'string' }, { name: 'value', type: 'string' }] }] },
          { name: 'sections', type: 'array', of: [{ type: 'block' }] },
          { name: 'illustrations', type: 'array', of: [{ type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] }] },
          { name: 'testimonial', type: 'object', fields: [{ name: 'quote', type: 'text' }, { name: 'name', type: 'string' }, { name: 'role', type: 'string' }, { name: 'business', type: 'string' }] },
          { name: 'techStack', type: 'array', of: [{ type: 'string' }] },
          { name: 'lessons', type: 'text' },
          { name: 'featured', type: 'boolean', initialValue: false },
          { name: 'order', type: 'number', initialValue: 99 },
        ],
        preview: { select: { title: 'title', subtitle: 'client', media: 'heroImage' } },
      },
      {
        name: 'blogPost', title: 'Blog Post', type: 'document',
        fields: [
          { name: 'title', type: 'string', validation: (r: Rule) => r.required() },
          { name: 'slug', type: 'slug', options: { source: 'title' }, validation: (r: Rule) => r.required() },
          { name: 'publishedAt', type: 'datetime', validation: (r: Rule) => r.required() },
          { name: 'excerpt', type: 'text', rows: 3 },
          { name: 'coverImage', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] },
          { name: 'content', type: 'array', of: [{ type: 'block' }] },
          { name: 'targetAudience', type: 'string', options: { list: ['business-owner','designer','general'] } },
          { name: 'tags', type: 'array', of: [{ type: 'string' }] },
        ],
        preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' } },
      },
      {
        name: 'service', title: 'Service', type: 'document',
        fields: [
          { name: 'name', type: 'string', validation: (r: Rule) => r.required() },
          { name: 'slug', type: 'slug', options: { source: 'name' } },
          { name: 'tagline', type: 'string' },
          { name: 'startingPrice', type: 'number' },
          { name: 'description', type: 'text' },
          { name: 'includes', type: 'array', of: [{ type: 'string' }] },
          { name: 'excludes', type: 'array', of: [{ type: 'string' }] },
          { name: 'timeline', type: 'string' },
          { name: 'idealFor', type: 'text' },
          { name: 'featured', type: 'boolean', initialValue: false },
          { name: 'order', type: 'number', initialValue: 99 },
        ],
        preview: { select: { title: 'name', subtitle: 'tagline' } },
      },
      {
        name: 'teamMember', title: 'Team Member', type: 'document',
        fields: [
          { name: 'name', type: 'string', validation: (r: Rule) => r.required() },
          { name: 'role', type: 'string', validation: (r: Rule) => r.required() },
          { name: 'bio', type: 'text' },
          { name: 'photo', type: 'image', options: { hotspot: true }, fields: [{ name: 'alt', type: 'string' }] },
          { name: 'instagram', type: 'url' },
          { name: 'linkedin', type: 'url' },
          { name: 'skills', type: 'array', of: [{ type: 'string' }] },
        ],
        preview: { select: { title: 'name', subtitle: 'role', media: 'photo' } },
      },
    ],
  },
  plugins: [structureTool(), visionTool({ defaultApiVersion: '2024-01-01' })],
})
