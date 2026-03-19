'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { BuyHeroSection } from '@/components/buy/buy-hero-section'
import { BuyMatchingForm } from '@/components/buy/buyer-matching-form'
import { BuyListingsPage } from '@/components/buy/buy-listings-page'
import { AreaGuidance } from '@/components/buy/area-guidance'
import { BuyerJourney } from '@/components/buy/buyer-journey'

export default function Buy() {
  return (
    <main className="min-h-screen">
      <Header />
      <BuyHeroSection />
      <section className="py-16 lg:py-20 bg-secondary/5 border-t border-border/30" id="buyer-match-form">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(420px,1.15fr)] gap-10 lg:gap-14 items-start">
            <div className="max-w-xl lg:pt-6">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-primary mb-4">
                Buyer Matching
              </p>
              <h2 className="text-3xl lg:text-5xl font-serif font-bold text-foreground mb-5 tracking-tighter text-balance">
                Tell Us What You&apos;re Looking For
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-5">
                Use this form to outline your ideal property, preferred suburbs, timeframe, and non-negotiables so we can
                match you with the right opportunities.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-8">
                The more detail you provide, the better we can tailor listings, buyer guidance, and off-market opportunities
                to suit your next move.
              </p>
              <div className="space-y-3 text-sm text-muted-foreground">
                <div className="rounded-xl border border-border/50 bg-background/70 px-4 py-3">
                  Share your budget, timing, and preferred locations.
                </div>
                <div className="rounded-xl border border-border/50 bg-background/70 px-4 py-3">
                  Tell us the features that matter most to you.
                </div>
                <div className="rounded-xl border border-border/50 bg-background/70 px-4 py-3">
                  We&apos;ll use your brief to identify suitable matches and buyer guidance.
                </div>
              </div>
            </div>
            <div className="w-full">
              <BuyMatchingForm showIntro={false} />
            </div>
          </div>
        </div>
      </section>
      <BuyListingsPage />
      <AreaGuidance />
      <BuyerJourney />
      <Footer />
    </main>
  )
}
