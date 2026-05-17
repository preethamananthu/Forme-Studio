import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { PortableText, type PortableTextComponents } from '@portabletext/react'
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const posts = await getAllBlogPosts().catch(() => [])
  return posts.map((p) => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug).catch(() => null)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt ?? undefined,
    openGraph: post.coverImage
      ? { images: [{ url: urlForImage(post.coverImage, 1200, 630) }] }
      : undefined,
  }
}

const ptComponents: PortableTextComponents = {
  block: {
    h2: ({ children }) => (
      <h2 className="mb-4 mt-10 font-serif text-2xl leading-snug">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="mb-3 mt-8 font-serif text-xl leading-snug">{children}</h3>
    ),
    normal: ({ children }) => (
      <p className="mb-5 text-sm leading-relaxed text-foreground">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="my-6 border-l-2 border-studio-rust pl-5 italic text-muted-foreground">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mb-5 list-disc pl-5 text-sm leading-relaxed space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="mb-5 list-decimal pl-5 text-sm leading-relaxed space-y-1">{children}</ol>
    ),
  },
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getBlogPostBySlug(slug).catch(() => null)
  if (!post) notFound()

  const imgSrc = post.coverImage ? urlForImage(post.coverImage, 1200, 630) : null

  return (
    <article>
      {/* Hero image */}
      {imgSrc && (
        <div className="relative aspect-video w-full overflow-hidden md:aspect-[21/9]">
          <Image
            src={imgSrc}
            alt={post.coverImage?.alt ?? post.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
      )}

      <div className="studio-container pt-10">
        <div className="mx-auto max-w-2xl">
          {/* Meta */}
          <div className="mb-5 flex flex-wrap items-center gap-3">
            <SectionLabel className="mb-0">
              {formatDate(post.publishedAt)}
            </SectionLabel>
            {(post.tags ?? []).map((tag) => (
              <Badge key={tag} variant="secondary" className="font-mono text-2xs">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-display mb-10 font-serif">{post.title}</h1>

          {/* Content */}
          {Array.isArray(post.content) && post.content.length > 0 ? (
            <PortableText value={post.content as Parameters<typeof PortableText>[0]['value']} components={ptComponents} />
          ) : (
            <p className="text-sm text-muted-foreground">Content coming soon.</p>
          )}
        </div>
      </div>
    </article>
  )
}
