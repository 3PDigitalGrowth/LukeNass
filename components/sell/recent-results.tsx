'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Home } from 'lucide-react'

interface CaseStudy {
  id: number
  address: string
  suburb: string
  initialEstimate: number
  finalSale: number
  daysOnMarket: number
  highlight: string
}

export function RecentResults() {
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      address: '42 Hilltop Drive',
      suburb: 'Roleystone',
      initialEstimate: 950000,
      finalSale: 1080000,
      daysOnMarket: 18,
      highlight: 'Street Record Broken',
    },
    {
      id: 2,
      address: '17 Oak Street',
      suburb: 'Kelmscott',
      initialEstimate: 680000,
      finalSale: 785000,
      daysOnMarket: 22,
      highlight: 'Off-Market Preview Strategy',
    },
    {
      id: 3,
      address: '89 Forest Lane',
      suburb: 'Bedfordale',
      initialEstimate: 1200000,
      finalSale: 1350000,
      daysOnMarket: 25,
      highlight: 'Multi-Offer Negotiation',
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 bg-gradient-to-br from-muted/30 to-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif tracking-tighter mb-4 text-foreground">
            Recent Results in Your Area
          </h2>
          <p className="text-lg text-foreground/60">
            Real sellers. Real results. Real strategy at work.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {caseStudies.map((study) => {
            const gain = study.finalSale - study.initialEstimate
            const gainPercent = ((gain / study.initialEstimate) * 100).toFixed(1)

            return (
              <motion.div
                key={study.id}
                variants={item}
                className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-primary/50"
              >
                {/* Header with Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Home className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-serif font-semibold text-foreground">
                        {study.address}
                      </h3>
                      <p className="text-sm text-foreground/60">{study.suburb}</p>
                    </div>
                  </div>
                </div>

                {/* Highlight Badge */}
                <div className="inline-block px-3 py-1 bg-secondary/20 text-secondary rounded-full text-xs font-medium mb-6">
                  {study.highlight}
                </div>

                {/* Stats */}
                <div className="space-y-4 mb-6 pb-6 border-b border-border/50">
                  <div>
                    <p className="text-sm text-foreground/60 mb-1">
                      Initial Appraisal
                    </p>
                    <p className="text-lg font-semibold text-foreground">
                      ${study.initialEstimate.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-foreground/60 mb-1">Final Sale</p>
                    <p className="text-2xl font-serif font-semibold text-primary">
                      ${study.finalSale.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Footer Stats */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4 text-primary" />
                    <span className="font-semibold text-primary">
                      +{gainPercent}%
                    </span>
                  </div>
                  <span className="text-sm text-foreground/60">
                    {study.daysOnMarket} days
                  </span>
                </div>

                {/* Gain Amount */}
                <p className="text-center text-sm text-foreground/70 mt-4 pt-4 border-t border-border/50">
                  Additional ${gain.toLocaleString()} realized
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
