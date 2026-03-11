'use client'

import { Header } from '@/components/header'
import { SellHeroSection } from '@/components/sell/sell-hero-section'
import { RecentResults } from '@/components/sell/recent-results'
import { ProcessRoadmap } from '@/components/sell/process-roadmap'
import { Footer } from '@/components/footer'

export default function SellPage() {
  return (
    <main className="bg-background">
      <Header />
      <SellHeroSection />
      <RecentResults />
      <ProcessRoadmap />
      <Footer />
    </main>
  )
}
