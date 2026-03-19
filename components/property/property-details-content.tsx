'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ChevronDown, Phone, Calendar } from 'lucide-react'

interface PropertyDetailsContentProps {
  propertyId: string
}

export function PropertyDetailsContent({ propertyId }: PropertyDetailsContentProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [expandedAccordion, setExpandedAccordion] = useState<'floorplan' | 'video' | null>(null)
  const [showInspectionForm, setShowInspectionForm] = useState(false)

  // Mock property data - replace with API call
  const property = {
    address: '42 Hilltop Drive, Roleystone WA 6111',
    price: '$1,280,000',
    beds: 4,
    baths: 3,
    cars: 2,
    landSize: '2,500 sqm',
    images: [
      '/luxury-modern-home-with-pool-perth-hills-sunset.jpg',
      '/luxury-home-roleystone-bushland-views.jpg',
      '/modern-contemporary-home-kelmscott-hills.jpg',
      '/family-home-armadale-perth.jpg',
      '/stunning-hillside-home-perth-views.jpg',
    ],
    strategy: 'This exceptional Roleystone residence combines elevated bushland positioning with modern architectural refinement, presenting a compelling acquisition for discerning buyers seeking lifestyle and capital appreciation. Our analysis indicates a strong position relative to recent comparable sales and supports long-term value retention in the Perth Hills sector.',
    floorplan: '/public/placeholder-floorplan.jpg',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  }

  const specs = [
    { label: 'Price', value: property.price },
    { label: 'Beds', value: property.beds },
    { label: 'Baths', value: property.baths },
    { label: 'Cars', value: property.cars },
    { label: 'Land Size', value: property.landSize },
  ]

  const mosaicLayout = [
    { row: 0, col: 0, rowSpan: 2, colSpan: 2, imageIndex: 0 },
    { row: 0, col: 2, rowSpan: 1, colSpan: 1, imageIndex: 1 },
    { row: 1, col: 2, rowSpan: 1, colSpan: 1, imageIndex: 2 },
    { row: 0, col: 3, rowSpan: 2, colSpan: 1, imageIndex: 3 },
    { row: 2, col: 0, rowSpan: 1, colSpan: 1, imageIndex: 4 },
  ]

  return (
    <div className="pt-24 pb-16">
      {/* Hero Gallery - Mosaic Grid */}
      <section className="container mx-auto px-4 lg:px-8 mb-12">
        <div className="grid grid-cols-4 gap-3 h-[600px] mb-8">
          {mosaicLayout.map((item, idx) => (
            <motion.div
              key={idx}
              className={`relative rounded-lg overflow-hidden cursor-pointer group col-span-${item.colSpan} row-span-${item.rowSpan}`}
              style={{
                gridColumn: `${item.col + 1} / span ${item.colSpan}`,
                gridRow: `${item.row + 1} / span ${item.rowSpan}`,
              }}
              onClick={() => setSelectedImage(item.imageIndex)}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={property.images[item.imageIndex] || "/placeholder.svg"}
                alt={`Property image ${item.imageIndex + 1}`}
                fill
                className="object-cover group-hover:brightness-75 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Key Specs Bar */}
        <motion.div
          className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-lg p-6 flex flex-wrap gap-8 justify-between items-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {specs.map((spec, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground font-medium tracking-wide">{spec.label}</span>
              <span className={`${spec.label === 'Price' ? 'text-2xl font-serif font-bold text-primary' : 'text-lg font-semibold text-foreground'}`}>
                {spec.value}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* The Strategy Section */}
          <motion.section
            className="bg-card border border-border rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-3xl font-serif font-bold text-primary mb-6 tracking-tighter">The Strategy</h2>
            <p className="text-lg text-foreground/90 leading-relaxed font-light">{property.strategy}</p>
          </motion.section>

          {/* Accordion Sections - Floorplan & Video */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Floorplan Accordion */}
            <div className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedAccordion(expandedAccordion === 'floorplan' ? null : 'floorplan')}
                className="w-full flex items-center justify-between p-6 bg-card hover:bg-muted transition-colors"
              >
                <h3 className="text-xl font-serif font-bold text-primary tracking-tighter">Floorplan</h3>
                <motion.div
                  animate={{ rotate: expandedAccordion === 'floorplan' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-primary" />
                </motion.div>
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedAccordion === 'floorplan' ? 'auto' : 0,
                  opacity: expandedAccordion === 'floorplan' ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-muted/50 relative h-96">
                  <Image
                    src="/luxury-modern-home-with-pool-perth-hills-sunset.jpg"
                    alt="Property floorplan"
                    fill
                    className="object-cover rounded"
                  />
                </div>
              </motion.div>
            </div>

            {/* Video Accordion */}
            <div className="border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedAccordion(expandedAccordion === 'video' ? null : 'video')}
                className="w-full flex items-center justify-between p-6 bg-card hover:bg-muted transition-colors"
              >
                <h3 className="text-xl font-serif font-bold text-primary tracking-tighter">Virtual Tour</h3>
                <motion.div
                  animate={{ rotate: expandedAccordion === 'video' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="h-5 w-5 text-primary" />
                </motion.div>
              </button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedAccordion === 'video' ? 'auto' : 0,
                  opacity: expandedAccordion === 'video' ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="p-6 bg-muted/50">
                  <iframe
                    width="100%"
                    height="400"
                    src={property.videoUrl}
                    title="Property virtual tour"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Sticky Agent Card Sidebar */}
        <motion.div
          className="lg:sticky lg:top-28 h-fit"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border rounded-lg p-8 shadow-xl backdrop-blur-sm">
            {/* Agent Image */}
            <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
              <Image
                src="/professional-asian-man-40s-portrait.jpg"
                alt="Luke Nass"
                fill
                className="object-cover"
              />
            </div>

            {/* Agent Info */}
            <h3 className="text-2xl font-serif font-bold text-primary mb-2 tracking-tighter">Luke Nass</h3>
            <p className="text-sm text-muted-foreground mb-4 font-medium">Licensed Property Advisor</p>

            {/* Contact Button */}
            <a
              href="tel:0894952226"
              className="flex items-center gap-2 bg-primary text-primary-foreground w-full justify-center py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-4"
            >
              <Phone className="h-4 w-4" />
              08 9495 2226
            </a>

            {/* Book Inspection Button */}
            <Button
              onClick={() => setShowInspectionForm(!showInspectionForm)}
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold py-6"
              size="lg"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Inspection
            </Button>

            {/* Inspection Form */}
            {showInspectionForm && (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-6 space-y-4 pt-6 border-t border-border"
              >
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                  <input
                    type="text"
                    placeholder="Your name"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <input
                    type="tel"
                    placeholder="+61 (0) 4XX XXX XXX"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-semibold">
                  Request Inspection
                </Button>
              </motion.form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
