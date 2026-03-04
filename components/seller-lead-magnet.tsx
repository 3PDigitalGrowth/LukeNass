"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, TrendingUp, Home, Calendar, CheckCircle2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function SellerLeadMagnet() {
  const [sliderValue, setSliderValue] = useState(850000)
  const [isHovering, setIsHovering] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Simulated growth calculation
  const estimatedGrowth = Math.round(sliderValue * 0.124)
  const projectedValue = sliderValue + estimatedGrowth

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
      maximumFractionDigits: 0,
    }).format(value)
  }

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      id="selling"
      style={{ backgroundColor: "oklch(0.94 0.02 145)" }}
    >
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Interactive Property Calculator */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <div
              className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl relative overflow-hidden"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              {/* Calculator Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Home className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-card-foreground">Property Growth Calculator</h3>
                  <p className="text-sm text-muted-foreground">2026 Projection Tool</p>
                </div>
              </div>

              {/* Current Value Input */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-muted-foreground mb-3">Estimated Current Value</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">$</span>
                  <Input
                    type="text"
                    value={sliderValue.toLocaleString()}
                    readOnly
                    className="pl-8 text-2xl font-semibold h-14 bg-muted/50 border-border"
                  />
                </div>

                {/* Interactive Slider */}
                <div className="mt-4 relative">
                  <input
                    type="range"
                    min={400000}
                    max={2500000}
                    step={25000}
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-5
                      [&::-webkit-slider-thumb]:h-5
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-primary
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-webkit-slider-thumb]:shadow-lg
                      [&::-webkit-slider-thumb]:transition-transform
                      [&::-webkit-slider-thumb]:hover:scale-110
                      [&::-moz-range-thumb]:w-5
                      [&::-moz-range-thumb]:h-5
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-primary
                      [&::-moz-range-thumb]:border-0
                      [&::-moz-range-thumb]:cursor-pointer"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>$400K</span>
                    <span>$2.5M</span>
                  </div>
                </div>
              </div>

              {/* Projected Growth Display */}
              <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/10">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium text-muted-foreground">Projected 2026 Value</span>
                  <span className="flex items-center text-sm text-primary font-semibold">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    +12.4%
                  </span>
                </div>

                <motion.div
                  key={projectedValue}
                  initial={{ scale: 0.95, opacity: 0.5 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2"
                >
                  {formatCurrency(projectedValue)}
                </motion.div>

                <p className="text-sm text-muted-foreground">
                  Potential growth of{" "}
                  <span className="font-semibold text-secondary">{formatCurrency(estimatedGrowth)}</span>
                </p>
              </div>

              {/* Animated hover indicator */}
              <motion.div
                className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: isHovering ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground mt-4 text-center">
              *Projections based on Perth SE Corridor historical growth data. Actual results may vary.
            </p>
          </motion.div>

          {/* Right Side - The 2026 Gap Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-secondary font-medium text-sm uppercase tracking-wider mb-4"
            >
              <Calendar className="w-4 h-4" />
              Seller Intelligence
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance tracking-tighter"
            >
              The 2026 Gap:
              <br />
              <span className="text-primary">Your Window of Opportunity</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Perth&apos;s SE Corridor is experiencing a critical market shift. With stock levels at historic lows and
                buyer demand surging, 2026 presents a rare opportunity for strategic sellers.
              </p>

              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 shadow-lg">
                <h4 className="font-semibold text-card-foreground mb-3">The Transition Advantage:</h4>
                <ul className="space-y-2">
                  {[
                    "Sell at peak value while competition remains low",
                    "Secure your next property before prices climb further",
                    "Navigate timing with expert local guidance",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Lead Capture CTA */}
            <motion.div variants={itemVariants}>
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-8 py-6 h-auto shadow-2xl hover:shadow-xl transition-all"
                  >
                    Get Your 2026 Transition Strategy
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-serif text-2xl">Your 2026 Strategy Session</DialogTitle>
                    <DialogDescription>
                      Receive a personalized transition strategy tailored to your property and goals.
                    </DialogDescription>
                  </DialogHeader>

                  {!formSubmitted ? (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault()
                        setFormSubmitted(true)
                      }}
                      className="space-y-4 mt-4"
                    >
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Full Name</label>
                        <Input placeholder="Enter your name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Email Address</label>
                        <Input type="email" placeholder="you@example.com" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Property Address</label>
                        <Input placeholder="Your property address" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">When are you considering selling?</label>
                        <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                          <option>Within 3 months</option>
                          <option>3-6 months</option>
                          <option>6-12 months</option>
                          <option>Just exploring options</option>
                        </select>
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      >
                        Send My Strategy
                      </Button>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="font-serif text-xl font-semibold mb-2">Strategy Request Received!</h3>
                      <p className="text-muted-foreground">
                        Luke will personally review your details and be in touch within 24 hours.
                      </p>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={itemVariants} className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                No obligation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                100% confidential
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
