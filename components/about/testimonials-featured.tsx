'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'

export function TestimonialsFeatured() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  const testimonials = [
    {
      id: 1,
      quote: "Luke's strategic approach transformed our sale. He kept the campaign focused and made us feel supported from start to finish.",
      name: 'Sarah & Michael Thompson',
      location: 'Roleystone, WA',
      topic: 'Communication',
    },
    {
      id: 2,
      quote: 'After difficult experiences with other agents, Luke restored our confidence with calm guidance and consistent communication.',
      name: 'David Chen',
      location: 'Kelmscott, WA',
      topic: 'Negotiation',
    },
    {
      id: 3,
      quote: 'His local market knowledge and commitment to our goals made all the difference in our transaction.',
      name: 'Emma & James Wilson',
      location: 'Seville Grove, WA',
      topic: 'Local Market Knowledge',
    },
    {
      id: 4,
      quote: 'The whole experience felt thoughtful, professional, and well managed, even in a challenging market.',
      name: 'Robert Matthews',
      location: 'Armadale, WA',
      topic: 'Support',
    }
  ]

  const topics = ['Communication', 'Negotiation', 'Local Market Knowledge', 'Support']
  const filteredTestimonials = activeFilter 
    ? testimonials.filter(t => t.topic === activeFilter)
    : testimonials

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
            Real feedback from real people. Filter by topic to find what matters to you.
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
          {topics.map(topic => (
            <Button
              key={topic}
              onClick={() => setActiveFilter(topic)}
              variant={activeFilter === topic ? 'default' : 'outline'}
              className={activeFilter === topic ? 'bg-primary text-primary-foreground' : ''}
            >
              {topic}
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
              <div className="mb-4">
                <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium">
                  {testimonial.topic}
                </span>
              </div>
              <p className="font-serif text-lg text-foreground italic mb-4">"{testimonial.quote}"</p>
              <div className="pt-4 border-t border-border/50">
                <p className="font-bold text-foreground mb-1">{testimonial.name}</p>
                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
