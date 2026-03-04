"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    quote:
      "Luke's strategic approach transformed our sale. He identified the perfect off-market buyer before we even listed, creating competition that drove our price well beyond expectations.",
    name: "Sarah & Michael Thompson",
    location: "Roleystone, WA",
    image: "/professional-couple-in-their-50s-portrait.jpg",
    stats: {
      initialAppraisal: "$950,000",
      finalSale: "$1,085,000",
      strategy: "Off-Market Preview",
      daysOnMarket: 12,
    },
  },
  {
    id: 2,
    quote:
      "After three failed campaigns with other agents, Luke's boutique approach delivered in weeks what others couldn't in months. His Inner Circle network found our buyer.",
    name: "David Chen",
    location: "Kelmscott, WA",
    image: "/professional-asian-man-40s-portrait.jpg",
    stats: {
      initialAppraisal: "$780,000",
      finalSale: "$865,000",
      strategy: "Inner Circle Exclusive",
      daysOnMarket: 18,
    },
  },
  {
    id: 3,
    quote:
      "We needed to upsize quickly in a competitive market. Luke's transition strategy meant we secured our dream home before our old house even hit the market.",
    name: "Emma & James Wilson",
    location: "Seville Grove, WA",
    image: "/young-professional-couple-30s-portrait.jpg",
    stats: {
      initialAppraisal: "$620,000",
      finalSale: "$695,000",
      strategy: "Simultaneous Settlement",
      daysOnMarket: 21,
    },
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  const current = testimonials[currentIndex]

  const initialValue = Number.parseInt(current.stats.initialAppraisal.replace(/[$,]/g, ""))
  const finalValue = Number.parseInt(current.stats.finalSale.replace(/[$,]/g, ""))
  const gain = finalValue - initialValue
  const gainPercent = ((gain / initialValue) * 100).toFixed(1)

  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">Featured Stories</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mt-3 mb-4 tracking-tighter">
            Strategy in Action
          </h2>
          <div className="w-16 h-0.5 bg-secondary mx-auto" />
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
            >
              <div className="relative">
                {/* Editorial issue number in background */}
                <span className="absolute -top-8 -left-4 lg:-left-8 font-serif text-[120px] lg:text-[180px] font-bold text-muted/30 leading-none select-none pointer-events-none">
                  {String(currentIndex + 1).padStart(2, "0")}
                </span>

                <div className="relative z-10 pt-12 lg:pt-16">
                  {/* Large opening quote mark */}
                  <span className="font-serif text-6xl lg:text-8xl text-primary/20 leading-none block mb-4">
                    &ldquo;
                  </span>

                  {/* Pull quote in serif italics */}
                  <blockquote className="font-serif text-xl md:text-2xl lg:text-3xl text-foreground italic leading-relaxed -mt-8">
                    {current.quote}
                  </blockquote>

                  {/* Author attribution */}
                  <div className="flex items-center gap-4 mt-8">
                    <img
                      src={current.image || "/placeholder.svg"}
                      alt={current.name}
                      className="w-16 h-16 rounded-full object-cover border-2 border-secondary"
                    />
                    <div>
                      <p className="font-semibold text-foreground text-lg">{current.name}</p>
                      <p className="text-muted-foreground">{current.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-background rounded-2xl p-8 lg:p-10 shadow-2xl">
                <div className="text-center mb-6">
                  <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground font-medium">
                    Results Breakdown
                  </span>
                  <h3 className="font-serif text-2xl text-foreground mt-2">The Numbers</h3>
                </div>

                <div className="space-y-6">
                  {/* Initial vs Final comparison */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-muted/30 rounded-xl">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-1">
                        Initial Appraisal
                      </span>
                      <span className="font-serif text-2xl lg:text-3xl text-foreground">
                        {current.stats.initialAppraisal}
                      </span>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-xl border border-primary/20">
                      <span className="text-xs uppercase tracking-wider text-primary block mb-1">Final Sale</span>
                      <span className="font-serif text-2xl lg:text-3xl text-primary font-semibold">
                        {current.stats.finalSale}
                      </span>
                    </div>
                  </div>

                  {/* Gain highlight */}
                  <div className="text-center py-4 border-y border-border">
                    <span className="text-sm text-muted-foreground">Above Appraisal</span>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <span className="font-serif text-3xl lg:text-4xl text-secondary font-bold">
                        +${gain.toLocaleString()}
                      </span>
                      <span className="text-secondary font-medium">({gainPercent}%)</span>
                    </div>
                  </div>

                  {/* Strategy & Days on Market */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">
                        Strategy
                      </span>
                      <span className="inline-block px-4 py-2 bg-secondary/10 text-secondary rounded-full text-sm font-medium border border-secondary/20">
                        {current.stats.strategy}
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="text-xs uppercase tracking-wider text-muted-foreground block mb-2">
                        Days on Market
                      </span>
                      <span className="font-serif text-3xl text-foreground font-semibold">
                        {current.stats.daysOnMarket}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center items-center gap-6 mt-12">
            <Button variant="ghost" size="icon" onClick={prev} className="rounded-full hover:bg-muted">
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-3">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`transition-all duration-300 ${
                    i === currentIndex
                      ? "w-10 h-1 bg-primary rounded-full"
                      : "w-1 h-1 bg-muted-foreground/30 rounded-full hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>

            <Button variant="ghost" size="icon" onClick={next} className="rounded-full hover:bg-muted">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
