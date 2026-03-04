import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { MarketPulseRibbon } from "@/components/market-pulse-ribbon"
import { UpcomingOpenHomes } from "@/components/upcoming-open-homes"
import { InnerCircleGallery } from "@/components/inner-circle-gallery"
import { PropertyEcosystem } from "@/components/property-ecosystem"
import { BoutiqueAdvantage } from "@/components/boutique-advantage"
import { SellerLeadMagnet } from "@/components/seller-lead-magnet"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <MarketPulseRibbon />
      <UpcomingOpenHomes />
      <InnerCircleGallery />
      <PropertyEcosystem />
      <BoutiqueAdvantage />
      <SellerLeadMagnet />
      <Testimonials />
      <Footer />
    </main>
  )
}
