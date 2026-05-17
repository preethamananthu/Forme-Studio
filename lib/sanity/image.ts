import createImageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { sanityClient } from './client'

const builder = createImageUrlBuilder(sanityClient)

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export function urlForImage(
  source: SanityImageSource,
  width: number,
  height?: number
): string {
  const b = builder.image(source).width(width).auto('format').fit('max')
  return height ? b.height(height).url() : b.url()
}
