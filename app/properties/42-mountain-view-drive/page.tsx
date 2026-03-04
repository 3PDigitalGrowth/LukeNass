import type { Metadata } from 'next'
import PropertyPageContent from './layout-content'

export const metadata: Metadata = {
  title: '42 Mountain View Drive, Roleystone | Luke Nass Real Estate',
  description: 'Stunning $1.25M modern home with panoramic Perth Hills views. 4 bed, 2 bath, luxury property in Roleystone.'
}

export default function PropertyPage() {
  return <PropertyPageContent />
}
