'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function SoldHeroSection() {
  return (
    <section className="relative w-full h-[500px] lg:h-[600px] overflow-hidden rounded-2xl mb-8">
      {/* Hero Image with Dark Overlay */}
      <div className="relative w-full h-full">
        <Image
          src="/property-42-hilltop-hero.jpg"
          alt="42 Hilltop Drive, Roleystone - Sold"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* SOLD Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="absolute top-6 right-6 px-6 py-3 bg-primary rounded-full shadow-lg"
      >
        <span className="text-secondary-foreground font-serif font-bold text-xl">SOLD</span>
      </motion.div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white mb-2 tracking-tighter">
            Sold in Roleystone.
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            42 Hilltop Drive
          </p>

          {/* Results Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="inline-block bg-white/95 backdrop-blur-sm rounded-xl p-6 shadow-xl"
          >
            <div className="flex items-center gap-8">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Sold Price</p>
                <p className="font-serif text-3xl font-bold text-primary">$1,185,000</p>
              </div>
              <div className="w-px h-12 bg-border/30" />
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">Time to Sell</p>
                <p className="font-serif text-3xl font-bold text-primary">9 Days</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
