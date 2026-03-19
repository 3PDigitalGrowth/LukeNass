'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useLeadModal } from '@/components/global/lead-capture-provider'
import { Crown, ArrowRight } from 'lucide-react'

export function InnerCircleLeadMagnet() {
  const { openLeadModal } = useLeadModal()

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: '-100px' }}
        className="mt-16 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 p-8 md:p-12"
      >
        <div className="flex items-start gap-6">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="flex-shrink-0"
          >
            <Crown className="h-10 w-10 text-secondary" />
          </motion.div>
          <div className="flex-1">
            <h3 className="text-2xl md:text-3xl font-serif font-semibold text-foreground tracking-tighter mb-2">
              Don't see what you want?
            </h3>
            <p className="text-foreground/70 mb-6 max-w-2xl">
              Join our <span className="font-semibold text-primary">buyer update list</span> to receive relevant listings,
              open home alerts, and property matches tailored to your exact criteria.
            </p>
            <Button
              onClick={() =>
                openLeadModal({
                  type: 'buyer-updates',
                  source: 'Inner Circle Lead Magnet',
                })
              }
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
              size="lg"
            >
              Get Buyer Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

    </>
  )
}
