"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    id: 1,
    quote:
      "Luke's strategic approach transformed our sale. He kept the campaign focused, communicated clearly, and made us feel supported throughout the process.",
    name: "Sarah & Michael Thompson",
    location: "Roleystone, WA",
    image: "/professional-couple-in-their-50s-portrait.jpg",
  },
  {
    id: 2,
    quote:
      "After difficult experiences with other agents, Luke's boutique approach gave us confidence again. He was calm, proactive, and deeply committed to helping us move forward.",
    name: "David Chen",
    location: "Kelmscott, WA",
    image: "/professional-asian-man-40s-portrait.jpg",
  },
  {
    id: 3,
    quote:
      "We needed to upsize in a competitive market, and Luke guided us through every step with clarity and reassurance. His transition strategy made the whole experience feel manageable.",
    name: "Emma & James Wilson",
    location: "Seville Grove, WA",
    image: "/young-professional-couple-30s-portrait.jpg",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => setCurrentIndex((i) => (i + 1) % testimonials.length)
  const prev = () => setCurrentIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  const current = testimonials[currentIndex]

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
