"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Eye, ArrowRight } from "lucide-react"

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

const tabs = ["Off-Market & Upcoming", "Live Listings", "Historical Success"]

const properties = {
  "Off-Market & Upcoming": [
    {
      id: 1,
      image: "/luxury-home-roleystone-bushland-views.jpg",
      title: "Bushland Sanctuary",
      location: "Roleystone",
      price: "Price on Application",
      badge: "Coming Soon",
      beds: 5,
      baths: 3,
      area: "4,200m²",
    },
    {
      id: 2,
      image: "/modern-contemporary-home-kelmscott-hills.jpg",
      title: "Contemporary Elegance",
      location: "Kelmscott",
      price: "$985,000 - $1.05M",
      badge: "Off-Market",
      beds: 4,
      baths: 2,
      area: "890m²",
    },
    {
      id: 3,
      image: "/family-home-armadale-perth.jpg",
      title: "Family Haven",
      location: "Armadale",
      price: "$750,000+",
      badge: "Upcoming",
      beds: 4,
      baths: 2,
      area: "720m²",
    },
  ],
  "Live Listings": [
    {
      id: 4,
      image: "/stunning-hillside-home-perth-views.jpg",
      title: "Hillside Retreat",
      location: "Roleystone",
      price: "$1,150,000",
      badge: "New",
      beds: 4,
      baths: 3,
      area: "2,100m²",
    },
    {
      id: 5,
      image: "/modern-family-home-swimming-pool.jpg",
      title: "Pool Paradise",
      location: "Kelmscott",
      price: "$895,000",
      badge: "Open Sat",
      beds: 4,
      baths: 2,
      area: "650m²",
    },
    {
      id: 6,
      image: "/charming-cottage-home-garden.jpg",
      title: "Character Charm",
      location: "Seville Grove",
      price: "$680,000",
      badge: "Under Offer",
      beds: 3,
      baths: 2,
      area: "550m²",
    },
  ],
  "Historical Success": [
    {
      id: 7,
      image: "/luxury-estate-property-sold.jpg",
      title: "Record Sale",
      location: "Roleystone",
      price: "Sold $1.45M",
      badge: "Record",
      beds: 5,
      baths: 4,
      area: "5,000m²",
    },
    {
      id: 8,
      image: "/beautiful-home-sold-success.jpg",
      title: "Above Asking",
      location: "Kelmscott",
      price: "Sold $920,000",
      badge: "+8% Above",
      beds: 4,
      baths: 2,
      area: "800m²",
    },
    {
      id: 9,
      image: "/quick-sale-property-real-estate.jpg",
      title: "7 Day Sale",
      location: "Armadale",
      price: "Sold $785,000",
      badge: "Fast Sale",
      beds: 4,
      baths: 2,
      area: "680m²",
    },
  ],
}

export function PropertyEcosystem() {
  const [activeTab, setActiveTab] = useState(tabs[0])

  return (
    <section className="py-20 lg:py-28 bg-muted/30" id="buying">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tighter">
            The Property Portfolio
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Exclusive access to properties before they hit the market
          </p>
        </motion.div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-card text-muted-foreground hover:bg-muted border-0 shadow-md"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Property Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {properties[activeTab as keyof typeof properties].map((property) => (
              <motion.div key={property.id} variants={itemVariants}>
                <Card className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 left-4 bg-secondary text-secondary-foreground">
                      {property.badge}
                    </Badge>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <Button
                      size="sm"
                      variant="secondary"
                      className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Quick View
                    </Button>
                  </div>
                  <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg text-card-foreground">{property.title}</h3>
                        <p className="text-muted-foreground text-sm">{property.location}</p>
                      </div>
                      <p className="font-serif font-semibold text-primary">{property.price}</p>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-4 pt-4 border-t border-border">
                      <span>{property.beds} Beds</span>
                      <span>{property.baths} Baths</span>
                      <span>{property.area}</span>
                    </div>
                    <Button variant="ghost" className="w-full mt-4 group/btn">
                      View Strategy
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
