'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { CheckCircle2, Mail, Phone } from 'lucide-react'

const andrewHighlights = [
  '27+ years of local area knowledge.',
  '27+ years of experience selling and negotiating the very best deal.',
  '27+ years of experience marketing properties to get the optimum final result for you.',
  'A friendly, professional, and informative approach centred on your needs.',
]

export function MeetAndrew() {
  return (
    <section className="py-20 lg:py-28 bg-background" id="meet-andrew">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Andrew's Photo & Quick Facts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl mb-8">
              <Image
                src="/andrew-hill-portrait.png"
                alt="Andrew Hill, Senior Sales Representative"
                width={500}
                height={600}
                className="w-full h-auto object-cover"
              />
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-lg bg-card border border-border/50">
                <p className="text-sm font-medium text-muted-foreground mb-1">Title</p>
                <p className="text-lg font-bold text-foreground">Senior Sales Representative</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border/50">
                <p className="text-sm font-medium text-muted-foreground mb-1">Local Experience</p>
                <p className="text-lg font-bold text-foreground">Since 1999</p>
              </div>
              <div className="p-4 rounded-lg bg-card border border-border/50">
                <p className="text-sm font-medium text-muted-foreground mb-3">Direct Contact</p>
                <div className="space-y-2">
                  <a href="tel:0419600504" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                    <Phone className="w-4 h-4 text-secondary" />
                    <span className="font-medium">0419 600 504</span>
                  </a>
                  <a href="mailto:andrew@lukenass.com.au" className="flex items-center gap-3 text-foreground hover:text-primary transition-colors">
                    <Mail className="w-4 h-4 text-secondary" />
                    <span className="font-medium">andrew@lukenass.com.au</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Andrew's Positioning Copy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-6 tracking-tighter">
              Meet Andrew
            </h2>

            <div className="prose prose-invert max-w-none">
              <div className="mb-8">
                <p className="text-foreground font-serif text-lg mb-1">Andrew Hill</p>
                <p className="text-sm text-muted-foreground">Senior Sales Representative</p>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I commenced my real estate career in 1999 and have loved every minute.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                I have worked for Luke Nass Real Estate for my entire career. The ethos and philosophies Luke has nurtured
                within the company align closely with my own work ethic, creating a genuinely symbiotic working relationship.
                That means our clients always receive the very best and most professional guidance when buying and selling
                property. I pride myself on honesty and integrity.
              </p>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Over the years, I have built a very large client base, many of whom I am lucky enough to now also call
                friends.
              </p>

              <div className="space-y-4 mb-8">
                {andrewHighlights.map((highlight) => (
                  <div key={highlight} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                    <p className="text-lg text-muted-foreground leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold py-6 px-8 text-lg">
                <Link href="/sell#sell-appraisal-form">Request Appraisal</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
