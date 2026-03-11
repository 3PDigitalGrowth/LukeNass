import { NextRequest, NextResponse } from "next/server"

import { isAdminAuthenticated } from "@/lib/admin-auth"
import { readAssets, storeAsset } from "@/lib/admin-assets"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const assets = await readAssets()
  return NextResponse.json({ assets })
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get("file")

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 })
  }

  const asset = await storeAsset(file)

  return NextResponse.json({ asset }, { status: 201 })
}
