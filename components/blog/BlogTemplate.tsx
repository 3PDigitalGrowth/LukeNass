import Image from 'next/image'
import Link from 'next/link'
import Script from 'next/script'
import type { BlogPost } from '@/lib/blog'
import { blogCtaConfig } from '@/lib/blog-cta-config'
import { AuthorBio } from '@/components/blog/AuthorBio'
import { BlogCtaButton } from '@/components/blog/BlogCtaButton'
import { BlogMarkdown } from '@/components/blog/BlogMarkdown'
import { RelatedPosts } from '@/components/blog/RelatedPosts'

export function BlogTemplate({
  post,
  relatedPosts,
}: {
  post: BlogPost
  relatedPosts: BlogPost[]
}) {
  const faqJsonLd = post.faqSchema.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: post.faqSchema.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      }
    : null

  return (
    <>
      {faqJsonLd && (
        <Script
          id={`faq-json-ld-${post.slug}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      <article className="bg-background">
        <header className="border-b border-border bg-card pt-20">
          <div className="container mx-auto max-w-5xl px-4 py-12 lg:px-8 md:py-16">
            <nav className="mb-8 flex flex-wrap gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
              {post.breadcrumb.map((crumb, index) => (
                <span key={`${crumb}-${index}`} className="flex items-center gap-2">
                  {index === 0 ? (
                    <Link href="/blog" className="font-semibold text-primary hover:text-secondary">
                      {crumb}
                    </Link>
                  ) : (
                    <span>{crumb}</span>
                  )}
                  {index < post.breadcrumb.length - 1 && <span>/</span>}
                </span>
              ))}
            </nav>

            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.18em] text-secondary">
                {post.primaryKeyword}
              </p>
              <h1 className="font-serif text-4xl font-bold leading-[1.08] text-foreground tracking-tighter md:text-6xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-muted-foreground">
                <span>{post.author}</span>
                <span aria-hidden>·</span>
                <time dateTime={post.date}>
                  {new Date(post.date).toLocaleDateString('en-AU', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })}
                </time>
                <span aria-hidden>·</span>
                <span>{post.readTime}</span>
              </div>
            </div>

            {post.heroImage && (
              <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
                <Image
                  src={post.heroImage}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 960px"
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </header>

        <div className="container mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-[minmax(0,720px)_280px] lg:px-8">
          <main>
            <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-foreground prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-3xl prose-h3:text-2xl prose-p:text-[17px] prose-p:leading-8 prose-p:text-muted-foreground prose-li:text-muted-foreground prose-strong:text-foreground">
              <BlogMarkdown source={post.content} />
            </div>

            {post.faqSchema.length > 0 && (
              <section className="mt-16 rounded-2xl border border-border bg-card p-7 shadow-sm">
                <p className="mb-6 text-sm font-bold uppercase tracking-[0.18em] text-secondary">FAQ</p>
                <div className="space-y-7">
                  {post.faqSchema.map((item) => (
                    <div key={item.question}>
                      <h3 className="font-serif text-2xl font-bold text-foreground tracking-tight">{item.question}</h3>
                      <p className="mt-2 text-[17px] leading-8 text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {post.references.length > 0 && (
              <section className="mt-14">
                <h2 className="font-serif text-3xl font-bold text-foreground tracking-tight">References</h2>
                <ol className="mt-5 list-decimal space-y-3 pl-5 text-sm text-muted-foreground">
                  {post.references.map((reference) => (
                    <li key={reference.url}>
                      <a href={reference.url} className="font-semibold text-primary underline underline-offset-4">
                        {reference.title}
                      </a>
                      {reference.note && <span> ({reference.note})</span>}
                    </li>
                  ))}
                </ol>
              </section>
            )}

            <AuthorBio author={post.author} />
            <RelatedPosts posts={relatedPosts} />
          </main>

          <aside className="hidden md:block">
            <div className="sticky top-24 space-y-6">
              {post.internalLinks.length > 0 && (
                <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                  <p className="mb-4 text-sm font-bold uppercase tracking-[0.16em] text-secondary">
                    Useful links
                  </p>
                  <div className="space-y-3">
                    {post.internalLinks.map((link) => (
                      <Link key={link.url} href={link.url} className="block text-sm font-semibold text-foreground hover:text-primary">
                        {link.anchor}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              <div className="rounded-2xl bg-primary p-5 text-primary-foreground shadow-lg">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-secondary">
                  {blogCtaConfig.primary.eyebrow}
                </p>
                <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight">{blogCtaConfig.primary.title}</h3>
                <BlogCtaButton
                  label={blogCtaConfig.primary.button}
                  source="Blog Sidebar CTA"
                  className="mt-5"
                />
              </div>
            </div>
          </aside>
        </div>

        <section className="bg-primary px-4 py-14 text-primary-foreground lg:px-8">
          <div className="container mx-auto grid max-w-6xl gap-8 md:grid-cols-[1fr_420px] md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-secondary">
                {blogCtaConfig.bottom.eyebrow}
              </p>
              <h2 className="mt-3 font-serif text-3xl font-bold tracking-tighter md:text-5xl">{blogCtaConfig.bottom.title}</h2>
              <p className="mt-4 max-w-2xl text-primary-foreground/75">{blogCtaConfig.bottom.body}</p>
            </div>
            <div className="rounded-2xl border border-primary-foreground/10 bg-card p-7 text-foreground shadow-xl">
              <p className="font-serif text-2xl font-bold tracking-tight">Tell us what you need help with.</p>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Send a quick enquiry and the team will come back with a clear next step.
              </p>
              <BlogCtaButton
                label={blogCtaConfig.bottom.button}
                source="Blog Bottom CTA"
                type="general-contact"
                className="mt-6 w-full"
              />
            </div>
          </div>
        </section>
      </article>
    </>
  )
}
