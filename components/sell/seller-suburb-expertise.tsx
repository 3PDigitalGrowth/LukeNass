"use client"

import { motion } from "framer-motion"
import { MapPin } from "lucide-react"

const areaStrategies = [
  {
    suburb: "Roleystone",
    focus: "Lifestyle homes, larger blocks, and premium family properties",
    strategy:
      "Campaigns here need to sell not just the house, but the setting, land use, and lifestyle value that make Roleystone distinctive.",
  },
  {
    suburb: "Kelmscott",
    focus: "Family homes, practical living, and broad buyer appeal",
    strategy:
      "The strongest campaigns balance value, presentation, and buyer confidence so the property stands out for the right reasons.",
  },
  {
    suburb: "Bedfordale",
    focus: "Acreage, prestige, and lifestyle positioning",
    strategy:
      "Presentation, audience selection, and negotiation discipline matter enormously when the buyer pool is more specialised.",
  },
  {
    suburb: "Armadale and Seville Grove",
    focus: "Owner-occupiers, upgraders, and value-conscious buyers",
    strategy:
      "We focus on clear communication, practical market positioning, and a launch plan designed to create steady buyer momentum.",
  },
]

export function SellerSuburbExpertise() {
  return (
    <section className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mb-12"
        >
          <p className="text-sm uppercase tracking-[0.18em] text-primary font-medium mb-3">Local Seller Knowledge</p>
          <h2 className="text-4xl lg:text-5xl font-serif tracking-tighter mb-4 text-foreground">
            Selling strategy changes by suburb.
          </h2>
          <p className="text-lg text-foreground/60">
            Across Perth&apos;s southeast corridor, buyer motivations vary. That is why we tailor the message, campaign, and
            communication plan to the local market rather than treating every listing the same.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areaStrategies.map((area, index) => (
            <motion.article
              key={area.suburb}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="rounded-2xl border border-border/50 bg-card p-8 shadow-lg"
            >
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-2xl tracking-tight text-foreground">{area.suburb}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{area.focus}</p>
                </div>
              </div>
              <p className="text-foreground/75 leading-relaxed">{area.strategy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
