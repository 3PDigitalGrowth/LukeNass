'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

export function WhyChooseUs() {
  const reasons = [
    {
      icon: '✅',
      title: 'Boutique Service, Serious Capability',
      description: 'Boutique agency with structured sales execution and high-touch service.'
    },
    {
      icon: '✅',
      title: 'Marketing That Goes Further',
      description: 'Unique exposure strategies designed to attract buyers properly.'
    },
    {
      icon: '✅',
      title: 'Integrity Backed by Luke Personally',
      description: 'I personally guarantee it!!'
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
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tighter">
            Why Choose Us
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Local Perth Hills experience since 1987
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-3 gap-8"
        >
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="p-8 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all"
            >
              <span className="text-4xl mb-4 block">{reason.icon}</span>
              <h3 className="font-serif text-xl font-bold text-foreground mb-3 tracking-tight">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
