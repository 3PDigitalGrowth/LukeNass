import type { Metadata } from 'next'
import SoldPropertyPageContent from './layout-content'

export const metadata: Metadata = {
  title: '42 Hilltop Drive, Roleystone - SOLD | Luke Nass Real Estate',
  description: 'Case study: 42 Hilltop Drive sold for $1.185M in just 9 days using our Inner Circle strategy. See how we achieved this result.'
}

export default function SoldPropertyPage() {
  return <SoldPropertyPageContent />
}
