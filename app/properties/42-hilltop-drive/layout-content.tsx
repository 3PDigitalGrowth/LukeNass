'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { SoldHeroSection } from '@/components/property/sold-hero-section'
import { SoldNumbersBar } from '@/components/property/sold-numbers-bar'
import { SoldContentSection } from '@/components/property/sold-content-section'
import { SoldSidebar } from '@/components/property/sold-sidebar'
import { SimilarResultsSlider } from '@/components/property/similar-results-slider'

export default function SoldPropertyPageContent() {
  return (
    <main className="min-h-screen">
      <Header />

      <article className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* JSON-LD Schema */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'RealEstateListing',
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: '42 Hilltop Drive',
                  addressLocality: 'Roleystone',
                  addressRegion: 'WA',
                  postalCode: '6111',
                  addressCountry: 'AU'
                },
                name: '42 Hilltop Drive, Roleystone',
                price: 1185000,
                priceCurrency: 'AUD',
                availability: 'https://schema.org/Sold',
                brokerages: [
                  {
                    '@type': 'RealEstateAgent',
                    name: 'Luke Nass Real Estate',
                    image: 'https://lukenass.com.au/luke-nass-portrait.png',
                    telephone: '08 9495 2226'
                  }
                ]
              })
            }}
          />

          {/* Hero Section */}
          <SoldHeroSection />

          {/* Numbers Bar */}
          <SoldNumbersBar />

          {/* Main Content Area */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
            {/* Left Column - Content (65%) */}
            <div className="lg:col-span-2">
              <SoldContentSection />
            </div>

            {/* Right Column - Sidebar (35%) */}
            <aside className="lg:col-span-1">
              <SoldSidebar />
            </aside>
          </div>
        </div>
      </article>

      {/* Similar Results Section */}
      <div className="container mx-auto px-4 lg:px-8 pb-16">
        <SimilarResultsSlider />
      </div>

      <Footer />
    </main>
  )
}
