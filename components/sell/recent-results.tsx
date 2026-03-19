'use client'

import { motion } from 'framer-motion'
import { Home } from 'lucide-react'

interface CaseStudy {
  id: number
  suburb: string
  propertyType: string
  strategy: string
  communication: string
  outcome: string
}

export function RecentResults() {
  const caseStudies: CaseStudy[] = [
    {
      id: 1,
      suburb: 'Roleystone',
      propertyType: 'Lifestyle and family homes',
      strategy: 'Position homes around lifestyle value, presentation detail, and buyer confidence.',
      communication: 'Keep sellers updated closely as feedback, inspections, and negotiations evolve.',
      outcome: 'Campaigns built to create competitive interest and overachieve expectations.',
    },
    {
      id: 2,
      suburb: 'Kelmscott',
      propertyType: 'Family homes and value-driven opportunities',
      strategy: 'Shape the launch to highlight practicality, liveability, and the strongest buyer segments.',
      communication: 'Provide clear, plain-English guidance so sellers can make confident decisions quickly.',
      outcome: 'Well-managed campaigns that feel smooth, supported, and strategically executed.',
    },
    {
      id: 3,
      suburb: 'Bedfordale',
      propertyType: 'Prestige, acreage, and premium lifestyle properties',
      strategy: 'Tailor every campaign to the property rather than relying on a generic formula.',
      communication: 'Support sellers with thoughtful updates and disciplined recommendations from launch to close.',
      outcome: 'Buyers are positioned carefully so strong offers can be negotiated with confidence.',
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
            Strategy Across the Corridor
          </h2>
          <p className="text-lg text-foreground/60">
            Different homes need different positioning. Our approach adapts to the suburb, the buyer pool, and the seller&apos;s goals.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {caseStudies.map((study) => (
            <motion.div
              key={study.id}
              variants={item}
              className="bg-card rounded-2xl p-8 border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-primary/50"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Home className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-serif font-semibold text-foreground">{study.suburb}</h3>
                    <p className="text-sm text-foreground/60">{study.propertyType}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="rounded-xl border border-border/50 bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium mb-2">Strategy</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">{study.strategy}</p>
                </div>

                <div className="rounded-xl border border-border/50 bg-background/70 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground font-medium mb-2">Communication</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">{study.communication}</p>
                </div>

                <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-primary font-medium mb-2">Outcome</p>
                  <p className="text-sm text-foreground/75 leading-relaxed">{study.outcome}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
