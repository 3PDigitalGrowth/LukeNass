import type { NextRequest } from "next/server"

interface CookieStoreLike {
  get(name: string): { value: string } | undefined
}

export const ADMIN_COOKIE_NAME = "ln_admin_session"
export const ADMIN_SESSION_VALUE = "authenticated"

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "5121"
}

export function isAdminAuthenticated(
  source: NextRequest | CookieStoreLike
) {
  if ("cookies" in source) {
    return source.cookies.get(ADMIN_COOKIE_NAME)?.value === ADMIN_SESSION_VALUE
  }

  return source.get(ADMIN_COOKIE_NAME)?.value === ADMIN_SESSION_VALUE
}
