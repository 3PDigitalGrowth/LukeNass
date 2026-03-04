'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

export function SellHeroSection() {
  return (
    <section className="relative min-h-[600px] bg-gradient-to-br from-primary/5 via-background to-secondary/5 overflow-hidden pt-32 pb-20">
      {/* Background blur elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <motion.h1
              className="text-5xl lg:text-6xl font-serif tracking-tighter leading-tight mb-6 text-foreground"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Know Your Home's True{' '}
              <span className="text-primary">2026 Value</span>
            </motion.h1>

            <motion.p
              className="text-lg text-foreground/70 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Don't settle for generic estimates. Our data-driven appraisal tool reveals your property's real market position in Perth's evolving landscape. From Roleystone's luxury estates to Kelmscott's family homes, we calculate value with precision.
            </motion.p>

            <motion.div
              className="flex gap-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <button className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-2xl">
                Get Started
              </button>
              <button className="px-8 py-3 bg-border text-foreground rounded-lg font-medium hover:bg-border/80 transition-all duration-300">
                Learn More
              </button>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative h-96 lg:h-full rounded-2xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/sell-hero-agent.jpg"
              alt="Real estate agent with property for sale"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
