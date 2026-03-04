'use client'

import { motion } from 'framer-motion'
import { TrendingUp, Home, Clock } from 'lucide-react'

export function NumbersThatMatter() {
  const stats = [
    {
      icon: Home,
      number: '500+',
      label: 'Homes Sold',
      subtext: 'in the last 12 months'
    },
    {
      icon: Clock,
      number: '18',
      label: 'Average Days',
      subtext: 'on market'
    },
    {
      icon: TrendingUp,
      number: '94%',
      label: 'Sold Above',
      subtext: 'asking price'
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
            Numbers That Matter
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Proven results backed by real data
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={idx}
                variants={item}
                className="p-8 rounded-xl bg-card border border-border/50 shadow-lg text-center hover:shadow-xl transition-all"
              >
                <div className="mb-4 inline-flex p-3 rounded-full bg-primary/20">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-serif text-5xl font-bold text-secondary mb-2">{stat.number}</h3>
                <p className="text-lg font-bold text-foreground mb-1">{stat.label}</p>
                <p className="text-sm text-muted-foreground">{stat.subtext}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
