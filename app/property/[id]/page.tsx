'use client'

import { use } from 'react'
import { Header } from '@/components/header'
import { PropertyDetailsContent } from '@/components/property/property-details-content'
import { Footer } from '@/components/footer'

export default function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  return (
    <main className="min-h-screen">
      <Header />
      <PropertyDetailsContent propertyId={id} />
      <Footer />
    </main>
  )
}
