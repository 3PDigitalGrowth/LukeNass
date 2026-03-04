"use client"

import type React from "react"
import { useState, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Lock, Eye, Star, Sparkles, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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

const innerCircleProperties = [
  {
    id: 1,
    image: "/luxury-modern-home-with-pool-perth-hills-sunset.jpg",
    title: "Panoramic Hilltop Estate",
    address: "Roleystone",
    price: "$2.4M - $2.6M",
    badge: "The Inner Circle",
    badgeColor: "bg-amber-500/90",
    status: "Preview Phase",
    beds: 5,
    baths: 4,
    area: "4,200m²",
    isBlurred: false,
  },
  {
    id: 2,
    image: "/contemporary-architect-designed-home-perth.jpg",
    title: "Architect's Masterpiece",
    address: "Kelmscott",
    price: "$1.85M - $2.1M",
    badge: "Preview Phase",
    badgeColor: "bg-primary/90",
    status: "Coming Soon",
    beds: 4,
    baths: 3,
    area: "1,800m²",
    isBlurred: false,
  },
  {
    id: 3,
    image: "/heritage-character-home-large-garden-perth.jpg",
    title: "Heritage Grandeur",
    address: "Armadale",
    price: "Price on Application",
    badge: "The Inner Circle",
    badgeColor: "bg-amber-500/90",
    status: "Exclusive",
    beds: 6,
    baths: 4,
    area: "3,500m²",
    isBlurred: true,
  },
  {
    id: 4,
    image: "/modern-minimalist-home-bushland-setting.jpg",
    title: "Bushland Sanctuary",
    address: "Bedfordale",
    price: "$1.4M - $1.55M",
    badge: "Preview Phase",
    badgeColor: "bg-primary/90",
    status: "Early Access",
    beds: 4,
    baths: 3,
    area: "2,100m²",
    isBlurred: false,
  },
  {
    id: 5,
    image: "/luxury-vineyard-estate-property-perth-hills.jpg",
    title: "Vineyard Estate",
    address: "Roleystone",
    price: "Expression of Interest",
    badge: "The Inner Circle",
    badgeColor: "bg-amber-500/90",
    status: "Members Only",
    beds: 5,
    baths: 5,
    area: "8,000m²",
    isBlurred: true,
  },
]

function JoinInnerCircleDialog({ trigger }: { trigger: React.ReactNode }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    buyingTimeline: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            Join The Inner Circle
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Get exclusive early access to off-market properties before they hit the public market.
          </DialogDescription>
        </DialogHeader>
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center"
          >
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">Welcome to The Inner Circle</h3>
            <p className="text-muted-foreground">
              You now have access to our exclusive off-market listings. Check your email for your private access link.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div>
              <Input
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="bg-muted/50"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="bg-muted/50"
              />
            </div>
            <div>
              <Input
                type="tel"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="bg-muted/50"
              />
            </div>
            <div>
              <select
                value={formData.buyingTimeline}
                onChange={(e) => setFormData({ ...formData, buyingTimeline: e.target.value })}
                required
                className="w-full h-10 px-3 rounded-md border border-input bg-muted/50 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <option value="">When are you looking to buy?</option>
                <option value="immediately">Ready to buy now</option>
                <option value="1-3months">Within 1-3 months</option>
                <option value="3-6months">Within 3-6 months</option>
                <option value="6-12months">Within 6-12 months</option>
              </select>
            </div>
            <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white">
              <Lock className="h-4 w-4 mr-2" />
              Unlock Exclusive Access
            </Button>
            <p className="text-xs text-center text-muted-foreground">
              By joining, you agree to receive property updates. Unsubscribe anytime.
            </p>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function InnerCircleGallery() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const { scrollXProgress } = useScroll({ container: scrollContainerRef })
  const progressWidth = useTransform(scrollXProgress, [0, 1], ["0%", "100%"])

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-muted/30 to-background overflow-hidden" id="inner-circle">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-4 bg-amber-500/20 text-amber-700 border-amber-500/30">
              <Lock className="h-3 w-3 mr-1" />
              Members Only
            </Badge>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tighter"
          >
            The Inner Circle
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exclusive early access to off-market and pre-listing properties. See what others can&apos;t.
          </motion.p>
        </motion.div>

        {/* Scroll Navigation */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{innerCircleProperties.length} Exclusive Listings</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("left")}
              className="h-10 w-10 rounded-full border-border/50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => scroll("right")}
              className="h-10 w-10 rounded-full border-border/50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="h-1 bg-muted rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full"
            style={{ width: progressWidth }}
          />
        </div>

        {/* Horizontal Scroll Gallery */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {innerCircleProperties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="flex-shrink-0 w-[340px] md:w-[400px] snap-start"
            >
              <Card className="group overflow-hidden border-border/30 hover:shadow-2xl transition-all duration-500 h-full relative shadow-xl">
                {/* Property Image with optional blur */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className={`object-cover w-full h-full transition-all duration-500 ${
                      property.isBlurred ? "blur-md scale-105" : "group-hover:scale-105"
                    }`}
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className={`${property.badgeColor} text-white border-0 shadow-lg`}>
                      {property.badge === "The Inner Circle" && <Star className="h-3 w-3 mr-1" />}
                      {property.badge === "Preview Phase" && <Eye className="h-3 w-3 mr-1" />}
                      {property.badge}
                    </Badge>
                    <Badge variant="secondary" className="bg-black/50 backdrop-blur-sm text-white border-0">
                      {property.status}
                    </Badge>
                  </div>

                  {/* Blur Overlay with CTA */}
                  {property.isBlurred && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-[2px]">
                      <Lock className="h-10 w-10 text-white mb-3" />
                      <p className="text-white font-medium text-center px-4 mb-4">
                        Join the Inner Circle to unlock Off-Market listings
                      </p>
                      <JoinInnerCircleDialog
                        trigger={
                          <Button className="bg-amber-500 hover:bg-amber-600 text-white shadow-lg">
                            <Sparkles className="h-4 w-4 mr-2" />
                            Unlock Access
                          </Button>
                        }
                      />
                    </div>
                  )}

                  {/* Price Badge */}
                  {!property.isBlurred && (
                    <div className="absolute bottom-4 left-4">
                      <span className="font-serif font-semibold text-white text-lg drop-shadow-lg">
                        {property.price}
                      </span>
                    </div>
                  )}
                </div>

                <CardContent className="p-5">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg text-card-foreground mb-1">{property.title}</h3>
                    <p className="text-muted-foreground text-sm">{property.address}</p>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pt-4 border-t border-border">
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                    <span>{property.area}</span>
                  </div>

                  {property.isBlurred ? (
                    <JoinInnerCircleDialog
                      trigger={
                        <Button
                          variant="outline"
                          className="w-full border-amber-500/50 text-amber-600 hover:bg-amber-500/10 bg-transparent"
                        >
                          <Lock className="h-4 w-4 mr-2" />
                          Request Access
                        </Button>
                      }
                    />
                  ) : (
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      View Property
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Final CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="flex-shrink-0 w-[340px] md:w-[400px] snap-start"
          >
            <Card className="h-full border-dashed border-2 border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-primary/5 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 flex items-center justify-center mb-4">
                <Sparkles className="h-8 w-8 text-amber-500" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">Want Early Access?</h3>
              <p className="text-muted-foreground mb-6">
                Join The Inner Circle and be the first to know about exclusive off-market properties in Perth&apos;s SE
                Corridor.
              </p>
              <JoinInnerCircleDialog
                trigger={
                  <Button className="bg-amber-500 hover:bg-amber-600 text-white">
                    <Lock className="h-4 w-4 mr-2" />
                    Join The Inner Circle
                  </Button>
                }
              />
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
