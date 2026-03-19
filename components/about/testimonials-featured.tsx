'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { testimonials } from '@/lib/testimonials'

export function TestimonialsFeatured() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [expandedIds, setExpandedIds] = useState<number[]>([])
  const agents = ['Luke Nass', 'Andrew Hill']
  const filteredTestimonials = activeFilter
    ? testimonials.filter((testimonial) => testimonial.agent === activeFilter)
    : testimonials

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
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tighter">
            What Our Clients Say
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Real feedback from clients of Luke and Andrew, all in one place.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <Button
            onClick={() => setActiveFilter(null)}
            variant={activeFilter === null ? 'default' : 'outline'}
            className={activeFilter === null ? 'bg-primary text-primary-foreground' : ''}
          >
            All
          </Button>
          {agents.map((agent) => (
            <Button
              key={agent}
              onClick={() => setActiveFilter(agent)}
              variant={activeFilter === agent ? 'default' : 'outline'}
              className={activeFilter === agent ? 'bg-primary text-primary-foreground' : ''}
            >
              {agent}
            </Button>
          ))}
        </div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="grid md:grid-cols-2 gap-6"
        >
          {filteredTestimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="p-6 rounded-xl bg-background border border-border/50 hover:shadow-lg transition-all"
            >
              {(() => {
                const isExpanded = expandedIds.includes(testimonial.id)

                return (
                  <>
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                  {testimonial.agent}
                </span>
              </div>
              {testimonial.title && (
                <p className="text-sm font-medium text-foreground/80 mb-3">{testimonial.title}</p>
              )}
              <p className={`font-serif text-lg text-foreground italic mb-4 ${isExpanded ? '' : 'line-clamp-4'}`}>"{testimonial.quote}"</p>
              <button
                type="button"
                onClick={() => toggleExpanded(testimonial.id)}
                className="mb-4 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
              >
                {isExpanded ? 'Show less' : 'Read full review'}
              </button>
              <div className="pt-4 border-t border-border/50">
                <p className="font-bold text-foreground mb-1">{testimonial.reviewer}</p>
                <p className="text-sm text-muted-foreground">
                  For {testimonial.agent}{testimonial.date ? ` • ${testimonial.date}` : ''}
                </p>
              </div>
                  </>
                )
              })()}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
