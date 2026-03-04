'use client'

import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'

export function FinalCTA() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tighter">
            Talk to the Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you're buying, selling, or investing, we're here to guide you
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="p-8 rounded-xl bg-background border border-border/50 text-center hover:shadow-lg transition-all"
          >
            <div className="mb-4 inline-flex p-3 rounded-full bg-primary/20">
              <CheckCircle2 className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4 tracking-tight">
              Selling Your Property?
            </h3>
            <p className="text-muted-foreground mb-6">
              Get a comprehensive appraisal and marketing campaign plan tailored to your home.
            </p>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-6">
              Get Your Appraisal
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="p-8 rounded-xl bg-background border border-border/50 text-center hover:shadow-lg transition-all"
          >
            <div className="mb-4 inline-flex p-3 rounded-full bg-secondary/20">
              <CheckCircle2 className="w-8 h-8 text-secondary" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-4 tracking-tight">
              Looking to Buy?
            </h3>
            <p className="text-muted-foreground mb-6">
              Get matched to upcoming homes that fit your criteria before they hit the market.
            </p>
            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold py-6">
              Get Matched to Homes
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
