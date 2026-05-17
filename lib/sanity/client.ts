import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

if (!projectId || projectId === 'FILL_THIS_LATER') {
  throw new Error(
    'NEXT_PUBLIC_SANITY_PROJECT_ID is not set. Add it to .env.local'
  )
}

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
  stega: false,
})
