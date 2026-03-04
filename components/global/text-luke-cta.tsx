'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { MessageCircle } from 'lucide-react'

export function TextLukeCTA() {
  const handleTextClick = () => {
    // Opens SMS client on mobile, can be replaced with SMS API integration
    window.open('sms:+61XXXXXXXXX?body=Hi%20Luke%2C%20I%27m%20interested%20in%20discussing%20properties%20in%20the%20Perth%20SE%20Corridor')
  }

  return (
    <motion.button
      onClick={handleTextClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="fixed bottom-24 md:bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-full shadow-lg hover:shadow-xl transition-shadow font-bold text-sm"
    >
      <MessageCircle className="w-4 h-4" />
      Text Luke
    </motion.button>
  )
}
