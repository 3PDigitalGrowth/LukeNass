'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { PropertyHeroGallery } from '@/components/property/property-hero-gallery'
import { PropertyInfoBar } from '@/components/property/property-info-bar'
import { PropertyContent } from '@/components/property/property-content'
import { PropertySidebar } from '@/components/property/property-sidebar'

export default function PropertyPageContent() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <article className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-8">
          {/* Hero Gallery */}
          <PropertyHeroGallery />

          {/* Info Bar */}
          <div className="mt-8">
            <PropertyInfoBar />
          </div>

          {/* Main Content Area */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column - Content (65%) */}
            <div className="lg:col-span-2">
              <PropertyContent />
            </div>

            {/* Right Column - Sidebar (35%) */}
            <aside className="lg:col-span-1">
              <PropertySidebar />
            </aside>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  )
}
