'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BuyHeroSection } from '@/components/buy/buy-hero-section'
import { BuyListingsPage } from '@/components/buy/buy-listings-page'
import { AreaGuidance } from '@/components/buy/area-guidance'
import { BuyerJourney } from '@/components/buy/buyer-journey'

export default function Buy() {
  return (
    <main className="min-h-screen">
      <Header />
      <BuyHeroSection />
      <BuyListingsPage />
      <AreaGuidance />
      <BuyerJourney />
      <Footer />
    </main>
  )
}
