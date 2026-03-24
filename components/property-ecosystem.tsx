"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLeadModal } from "@/components/global/lead-capture-provider"
import { ArrowRight, CheckCircle2, MessageSquareText, Phone } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const tabs = ["Live Listings", "Historical Success"] as const
type PortfolioTab = (typeof tabs)[number]

type HistoricalProperty = {
  id: number
  image: string
  title: string
  location: string
  price: string
  badge: string
  beds: number
  baths: number
  thirdStat?: string
}

const properties = {
  "Live Listings": [],
  "Historical Success": [
    {
      id: 7,
      image: "/11-george-street-kelmscott-sold.png",
      title: "11 George Street",
      location: "Kelmscott WA 6111",
      price: "SOLD",
      badge: "Sold",
      beds: 3,
      baths: 1,
      thirdStat: "1 Car",
    },
    {
      id: 8,
      image: "/21-savage-road-kelmscott-sold.png",
      title: "21 Savage Road",
      location: "Kelmscott WA 6111",
      price: "SOLD",
      badge: "Sold",
      beds: 4,
      baths: 2,
      thirdStat: "2 Car",
    },
    {
      id: 9,
      image: "/16-spencer-road-kelmscott-sold.png",
      title: "16 Spencer Road",
      location: "Kelmscott WA 6111",
      price: "SOLD",
      badge: "Sold",
      beds: 3,
      baths: 1,
    },
  ],
} satisfies Record<PortfolioTab, HistoricalProperty[]>

export function PropertyEcosystem() {
  const [activeTab, setActiveTab] = useState<PortfolioTab>(tabs[0])
  const { openLeadModal } = useLeadModal()
  const activeProperties = properties[activeTab]

  return (
    <section className="py-20 lg:py-28 bg-muted/30" id="buying">
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 lg:mb-12"
        >
          <Badge className="mb-4 bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
            Curated Portfolio
          </Badge>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tighter">
            The Property Portfolio
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto leading-relaxed">
            Explore current market activity and standout past results across Perth&apos;s southeast corridor.
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex justify-center mb-10 lg:mb-12">
          <div className="inline-flex flex-wrap justify-center gap-2 rounded-full border border-border/60 bg-card/80 p-2 shadow-sm backdrop-blur-sm">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-pressed={activeTab === tab}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${
                  activeTab === tab
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Property Grid */}
        <AnimatePresence mode="wait">
          {activeTab === "Live Listings" && activeProperties.length === 0 ? (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="overflow-hidden border border-border/50 bg-gradient-to-br from-card via-card to-primary/5 shadow-xl">
                <CardContent className="p-8 lg:p-12 text-center">
                  <div className="inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                    Live Listings
                  </div>
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-sm">
                    <MessageSquareText className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-serif text-2xl lg:text-4xl font-semibold text-foreground mb-4 tracking-tight">
                    Nothing is currently featured under Live Listings
                  </h3>
                  <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                    If you&apos;re thinking of selling, request a confidential chat with our team. We&apos;re uniquely positioned to
                    develop a tailored sales and marketing strategy designed to attract the best possible price for your home.
                  </p>
                  <div className="grid gap-3 text-sm text-muted-foreground max-w-2xl mx-auto mb-8 lg:grid-cols-3">
                    <div className="rounded-xl border border-border/50 bg-background/70 px-4 py-3">Tailored pricing strategy</div>
                    <div className="rounded-xl border border-border/50 bg-background/70 px-4 py-3">Premium campaign planning</div>
                    <div className="rounded-xl border border-border/50 bg-background/70 px-4 py-3">Negotiation built for results</div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={() =>
                        openLeadModal({
                          type: "strategy-session",
                          source: "Property Portfolio Empty State",
                          title: "Request a Confidential Chat",
                          description:
                            "Share your details and tell us about your property goals. The team will email you a confirmation and follow up personally.",
                          defaults: {
                            reason: "Selling",
                          },
                          metadata: {
                            Context: "Live Listings empty state",
                          },
                        })
                      }
                    >
                      Request a Confidential Chat
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 max-w-xl mx-auto">
                    <Button asChild size="lg" variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary/5">
                      <a href="tel:0418928082">
                        <Phone className="h-4 w-4 mr-2" />
                        Luke 0418 928 082
                      </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary/5">
                      <a href="tel:0419600504">
                        <Phone className="h-4 w-4 mr-2" />
                        Andrew 0419 600 504
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key={activeTab}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
            >
              {activeProperties.map((property) => (
                <motion.div key={property.id} variants={itemVariants}>
                  <Card className="group h-full overflow-hidden border border-border/40 bg-card shadow-md hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                      <Badge className="absolute top-4 left-4 bg-card/90 text-foreground border border-white/20 backdrop-blur-sm shadow-sm">
                        {property.badge}
                      </Badge>
                      <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-white/75 mb-1">Historical Success</p>
                          <h3 className="font-serif text-2xl text-white leading-tight">{property.title}</h3>
                        </div>
                        <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                      </div>
                    </div>
                    <CardContent className="p-6 flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-5">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">{property.location}</p>
                          <p className="font-serif text-xl font-semibold text-primary">{property.price}</p>
                        </div>
                        <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary">
                          Sold Result
                        </Badge>
                      </div>
                      <div className={`grid gap-3 pt-5 border-t border-border/60 ${property.thirdStat ? "grid-cols-3" : "grid-cols-2"}`}>
                        <div className="rounded-lg bg-muted/50 px-3 py-3 text-center">
                          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Beds</div>
                          <div className="font-semibold text-foreground">{property.beds}</div>
                        </div>
                        <div className="rounded-lg bg-muted/50 px-3 py-3 text-center">
                          <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Baths</div>
                          <div className="font-semibold text-foreground">{property.baths}</div>
                        </div>
                        {property.thirdStat && (
                          <div className="rounded-lg bg-muted/50 px-3 py-3 text-center">
                            <div className="text-xs uppercase tracking-wide text-muted-foreground mb-1">Parking</div>
                            <div className="font-semibold text-foreground">{property.thirdStat.replace(" Car", "")}</div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
