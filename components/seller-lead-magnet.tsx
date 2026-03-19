"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Calendar, CheckCircle2, Handshake, Megaphone, MessageSquareText } from "lucide-react"
import { useLeadModal } from "@/components/global/lead-capture-provider"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function SellerLeadMagnet() {
  const { openLeadModal } = useLeadModal()
  const sellerPillars = [
    {
      icon: Megaphone,
      title: "Campaign Strategy",
      description: "We tailor the positioning, timing, and presentation of your home to create stronger buyer engagement.",
    },
    {
      icon: MessageSquareText,
      title: "Clear Communication",
      description: "You know what is happening, why it matters, and what we recommend at every stage of the campaign.",
    },
    {
      icon: Handshake,
      title: "Negotiation Discipline",
      description: "Every enquiry, inspection, and offer is handled with a structured plan designed to protect your outcome.",
    },
  ]

  return (
    <section
      className="py-20 lg:py-28 relative overflow-hidden"
      id="selling"
      style={{ backgroundColor: "oklch(0.94 0.02 145)" }}
    >
      {/* Subtle grain texture overlay */}
      <div className="absolute inset-0 bg-grain opacity-[0.03] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 lg:order-1"
          >
            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="mb-6">
                <p className="text-sm uppercase tracking-[0.18em] text-primary font-medium mb-3">What Sellers Need Most</p>
                <h3 className="font-serif text-2xl font-semibold text-card-foreground tracking-tight">
                  A strategy that suits the home, the market, and the person selling it.
                </h3>
              </div>

              <div className="space-y-4">
                {sellerPillars.map((pillar) => {
                  const Icon = pillar.icon

                  return (
                    <div key={pillar.title} className="rounded-xl border border-border/50 bg-background/70 p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1">{pillar.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{pillar.description}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Side - Seller Strategy Copy */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="order-1 lg:order-2"
          >
            <motion.span
              variants={itemVariants}
              className="inline-flex items-center gap-2 text-secondary font-medium text-sm uppercase tracking-wider mb-4"
            >
              <Calendar className="w-4 h-4" />
              Seller Strategy
            </motion.span>

            <motion.h2
              variants={itemVariants}
              className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance tracking-tighter"
            >
              Strong results start with
              <br />
              <span className="text-primary">clarity, communication, and strategy.</span>
            </motion.h2>

            <motion.div variants={itemVariants} className="space-y-4 mb-8">
              <p className="text-muted-foreground text-lg leading-relaxed">
                Sellers choose us when they want a boutique team that thinks carefully, communicates clearly, and builds a
                campaign around the strengths of the home rather than relying on a one-size-fits-all formula.
              </p>

              <div className="bg-card/60 backdrop-blur-sm rounded-xl p-5 shadow-lg">
                <h4 className="font-semibold text-card-foreground mb-3">What that means for you:</h4>
                <ul className="space-y-2">
                  {[
                    "A tailored campaign plan built around your property and your goals",
                    "Consistent communication so you always know what is happening and why",
                    "Thoughtful negotiation designed to protect your position and overachieve expectations",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Lead Capture CTA */}
            <motion.div variants={itemVariants}>
              <Button
                size="lg"
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-semibold text-lg px-8 py-6 h-auto shadow-2xl hover:shadow-xl transition-all"
                onClick={() =>
                  openLeadModal({
                    type: "seller-strategy",
                    source: "Seller Lead Magnet",
                    title: "Your Confidential Strategy Session",
                    description:
                      "Tell us a little about your property and Luke or Andy will follow up with a tailored seller strategy conversation.",
                  })
                }
              >
                Request Your Confidential Strategy Session
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div variants={itemVariants} className="flex items-center gap-6 mt-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                No obligation
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                100% confidential
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
