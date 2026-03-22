import { randomUUID } from "crypto"
import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"

export interface AdminLink {
  id: string
  title: string
  url: string
  description: string
  createdAt: string
}

const STORAGE_ROOT = path.join(process.cwd(), "storage", "admin-assets")
const LINKS_PATH = path.join(STORAGE_ROOT, "important-links.json")

async function ensureStorage() {
  await mkdir(STORAGE_ROOT, { recursive: true })
}

export async function readAdminLinks() {
  try {
    const content = await readFile(LINKS_PATH, "utf8")
    const parsed = JSON.parse(content) as AdminLink[]

    return parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch {
    return [] as AdminLink[]
  }
}

async function writeAdminLinks(links: AdminLink[]) {
  await ensureStorage()
  await writeFile(LINKS_PATH, JSON.stringify(links, null, 2), "utf8")
}

export function normalizeAdminLinkUrl(url: string) {
  const trimmed = url.trim()

  if (!trimmed) return ""
  if (/^https?:\/\//i.test(trimmed)) return trimmed

  return `https://${trimmed}`
}

export async function createAdminLink(input: {
  title: string
  url: string
  description?: string
}) {
  const title = input.title.trim()
  const url = normalizeAdminLinkUrl(input.url)
  const description = input.description?.trim() || ""

  if (!title) {
    throw new Error("Link title is required.")
  }

  if (!url) {
    throw new Error("Link URL is required.")
  }

  let parsedUrl: URL

  try {
    parsedUrl = new URL(url)
  } catch {
    throw new Error("Enter a valid URL.")
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    throw new Error("Only http and https links are supported.")
  }

  const link: AdminLink = {
    id: randomUUID(),
    title,
    url: parsedUrl.toString(),
    description,
    createdAt: new Date().toISOString(),
  }

  const links = await readAdminLinks()
  links.unshift(link)
  await writeAdminLinks(links)

  return link
}

export async function deleteAdminLink(id: string) {
  const links = await readAdminLinks()
  const nextLinks = links.filter((link) => link.id !== id)

  if (nextLinks.length === links.length) {
    return false
  }

  await writeAdminLinks(nextLinks)
  return true
}
