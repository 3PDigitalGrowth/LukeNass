'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function PropertyContent() {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)

  const features = [
    'Air Conditioning',
    'Pool',
    'Solar Panels',
    'Wine Cellar',
    'Home Theatre',
    'Gourmet Kitchen',
    'Dual Living',
    'Landscaped Gardens'
  ]

  return (
    <div className="space-y-8">
      {/* The Strategy Section */}
      <div className="p-6 rounded-lg bg-primary/5 border-2 border-primary/20">
        <h3 className="font-serif text-2xl font-bold text-foreground mb-3 tracking-tight">Why We Love This Home</h3>
        <p className="text-muted-foreground leading-relaxed">
          Perfect for upsizers looking for panoramic hills views without the maintenance of acreage. This thoughtfully designed residence combines modern luxury with functional living, ideal for families who want the serenity of the hills with easy access to amenities.
        </p>
      </div>

      {/* Description */}
      <div>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-4 tracking-tight">
          Stunning Modern Home with Panoramic Views
        </h2>
        <p className="text-foreground/80 leading-relaxed mb-4">
          Welcome to 42 Mountain View Drive, a spectacular contemporary home set high in the coveted Roleystone hills. This expertly designed residence captures breathtaking panoramic views across the Perth Hills landscape, offering a rare blend of natural beauty and sophisticated modern living.
        </p>
        <p className="text-foreground/80 leading-relaxed">
          Every room has been thoughtfully positioned to maximize the views and natural light. Premium finishes throughout, including imported European tiles, custom joinery, and top-tier appliances, create an environment of understated elegance. The sprawling floor plan ensures privacy and space for modern family living.
        </p>
      </div>

      {/* Features */}
      <div>
        <h3 className="font-serif text-2xl font-bold text-foreground mb-4 tracking-tight">Key Features</h3>
        <div className="grid grid-cols-2 gap-4">
          {features.map((feature, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-foreground font-medium">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Accordions */}
      <div className="space-y-3">
        {['Floorplan', 'Video Tour', 'Statement of Information'].map((title) => (
          <motion.div
            key={title}
            className="border border-border rounded-lg overflow-hidden"
          >
            <button
              onClick={() => setExpandedAccordion(expandedAccordion === title ? null : title)}
              className="w-full px-6 py-4 flex items-center justify-between bg-card hover:bg-muted/50 transition-colors"
            >
              <span className="font-semibold text-foreground">{title}</span>
              <ChevronDown
                className={`w-5 h-5 text-primary transition-transform ${
                  expandedAccordion === title ? 'rotate-180' : ''
                }`}
              />
            </button>
            {expandedAccordion === title && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="p-6 bg-muted/30 text-muted-foreground"
              >
                <p className="mb-4">{title} content would be displayed here</p>
                {title === 'Video Tour' && (
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-foreground/50">Video player placeholder</p>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Map */}
      <div>
        <h3 className="font-serif text-2xl font-bold text-foreground mb-4 tracking-tight">Location</h3>
        <div className="w-full h-80 bg-muted rounded-lg flex items-center justify-center border border-border">
          <p className="text-muted-foreground">Google Maps placeholder</p>
        </div>
      </div>
    </div>
  )
}
