import { NextRequest, NextResponse } from "next/server"

import { isAdminAuthenticated } from "@/lib/admin-auth"
import { deleteAdminLink } from "@/lib/admin-links"

export const runtime = "nodejs"

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  if (!isAdminAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await context.params
  const deleted = await deleteAdminLink(id)

  if (!deleted) {
    return NextResponse.json({ error: "Link not found." }, { status: 404 })
  }

  return NextResponse.json({ success: true })
}
