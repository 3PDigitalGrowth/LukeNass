'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { AboutHero } from '@/components/about/about-hero'
import { WhyChooseUs } from '@/components/about/why-choose-us'
import { MeetLuke } from '@/components/about/meet-luke'
import { MeetAndrew } from '@/components/about/meet-andrew'
import { TeamMembers } from '@/components/about/team-members'
import { BoutiqueAdvantageSection } from '@/components/about/boutique-advantage-section'
import { HowWeSell } from '@/components/about/how-we-sell'
import { TestimonialsFeatured } from '@/components/about/testimonials-featured'
import { LocalOffice } from '@/components/about/local-office'
import { FinalCTA } from '@/components/about/final-cta'

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      <AboutHero />
      <WhyChooseUs />
      <MeetLuke />
      <MeetAndrew />
      <TeamMembers />
      <BoutiqueAdvantageSection />
      <HowWeSell />
      <TestimonialsFeatured />
      <LocalOffice />
      <FinalCTA />
      <Footer />
    </main>
  )
}
