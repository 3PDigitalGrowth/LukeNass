'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Home, TrendingUp, TreePine } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLeadModal } from '@/components/global/lead-capture-provider'

export function AreaGuidance() {
  const { openLeadModal } = useLeadModal()

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-4xl mb-12">
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-4 tracking-tighter">
              Buying in Perth&apos;s Southeast Corridor
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Perth&apos;s southeast corridor offers an exceptional mix of lifestyle and price points, from affordable family
              living and smart first-home opportunities through to luxury residences, acreage retreats, and rare waterfront
              buying options. Whether you&apos;re searching in Roleystone, Bedfordale, Mount Nasura, Kelmscott, Armadale,
              Seville Grove, Maddington, or Gosnells, we help you compare the opportunities clearly and buy with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            <div className="p-8 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-secondary/20">
                  <Home className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground tracking-tight">Affordable Family Living</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="font-semibold text-foreground mb-2">Key Areas:</p>
                  <p className="text-muted-foreground">Armadale, Seville Grove, Maddington, Gosnells</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Best For:</p>
                  <p className="text-muted-foreground">First-home buyers, families, and investors seeking value with everyday convenience</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Highlights:</p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Established amenities and transport access</li>
                    <li>• Family-friendly neighbourhoods and schooling options</li>
                    <li>• Strong value across a broad range of home types</li>
                  </ul>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full justify-between group bg-transparent"
                onClick={() =>
                  openLeadModal({
                    type: 'buyer-guidance',
                    source: 'Buy Area Guidance',
                    defaults: {
                      segment: 'Affordable Family Living',
                    },
                    metadata: {
                      Segment: 'Affordable Family Living',
                      Areas: 'Armadale, Seville Grove, Maddington, Gosnells',
                    },
                  })
                }
              >
                Explore Family Value
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="p-8 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/20">
                  <TreePine className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground tracking-tight">Lifestyle and Acreage Homes</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="font-semibold text-foreground mb-2">Key Areas:</p>
                  <p className="text-muted-foreground">Roleystone, Bedfordale, Mount Nasura, Kelmscott</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Best For:</p>
                  <p className="text-muted-foreground">Buyers wanting larger blocks, bushland outlooks, and a stronger lifestyle feel</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Highlights:</p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Elevated positions, privacy, and room to grow</li>
                    <li>• A mix of character homes, family residences, and acreage</li>
                    <li>• Lifestyle-driven buying with long-term appeal</li>
                  </ul>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full justify-between group bg-transparent"
                onClick={() =>
                  openLeadModal({
                    type: 'buyer-guidance',
                    source: 'Buy Area Guidance',
                    defaults: {
                      segment: 'Lifestyle and Acreage Homes',
                    },
                    metadata: {
                      Segment: 'Lifestyle and Acreage Homes',
                      Areas: 'Roleystone, Bedfordale, Mount Nasura, Kelmscott',
                    },
                  })
                }
              >
                Explore Lifestyle Homes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="p-8 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all md:col-span-2 xl:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/20">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground tracking-tight">Luxury, Land, and Prestige</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="font-semibold text-foreground mb-2">Across the Corridor:</p>
                  <p className="text-muted-foreground">From premium family homes to acreage estates and standout waterfront opportunities</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Best For:</p>
                  <p className="text-muted-foreground">Upsizers and discerning buyers chasing space, quality finishes, and unique positions</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Highlights:</p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Premium stock with strong lifestyle appeal</li>
                    <li>• Diverse options from luxury homes to large landholdings</li>
                    <li>• A corridor broad enough to match ambition with budget</li>
                  </ul>
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full justify-between group bg-transparent"
                onClick={() =>
                  openLeadModal({
                    type: 'buyer-guidance',
                    source: 'Buy Area Guidance',
                    defaults: {
                      segment: 'Luxury, Land, and Prestige',
                    },
                    metadata: {
                      Segment: 'Luxury, Land, and Prestige',
                      Areas: "Across Perth's southeast corridor",
                    },
                  })
                }
              >
                Explore Premium Opportunities
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
