'use client'

import { motion } from 'framer-motion'
import { AppraisalCalculator } from './appraisal-calculator'

export function SellHeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden pt-32 pb-20">
      {/* Background blur elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,1.1fr)] gap-12 items-start">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:pt-10"
          >
            <motion.h1
              className="text-5xl lg:text-6xl font-serif tracking-tighter leading-tight mb-6 text-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Know Your Home's True{' '}
              <span className="text-primary">2026 Value</span>
            </motion.h1>

            <motion.p
              className="text-lg text-foreground/70 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Don&apos;t settle for generic estimates. Our appraisal process helps uncover your property&apos;s true position across
              Perth&apos;s southeast corridor, from affordable family homes and investment properties through to lifestyle
              acreage, prestige residences, and standout waterfront opportunities.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#sell-appraisal-form"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-2xl"
              >
                Get Started
              </a>
              <a
                href="tel:0894952226"
                className="px-8 py-3 bg-border text-foreground rounded-lg font-medium hover:bg-border/80 transition-all duration-300"
              >
                Talk to Luke or Andy
              </a>
            </motion.div>
          </motion.div>

          {/* Right: Embedded appraisal form */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <AppraisalCalculator embedded />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
