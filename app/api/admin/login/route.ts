import { NextResponse } from "next/server"

import {
  ADMIN_COOKIE_NAME,
  ADMIN_SESSION_VALUE,
  getAdminPassword,
} from "@/lib/admin-auth"

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string }

  if (body.password !== getAdminPassword()) {
    return NextResponse.json(
      { error: "Incorrect password." },
      { status: 401 }
    )
  }

  const response = NextResponse.json({ ok: true })

  response.cookies.set({
    name: ADMIN_COOKIE_NAME,
    value: ADMIN_SESSION_VALUE,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  })

  return response
}
