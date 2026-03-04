'use client'

import { motion } from 'framer-motion'
import { DollarSign, FileText, Eye, FileCheck } from 'lucide-react'

export function SoldNumbersBar() {
  const stats = [
    { icon: DollarSign, label: 'Sale Price', value: '$1.185M' },
    { icon: FileText, label: 'Method', value: 'Private Treaty' },
    { icon: Eye, label: 'Online Views', value: '2,400+' },
    { icon: FileCheck, label: 'Written Offers', value: '5' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16 p-6 lg:p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/10"
    >
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <div key={idx} className="flex flex-col items-center lg:items-start text-center lg:text-left">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium text-muted-foreground hidden lg:inline">{stat.label}</span>
            </div>
            <p className="font-serif text-xl lg:text-2xl font-bold text-foreground">{stat.value}</p>
            <span className="text-xs font-medium text-muted-foreground lg:hidden">{stat.label}</span>
          </div>
        )
      })}
    </motion.div>
  )
}
