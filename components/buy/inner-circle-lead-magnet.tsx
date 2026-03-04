'use client'

import React from "react"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Crown, ArrowRight } from 'lucide-react'

export function InnerCircleLeadMagnet() {
  const [isOpen, setIsOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setIsOpen(false)
      setEmail('')
      setSubmitted(false)
    }, 2000)
  }

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
              Join <span className="font-semibold text-primary">The Inner Circle</span> for exclusive access to off-market
              properties and first-look previews before they hit the public market. Get notified about properties that match
              your exact criteria.
            </p>
            <Button
              onClick={() => setIsOpen(true)}
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold"
              size="lg"
            >
              Join The Inner Circle
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif text-2xl tracking-tighter">Join The Inner Circle</DialogTitle>
            <DialogDescription>Get exclusive access to off-market properties and first-look previews.</DialogDescription>
          </DialogHeader>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4 mt-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Email Address</label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-10"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 font-semibold h-10">
                Get Exclusive Access
              </Button>
            </form>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-8"
            >
              <Crown className="h-12 w-12 text-secondary mx-auto mb-4" />
              <p className="text-lg font-semibold text-foreground mb-2">Welcome to The Inner Circle!</p>
              <p className="text-foreground/60">Check your email for exclusive property previews.</p>
            </motion.div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
