import { NextRequest, NextResponse } from "next/server"

import { isAdminAuthenticated } from "@/lib/admin-auth"
import { createAdminLink, readAdminLinks } from "@/lib/admin-links"

export const runtime = "nodejs"

export async function GET(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const links = await readAdminLinks()
  return NextResponse.json({ links })
}

export async function POST(request: NextRequest) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = (await request.json()) as {
    title?: string
    url?: string
    description?: string
  }

  try {
    const link = await createAdminLink({
      title: body.title || "",
      url: body.url || "",
      description: body.description || "",
    })

    return NextResponse.json({ link }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unable to create link.",
      },
      { status: 400 }
    )
  }
}
