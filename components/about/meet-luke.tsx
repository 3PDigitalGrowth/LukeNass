'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useLeadModal } from '@/components/global/lead-capture-provider'
import { motion } from 'framer-motion'
import { Award } from 'lucide-react'

export function MeetLuke() {
  const { openLeadModal } = useLeadModal()

  return (
    <section className="py-20 lg:py-28 bg-card" id="meet-luke">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Luke's Photo & Quick Facts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
              <Image
                src="/luke-nass-portrait.png"
                alt="Luke Nass, Licensee & Principal"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-background border border-border/50">
                <p className="text-sm font-medium text-muted-foreground mb-1">Title</p>
                <p className="text-lg font-bold text-foreground">Licensee / Owner</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border/50">
                <p className="text-sm font-medium text-muted-foreground mb-1">Local Experience</p>
                <p className="text-lg font-bold text-foreground">Since 1987</p>
              </div>
              <div className="p-4 rounded-lg bg-background border border-border/50 flex items-center gap-3">
                <Award className="w-5 h-5 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Recognition</p>
                  <p className="text-lg font-bold text-foreground">REIWA Award Achiever</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Luke's Positioning Copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tighter">
              Meet Luke
            </h2>

            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 font-serif italic text-xl">
                "I believe people select us because they know we will act in their best interests with the highest integrity at all times. I personally guarantee it."
              </p>

              <div className="mb-8">
                <p className="text-foreground font-serif text-lg mb-1">Luke Nass</p>
                <p className="text-sm text-muted-foreground">Licensee / Founder</p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Since founding Luke Nass Real Estate in 1996, I&apos;ve dedicated decades to mastering the Perth Hills market.
                My commitment has remained unwavering: put our clients first, always. This approach has built lasting
                relationships across Roleystone, Kelmscott, and the surrounding suburbs.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Our longevity isn't luck—it's the result of consistent strategy, ethical practice, and an obsessive focus on results. We've helped hundreds of families achieve their goals, and our 98% list-to-sell ratio reflects our dedication to excellence.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Whether you're buying, selling, or investing, you'll work with an agent who knows this market inside out and who will fight for your interests every single day.
              </p>
            </div>

            <Button
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold py-6 px-8 text-lg"
              onClick={() =>
                openLeadModal({
                  type: 'seller-strategy',
                  source: 'Meet Luke',
                  metadata: {
                    Agent: 'Luke Nass',
                    Topic: 'Strategy Session',
                  },
                  defaults: {
                    message: 'I would like to request a strategy session with Luke.',
                  },
                  recipients: ['luke@lukenass.com.au'],
                })
              }
            >
              Request a Strategy Session with Luke
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
