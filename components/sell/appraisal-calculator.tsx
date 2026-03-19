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

interface AppraisalCalculatorProps {
  embedded?: boolean
}

const APPRAISAL_RECIPIENTS = ['luke@lukenass.com.au', 'andrew@lukenass.com.au']

export function AppraisalCalculator({ embedded = false }: AppraisalCalculatorProps) {
  const [step, setStep] = useState<Step>('address')
  const [formData, setFormData] = useState<FormData>({
    address: '',
    suburb: '',
    bedrooms: '',
    condition: '',
    renovations: '',
    name: '',
    email: '',
    phone: '',
  })
  const [requestPrepared, setRequestPrepared] = useState(false)

  const suburbs = [
    'Roleystone',
    'Kelmscott',
    'Armadale',
    'Seville Grove',
    'Bedfordale',
    'Mount Nasura',
    'Maddington',
    'Gosnells',
  ]

  const handleNext = () => {
    if (step === 'address') {
      setStep('condition')
    } else if (step === 'condition') {
      setStep('contact')
    } else if (step === 'contact') {
      const subject = encodeURIComponent(
        `Appraisal Request: ${formData.address || 'Property in ' + formData.suburb}`
      )
      const body = encodeURIComponent(
        [
          'Hi Luke and Andy,',
          '',
          'I would like to request a property appraisal.',
          '',
          `Street Address: ${formData.address}`,
          `Suburb: ${formData.suburb}`,
          `Bedrooms: ${formData.bedrooms}`,
          `Condition: ${formData.condition}`,
          `Recent Renovations: ${formData.renovations}`,
          '',
          `Name: ${formData.name}`,
          `Email: ${formData.email}`,
          `Phone: ${formData.phone || 'Not provided'}`,
        ].join('\n')
      )

      window.location.href = `mailto:${APPRAISAL_RECIPIENTS.join(',')}?subject=${subject}&body=${body}`
      setRequestPrepared(true)
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

  const calculatorContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className={embedded ? 'w-full' : 'max-w-3xl mx-auto'}
      id={embedded ? 'sell-appraisal-form' : undefined}
    >
      {!embedded && (
        <>
          <h2 className="text-4xl lg:text-5xl font-serif tracking-tighter mb-4 text-foreground">
            Request Your Property Appraisal
          </h2>
          <p className="text-lg text-foreground/60 mb-12">
            Share a few details and Luke or Andy will follow up personally with tailored appraisal guidance.
          </p>
        </>
      )}

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

      <div className={`bg-card rounded-2xl border border-border/50 shadow-lg ${embedded ? 'p-6 lg:p-8' : 'p-8 lg:p-12'}`}>
        {embedded && (
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground font-medium mb-3">Appraisal Request</p>
            <h2 className="text-3xl lg:text-4xl font-serif tracking-tight text-foreground mb-3">Your Property Appraisal</h2>
            <p className="text-foreground/60">Enter your property details and Luke or Andy will follow up personally by email.</p>
          </div>
        )}

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
                Where&apos;s Your Property?
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
                    <option value="">Select suburb</option>
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
                    <option value="">Select bedrooms</option>
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

          {requestPrepared && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <h3 className="text-2xl font-serif tracking-tight mb-4">
                Your Appraisal Request Is Ready
              </h3>
              <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 mb-8">
                <p className="text-foreground/70 text-lg">
                  We&apos;ve prepared an email draft with your property details for Luke and Andy.
                </p>
                <p className="text-foreground/60 mt-4">
                  Send the email and one of them will follow up personally with tailored advice on your next move.
                </p>
              </div>
              <p className="text-foreground/70 mb-8">
                Prefer to talk now? Call the office and ask for Luke or Andy.
              </p>
              <button
                onClick={() => {
                  setStep('address')
                  setRequestPrepared(false)
                  setFormData({
                    address: '',
                    suburb: '',
                    bedrooms: '',
                    condition: '',
                    renovations: '',
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

        {!requestPrepared && (
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
                (step === 'address' && (!formData.address || !formData.suburb || !formData.bedrooms)) ||
                (step === 'condition' && (!formData.condition || !formData.renovations)) ||
                (step === 'contact' && (!formData.name || !formData.email))
              }
              className="ml-auto px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center gap-2"
            >
              {step === 'contact' ? 'Email Request' : 'Continue'}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  )

  if (embedded) {
    return calculatorContent
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        {calculatorContent}
      </div>
    </section>
  )
}
