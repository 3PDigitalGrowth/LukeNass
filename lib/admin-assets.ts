import { randomUUID } from "crypto"
import { mkdir, readFile, rm, stat, writeFile } from "fs/promises"
import path from "path"
import { del, get, put } from "@vercel/blob"

export interface AdminAsset {
  id: string
  originalName: string
  storedName: string
  mimeType: string
  size: number
  uploadedAt: string
  blobUrl?: string
}

const STORAGE_ROOT = path.join(process.cwd(), "storage", "admin-assets")
const FILES_DIR = path.join(STORAGE_ROOT, "files")
const MANIFEST_PATH = path.join(STORAGE_ROOT, "manifest.json")
const MANIFEST_BLOB_PATH = "admin-assets/manifest.json"
const FILE_BLOB_PREFIX = "admin-assets/files/"
const isBlobStorageEnabled = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
const isVercelEnvironment = Boolean(process.env.VERCEL)

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

function assertWritableStorageConfigured() {
  if (!isBlobStorageEnabled && isVercelEnvironment) {
    throw new Error(
      "Admin storage is not configured for production. Connect Vercel Blob and set BLOB_READ_WRITE_TOKEN."
    )
  }
}

async function readBlobManifest() {
  const result = await get(MANIFEST_BLOB_PATH, {
    access: "private",
    useCache: false,
  })

  if (!result || result.statusCode !== 200) {
    return [] as AdminAsset[]
  }

  const content = await new Response(result.stream).text()
  const parsed = JSON.parse(content) as AdminAsset[]
  return parsed.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
}

export async function readAssets() {
  if (isBlobStorageEnabled) {
    return readBlobManifest()
  }

  try {
    const content = await readFile(MANIFEST_PATH, "utf8")
    const parsed = JSON.parse(content) as AdminAsset[]

    return parsed.sort((a, b) => b.uploadedAt.localeCompare(a.uploadedAt))
  } catch {
    return [] as AdminAsset[]
  }
}

async function writeAssets(assets: AdminAsset[]) {
  if (isBlobStorageEnabled) {
    await put(MANIFEST_BLOB_PATH, JSON.stringify(assets, null, 2), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    })
    return
  }

  assertWritableStorageConfigured()
  await ensureStorage()
  await writeFile(MANIFEST_PATH, JSON.stringify(assets, null, 2), "utf8")
}

export async function storeAsset(file: File) {
  const extension = path.extname(file.name)
  const baseName = sanitizeBaseName(file.name) || "asset"
  const id = randomUUID()
  const storedName = `${baseName}-${id}${extension}`
  const buffer = Buffer.from(await file.arrayBuffer())

  let blobUrl: string | undefined

  if (isBlobStorageEnabled) {
    const uploadedBlob = await put(`${FILE_BLOB_PREFIX}${storedName}`, file, {
      access: "private",
      addRandomSuffix: false,
      contentType: file.type || "application/octet-stream",
    })

    blobUrl = uploadedBlob.url
  } else {
    assertWritableStorageConfigured()
    await ensureStorage()

    const filePath = path.join(FILES_DIR, storedName)
    await writeFile(filePath, buffer)
  }


  const asset: AdminAsset = {
    id,
    originalName: file.name,
    storedName,
    mimeType: file.type || "application/octet-stream",
    size: buffer.byteLength,
    uploadedAt: new Date().toISOString(),
    blobUrl,
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

export async function deleteAsset(id: string) {
  const assets = await readAssets()
  const asset = assets.find((entry) => entry.id === id)

  if (!asset) {
    return false
  }

  if (asset.blobUrl) {
    await del(getAssetBlobPath(asset))
  } else {
    try {
      await rm(getAssetFilePath(asset), { force: true })
    } catch {
      // Ignore missing file errors so the manifest can still be cleaned up.
    }
  }

  const nextAssets = assets.filter((entry) => entry.id !== id)
  await writeAssets(nextAssets)

  return true
}

export function getAssetFilePath(asset: AdminAsset) {
  return path.join(FILES_DIR, asset.storedName)
}

export function getAssetBlobPath(asset: AdminAsset) {
  return `${FILE_BLOB_PREFIX}${asset.storedName}`
}

export async function assetExists(asset: AdminAsset) {
  if (asset.blobUrl) {
    return true
  }

  try {
    await stat(getAssetFilePath(asset))
    return true
  } catch {
    return false
  }
}
