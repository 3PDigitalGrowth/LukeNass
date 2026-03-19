'use client'

import { Header } from '@/components/header'
import { SellHeroSection } from '@/components/sell/sell-hero-section'
import { SellerTestimonials } from '@/components/sell/seller-testimonials'
import { RecentResults } from '@/components/sell/recent-results'
import { SellerSuburbExpertise } from '@/components/sell/seller-suburb-expertise'
import { ProcessRoadmap } from '@/components/sell/process-roadmap'
import { Footer } from '@/components/footer'

export default function SellPage() {
  return (
    <main className="bg-background">
      <Header />
      <SellHeroSection />
      <SellerTestimonials />
      <RecentResults />
      <SellerSuburbExpertise />
      <ProcessRoadmap />
      <Footer />
    </main>
  )
}
