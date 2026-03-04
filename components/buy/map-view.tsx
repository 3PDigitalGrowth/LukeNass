'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

interface MapViewProps {
  listings: any[]
}

export function MapView({ listings }: MapViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      {/* Placeholder for map view */}
      <div className="rounded-lg border-2 border-dashed border-border bg-muted/30 p-16 text-center">
        <AlertCircle className="h-12 w-12 text-foreground/40 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-foreground/60 mb-2">Map View Coming Soon</h3>
        <p className="text-foreground/50 mb-4">
          {listings.length} properties available in your search
        </p>
        <p className="text-sm text-foreground/40">
          We're integrating an interactive map to show properties in your area. Google Maps integration will be added soon.
        </p>
      </div>
    </motion.div>
  )
}
