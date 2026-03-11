'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Phone, MessageCircle } from 'lucide-react'

export function AboutHero() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/sell-hero-agent.jpg"
          alt="Luke Nass Real Estate"
          fill
          priority
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/40" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl"
        >
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4 tracking-tighter">
            Strategy Over Luck.<br />Established 1987.
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Since 1987, we have been the definition of boutique real estate in Roleystone, Kelmscott, and the Perth Hills.
          </p>

          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 mb-10 py-6 border-y border-border/30">
            <div>
              <p className="text-3xl font-serif font-bold text-secondary mb-1">1987</p>
              <p className="text-sm text-muted-foreground">Established</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-secondary mb-1">98%</p>
              <p className="text-sm text-muted-foreground">List-to-Sell Ratio</p>
            </div>
            <div>
              <p className="text-3xl font-serif font-bold text-secondary mb-1">REIWA</p>
              <p className="text-sm text-muted-foreground">Award Winners</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6 px-8 text-lg">
              Book a Property Appraisal
            </Button>
            <Button variant="outline" className="border-2 border-secondary text-secondary hover:bg-secondary/10 font-bold py-6 px-8 text-lg flex items-center gap-2 bg-transparent">
              <Phone className="w-5 h-5" />
              Talk to Luke Now
            </Button>
          </div>

          {/* Micro Trust Line */}
          <div className="flex flex-col sm:flex-row gap-4 text-sm text-muted-foreground">
            <span>📍 Unit 1/8 Rundle St, Kelmscott WA 6111</span>
            <span>📞 08 9495 2226</span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
