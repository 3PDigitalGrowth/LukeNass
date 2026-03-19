"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLeadModal } from "@/components/global/lead-capture-provider"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

function PrincipalIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="24" cy="14" r="8" />
      <path d="M8 42c0-8.837 7.163-16 16-16s16 7.163 16 16" />
      <path d="M24 26v8" />
      <path d="M20 30l4 4 4-4" />
    </svg>
  )
}

function AIMarketingIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="6" y="6" width="36" height="36" rx="4" />
      <path d="M6 18h36" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <circle cx="18" cy="12" r="2" fill="currentColor" />
      <path d="M14 28l6 8 8-10 8 10" />
      <circle cx="32" cy="26" r="3" />
    </svg>
  )
}

function LocalExpertIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 40l10-16 8 10 10-18 12 24" />
      <circle cx="36" cy="12" r="4" />
      <path d="M16 8l2 4-2 4" />
      <path d="M20 8l-2 4 2 4" />
      <path d="M8 20c4-2 6 2 10 0" />
    </svg>
  )
}

const advantages = [
  {
    icon: PrincipalIcon,
    title: "Principal Access",
    number: "01",
    description:
      "Deal directly with Luke Nass, not an assistant. Every client receives personal attention and strategic guidance from day one.",
    hasChatButton: true,
  },
  {
    icon: AIMarketingIcon,
    title: "AI-Targeted Marketing",
    number: "02",
    description:
      "Reaching the right buyers on their preferred platforms through sophisticated data-driven marketing strategies.",
    hasChatButton: false,
  },
  {
    icon: LocalExpertIcon,
    title: "The Local Deep-Dive",
    number: "03",
    description:
      "Unrivaled knowledge of Perth Hills terrain and lifestyle. From hidden gems to market trends, we know every corner.",
    hasChatButton: false,
  },
]

export function BoutiqueAdvantage() {
  const { openLeadModal } = useLeadModal()

  return (
    <section className="py-20 lg:py-28 bg-muted/30" id="about">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tighter">
            The Boutique Advantage
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Why work with a boutique agency? Because your property deserves more than a number.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {advantages.map((advantage) => (
            <motion.div
              key={advantage.title}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -8 }}
              className="group relative bg-card rounded-2xl p-8 lg:p-10 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden min-h-[320px] flex flex-col"
            >
              <span className="absolute -top-4 -right-2 font-serif text-[140px] lg:text-[180px] font-bold text-muted/20 select-none leading-none pointer-events-none transition-colors group-hover:text-primary/10">
                {advantage.number}
              </span>

              {/* Content */}
              <div className="relative z-10 flex flex-col h-full">
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <advantage.icon className="h-7 w-7" />
                  </div>
                </div>

                <h3 className="font-serif text-2xl font-semibold text-foreground mb-4">{advantage.title}</h3>

                <p className="text-muted-foreground leading-relaxed flex-grow">{advantage.description}</p>

                {advantage.hasChatButton && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <Button
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                      onClick={() =>
                        openLeadModal({
                          type: "team-contact",
                          source: "Boutique Advantage",
                          title: "Chat with Luke",
                          description: "Send a direct message and Luke will respond personally.",
                          recipients: ["luke@lukenass.com.au"],
                          defaults: {
                            teamMember: "Luke Nass",
                          },
                          metadata: {
                            Agent: "Luke Nass",
                          },
                        })
                      }
                    >
                      Chat with Luke
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
