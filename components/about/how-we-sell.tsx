'use client'

import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

export function HowWeSell() {
  const steps = [
    {
      number: '1',
      title: 'Strategic Pricing',
      description: 'Analyze market data to position your property competitively from day one.',
      isHighlight: false
    },
    {
      number: '2',
      title: 'Market Prep',
      description: 'Strategic presentation advice on staging, repairs, and first impressions.',
      isHighlight: false
    },
    {
      number: '3',
      title: 'Qualified Buyer Outreach',
      description: 'Introduce the property to qualified buyers already in our database and gather early feedback.',
      isHighlight: true,
      badge: 'Our Unique Edge'
    },
    {
      number: '4',
      title: 'Public Market Launch',
      description: 'Digital campaigns, portals, and maximum exposure once pricing and messaging are fully refined.',
      isHighlight: false
    },
    {
      number: '5',
      title: 'Negotiation & Sold',
      description: 'Strategic negotiation to secure the best offer. Settlement support all the way through.',
      isHighlight: false
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tighter">
            How We Sell
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A 5-step process designed to maximize your property's exposure and results
          </p>
        </motion.div>

        {/* Horizontal Timeline */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary hidden lg:block" />

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className={`flex flex-col items-center text-center ${
                  step.isHighlight ? 'lg:scale-105' : ''
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 font-serif text-2xl font-bold tracking-tight transition-all ${
                    step.isHighlight
                      ? 'bg-secondary text-foreground shadow-2xl border-2 border-primary'
                      : 'bg-card border-2 border-primary text-primary'
                  }`}
                >
                  {step.number}
                </div>

                {/* Badge for highlight step */}
                {step.badge && (
                  <div className="mb-4 px-3 py-1 rounded-full bg-primary/20 border border-primary/50">
                    <p className="text-xs font-bold text-primary uppercase">{step.badge}</p>
                  </div>
                )}

                {/* Step Title */}
                <h3 className={`font-serif font-bold mb-3 tracking-tight ${
                  step.isHighlight
                    ? 'text-lg text-foreground'
                    : 'text-base text-foreground'
                }`}>
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className={`text-sm leading-relaxed ${
                  step.isHighlight
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                }`}>
                  {step.description}
                </p>

                {/* Highlight Icon */}
                {step.isHighlight && (
                  <div className="mt-4 inline-flex p-2 rounded-full bg-secondary/20">
                    <Star className="w-4 h-4 text-secondary fill-secondary" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Mobile Timeline Connector */}
          <div className="absolute left-12 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary lg:hidden" />
        </motion.div>

        {/* Bottom CTA Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-6 rounded-xl bg-secondary/5 border border-secondary/20 text-center"
        >
          <p className="text-sm text-muted-foreground leading-relaxed">
            <span className="font-semibold text-foreground">Our difference:</span> We use early buyer feedback to refine pricing,
            positioning, and campaign messaging before scaling your property to the full market.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
