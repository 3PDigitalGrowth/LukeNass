'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Phone, ExternalLink } from 'lucide-react'

export function SoldSidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="sticky top-24 space-y-6"
    >
      {/* Agent Card */}
      <div className="rounded-2xl bg-card border-2 border-primary/20 shadow-lg p-6 text-center">
        <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-2 border-primary">
          <Image
            src="/luke-nass-portrait.png"
            alt="Luke Nass"
            fill
            className="object-cover"
          />
        </div>
        <h3 className="font-serif text-xl font-bold text-foreground mb-2 tracking-tight">Luke Nass</h3>
        <p className="text-sm text-muted-foreground mb-6">Licensee & Principal</p>

        <div className="space-y-3 mb-6 pb-6 border-b border-border/50">
          <a
            href="tel:0894952226"
            className="flex items-center justify-center gap-2 text-primary hover:text-primary/80 font-medium transition-colors"
          >
            <Phone className="w-4 h-4" />
            08 9495 2226
          </a>
          <a
            href="mailto:luke@lukenass.com.au"
            className="text-sm text-primary hover:text-primary/80 transition-colors block"
          >
            luke@lukenass.com.au
          </a>
        </div>

        <div className="space-y-3">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium">
            Get Your Price Update
          </Button>
          <Button
            variant="outline"
            className="w-full bg-transparent border border-primary/30 text-primary hover:bg-primary/5"
          >
            <Phone className="w-4 h-4 mr-2" />
            Discuss This Sale
          </Button>
        </div>
      </div>

      {/* Verification */}
      <div className="p-6 rounded-xl bg-muted/30 border border-border/50">
        <p className="text-xs font-semibold text-foreground mb-3">View history on:</p>
        <div className="space-y-2">
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Realestate.com.au
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Domain.com.au
          </a>
        </div>
      </div>
    </motion.div>
  )
}
