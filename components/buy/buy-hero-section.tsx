'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ArrowRight, Phone, Mail } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

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
  const [showContactForm, setShowContactForm] = useState(false)

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
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/80 lg:bg-gradient-to-r lg:from-background/95 lg:via-background/80 lg:to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 pb-16 flex-1 flex flex-col justify-center">
        <div className="flex flex-col lg:flex-row gap-8 items-center">
          <div className="flex-1" />
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 max-w-xl"
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
                onClick={() => setShowContactForm(true)}
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 font-medium gap-2"
              >
                Start Your Buyer Plan
                <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-foreground/30 h-12 px-8 font-medium gap-2 bg-transparent"
              >
                <Phone className="h-4 w-4" />
                Call Luke
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
                <div className="font-semibold text-primary text-lg mb-1">$1.2B+</div>
                <div>Total Sales Value</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Contact Form Overlay */}
        {showContactForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowContactForm(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-serif font-semibold text-foreground mb-2 tracking-tighter">
                Start Your Buyer Plan
              </h2>
              <p className="text-muted-foreground mb-6">
                Tell us what you&apos;re looking for and we&apos;ll help you build a clear path to the right home.
              </p>

              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                  <Input
                    type="text"
                    placeholder="Your full name"
                    className="h-10 bg-background/50 border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                  <Input
                    type="email"
                    placeholder="your@email.com"
                    className="h-10 bg-background/50 border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                  <Input
                    type="tel"
                    placeholder="(02) 9999 9999"
                    className="h-10 bg-background/50 border-border/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">What are you looking for?</label>
                  <textarea
                    placeholder="e.g., 4-bed home in Roleystone, $1.2M budget..."
                    className="w-full h-24 p-3 bg-background/50 border border-border/50 rounded-lg text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-none"
                  />
                </div>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 font-medium">
                  Request Buyer Guidance
                </Button>
              </form>

              <button
                onClick={() => setShowContactForm(false)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
