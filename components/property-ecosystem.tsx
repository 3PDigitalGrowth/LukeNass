"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLeadModal } from "@/components/global/lead-capture-provider"
import { useListings } from "@/lib/hooks/use-listings"
import type { Property } from "@/lib/types/property"
import { ArrowRight, CheckCircle2, MessageSquareText, Phone, Bed, Bath, Car, Ruler, Loader2, Calendar, Clock } from "lucide-react"
import Link from "next/link"

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

function formatOpenHomeShort(start: string): string {
  try {
    const d = new Date(start.replace(' ', 'T'))
    return d.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' }) +
      ' ' + d.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true })
  } catch {
    return ''
  }
}

function PropertyCard({ property, variant }: { property: Property; variant: "live" | "sold" }) {
  const cars = property.attributes.totalCars ?? property.attributes.garages ?? property.attributes.carports ?? 0
  const isSold = variant === "sold"
  const futureOpenHomes = property.opentimes.filter((ot) => {
    try { return new Date(ot.end.replace(' ', 'T')) > new Date() } catch { return false }
  })

  return (
    <Link href={`/property/${property.listingId}`}>
      <Card className="group h-full overflow-hidden border border-border/40 bg-card shadow-md hover:-translate-y-1 hover:shadow-2xl transition-all duration-500">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {property.primaryImage ? (
            <img
              src={property.primaryImage}
              alt={property.address.display}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-muted-foreground">
              No image available
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          {property.underContract && (
            <Badge className="absolute top-4 right-4 bg-amber-500 text-white border-0">Under Offer</Badge>
          )}

          {!isSold && futureOpenHomes.length > 0 && !property.underContract && (
            <Badge className="absolute top-4 right-4 bg-primary text-primary-foreground border-0 shadow-lg">
              <Calendar className="h-3 w-3 mr-1" />
              Open Home
            </Badge>
          )}

          <Badge className="absolute top-4 left-4 bg-card/90 text-foreground border border-white/20 backdrop-blur-sm shadow-sm">
            {isSold ? "Sold" : property.subcategory || "For Sale"}
          </Badge>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/75 mb-1">
                {isSold ? "Historical Success" : "Current Listing"}
              </p>
              <h3 className="font-serif text-xl lg:text-2xl text-white leading-tight">
                {property.address.streetNumber} {property.address.streetName}
              </h3>
            </div>
            {isSold && (
              <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                <CheckCircle2 className="h-5 w-5" />
              </div>
            )}
          </div>
        </div>

        <CardContent className="p-6 flex flex-col">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <p className="text-sm text-muted-foreground mb-1">
                {property.address.suburb} {property.address.stateRegion} {property.address.postcode}
              </p>
              <p className="font-serif text-xl font-semibold text-primary">
                {isSold ? (property.soldPrice || "SOLD") : (property.price.display || "Contact Agent")}
              </p>
            </div>
            {isSold && (
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-primary shrink-0">
                Sold Result
              </Badge>
            )}
          </div>

          {!isSold && futureOpenHomes.length > 0 && (
            <div className="space-y-1.5 mb-4">
              {futureOpenHomes.slice(0, 2).map((ot, idx) => (
                <div key={idx} className="flex items-center gap-2 text-sm text-primary font-medium">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  <span>{formatOpenHomeShort(ot.start)}</span>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 pt-5 border-t border-border/60">
            {property.attributes.bedrooms != null && (
              <div className="rounded-lg bg-muted/50 px-3 py-3 text-center">
                <Bed className="h-4 w-4 mx-auto mb-1 text-primary" />
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">Beds</div>
                <div className="font-semibold text-foreground">{property.attributes.bedrooms}</div>
              </div>
            )}
            {property.attributes.bathrooms != null && (
              <div className="rounded-lg bg-muted/50 px-3 py-3 text-center">
                <Bath className="h-4 w-4 mx-auto mb-1 text-primary" />
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">Baths</div>
                <div className="font-semibold text-foreground">{property.attributes.bathrooms}</div>
              </div>
            )}
            {cars > 0 && (
              <div className="rounded-lg bg-muted/50 px-3 py-3 text-center">
                <Car className="h-4 w-4 mx-auto mb-1 text-primary" />
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">Cars</div>
                <div className="font-semibold text-foreground">{cars}</div>
              </div>
            )}
            {property.attributes.landArea != null && (
              <div className="rounded-lg bg-muted/50 px-3 py-3 text-center">
                <Ruler className="h-4 w-4 mx-auto mb-1 text-primary" />
                <div className="text-xs uppercase tracking-wide text-muted-foreground mb-0.5">Land</div>
                <div className="font-semibold text-foreground">{Math.round(property.attributes.landArea)}m²</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function PropertyEcosystem() {
  const [activeTab, setActiveTab] = useState<PortfolioTab>(tabs[0])
  const { openLeadModal } = useLeadModal()

  const { properties: currentListings, loading: loadingCurrent } = useListings("current", 12)
  const { properties: soldListings, loading: loadingSold } = useListings("sold", 12)

  const isLive = activeTab === "Live Listings"
  const activeProperties = isLive ? currentListings : soldListings
  const isLoading = isLive ? loadingCurrent : loadingSold

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
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-16"
            >
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </motion.div>
          ) : isLive && activeProperties.length === 0 ? (
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
                <motion.div key={property.listingId} variants={itemVariants}>
                  <PropertyCard property={property} variant={isLive ? "live" : "sold"} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
