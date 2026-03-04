'use client'

import React from "react"

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { Star, Clock, Eye, CheckCircle2, TrendingUp, Home, Briefcase, AlertCircle } from 'lucide-react'

export function InnerCircleLanding() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    looking: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [showSegmentation, setShowSegmentation] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('[v0] Form submitted:', formData)
    setShowSegmentation(true)
    setTimeout(() => {
      setFormData({ name: '', email: '', looking: '' })
      setShowSegmentation(false)
      setSubmitted(false)
    }, 5000)
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  // Segmentation paths based on user type
  const segmentationPaths = {
    buying: {
      icon: Home,
      title: 'Welcome, Buyer!',
      items: [
        'Set your property preferences',
        'Schedule inspection readiness',
        'Get early access to your matches'
      ]
    },
    selling: {
      icon: TrendingUp,
      title: 'Welcome, Seller!',
      items: [
        'Tell us about selling timeline',
        'Book your property appraisal',
        'Unlock off-market strategy'
      ]
    },
    investment: {
      icon: Briefcase,
      title: 'Welcome, Investor!',
      items: [
        'Define your yield targets',
        'Schedule strategy call',
        'Access exclusive deals'
      ]
    },
    both: {
      icon: Home,
      title: 'Welcome!',
      items: [
        'Complete buyer & seller profiles',
        'Access full member benefits',
        'Schedule strategy session'
      ]
    }
  }

  const SegmentationModal = () => {
    const type = (formData.looking || 'buying') as keyof typeof segmentationPaths
    const path = segmentationPaths[type] || segmentationPaths.buying
    const IconComponent = path.icon

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-2xl shadow-2xl p-8 max-w-md w-full"
        >
          <div className="flex justify-center mb-6">
            <div className="p-4 rounded-full bg-primary/20">
              <IconComponent className="w-8 h-8 text-primary" />
            </div>
          </div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-2 text-center tracking-tight">{path.title}</h2>
          <p className="text-muted-foreground text-center mb-6">Your personalized onboarding starts now.</p>
          
          <div className="space-y-3 mb-8">
            {path.items.map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-2 rounded-lg">
            Continue to Dashboard
          </Button>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative pt-20 pb-20 px-4 overflow-hidden">
        <div className="container mx-auto max-w-4xl">
          {/* Main Heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center gap-2 mb-6 px-4 py-2 rounded-full bg-secondary/20 border border-secondary/30">
              <Star className="w-4 h-4 text-secondary" />
              <span className="text-sm font-medium text-foreground">Exclusive Real Estate Intelligence</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-serif font-bold text-foreground mb-6 tracking-tighter">
              Join The Inner Circle
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Access off-market opportunities and exclusive listings before the general market. See homes 7 days before
              realestate.com.au.
            </p>
          </motion.div>

          {/* Value Props */}
          <motion.div variants={container} initial="hidden" animate="show" className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                icon: Eye,
                title: 'Early Access',
                description: 'See homes 7 days before realestate.com.au',
              },
              {
                icon: Clock,
                title: 'Off-Market Opportunities',
                description: 'Exclusive listings never listed publicly',
              },
              {
                icon: CheckCircle2,
                title: 'Strategy First',
                description: 'Expert market insights and property analysis',
              },
            ].map((prop, idx) => {
              const Icon = prop.icon
              return (
                <motion.div
                  key={idx}
                  variants={item}
                  className="p-6 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="mb-4 inline-flex p-3 rounded-lg bg-secondary/20">
                    <Icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-foreground mb-2 tracking-tight">{prop.title}</h3>
                  <p className="text-muted-foreground">{prop.description}</p>
                </motion.div>
              )
            })}
          </motion.div>

          {/* What Members Received Last Month */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16 p-8 rounded-2xl bg-secondary/5 border border-secondary/20"
          >
            <h2 className="text-2xl font-serif font-bold text-foreground mb-6 tracking-tight text-center">What Members Received Last Month</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">12</div>
                <p className="text-muted-foreground">Off-market opportunities shared</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">4.2</div>
                <p className="text-muted-foreground">Days before public listing (avg)</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">$2.1M</div>
                <p className="text-muted-foreground">Member-exclusive portfolio value</p>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-secondary/20">
              <p className="text-sm text-muted-foreground text-center italic">
                Example member exclusive: 45 Kelmscott Drive, Roleystone—$1.4M modern estate listed exclusively for Inner Circle members 3 days before public launch. Sold within 48 hours to a member buyer.
              </p>
            </div>
          </motion.div>

          {/* Signup Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-xl mx-auto"
          >
            <div className="p-8 rounded-2xl bg-card border border-border/50 shadow-2xl">
              {submitted ? (
                <div className="text-center py-8">
                  <div className="mb-4 inline-flex p-3 rounded-full bg-primary/20 border border-primary/30">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-2 tracking-tight">Welcome to The Inner Circle</h3>
                  <p className="text-muted-foreground">
                    Check your email for exclusive access details. Your personalized experience is loading.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h2 className="text-2xl font-serif font-bold text-foreground mb-6 tracking-tight">Become a Member</h2>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">What are you looking for?</label>
                    <select
                      value={formData.looking}
                      onChange={(e) => setFormData({ ...formData, looking: e.target.value })}
                      className="w-full px-4 py-3 rounded-lg bg-muted/50 border border-border/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-transparent"
                    >
                      <option value="">Select an option</option>
                      <option value="buying">Buying a property</option>
                      <option value="selling">Selling a property</option>
                      <option value="investment">Investment opportunities</option>
                      <option value="both">Both buying & selling</option>
                    </select>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-bold py-3 rounded-lg transition-all"
                  >
                    Join The Inner Circle
                  </Button>

                  {/* Privacy & Trust Section */}
                  <div className="p-4 rounded-lg bg-muted/30 border border-border/50">
                    <div className="flex gap-3 mb-3">
                      <AlertCircle className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-medium text-foreground mb-2">Privacy & Trust</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          We email members 2–3 times weekly with market updates and exclusive listings. No spam. Your data is encrypted and never shared. You can unsubscribe anytime from any email.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-xs text-muted-foreground">
                    <p className="mb-2">
                      By joining, you agree to our{' '}
                      <Link href="/terms" className="text-primary hover:underline font-medium">
                        Terms of Membership
                      </Link>
                    </p>
                    <p>We respect your privacy. Unsubscribe at any time.</p>
                  </div>
                </form>
              )}
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground text-sm mb-4">Trusted by Perth's most discerning property buyers and sellers</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              {['Roleystone', 'Kelmscott', 'Armadale', 'Perth Hills'].map((suburb) => (
                <div key={suburb} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-secondary" />
                  <span className="text-sm text-muted-foreground">{suburb}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Segmentation Modal */}
      {showSegmentation && <SegmentationModal />}
    </div>
  )
}
