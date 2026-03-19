'use client'

import React from "react"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronRight, MapPin } from 'lucide-react'

interface FormData {
  address: string
  suburb: string
  propertyType: string
  timeframe: string
  goals: string
  name: string
  email: string
  phone: string
}

interface AppraisalCalculatorProps {
  embedded?: boolean
}

const APPRAISAL_RECIPIENTS = ['luke@lukenass.com.au', 'andrew@lukenass.com.au']

export function AppraisalCalculator({ embedded = false }: AppraisalCalculatorProps) {
  const [formData, setFormData] = useState<FormData>({
    address: '',
    suburb: '',
    propertyType: '',
    timeframe: 'Within 3 months',
    goals: '',
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(
      `Confidential Appraisal Request: ${formData.address || 'Property in ' + formData.suburb}`
    )
    const body = encodeURIComponent(
      [
        'Hi Luke and Andy,',
        '',
        'I would like to request a confidential appraisal and strategy session.',
        '',
        `Street Address: ${formData.address}`,
        `Suburb: ${formData.suburb}`,
        `Property Type: ${formData.propertyType || 'Not specified'}`,
        `Selling Timeframe: ${formData.timeframe}`,
        `Goals / Questions: ${formData.goals || 'Not provided'}`,
        '',
        `Name: ${formData.name}`,
        `Email: ${formData.email}`,
        `Phone: ${formData.phone || 'Not provided'}`,
      ].join('\n')
    )

    window.location.href = `mailto:${APPRAISAL_RECIPIENTS.join(',')}?subject=${subject}&body=${body}`
    setRequestPrepared(true)
  }

  const resetForm = () => {
    setRequestPrepared(false)
    setFormData({
      address: '',
      suburb: '',
      propertyType: '',
      timeframe: 'Within 3 months',
      goals: '',
      name: '',
      email: '',
      phone: '',
    })
  }

  const calculatorContent = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={embedded ? 'w-full' : 'max-w-5xl mx-auto'}
      id={embedded ? 'sell-appraisal-form' : undefined}
    >
      {!embedded && (
        <>
          <h2 className="text-4xl lg:text-5xl font-serif tracking-tighter mb-4 text-foreground">
            Request Your Confidential Appraisal
          </h2>
          <p className="text-lg text-foreground/60 mb-12 max-w-3xl">
            Share the essentials and Luke or Andy will personally follow up with tailored guidance on strategy, positioning,
            and timing.
          </p>
        </>
      )}

      <div className={`bg-card rounded-2xl border border-border/50 shadow-lg ${embedded ? 'p-6 lg:p-8' : 'p-8 lg:p-10'}`}>
        {embedded && (
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground font-medium mb-3">Confidential Seller Enquiry</p>
            <h2 className="text-3xl lg:text-4xl font-serif tracking-tight text-foreground mb-3">Your Appraisal and Strategy Session</h2>
            <p className="text-foreground/60">Complete the essentials below and Luke or Andy will follow up personally.</p>
          </div>
        )}

        {requestPrepared ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <h3 className="text-2xl font-serif tracking-tight mb-4">
              Your Strategy Request Is Ready
            </h3>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 mb-8">
              <p className="text-foreground/70 text-lg">
                We&apos;ve prepared an email draft with your property details for Luke and Andy.
              </p>
              <p className="text-foreground/60 mt-4">
                Send the email and one of them will follow up personally with tailored seller guidance.
              </p>
            </div>
            <p className="text-foreground/70 mb-8">
              Prefer to talk now? Call the office and ask for Luke or Andy.
            </p>
            <button
              onClick={resetForm}
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              New Request
            </button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid lg:grid-cols-2 gap-8">
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
                      required
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
                    required
                  >
                    <option value="">Select suburb</option>
                    {suburbs.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Property Type
                    </label>
                    <select
                      name="propertyType"
                      value={formData.propertyType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="">Select type</option>
                      <option value="House">House</option>
                      <option value="Unit / Villa">Unit / Villa</option>
                      <option value="Acreage / Lifestyle">Acreage / Lifestyle</option>
                      <option value="Land">Land</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-3">
                      Selling Timeframe
                    </label>
                    <select
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                    >
                      <option value="Within 3 months">Within 3 months</option>
                      <option value="3-6 months">3-6 months</option>
                      <option value="6-12 months">6-12 months</option>
                      <option value="Just exploring options">Just exploring options</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Goals or Questions
                  </label>
                  <textarea
                    name="goals"
                    value={formData.goals}
                    onChange={handleInputChange}
                    placeholder="Tell us what matters most to you, such as timing, communication, presentation, or next-step strategy."
                    className="w-full px-4 py-3 bg-background border border-border/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all min-h-[120px]"
                  />
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-xl border border-border/50 bg-background/70 p-5">
                  <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground font-medium mb-3">What Happens Next</p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    <li>Luke or Andy reviews your property details personally.</li>
                    <li>You receive tailored advice on strategy, communication, and timing.</li>
                    <li>There is no obligation and your enquiry remains confidential.</li>
                  </ul>
                </div>

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
                    required
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
                    required
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
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Luke or Andy will review your request personally.
              </p>
              <button
                type="submit"
                className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2"
              >
                Email Request
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </form>
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
