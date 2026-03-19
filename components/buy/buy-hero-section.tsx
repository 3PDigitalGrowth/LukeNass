'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Phone } from 'lucide-react'
import Image from 'next/image'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

export function BuyHeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/team-hero-new.jpg"
          alt="Luke Nass Real Estate team in park setting"
          fill
          priority
          className="object-cover object-[42%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80 lg:bg-gradient-to-l lg:from-background/95 lg:via-background/80 lg:to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 pb-16 flex-1 flex flex-col justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-start">
          <div className="hidden lg:block lg:order-1" />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-xl lg:pt-10 lg:order-2 lg:justify-self-end"
          >
            <motion.div variants={itemVariants}>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground leading-tight text-balance mb-6 tracking-tighter">
                Your Perfect Home Awaits.
                <br />
                <span className="text-primary">With Local Guidance.</span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mb-6 text-pretty"
            >
              Find the right home in Perth&apos;s most sought-after suburbs with tailored buyer guidance, curated matches,
              and a strategy that keeps you confident at every step.
            </motion.p>

            {/* Key Benefits */}
            <motion.div variants={itemVariants} className="space-y-3 mb-10">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <span className="text-muted-foreground">Tailored property matches based on your goals</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <span className="text-muted-foreground">Clear guidance on value, timing, and negotiation</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <span className="text-muted-foreground">Strategy-first approach to your perfect purchase</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-foreground/30 h-12 px-8 font-medium gap-2 bg-transparent"
              >
                <a href="tel:0894952226">
                  <Phone className="h-4 w-4" />
                  Call Us
                </a>
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex flex-wrap gap-8 text-sm text-muted-foreground"
            >
              <div>
                <div className="font-semibold text-primary text-lg mb-1">500+</div>
                <div>Happy Buyers</div>
              </div>
              <div>
                <div className="font-semibold text-primary text-lg mb-1">65+</div>
                <div>Years Combined</div>
              </div>
              <div>
                <div className="font-semibold text-primary text-lg mb-1">Local Insight</div>
                <div>Guidance Across The Corridor</div>
              </div>
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  )
}
