'use client'

import { motion } from 'framer-motion'
import { ArrowRight, TrendingUp, TreePine } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AreaGuidance() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-foreground mb-12 tracking-tighter">
            Buying in the Perth Hills vs The Valley
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {/* The Hills */}
            <div className="p-8 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-primary/20">
                  <TreePine className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground tracking-tight">The Hills</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="font-semibold text-foreground mb-2">Key Areas:</p>
                  <p className="text-muted-foreground">Roleystone, Bedfordale, Mount Nasura, Kelmscott</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Character:</p>
                  <p className="text-muted-foreground">Elevated positions, bushland setting, larger blocks, newer architecture</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Why Buyers Choose:</p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Panoramic views and bushland privacy</li>
                    <li>• Modern home design</li>
                    <li>• Premium investment trajectory</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Price Range:</p>
                  <p className="text-primary font-bold">$900K - $1.8M+</p>
                </div>
              </div>

              <Button variant="outline" className="w-full justify-between group bg-transparent">
                Explore The Hills
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* The Valley */}
            <div className="p-8 rounded-xl bg-card border border-border/50 shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-lg bg-secondary/20">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-foreground tracking-tight">The Valley</h3>
              </div>

              <div className="space-y-4 mb-8">
                <div>
                  <p className="font-semibold text-foreground mb-2">Key Areas:</p>
                  <p className="text-muted-foreground">Armadale, Seville Grove, Maddington, Gosnells</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Character:</p>
                  <p className="text-muted-foreground">Family-friendly, established amenities, mixed architecture, accessible locations</p>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Why Buyers Choose:</p>
                  <ul className="text-muted-foreground space-y-1 text-sm">
                    <li>• Strong value proposition</li>
                    <li>• Family-oriented communities</li>
                    <li>• Development potential</li>
                  </ul>
                </div>

                <div>
                  <p className="font-semibold text-foreground mb-2">Price Range:</p>
                  <p className="text-secondary font-bold">$600K - $950K</p>
                </div>
              </div>

              <Button variant="outline" className="w-full justify-between group bg-transparent">
                Explore The Valley
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
