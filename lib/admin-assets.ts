import { randomUUID } from "crypto"
import { mkdir, readFile, stat, writeFile } from "fs/promises"
import path from "path"

export interface AdminAsset {
  id: string
  originalName: string
  storedName: string
  mimeType: string
  size: number
  uploadedAt: string
}

const STORAGE_ROOT = path.join(process.cwd(), "storage", "admin-assets")
const FILES_DIR = path.join(STORAGE_ROOT, "files")
const MANIFEST_PATH = path.join(STORAGE_ROOT, "manifest.json")

function sanitizeBaseName(filename: string) {
  return filename
    .replace(/\.[^/.]+$/, "")
    .replace(/[^a-zA-Z0-9-_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .toLowerCase()
}

async function ensureStorage() {
  await mkdir(FILES_DIR, { recursive: true })
}

export async function readAssets() {
  try {
    const content = await readFile(MANIFEST_PATH, "utf8")
    const parsed = JSON.parse(content) as AdminAsset[]

    return parsed.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
  } catch {
    return [] as AdminAsset[]
  }
}

async function writeAssets(assets: AdminAsset[]) {
  await ensureStorage()
  await writeFile(MANIFEST_PATH, JSON.stringify(assets, null, 2), "utf8")
}

export async function storeAsset(file: File) {
  await ensureStorage()

  const extension = path.extname(file.name)
  const baseName = sanitizeBaseName(file.name) || "asset"
  const id = randomUUID()
  const storedName = `${baseName}-${id}${extension}`
  const filePath = path.join(FILES_DIR, storedName)
  const buffer = Buffer.from(await file.arrayBuffer())

  await writeFile(filePath, buffer)

  const asset: AdminAsset = {
    id,
    originalName: file.name,
    storedName,
    mimeType: file.type || "application/octet-stream",
    size: buffer.byteLength,
    uploadedAt: new Date().toISOString(),
  }

  const assets = await readAssets()
  assets.unshift(asset)
  await writeAssets(assets)

  return asset
}

export async function getAssetById(id: string) {
  const assets = await readAssets()
  return assets.find((asset) => asset.id === id) || null
}

export function getAssetFilePath(asset: AdminAsset) {
  return path.join(FILES_DIR, asset.storedName)
}

export async function assetExists(asset: AdminAsset) {
  try {
    await stat(getAssetFilePath(asset))
    return true
  } catch {
    return false
  }
}
