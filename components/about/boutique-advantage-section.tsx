'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'

export function BoutiqueAdvantageSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  const comparisonPoints = [
    {
      category: 'Access',
      ours: 'Direct access to the Principal and Senior Agents',
      theirs: 'Passed off to juniors or assistants',
    },
    {
      category: 'Strategy',
      ours: 'Agile, custom campaigns that adapt to the market weekly',
      theirs: '"Set and forget" corporate templates',
    },
    {
      category: 'Motivation',
      ours: 'We sell to build our local legacy',
      theirs: 'Selling to hit a monthly corporate quota',
    },
  ]

  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tighter">
            The Boutique Advantage
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Why small, local expertise beats big corporate systems.
          </p>
        </motion.div>

        {/* Comparison Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid lg:grid-cols-3 gap-6"
        >
          {comparisonPoints.map((point, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="rounded-2xl overflow-hidden border-2 border-border/50 bg-card shadow-lg hover:shadow-xl transition-all"
            >
              {/* Category Header */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 px-6 py-4 border-b border-border/50">
                <h3 className="font-serif text-2xl font-bold text-foreground tracking-tight">{point.category}</h3>
              </div>

              {/* Content */}
              <div className="p-6 space-y-8">
                {/* Luke Nass Real Estate */}
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <h4 className="font-serif font-bold text-foreground">Luke Nass Real Estate</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-9">
                    {point.ours}
                  </p>
                </div>

                {/* Divider */}
                <div className="h-px bg-border/30" />

                {/* Standard Franchise Agencies */}
                <div>
                  <div className="flex items-start gap-3 mb-3">
                    <X className="w-6 h-6 text-destructive flex-shrink-0 mt-0.5" />
                    <h4 className="font-serif font-bold text-muted-foreground">Standard Franchise Agencies</h4>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed ml-9">
                    {point.theirs}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Closing Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-8 rounded-2xl bg-secondary/5 border border-secondary/20 text-center"
        >
          <p className="text-lg text-foreground font-serif italic">
            "Local expertise isn't just about knowing the market. It's about caring enough to fight for the best outcome every single time."
          </p>
          <p className="text-sm text-muted-foreground mt-4">— Luke Nass</p>
        </motion.div>
      </div>
    </section>
  )
}
