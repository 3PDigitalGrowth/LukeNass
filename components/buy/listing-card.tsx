'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Bed, Bath, Car } from 'lucide-react'

interface ListingCardProps {
  listing: {
    id: number
    address: string
    suburb: string
    price: number
    beds: number
    baths: number
    cars: number
    image: string
    status: string | null
    description: string
  }
}

export function ListingCard({ listing }: ListingCardProps) {
  return (
    <motion.div whileHover={{ y: -8 }} className="group cursor-pointer">
      <div className="rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-card border border-border">
        {/* Image container */}
        <div className="relative h-64 bg-muted overflow-hidden">
          <Image
            src={listing.image || "/placeholder.svg"}
            alt={listing.address}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {listing.status && (
            <div className="absolute top-3 right-3 z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
                  listing.status === 'New'
                    ? 'bg-primary'
                    : listing.status === 'Under Offer'
                      ? 'bg-amber-500'
                      : 'bg-muted-foreground'
                }`}
              >
                {listing.status}
              </motion.div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Price */}
          <div className="mb-3">
            <p className="text-2xl font-bold text-primary tracking-tighter">
              ${(listing.price / 1_000_000).toFixed(2)}M
            </p>
          </div>

          {/* Address */}
          <div className="mb-3">
            <h3 className="font-serif font-semibold text-foreground text-lg tracking-tighter">{listing.address}</h3>
            <p className="text-sm text-foreground/60">{listing.suburb}</p>
          </div>

          {/* Description */}
          <p className="text-sm text-foreground/60 mb-4">{listing.description}</p>

          {/* Specs */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1 text-foreground/70">
                <Bed className="h-4 w-4 text-primary" />
                <span>{listing.beds}</span>
              </div>
              <div className="flex items-center gap-1 text-foreground/70">
                <Bath className="h-4 w-4 text-primary" />
                <span>{listing.baths}</span>
              </div>
              <div className="flex items-center gap-1 text-foreground/70">
                <Car className="h-4 w-4 text-primary" />
                <span>{listing.cars}</span>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} className="text-primary font-semibold text-sm hover:text-primary/80">
              View →
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
