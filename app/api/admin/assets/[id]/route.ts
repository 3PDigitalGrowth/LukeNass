import { readFile } from "fs/promises"
import { NextRequest, NextResponse } from "next/server"
import { get } from "@vercel/blob"

import { isAdminAuthenticated } from "@/lib/admin-auth"
import {
  assetExists,
  getAssetBlobPath,
  getAssetById,
  getAssetFilePath,
} from "@/lib/admin-assets"

export const runtime = "nodejs"

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await context.params
  const asset = await getAssetById(id)

  if (!asset) {
    return NextResponse.json({ error: "File not found." }, { status: 404 })
  }

  if (asset.blobUrl) {
    const blob = await get(getAssetBlobPath(asset), {
      access: "private",
      useCache: false,
    })

    if (!blob || blob.statusCode !== 200) {
      return NextResponse.json({ error: "File not found." }, { status: 404 })
    }

    return new NextResponse(blob.stream, {
      status: 200,
      headers: {
        "Content-Type": asset.mimeType,
        "Content-Disposition": `inline; filename="${asset.originalName}"`,
        "Cache-Control": "private, no-store",
      },
    })
  }

  if (!(await assetExists(asset))) {
    return NextResponse.json({ error: "File not found." }, { status: 404 })
  }

  const buffer = await readFile(getAssetFilePath(asset))

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      "Content-Type": asset.mimeType,
      "Content-Length": String(buffer.byteLength),
      "Content-Disposition": `inline; filename="${asset.originalName}"`,
      "Cache-Control": "private, no-store",
    },
  })
}
