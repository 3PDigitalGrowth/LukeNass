import { cookies } from "next/headers"

import { AdminAuthForm } from "@/components/admin/admin-auth-form"
import { AdminDashboard } from "@/components/admin/admin-dashboard"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ADMIN_COOKIE_NAME, ADMIN_SESSION_VALUE } from "@/lib/admin-auth"

export const dynamic = "force-dynamic"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthenticated =
    cookieStore.get(ADMIN_COOKIE_NAME)?.value === ADMIN_SESSION_VALUE

  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto px-4 lg:px-8 py-32 lg:py-24">
        {isAuthenticated ? <AdminDashboard /> : <AdminAuthForm />}
      </div>
      <Footer />
    </main>
  )
}
