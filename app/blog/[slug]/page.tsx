import type { Metadata } from 'next'
import Script from 'next/script'
import { notFound } from 'next/navigation'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BlogTemplate } from '@/components/blog/BlogTemplate'
import { getAllBlogPosts, getBlogPost, getRelatedBlogPosts } from '@/lib/blog'

const siteUrl = 'https://www.lukenass.com.au'

export async function generateStaticParams() {
  const posts = await getAllBlogPosts({ includeDrafts: true })
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return {}

  const url = `${siteUrl}/blog/${post.slug}`
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    keywords: post.keywords,
    alternates: post.draft ? undefined : { canonical: url },
    robots: post.draft ? { index: false, follow: false } : undefined,
    openGraph: {
      title: post.metaTitle,
      description: post.metaDescription,
      type: 'article',
      url,
      images: post.heroImage ? [{ url: post.heroImage }] : undefined,
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle,
      description: post.metaDescription,
      images: post.heroImage ? [post.heroImage] : undefined,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  const relatedPosts = await getRelatedBlogPosts(post)
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.metaDescription,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Luke Nass Real Estate',
    },
    datePublished: post.date,
    image: post.heroImage ? [`${siteUrl}${post.heroImage}`] : undefined,
    mainEntityOfPage: `${siteUrl}/blog/${post.slug}`,
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: post.breadcrumb.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb,
      item: index === 0 ? `${siteUrl}/blog` : `${siteUrl}/blog/${post.slug}`,
    })),
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Script
        id={`article-json-ld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Script
        id={`breadcrumb-json-ld-${post.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <BlogTemplate post={post} relatedPosts={relatedPosts} />
      <Footer />
    </main>
  )
}
