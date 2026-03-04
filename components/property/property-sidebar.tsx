'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Download, ExternalLink } from 'lucide-react'

export function PropertySidebar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="sticky top-20 space-y-6"
    >
      {/* Agent Card */}
      <div className="p-6 rounded-lg bg-card border border-border shadow-lg">
        <div className="text-center mb-6">
          <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden mb-4">
            <Image
              src="/luke-nass-portrait.png"
              alt="Luke Nass"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground">Luke Nass</h3>
          <p className="text-sm text-muted-foreground">Licensee & Principal</p>
        </div>

        {/* Contact Actions */}
        <div className="space-y-3 mb-6">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold">
            Book Inspection
          </Button>
          <Button variant="outline" className="w-full border-2 border-primary text-primary hover:bg-primary/5 bg-transparent">
            Make an Offer
          </Button>
        </div>

        {/* Contact Info */}
        <div className="pt-6 border-t border-border text-sm space-y-2">
          <p className="text-foreground">
            <span className="font-semibold">Phone:</span> <a href="tel:0894952226" className="text-primary hover:underline">08 9495 2226</a>
          </p>
          <p className="text-foreground">
            <span className="font-semibold">Email:</span> <a href="mailto:luke@lukenass.com.au" className="text-primary hover:underline">luke@lukenass.com.au</a>
          </p>
        </div>
      </div>

      {/* Portal Links */}
      <div className="p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-sm font-semibold text-foreground mb-3">View on Portals</p>
        <div className="flex gap-3">
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 rounded bg-card border border-border text-center text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            REA
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 px-3 py-2 rounded bg-card border border-border text-center text-xs font-medium text-foreground hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            Domain
          </a>
        </div>
      </div>

      {/* Download */}
      <Button
        variant="outline"
        className="w-full border-2 border-primary text-primary hover:bg-primary/5 gap-2 bg-transparent"
      >
        <Download className="w-4 h-4" />
        Download Brochure
      </Button>
    </motion.div>
  )
}
