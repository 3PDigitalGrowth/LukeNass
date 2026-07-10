import Link from 'next/link'
import type { Metadata } from 'next'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { getPublishedBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Insights | Luke Nass Real Estate',
  description:
    'Practical property guidance for Roleystone, Kelmscott, and Perth\'s SE Corridor from the Luke Nass Real Estate team.',
}

const postsPerPage = 12

export default async function BlogIndexPage({
  searchParams,
}: {
  searchParams?: Promise<{ page?: string }>
}) {
  const posts = await getPublishedBlogPosts()
  const resolvedParams = searchParams ? await searchParams : undefined
  const currentPage = Math.max(1, Number(resolvedParams?.page ?? 1) || 1)
  const totalPages = Math.max(1, Math.ceil(posts.length / postsPerPage))
  const pagePosts = posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage)

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <section className="border-b border-border bg-card pt-20">
        <div className="container mx-auto px-4 py-16 lg:px-8 md:py-24">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-secondary">Insights</p>
          <h1 className="font-serif text-4xl font-bold text-foreground tracking-tighter md:text-6xl">
            Property insights for the SE Corridor
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
            Practical guidance for buying, selling, and understanding the market in Roleystone, Kelmscott, and the Perth Hills.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 lg:px-8">
        {posts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-secondary/50 bg-card p-10 text-center">
            <h2 className="font-serif text-3xl font-bold text-foreground tracking-tight">No posts yet</h2>
            <p className="mt-3 text-muted-foreground">
              New articles will appear here automatically as they are published.
            </p>
          </div>
        ) : (
          <>
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {pagePosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex min-h-[280px] flex-col rounded-2xl border border-border bg-card p-7 shadow-sm transition-all hover:-translate-y-1 hover:border-secondary hover:shadow-xl"
                >
                  <div className="mb-5 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] text-secondary">
                      {post.primaryKeyword}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{post.readTime}</span>
                  </div>
                  <h2 className="font-serif text-2xl font-bold leading-tight text-foreground tracking-tight group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mt-4 flex-grow text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-4 text-sm text-muted-foreground">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString('en-AU', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </time>
                    <span className="font-bold text-secondary">Read</span>
                  </div>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <nav className="mt-12 flex justify-center gap-3" aria-label="Blog pagination">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                  <Link
                    key={page}
                    href={page === 1 ? '/blog' : `/blog?page=${page}`}
                    className={`rounded-full px-4 py-2 text-sm font-bold ${
                      page === currentPage
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-card text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {page}
                  </Link>
                ))}
              </nav>
            )}
          </>
        )}
      </section>
      <Footer />
    </main>
  )
}
