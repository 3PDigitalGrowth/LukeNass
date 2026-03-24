'use client'

import React from "react"

import { useLeadModal } from '@/components/global/lead-capture-provider'
import { motion } from 'framer-motion'
import {
  Calendar,
  Paintbrush,
  Megaphone,
  Handshake,
  CheckCircle2,
} from 'lucide-react'

interface TimelineStep {
  id: number
  title: string
  description: string
  icon: React.ReactNode
}

export function ProcessRoadmap() {
  const { openLeadModal } = useLeadModal()

  const steps: TimelineStep[] = [
    {
      id: 1,
      title: 'Strategy Session',
      description: 'We align on your goals, timing, and the right positioning for your home.',
      icon: <Calendar className="h-6 w-6" />,
    },
    {
      id: 2,
      title: 'Property Preparation',
      description: 'We shape the presentation and campaign details to support a stronger buyer response.',
      icon: <Paintbrush className="h-6 w-6" />,
    },
    {
      id: 3,
      title: 'Launch',
      description: 'Your campaign goes live with tailored messaging and clear market positioning.',
      icon: <Megaphone className="h-6 w-6" />,
    },
    {
      id: 4,
      title: 'Buyer Feedback & Negotiation',
      description: 'We communicate clearly, manage momentum, and negotiate with discipline.',
      icon: <Handshake className="h-6 w-6" />,
    },
    {
      id: 5,
      title: 'Settlement Support',
      description: 'We stay close to the process so the final stages remain smooth and well-managed.',
      icon: <CheckCircle2 className="h-6 w-6" />,
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-serif tracking-tighter mb-4 text-foreground">
            A Selling Process Built Around Clarity
          </h2>
          <p className="text-lg text-foreground/60">
            Sellers should never be left guessing. This is how we keep strategy and communication aligned from start to finish.
          </p>
        </motion.div>

        {/* Timeline - Desktop */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="hidden lg:block max-w-6xl mx-auto"
        >
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary hidden lg:block" />

            {/* Timeline Steps */}
            <div className="grid grid-cols-5 gap-4 relative z-10">
              {steps.map((step, idx) => (
                <motion.div
                  key={step.id}
                  variants={item}
                  className="relative"
                >
                  {/* Circle */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      className="w-24 h-24 bg-card rounded-full flex items-center justify-center border-4 border-background shadow-lg hover:shadow-xl transition-all duration-300 mb-6 relative z-20 hover:border-primary/50"
                      whileHover={{ scale: 1.1 }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full flex items-center justify-center text-primary">
                        {step.icon}
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-foreground/60 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Step Number */}
                    <div className="mt-4 inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      Step {step.id}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Timeline - Mobile */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-100px' }}
          className="lg:hidden max-w-2xl mx-auto"
        >
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-primary" />

            {/* Mobile Steps */}
            <div className="space-y-8">
              {steps.map((step) => (
                <motion.div
                  key={step.id}
                  variants={item}
                  className="relative pl-20"
                >
                  {/* Circle */}
                  <motion.div
                    className="absolute left-0 w-12 h-12 bg-card rounded-full flex items-center justify-center border-4 border-background shadow-lg text-primary"
                    whileHover={{ scale: 1.1 }}
                  >
                    {step.icon}
                  </motion.div>

                  {/* Content */}
                  <div className="bg-card rounded-2xl p-6 border border-border/50 shadow-lg hover:shadow-xl transition-all duration-300">
                    <h3 className="font-serif font-semibold text-lg text-foreground mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-foreground/60 mb-4">
                      {step.description}
                    </p>
                    <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      Step {step.id}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-lg text-foreground/70 mb-6">
            Ready to talk through your next move?
          </p>
          <button
            type="button"
            className="inline-flex px-8 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-2xl"
            onClick={() =>
              openLeadModal({
                type: 'seller-appraisal',
                source: 'Sell Process Roadmap',
                title: 'Schedule Your Strategy Session',
                description:
                  'Share your property and contact details and the team will email you a confirmation before following up personally.',
                metadata: {
                  Context: 'Sell process roadmap CTA',
                },
              })
            }
          >
            Schedule Your Strategy Session
          </button>
        </motion.div>
      </div>
    </section>
  )
}
