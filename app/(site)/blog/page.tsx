import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { getAllBlogPosts } from '@/lib/sanity/queries'
import { urlForImage } from '@/lib/sanity/image'
import { SectionLabel } from '@/components/shared/SectionLabel'
import { ScrollReveal } from '@/components/shared/ScrollReveal'
import { Badge } from '@/components/ui/badge'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Practical guides on web design and SEO for local Indian businesses — clinics, restaurants, law firms, and more.',
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts().catch(() => [])

  return (
    <div className="section-py">
      <div className="studio-container">
        <ScrollReveal>
          <SectionLabel>From the studio</SectionLabel>
          <h1 className="text-display mb-4">Blog</h1>
          <p className="mb-14 max-w-lg text-sm text-muted-foreground">
            Practical guides on web design and SEO for local businesses — written for owners, not
            developers.
          </p>
        </ScrollReveal>

        {posts.length === 0 ? (
          <ScrollReveal>
            <p className="text-sm text-muted-foreground">
              Articles coming soon. Check back after our first posts go live.
            </p>
          </ScrollReveal>
        ) : (
          <ScrollReveal staggerChildren>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {posts.map((post) => {
                const imgSrc = post.coverImage
                  ? urlForImage(post.coverImage, 800, 450)
                  : null

                return (
                  <Link
                    key={post._id}
                    href={`/blog/${post.slug.current}`}
                    className="group studio-card studio-card-hover block overflow-hidden"
                  >
                    {imgSrc && (
                      <div className="relative aspect-video overflow-hidden">
                        <Image
                          src={imgSrc}
                          alt={post.coverImage?.alt ?? post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className="label-mono text-muted-foreground">
                          {formatDate(post.publishedAt)}
                        </span>
                        {(post.tags ?? []).slice(0, 2).map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="font-mono text-2xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <h2 className="mb-3 font-serif text-xl transition-colors group-hover:text-studio-rust">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                      )}
                      <span className="label-mono text-studio-rust">Read more →</span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </ScrollReveal>
        )}
      </div>
    </div>
  )
}
