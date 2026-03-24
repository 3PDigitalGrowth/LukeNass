'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useLeadModal } from '@/components/global/lead-capture-provider'
import { Calendar } from 'lucide-react'

export function MobileBookAppraisal() {
  const { openLeadModal } = useLeadModal()
  const [isFooterVisible, setIsFooterVisible] = useState(false)

  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting)
      },
      {
        threshold: 0.05,
      }
    )

    observer.observe(footer)

    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: isFooterVisible ? 120 : 0, opacity: isFooterVisible ? 0 : 1 }}
      transition={{ duration: 0.2 }}
      className="fixed bottom-0 left-0 right-0 md:hidden z-40 p-3 bg-card border-t border-border/30 shadow-lg"
    >
      <Button
        onClick={() =>
          openLeadModal({
            type: 'seller-appraisal',
            source: 'Mobile Sticky CTA',
          })
        }
        className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 rounded-lg flex items-center justify-center gap-2"
      >
        <Calendar className="w-4 h-4" />
        Book Appraisal
      </Button>
    </motion.div>
  )
}
