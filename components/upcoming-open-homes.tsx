"use client"

import { useMemo } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Home, Phone, Clock, MapPin, Bed, Bath, Car, Loader2 } from "lucide-react"
import { useListings } from "@/lib/hooks/use-listings"
import type { Property } from "@/lib/types/property"
import Link from "next/link"

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
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

function formatOpenTime(start: string, end: string): string {
  try {
    const s = new Date(start)
    const e = new Date(end)
    const day = s.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short' })
    const startTime = s.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true })
    const endTime = e.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true })
    return `${day}, ${startTime} – ${endTime}`
  } catch {
    return ''
  }
}

function OpenHomeCard({ property }: { property: Property }) {
  const cars = property.attributes.totalCars ?? property.attributes.garages ?? property.attributes.carports ?? 0
  const now = new Date()
  const futureOpens = property.opentimes
    .filter((ot) => { try { return new Date(ot.end.replace(' ', 'T')) > now } catch { return false } })
    .sort((a, b) => new Date(a.start.replace(' ', 'T')).getTime() - new Date(b.start.replace(' ', 'T')).getTime())
  const nextOpen = futureOpens[0]

  return (
    <Link href={`/property/${property.listingId}`}>
      <motion.div
        variants={itemVariants}
        className="group rounded-xl border border-border/50 bg-card overflow-hidden shadow-md hover:-translate-y-1 hover:shadow-xl transition-all duration-500"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-muted">
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
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          {nextOpen && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-primary text-primary-foreground border-0 shadow-lg">
                <Calendar className="h-3 w-3 mr-1" />
                Open Home
              </Badge>
            </div>
          )}
          {property.underContract && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-amber-500 text-white border-0">Under Offer</Badge>
            </div>
          )}
        </div>

        <div className="p-5">
          {nextOpen && (
            <div className="flex items-center gap-2 text-sm text-primary font-medium mb-3">
              <Clock className="h-4 w-4" />
              {formatOpenTime(nextOpen.start, nextOpen.end)}
            </div>
          )}

          <h3 className="font-serif text-lg font-semibold text-foreground mb-1 tracking-tight">
            {property.address.streetNumber} {property.address.streetName}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
            <MapPin className="h-3.5 w-3.5" />
            {property.address.suburb} {property.address.stateRegion} {property.address.postcode}
          </div>

          <p className="font-serif text-lg font-semibold text-primary mb-4">
            {property.price.display || 'Contact Agent'}
          </p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground pt-3 border-t border-border/60">
            {property.attributes.bedrooms != null && (
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4 text-primary" />
                <span>{property.attributes.bedrooms}</span>
              </div>
            )}
            {property.attributes.bathrooms != null && (
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4 text-primary" />
                <span>{property.attributes.bathrooms}</span>
              </div>
            )}
            {cars > 0 && (
              <div className="flex items-center gap-1">
                <Car className="h-4 w-4 text-primary" />
                <span>{cars}</span>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  )
}

export function UpcomingOpenHomes() {
  const { properties, loading } = useListings('current', 50)

  const openHomeListings = useMemo(() => {
    const now = new Date()
    return properties
      .filter((p) =>
        p.opentimes.some((ot) => {
          try {
            return new Date(ot.end.replace(' ', 'T')) > now
          } catch {
            return false
          }
        })
      )
      .sort((a, b) => {
        const nextA = a.opentimes
          .map((ot) => new Date(ot.start.replace(' ', 'T')).getTime())
          .filter((t) => t > now.getTime())
          .sort((x, y) => x - y)[0] ?? Infinity
        const nextB = b.opentimes
          .map((ot) => new Date(ot.start.replace(' ', 'T')).getTime())
          .filter((t) => t > now.getTime())
          .sort((x, y) => x - y)[0] ?? Infinity
        return nextA - nextB
      })
  }, [properties])

  return (
    <section className="py-20 lg:py-28 bg-background" id="open-homes">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-4 bg-secondary/20 text-secondary-foreground border-secondary/30">
              <Calendar className="h-3 w-3 mr-1" />
              This Weekend
            </Badge>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tighter"
          >
            Upcoming Open Homes
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {loading
              ? 'Checking for upcoming open homes...'
              : openHomeListings.length > 0
                ? `${openHomeListings.length} open home${openHomeListings.length > 1 ? 's' : ''} scheduled. See the details below.`
                : 'There are currently no open homes scheduled for the coming weekend.'}
          </motion.p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : openHomeListings.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8"
          >
            {openHomeListings.map((property) => (
              <OpenHomeCard key={property.listingId} property={property} />
            ))}
          </motion.div>
        ) : (
          <motion.div
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="max-w-3xl mx-auto rounded-2xl border border-border/50 bg-card p-8 lg:p-10 text-center shadow-lg"
          >
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
              <Home className="h-7 w-7 text-primary" />
            </div>
            <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4 tracking-tight">
              Looking for the right home this weekend?
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed mb-8">
              Let us know your requirements and we&apos;ll help match you with suitable homes across Perth&apos;s southeast corridor,
              including upcoming listings that fit your brief.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <a href="/buy">Share Your Requirements</a>
              </Button>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 max-w-xl mx-auto">
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 bg-transparent">
                <a href="tel:0418928082">
                  <Phone className="h-4 w-4 mr-2" />
                  Luke 0418 928 082
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 bg-transparent">
                <a href="tel:0419600504">
                  <Phone className="h-4 w-4 mr-2" />
                  Andrew 0419 600 504
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  )
}
