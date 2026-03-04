'use client'

import { Header } from '@/components/header'
import { PropertyDetailsContent } from '@/components/property/property-details-content'
import { Footer } from '@/components/footer'

export default function PropertyPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen">
      <Header />
      <PropertyDetailsContent propertyId={params.id} />
      <Footer />
    </main>
  )
}
