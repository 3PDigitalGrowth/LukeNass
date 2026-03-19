'use client'

import React from "react"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { CheckCircle2, MapPin, Clock, Home } from 'lucide-react'

interface BuyMatchingFormProps {
  embedded?: boolean
  showIntro?: boolean
}

export function BuyMatchingForm({ embedded = false, showIntro = true }: BuyMatchingFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    budget: [0, 1500000],
    suburbs: '',
    mustHaves: [] as string[],
    timeframe: 'flexible',
    finance: 'preapproved',
    email: '',
    phone: '',
  })

  const mustHaves = ['Pool', 'Modern', 'Land Size', 'Original Features', 'Reno Ready']

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormData({
        budget: [0, 1500000],
        suburbs: '',
        mustHaves: [],
        timeframe: 'flexible',
        finance: 'preapproved',
        email: '',
        phone: '',
      })
    }, 5000)
  }

  const toggleMustHave = (item: string) => {
    setFormData({
      ...formData,
      mustHaves: formData.mustHaves.includes(item)
        ? formData.mustHaves.filter((m) => m !== item)
        : [...formData.mustHaves, item],
    })
  }

  const formContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={embedded ? "w-full" : undefined}
    >
      <div className={embedded ? "w-full" : "max-w-4xl mx-auto"}>
        {!embedded && showIntro && (
          <div className="mb-8">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-2 tracking-tighter">
              Get Matched to Your Ideal Home
            </h2>
            <p className="text-lg text-muted-foreground">
              Tell us what you&apos;re looking for and we&apos;ll send suitable listings, inspections, and buyer guidance
            </p>
          </div>
        )}

        {submitted ? (
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-8 bg-card rounded-xl border border-primary/30 text-center"
          >
            <CheckCircle2 className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-2xl font-serif font-bold text-foreground mb-2 tracking-tight">
              Perfect! We&apos;ve Got You Matched
            </h3>
            <p className="text-muted-foreground mb-4">
              Check your email and SMS for matching properties. We&apos;ll send updates as new opportunities align with your criteria.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className={`bg-card rounded-xl border border-border/50 shadow-lg ${embedded ? 'p-6 lg:p-8' : 'p-8'}`}>
            {embedded && showIntro && (
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold text-foreground mb-2 tracking-tighter">
                  Get Matched to Your Ideal Home
                </h2>
                <p className="text-base text-muted-foreground">
                  Tell us what you&apos;re looking for and we&apos;ll send suitable listings, inspections, and buyer guidance
                </p>
              </div>
            )}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  {/* Budget Range */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Home className="w-4 h-4" /> Budget Range
                    </label>
                    <div className="space-y-2">
                      <input
                        type="range"
                        min="200000"
                        max="2000000"
                        value={formData.budget[1]}
                        onChange={(e) => setFormData({ ...formData, budget: [formData.budget[0], parseInt(e.target.value)] })}
                        className="w-full"
                      />
                      <p className="text-lg font-semibold text-primary">
                        ${(formData.budget[1] / 1000000).toFixed(1)}M
                      </p>
                    </div>
                  </div>

                  {/* Timeframe */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> When are you looking?
                    </label>
                    <select
                      value={formData.timeframe}
                      onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="flexible">Flexible</option>
                      <option value="3months">Within 3 months</option>
                      <option value="6months">Within 6 months</option>
                      <option value="12months">Within 12 months</option>
                    </select>
                  </div>
                </div>

                {/* Suburbs */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> Preferred Suburbs
                  </label>
                  <input
                    type="text"
                    value={formData.suburbs}
                    onChange={(e) => setFormData({ ...formData, suburbs: e.target.value })}
                    placeholder="Enter your ideal suburbs, e.g. Kelmscott, Roleystone, Bedfordale"
                    className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>

                {/* Must Haves */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-foreground mb-4">Must-Haves (Optional)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {mustHaves.map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleMustHave(item)}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          formData.mustHaves.includes(item)
                            ? 'bg-secondary text-foreground'
                            : 'bg-muted/50 text-foreground border border-border/50 hover:bg-muted'
                        }`}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Finance Status */}
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-foreground mb-4">Finance Status</label>
                  <select
                    value={formData.finance}
                    onChange={(e) => setFormData({ ...formData, finance: e.target.value })}
                    className="w-full md:w-1/2 px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="preapproved">Pre-approved</option>
                    <option value="savingdeposit">Saving for deposit</option>
                    <option value="cash">Cash buyer</option>
                    <option value="exploring">Exploring options</option>
                  </select>
                </div>

                {/* Contact & Alerts */}
                <div className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b border-border/30">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Phone (for SMS alerts)</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="(02) 0000 0000"
                      className="w-full px-4 py-2 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 font-bold text-lg">
                  Get Matched to Suitable Listings
                </Button>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  We never spam. Unsubscribe anytime.
                </p>
          </form>
        )}
      </div>
    </motion.div>
  )

  if (embedded) {
    return formContent
  }

  return (
    <section className="py-16 bg-secondary/5 border-t border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        {formContent}
      </div>
    </section>
  )
}
