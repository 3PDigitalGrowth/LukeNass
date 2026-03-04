'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Calendar } from 'lucide-react'

export function MobileBookAppraisal() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      {/* Mobile Sticky Button */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-0 left-0 right-0 md:hidden z-40 p-3 bg-card border-t border-border/30 shadow-lg"
      >
        <Button
          onClick={() => setShowForm(true)}
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-12 rounded-lg flex items-center justify-center gap-2"
        >
          <Calendar className="w-4 h-4" />
          Book Appraisal
        </Button>
      </motion.div>

      {/* Booking Form Modal */}
      {showForm && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 z-50 flex items-end md:items-center justify-center p-4"
          onClick={() => setShowForm(false)}
        >
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            className="bg-card rounded-2xl md:rounded-2xl shadow-2xl p-6 max-w-md w-full md:max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-foreground tracking-tighter">
                Book Your Appraisal
              </h2>
              <button
                onClick={() => setShowForm(false)}
                className="text-muted-foreground hover:text-foreground text-2xl"
              >
                ✕
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Property Address</label>
                <input
                  type="text"
                  placeholder="123 Main Street, Roleystone"
                  className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                <input
                  type="tel"
                  placeholder="(02) 9999 9999"
                  className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                />
              </div>

              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold h-10">
                Request Appraisal
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}
