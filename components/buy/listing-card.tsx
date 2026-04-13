'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Bed, Bath, Car, Ruler } from 'lucide-react'

interface ListingCardProps {
  listing: {
    id: number
    address: string
    suburb: string
    price: number
    priceDisplay?: string
    beds: number
    baths: number
    cars: number
    image: string
    status: string | null
    description: string
    landArea?: number | null
  }
}

export function ListingCard({ listing }: ListingCardProps) {
  const priceLabel =
    listing.priceDisplay ||
    (listing.price > 0
      ? listing.price >= 1_000_000
        ? `$${(listing.price / 1_000_000).toFixed(2)}M`
        : `$${listing.price.toLocaleString()}`
      : 'Contact Agent')

  return (
    <Link href={`/property/${listing.id}`} className="block h-full">
      <motion.div whileHover={{ y: -8 }} className="group cursor-pointer h-full">
        <div className="h-full flex flex-col rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-card border border-border">
          <div className="relative h-64 bg-muted overflow-hidden shrink-0">
            {listing.image ? (
              <img
                src={listing.image}
                alt={listing.address}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full text-muted-foreground text-sm">
                No image available
              </div>
            )}
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

          <div className="p-4 flex flex-col flex-1">
            <div className="mb-3">
              <p className="text-2xl font-bold text-primary tracking-tighter">{priceLabel}</p>
            </div>

            <div className="mb-3">
              <h3 className="font-serif font-semibold text-foreground text-lg tracking-tighter">{listing.address}</h3>
              <p className="text-sm text-foreground/60">{listing.suburb}</p>
            </div>

            {listing.description && (
              <p className="text-sm text-foreground/60 mb-4 line-clamp-2">{listing.description}</p>
            )}

            <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
              <div className="flex items-center gap-4 text-sm">
                {listing.beds > 0 && (
                  <div className="flex items-center gap-1 text-foreground/70">
                    <Bed className="h-4 w-4 text-primary" />
                    <span>{listing.beds}</span>
                  </div>
                )}
                {listing.baths > 0 && (
                  <div className="flex items-center gap-1 text-foreground/70">
                    <Bath className="h-4 w-4 text-primary" />
                    <span>{listing.baths}</span>
                  </div>
                )}
                {listing.cars > 0 && (
                  <div className="flex items-center gap-1 text-foreground/70">
                    <Car className="h-4 w-4 text-primary" />
                    <span>{listing.cars}</span>
                  </div>
                )}
                {listing.landArea != null && listing.landArea > 0 && (
                  <div className="flex items-center gap-1 text-foreground/70">
                    <Ruler className="h-4 w-4 text-primary" />
                    <span>{Math.round(listing.landArea)}m²</span>
                  </div>
                )}
              </div>
              <span className="text-primary font-semibold text-sm group-hover:text-primary/80">
                View →
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  )
}
