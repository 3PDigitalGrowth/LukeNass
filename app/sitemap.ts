import type { MetadataRoute } from 'next'
import { getPublishedBlogPosts } from '@/lib/blog'

const siteUrl = 'https://www.lukenass.com.au'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/buy',
    '/sell',
    '/about',
    '/blog',
    '/trusted-partners',
    '/market-insights',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    changeFrequency: route === '/blog' ? 'daily' : 'weekly',
    priority: route === '' ? 1 : 0.7,
  }))

  const posts = await getPublishedBlogPosts()
  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
