'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const steps = [
  {
    number: '01',
    title: 'Discovery Call',
    description: 'Understand your needs, timeframe, and strategy for finding your ideal property.',
    details: ['15-min consultation', 'Financial readiness check', 'Market insight briefing'],
  },
  {
    number: '02',
    title: 'Pre-Approval & Qualification',
    description: 'Connect with our finance partners to understand your purchasing power.',
    details: ['Broker introductions', 'Pre-approval documentation', 'Budget confirmation'],
  },
  {
    number: '03',
    title: 'Matching & Previews',
    description: 'Receive tailored listing matches and inspection options that align with your criteria.',
    details: ['Matched listings', 'Inspection planning', 'Strategy recommendations'],
  },
  {
    number: '04',
    title: 'Offer & Negotiation',
    description: 'We handle the negotiation to secure the best terms for your purchase.',
    details: ['Competitive analysis', 'Offer strategy', 'Vendor negotiation'],
  },
  {
    number: '05',
    title: 'Settlement & Handover',
    description: 'Smooth transition with conveyancer coordination and final preparations.',
    details: ['Conveyancer coordination', 'Inspection support', 'Final walkthrough'],
  },
]

export function BuyerJourney() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 bg-secondary/5 border-t border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4 tracking-tighter">
            Your Buyer Journey
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A streamlined 5-step process designed to get you into your ideal home with confidence and speed.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-16"
        >
          {steps.map((step, idx) => (
            <motion.div key={idx} variants={itemVariants} className="relative">
              {/* Connector Line */}
              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute top-20 -right-3 w-6 h-1 bg-gradient-to-r from-primary/40 to-secondary/40" />
              )}

              <div className="p-6 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all">
                <div className="mb-4 text-4xl font-serif font-bold text-secondary/40">{step.number}</div>
                <h3 className="text-lg font-serif font-bold text-foreground mb-2 tracking-tight">{step.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

                <ul className="space-y-2">
                  {step.details.map((detail, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Finance Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="p-8 rounded-xl bg-card border border-border/50 shadow-lg"
        >
          <h3 className="text-2xl font-serif font-bold text-foreground mb-6 tracking-tight">Finance & Legal Partners</h3>

          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-foreground mb-2">Mortgage Brokers</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Access to multiple lenders and competitive rates through our preferred broker network.
              </p>
              <button className="text-primary text-sm font-semibold hover:underline">
                Get broker introduction →
              </button>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Conveyancers</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Specialist property lawyers to handle your settlement and protect your interests.
              </p>
              <button className="text-primary text-sm font-semibold hover:underline">
                Connect with conveyancer →
              </button>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-2">Inspectors & Valuers</h4>
              <p className="text-muted-foreground text-sm mb-4">
                Professional building and pest inspections to ensure you're making an informed decision.
              </p>
              <button className="text-primary text-sm font-semibold hover:underline">
                Schedule inspection →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
