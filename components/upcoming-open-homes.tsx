"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
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
import { Calendar, Clock, MapPin, Users, CheckCircle } from "lucide-react"

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

const openHomes = [
  {
    id: 1,
    image: "/modern-home-exterior-perth-hills.jpg",
    title: "Contemporary Family Home",
    address: "24 Brookton Highway, Roleystone",
    price: "$1,150,000 - $1,250,000",
    date: "Saturday, 18 Jan",
    time: "11:00am - 11:45am",
    beds: 4,
    baths: 3,
    area: "2,100m²",
    registrations: 12,
  },
  {
    id: 2,
    image: "/luxury-home-swimming-pool-perth.jpg",
    title: "Pool Paradise Estate",
    address: "8 Valley View Road, Kelmscott",
    price: "$895,000 - $945,000",
    date: "Saturday, 18 Jan",
    time: "12:00pm - 12:45pm",
    beds: 4,
    baths: 2,
    area: "650m²",
    registrations: 8,
  },
  {
    id: 3,
    image: "/charming-cottage-garden-perth.jpg",
    title: "Character Cottage",
    address: "15 Orchard Lane, Armadale",
    price: "$680,000 - $720,000",
    date: "Sunday, 19 Jan",
    time: "1:00pm - 1:45pm",
    beds: 3,
    baths: 2,
    area: "550m²",
    registrations: 6,
  },
]

function RegisterDialog({ property }: { property: (typeof openHomes)[0] }) {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          Register for Open Home
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl">Register for Open Home</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {property.address}
            <br />
            <span className="font-medium text-foreground">
              {property.date} at {property.time}
            </span>
          </DialogDescription>
        </DialogHeader>
        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-8 text-center"
          >
            <CheckCircle className="h-16 w-16 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-xl font-semibold mb-2">You&apos;re Registered!</h3>
            <p className="text-muted-foreground">We&apos;ll send you a reminder before the open home. See you there!</p>
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
            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Confirm Registration
            </Button>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}

export function UpcomingOpenHomes() {
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
            Register your attendance to receive priority updates and property information packs
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {openHomes.map((property) => (
            <motion.div key={property.id} variants={itemVariants}>
              <Card className="group overflow-hidden border-border/30 hover:shadow-2xl transition-all duration-500 h-full flex flex-col shadow-lg">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    <Badge className="bg-primary text-primary-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {property.date}
                    </Badge>
                    <Badge variant="secondary" className="bg-card/90 backdrop-blur-sm text-card-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {property.time}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <Badge variant="outline" className="bg-card/90 backdrop-blur-sm text-card-foreground border-0">
                      <Users className="h-3 w-3 mr-1" />
                      {property.registrations} registered
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-5 flex flex-col flex-1">
                  <div className="mb-3">
                    <h3 className="font-semibold text-lg text-card-foreground mb-1">{property.title}</h3>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {property.address}
                    </p>
                  </div>
                  <p className="font-serif font-semibold text-primary text-lg mb-4">{property.price}</p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4 pt-4 border-t border-border">
                    <span>{property.beds} Beds</span>
                    <span>{property.baths} Baths</span>
                    <span>{property.area}</span>
                  </div>
                  <div className="mt-auto">
                    <RegisterDialog property={property} />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10"
        >
          <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 bg-transparent">
            View All Open Homes
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
