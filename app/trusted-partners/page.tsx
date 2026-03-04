'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PartnersHero } from '@/components/trusted-partners/partners-hero'
import { PartnersDirectory } from '@/components/trusted-partners/partners-directory'

export default function TrustedPartnersPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <PartnersHero />
      <PartnersDirectory />
      <Footer />
    </main>
  )
}
