"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { testimonials } from "@/lib/testimonials"

export function Testimonials() {
  const sellerTestimonials = testimonials.filter((testimonial) => ![6, 7].includes(testimonial.id))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expandedIds, setExpandedIds] = useState<number[]>([])

  const next = () => setCurrentIndex((i) => (i + 1) % sellerTestimonials.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + sellerTestimonials.length) % sellerTestimonials.length)

  const current = sellerTestimonials[currentIndex]
  const isExpanded = expandedIds.includes(current.id)

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((existingId) => existingId !== id) : [...prev, id]
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-[0.2em] text-muted-foreground font-medium">Seller Reviews</span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mt-3 mb-4 tracking-tighter">
            Why Sellers Recommend Us
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
              className="max-w-3xl mx-auto"
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
                  <blockquote
                    className={`font-serif text-xl md:text-2xl lg:text-3xl text-foreground italic leading-relaxed -mt-8 ${
                      isExpanded ? "" : "line-clamp-4"
                    }`}
                  >
                    {current.quote}
                  </blockquote>
                  <button
                    type="button"
                    onClick={() => toggleExpanded(current.id)}
                    className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {isExpanded ? "Show less" : "Read full review"}
                  </button>

                  {/* Author attribution */}
                  <div className="flex items-center gap-4 mt-8">
                    <img
                      src={current.agentImage || "/placeholder.svg"}
                      alt={current.agent}
                      className="w-16 h-16 rounded-full object-cover border-2 border-secondary"
                    />
                    <div>
                      <p className="font-semibold text-foreground text-lg">{current.reviewer}</p>
                      <p className="text-muted-foreground">
                        For {current.agent}{current.date ? ` • ${current.date}` : ""}
                      </p>
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
              {sellerTestimonials.map((_, i) => (
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
