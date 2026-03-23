import { randomUUID } from "crypto"
import { mkdir, readFile, writeFile } from "fs/promises"
import path from "path"
import { list, put } from "@vercel/blob"

export interface AdminLink {
  id: string
  title: string
  url: string
  description: string
  createdAt: string
}

const STORAGE_ROOT = path.join(process.cwd(), "storage", "admin-assets")
const LINKS_PATH = path.join(STORAGE_ROOT, "important-links.json")
const LINKS_BLOB_PATH = "admin-assets/important-links.json"
const isBlobStorageEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
const isVercelEnvironment = Boolean(process.env.VERCEL)

async function ensureStorage() {
  await mkdir(STORAGE_ROOT, { recursive: true })
}

function assertWritableStorageConfigured() {
  if (!isBlobStorageEnabled && isVercelEnvironment) {
    throw new Error(
      "Admin storage is not configured for production. Connect Vercel Blob and set BLOB_READ_WRITE_TOKEN."
    )
  }
}

async function readBlobLinks() {
  const { blobs } = await list({
    prefix: LINKS_BLOB_PATH,
    limit: 10,
  })
  const linksBlob = blobs.find((blob) => blob.pathname === LINKS_BLOB_PATH)

  if (!linksBlob) {
    return [] as AdminLink[]
  }

  const response = await fetch(linksBlob.url, { cache: "no-store" })

  if (!response.ok) {
    return [] as AdminLink[]
  }

  const parsed = (await response.json()) as AdminLink[]
  return parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function readAdminLinks() {
  if (isBlobStorageEnabled) {
    return readBlobLinks()
  }

  try {
    const content = await readFile(LINKS_PATH, "utf8")
    const parsed = JSON.parse(content) as AdminLink[]

    return parsed.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
  } catch {
    return [] as AdminLink[]
  }
}

async function writeAdminLinks(links: AdminLink[]) {
  if (isBlobStorageEnabled) {
    await put(LINKS_BLOB_PATH, JSON.stringify(links, null, 2), {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    })
    return
  }

  assertWritableStorageConfigured()
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
