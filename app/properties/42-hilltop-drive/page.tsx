import type { Metadata } from 'next'
import SoldPropertyPageContent from './layout-content'

export const metadata: Metadata = {
  title: '42 Hilltop Drive, Roleystone - SOLD | Luke Nass Real Estate',
  description: 'Case study: 42 Hilltop Drive sold for $1.185M in just 9 days through strategic pricing, strong positioning, and a focused campaign.'
}

export default function SoldPropertyPage() {
  return <SoldPropertyPageContent />
}
