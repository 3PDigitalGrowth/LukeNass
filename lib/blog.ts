import fs from 'node:fs/promises'
import path from 'node:path'
import matter from 'gray-matter'

export interface BlogFaq {
  question: string
  answer: string
}

export interface BlogLink {
  url: string
  anchor: string
}

export interface BlogReference {
  title: string
  url: string
  note?: string
}

export interface BlogPost {
  slug: string
  title: string
  date: string
  author: string
  readTime: string
  metaTitle: string
  metaDescription: string
  primaryKeyword: string
  keywords: string[]
  tags: string[]
  heroImage?: string
  breadcrumb: string[]
  faqSchema: BlogFaq[]
  internalLinks: BlogLink[]
  references: BlogReference[]
  draft: boolean
  content: string
  excerpt: string
}

const blogDirectory = path.join(process.cwd(), 'content', 'blog')

function asString(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []
}

function asFaqArray(value: unknown): BlogFaq[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const record = item as Record<string, unknown>
      return {
        question: asString(record.question),
        answer: asString(record.answer),
      }
    })
    .filter((item): item is BlogFaq => Boolean(item?.question && item.answer))
}

function asLinkArray(value: unknown): BlogLink[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const record = item as Record<string, unknown>
      return {
        url: asString(record.url),
        anchor: asString(record.anchor),
      }
    })
    .filter((item): item is BlogLink => Boolean(item?.url && item.anchor))
}

function asReferenceArray(value: unknown): BlogReference[] {
  if (!Array.isArray(value)) return []
  return value
    .map((item) => {
      if (!item || typeof item !== 'object') return null
      const record = item as Record<string, unknown>
      const note = asString(record.note)
      return {
        title: asString(record.title),
        url: asString(record.url),
        ...(note ? { note } : {}),
      } satisfies BlogReference
    })
    .filter((item): item is BlogReference => Boolean(item?.title && item.url))
}

function createExcerpt(content: string) {
  return content
    .replace(/import\s+.*?from\s+['"].*?['"];?/g, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/[#*_`>|-]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, 160)
}

async function getBlogFiles() {
  try {
    const files = await fs.readdir(blogDirectory)
    return files.filter((file) => file.endsWith('.mdx'))
  } catch {
    return []
  }
}

export async function getAllBlogPosts({ includeDrafts = false } = {}) {
  const files = await getBlogFiles()
  const posts = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(blogDirectory, file)
      const raw = await fs.readFile(filePath, 'utf8')
      const { data, content } = matter(raw)
      const frontmatter = data as Record<string, unknown>
      const title = asString(frontmatter.title, 'Untitled post')
      const slug = asString(frontmatter.slug, file.replace(/\.mdx$/, ''))

      return {
        slug,
        title,
        date: asString(frontmatter.date, new Date().toISOString()),
        author: asString(frontmatter.author, 'Luke Nass'),
        readTime: asString(frontmatter.readTime, '5 min read'),
        metaTitle: asString(frontmatter.metaTitle, title),
        metaDescription: asString(frontmatter.metaDescription, createExcerpt(content)),
        primaryKeyword: asString(frontmatter.primaryKeyword, 'Property insights'),
        keywords: asStringArray(frontmatter.keywords),
        tags: asStringArray(frontmatter.tags),
        heroImage: asString(frontmatter.heroImage) || undefined,
        breadcrumb: asStringArray(frontmatter.breadcrumb).length
          ? asStringArray(frontmatter.breadcrumb)
          : ['Insights', title],
        faqSchema: asFaqArray(frontmatter.faqSchema),
        internalLinks: asLinkArray(frontmatter.internalLinks),
        references: asReferenceArray(frontmatter.references),
        draft: frontmatter.draft === true,
        content,
        excerpt: createExcerpt(content),
      } satisfies BlogPost
    }),
  )

  return posts
    .filter((post) => includeDrafts || !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export async function getPublishedBlogPosts() {
  return getAllBlogPosts({ includeDrafts: false })
}

export async function getBlogPost(slug: string) {
  const posts = await getAllBlogPosts({ includeDrafts: true })
  return posts.find((post) => post.slug === slug) ?? null
}

export async function getRelatedBlogPosts(post: BlogPost, limit = 3) {
  const posts = await getPublishedBlogPosts()
  const others = posts.filter((item) => item.slug !== post.slug)
  const sharedTags = others.filter((item) => item.tags.some((tag) => post.tags.includes(tag)))
  return [...sharedTags, ...others.filter((item) => !sharedTags.includes(item))].slice(0, limit)
}
