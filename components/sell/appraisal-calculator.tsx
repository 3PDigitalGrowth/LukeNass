'use client'

import React from "react"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, MapPin } from 'lucide-react'

type Step = 'address' | 'condition' | 'contact'

interface FormData {
  address: string
  suburb: string
  bedrooms: string
  condition: string
  renovations: string
  name: string
  email: string
  phone: string
}

export function AppraisalCalculator() {
  const [step, setStep] = useState<Step>('address')
  const [formData, setFormData] = useState<FormData>({
    address: '',
    suburb: 'Roleystone',
    bedrooms: '3',
    condition: 'good',
    renovations: 'none',
    name: '',
    email: '',
    phone: '',
  })
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null)

  const suburbs = [
    'Roleystone',
    'Kelmscott',
    'Armadale',
    'Seville Grove',
    'Bedfordale',
    'Mount Nasura',
  ]

  const handleNext = () => {
    if (step === 'address') {
      setStep('condition')
    } else if (step === 'condition') {
      setStep('contact')
    } else if (step === 'contact') {
      // Calculate estimated value (mock calculation)
      const baseValue = 600000
      const bedroomMultiplier = parseInt(formData.bedrooms) * 50000
      const conditionMultiplier =
        formData.condition === 'excellent'
          ? 1.15
          : formData.condition === 'good'
            ? 1.0
            : 0.85
      const calculated = Math.round(
        (baseValue + bedroomMultiplier) * conditionMultiplier
      )
      setEstimatedValue(calculated)
    }
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl lg:text-5xl font-serif tracking-tighter mb-4 text-foreground">
            Your Property Appraisal
          </h2>
          <p className="text-lg text-foreground/60 mb-12">
            Answer a few quick questions to receive your personalized market
            appraisal
          </p>

          {/* Progress Indicator */}
          <div className="flex gap-3 mb-12">
            {(['address', 'condition', 'contact'] as const).map(
              (s, idx) => (
                <div key={s} className="flex items-center">
                  <motion.div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-serif font-medium text-sm transition-all duration-300 ${
                      step === s || ['address', 'condition', 'contact'].indexOf(step) > idx
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-border text-foreground/50'
                    }`}
                    animate={{
                      scale: step === s ? 1.1 : 1,
                    }}
                  >
                    {idx + 1}
                  </motion.div>
                  {idx < 2 && (
                    <div
                      className={`w-8 h-1 mx-2 rounded-full transition-all duration-300 ${
                        ['address', 'condition', 'contact'].indexOf(step) > idx
                          ? 'bg-primary'
                          : 'bg-border'
                      }`}
                    />
                  )}
                </div>
              )
            )}
          </div>

          {/* Form Content */}
          <div className="bg-card rounded-2xl p-8 lg:p-12 border border-border/50 shadow-lg">
            <AnimatePresence mode="wait">
              {step === 'address' && (
                <motion.div
                  key="address"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-serif tracking-tight mb-8">
                    Where's Your Property?
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Street Address
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-3.5 h-5 w-5 text-primary/50" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="123 Main Street"
                          className="w-full pl-12 pr-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Suburb
                      </label>
                      <select
                        name="suburb"
                        value={formData.suburb}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        {suburbs.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Number of Bedrooms
                      </label>
                      <select
                        name="bedrooms"
                        value={formData.bedrooms}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        {[1, 2, 3, 4, 5, 6].map((b) => (
                          <option key={b} value={b}>
                            {b} Bedroom{b > 1 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'condition' && (
                <motion.div
                  key="condition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-serif tracking-tight mb-8">
                    Property Condition
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-4">
                        Overall Condition
                      </label>
                      <div className="space-y-3">
                        {['excellent', 'good', 'fair'].map((cond) => (
                          <label
                            key={cond}
                            className="flex items-center p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-muted/50 transition-all"
                          >
                            <input
                              type="radio"
                              name="condition"
                              value={cond}
                              checked={formData.condition === cond}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-primary"
                            />
                            <span className="ml-3 font-medium capitalize text-foreground">
                              {cond}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-4">
                        Recent Renovations?
                      </label>
                      <div className="space-y-3">
                        {['none', 'minor', 'major'].map((ren) => (
                          <label
                            key={ren}
                            className="flex items-center p-4 border border-border/50 rounded-lg cursor-pointer hover:bg-muted/50 transition-all"
                          >
                            <input
                              type="radio"
                              name="renovations"
                              value={ren}
                              checked={formData.renovations === ren}
                              onChange={handleInputChange}
                              className="w-5 h-5 text-primary"
                            />
                            <span className="ml-3 font-medium capitalize text-foreground">
                              {ren === 'none'
                                ? 'No renovations'
                                : ren + ' renovations'}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {step === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-2xl font-serif tracking-tight mb-8">
                    Get Your Appraisal
                  </h3>

                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(08) 9000 0000"
                        className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {estimatedValue && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="text-center"
                >
                  <h3 className="text-2xl font-serif tracking-tight mb-4">
                    Your 2026 Appraisal
                  </h3>
                  <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 mb-8">
                    <p className="text-muted-foreground mb-2">
                      Estimated Value
                    </p>
                    <p className="text-5xl lg:text-6xl font-serif tracking-tighter text-primary">
                      ${estimatedValue.toLocaleString()}
                    </p>
                    <p className="text-foreground/60 mt-4 text-lg">
                      Based on your property details and current market data
                    </p>
                  </div>
                  <p className="text-foreground/70 mb-8">
                    Ready to discuss your selling strategy? Schedule a free
                    consultation with our team.
                  </p>
                  <button
                    onClick={() => {
                      setStep('address')
                      setEstimatedValue(null)
                      setFormData({
                        address: '',
                        suburb: 'Roleystone',
                        bedrooms: '3',
                        condition: 'good',
                        renovations: 'none',
                        name: '',
                        email: '',
                        phone: '',
                      })
                    }}
                    className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-2xl"
                  >
                    New Appraisal
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            {!estimatedValue && (
              <div className="flex gap-4 mt-8 pt-8 border-t border-border/50">
                {step !== 'address' && (
                  <button
                    onClick={() => {
                      if (step === 'condition') setStep('address')
                      else if (step === 'contact') setStep('condition')
                    }}
                    className="px-6 py-3 text-foreground font-medium hover:bg-muted rounded-lg transition-all duration-300"
                  >
                    Back
                  </button>
                )}
                <button
                  onClick={handleNext}
                  disabled={
                    (step === 'address' && !formData.address) ||
                    (step === 'contact' && (!formData.name || !formData.email))
                  }
                  className="ml-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
                >
                  {step === 'contact' ? 'Get Appraisal' : 'Continue'}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
