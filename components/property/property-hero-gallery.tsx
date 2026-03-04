'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ImageIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PropertyHeroGallery() {
  const [showGallery, setShowGallery] = useState(false)

  const images = [
    '/property-42-hero-large.jpg',
    '/property-42-interior-1.jpg',
    '/property-42-kitchen.jpg',
    '/property-42-bedroom.jpg',
    '/property-42-pool.jpg'
  ]

  return (
    <div className="relative w-full h-96 md:h-[600px] bg-muted rounded-lg overflow-hidden">
      <div className="grid grid-cols-4 grid-rows-2 gap-2 h-full">
        {/* Large hero image (top left, spans 2 rows) */}
        <div className="col-span-2 row-span-2 relative">
          <Image
            src={images[0] || "/placeholder.svg"}
            alt="42 Mountain View Drive Hero"
            fill
            className="object-cover"
          />
        </div>

        {/* 4 smaller images */}
        {images.slice(1).map((img, idx) => (
          <div key={idx} className="relative col-span-1 row-span-1">
            <Image src={img || "/placeholder.svg"} alt={`Property image ${idx + 2}`} fill className="object-cover" />
          </div>
        ))}
      </div>

      {/* Status Badge - Top Left */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-4 z-20"
      >
        <div className="px-4 py-2 rounded-full bg-primary text-primary-foreground font-bold text-sm">
          New Listing
        </div>
      </motion.div>

      {/* View Gallery Button - Bottom Right */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute bottom-4 right-4 z-20"
      >
        <Button
          onClick={() => setShowGallery(true)}
          className="bg-primary text-primary-foreground hover:bg-primary/90 gap-2"
        >
          <ImageIcon className="w-4 h-4" />
          View Gallery
        </Button>
      </motion.div>
    </div>
  )
}
