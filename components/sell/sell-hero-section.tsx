'use client'

import { motion } from 'framer-motion'
import { CheckCircle2 } from 'lucide-react'
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
              Sell with a strategy built to attract
              <span className="text-primary"> the best possible price.</span>
            </motion.h1>

            <motion.p
              className="text-lg text-foreground/70 mb-8 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              We help sellers across Perth&apos;s southeast corridor with tailored campaign planning, disciplined negotiation,
              and clear communication from appraisal through to settlement.
            </motion.p>

            <motion.div
              className="space-y-3 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              {[
                'Tailored strategy for the property, the market, and your goals',
                'Consistent communication so you know what is happening at every stage',
                'A boutique team focused on positioning your home to overachieve expectations',
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground/70">{point}</span>
                </div>
              ))}
            </motion.div>

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
                Request Confidential Appraisal
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
