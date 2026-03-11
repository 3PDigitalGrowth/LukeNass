'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useState } from 'react'

export function SimilarResultsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const similarProperties = [
    {
      address: '28 Oakmont Crescent',
      suburb: 'Roleystone',
      soldPrice: '$1.32M',
      daysOnMarket: '12 days',
      image: '/property-42-hero-large.jpg'
    },
    {
      address: '15 Valley Ridge Road',
      suburb: 'Roleystone',
      soldPrice: '$1.05M',
      daysOnMarket: '9 days',
      image: '/property-42-interior-1.jpg'
    },
    {
      address: '42 Scenic Drive',
      suburb: 'Kelmscott',
      soldPrice: '$895K',
      daysOnMarket: '14 days',
      image: '/property-42-kitchen.jpg'
    }
  ]

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % similarProperties.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + similarProperties.length) % similarProperties.length)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="py-16 border-t border-border/50 mt-16"
    >
      <div className="mb-8">
        <h2 className="font-serif text-4xl font-bold text-foreground mb-2 tracking-tight">
          More Results in Roleystone
        </h2>
        <p className="text-lg text-muted-foreground">
          Other successful sales from our portfolio
        </p>
      </div>

      <div className="relative">
        {/* Slider */}
        <div className="overflow-hidden">
          <div className="flex gap-6">
            {similarProperties.map((property, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: currentIndex === idx ? 1 : 0.4 }}
                transition={{ duration: 0.5 }}
                className={`flex-shrink-0 w-full md:w-1/3 ${
                  currentIndex === idx ? 'opacity-100' : 'opacity-40'
                }`}
              >
                <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  <div className="relative h-64 mb-4">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.address}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 bg-card">
                    <h3 className="font-serif text-xl font-bold text-foreground mb-1 tracking-tight">
                      {property.address}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{property.suburb}</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Sold Price</p>
                        <p className="font-serif text-2xl font-bold text-primary">{property.soldPrice}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground mb-1">Days on Market</p>
                        <p className="font-serif text-lg font-bold text-secondary">{property.daysOnMarket}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 bg-primary/10 hover:bg-primary/20 rounded-full p-3 transition-all"
          aria-label="Previous"
        >
          <ChevronLeft className="w-6 h-6 text-primary" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 bg-primary/10 hover:bg-primary/20 rounded-full p-3 transition-all"
          aria-label="Next"
        >
          <ChevronRight className="w-6 h-6 text-primary" />
        </button>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {similarProperties.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === idx ? 'bg-primary w-8' : 'bg-primary/30 hover:bg-primary/50'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </motion.section>
  )
}
