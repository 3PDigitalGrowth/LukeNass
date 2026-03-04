'use client'

import { Header } from '@/components/header'
import { InnerCircleLanding } from '@/components/inner-circle/inner-circle-landing'
import { Footer } from '@/components/footer'

export default function InnerCirclePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <InnerCircleLanding />
      <Footer />
    </main>
  )
}
