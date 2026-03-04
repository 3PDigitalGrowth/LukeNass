'use client'

import { motion } from 'framer-motion'
import { Star, TrendingUp, Lock } from 'lucide-react'

const wins = [
  {
    icon: Lock,
    title: 'Off-Market Secured',
    description: 'Purchased $1.2M property before market listing',
    suburb: 'Roleystone',
    buyer: 'The Matthews Family',
    result: 'Saved $85K through off-market access',
  },
  {
    icon: TrendingUp,
    title: 'Negotiated Terms',
    description: 'Seller flexibility on settlement terms',
    suburb: 'Kelmscott',
    buyer: 'David & Sarah Chen',
    result: '3-month settlement delay arranged',
  },
  {
    icon: Star,
    title: 'Investment Opportunity',
    description: 'Found reno project at below-market price',
    suburb: 'Armadale',
    buyer: 'Michael Torres',
    result: '$250K value-add identified',
  },
  {
    icon: Lock,
    title: 'First Look Access',
    description: 'Exclusive preview of Inner Circle listing',
    suburb: 'Bedfordale',
    buyer: 'The Johnsons',
    result: 'Won auction with zero competition',
  },
]

export function BuyerWinsCarousel() {
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
    hidden: { opacity: 0, scale: 0.95 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4 tracking-tighter">
            Recent Buyer Wins
          </h2>
          <p className="text-lg text-muted-foreground">
            Real buyers, real results - see how we've helped Perth families unlock their ideal homes
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {wins.map((win, idx) => {
            const Icon = win.icon
            return (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="p-6 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="mb-4 inline-flex p-3 rounded-lg bg-primary/20">
                  <Icon className="w-6 h-6 text-primary" />
                </div>

                <h3 className="font-serif font-bold text-foreground mb-2 tracking-tight">{win.title}</h3>

                <p className="text-sm text-muted-foreground mb-4">{win.description}</p>

                <div className="space-y-2 mb-4 pt-4 border-t border-border/30">
                  <p className="text-xs font-semibold text-foreground/60 uppercase">{win.suburb}</p>
                  <p className="text-sm font-semibold text-foreground">{win.buyer}</p>
                  <p className="text-sm text-secondary font-bold">{win.result}</p>
                </div>

                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                  ))}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
