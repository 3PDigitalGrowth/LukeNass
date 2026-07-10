import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'

export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (!posts.length) return null

  return (
    <section className="mt-16">
      <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Keep reading</p>
      <div className="grid gap-5 md:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-lg"
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {post.primaryKeyword}
            </p>
            <h3 className="font-serif text-xl font-bold leading-tight text-foreground tracking-tight group-hover:text-primary">
              {post.title}
            </h3>
            <p className="mt-3 text-sm text-muted-foreground">{post.readTime}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}
