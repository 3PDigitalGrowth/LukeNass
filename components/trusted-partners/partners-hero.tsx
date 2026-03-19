'use client'

import { motion } from 'framer-motion'
import { AlertCircle } from 'lucide-react'

export function PartnersHero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <section className="relative pt-32 pb-16 px-4 overflow-hidden">
      {/* Subtle architectural pattern background */}
      <div className="absolute inset-0 z-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tighter"
          >
            The Local Directory
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12"
          >
            Backed by local experience dating to 1987, we have vetted the best local trades and services in the Perth Hills.
            Here are the people we trust with our own homes.
          </motion.p>

          {/* Transparency Note */}
          <motion.div
            variants={itemVariants}
            className="p-4 rounded-lg bg-muted/50 border border-border/50 inline-flex items-start gap-3 max-w-2xl mx-auto"
          >
            <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="font-medium text-foreground">Transparency Note:</span> These professionals are listed for your convenience. While we trust them, we recommend doing your own due diligence.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
