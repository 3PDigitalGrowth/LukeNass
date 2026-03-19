"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { testimonials } from "@/lib/testimonials"

const featuredTestimonials = testimonials.filter((testimonial) => [1, 2, 4].includes(testimonial.id))

export function SellerTestimonials() {
  const [expandedIds, setExpandedIds] = useState<number[]>([])

  const toggleExpanded = (id: number) => {
    setExpandedIds((prev) => (prev.includes(id) ? prev.filter((existingId) => existingId !== id) : [...prev, id]))
  }

  return (
    <section className="py-20 bg-background border-t border-border/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-primary font-medium mb-3">Seller Feedback</p>
          <h2 className="text-4xl lg:text-5xl font-serif tracking-tighter mb-4 text-foreground">
            Sellers talk about the strategy and communication.
          </h2>
          <p className="text-lg text-foreground/60">
            The common thread in our reviews is not hype. It is thoughtful guidance, responsiveness, and a process that
            feels well handled from start to finish.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featuredTestimonials.map((testimonial, index) => {
            const isExpanded = expandedIds.includes(testimonial.id)

            return (
              <motion.article
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-border/50 bg-card p-8 shadow-lg"
              >
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground font-medium mb-5">
                  {testimonial.agent}
                </p>
                <blockquote
                  className={`font-serif text-xl text-foreground italic leading-relaxed ${isExpanded ? "" : "line-clamp-4"}`}
                >
                  {testimonial.quote}
                </blockquote>
                <button
                  type="button"
                  onClick={() => toggleExpanded(testimonial.id)}
                  className="mt-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {isExpanded ? "Show less" : "Read full review"}
                </button>
                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="font-semibold text-foreground">{testimonial.reviewer}</p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.title ? testimonial.title : `Seller review for ${testimonial.agent}`}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
