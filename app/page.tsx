import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { UpcomingOpenHomes } from "@/components/upcoming-open-homes"
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
      <UpcomingOpenHomes />
      <PropertyEcosystem />
      <BoutiqueAdvantage />
      <SellerLeadMagnet />
      <Testimonials />
      <Footer />
    </main>
  )
}
