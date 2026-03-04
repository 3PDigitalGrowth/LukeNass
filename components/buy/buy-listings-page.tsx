'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { FilterBar } from './filter-bar'
import { ListingCard } from './listing-card'
import { MapView } from './map-view'
import { InnerCircleLeadMagnet } from './inner-circle-lead-magnet'

interface ListingFilters {
  priceRange: [number, number]
  suburbs: string[]
  beds: number | null
  baths: number | null
  propertyType: string[]
  searchQuery: string
}

// Sample property data
const sampleListings = [
  {
    id: 1,
    address: '42 Mountain View Drive',
    suburb: 'Roleystone',
    price: 1_250_000,
    beds: 4,
    baths: 2,
    cars: 2,
    image: '/luxury-modern-home-perth-hills-aerial-cinematic.jpg',
    status: 'New',
    description: 'Stunning modern home with panoramic views',
  },
  {
    id: 2,
    address: '28 Hillside Avenue',
    suburb: 'Kelmscott',
    price: 895_000,
    beds: 3,
    baths: 2,
    cars: 2,
    image: '/modern-contemporary-home-kelmscott-hills.jpg',
    status: 'Under Offer',
    description: 'Contemporary architect-designed residence',
  },
  {
    id: 3,
    address: '15 Heritage Lane',
    suburb: 'Armadale',
    price: 750_000,
    beds: 3,
    baths: 1,
    cars: 1,
    image: '/charming-cottage-home-garden.jpg',
    status: null,
    description: 'Charming character home on large block',
  },
  {
    id: 4,
    address: '56 Parkside Crescent',
    suburb: 'Roleystone',
    price: 1_450_000,
    beds: 5,
    baths: 3,
    cars: 3,
    image: '/luxury-home-swimming-pool-perth.jpg',
    status: 'New',
    description: 'Luxury estate with heated pool',
  },
  {
    id: 5,
    address: '9 Garden Court',
    suburb: 'Bedfordale',
    price: 680_000,
    beds: 3,
    baths: 2,
    cars: 2,
    image: '/modern-family-home-swimming-pool.jpg',
    status: null,
    description: 'Modern family home in established estate',
  },
  {
    id: 6,
    address: '33 Valley View Road',
    suburb: 'Seville Grove',
    price: 625_000,
    beds: 2,
    baths: 2,
    cars: 1,
    image: '/modern-minimalist-home-bushland-setting.jpg',
    status: 'Under Offer',
    description: 'Minimalist home with bushland outlook',
  },
]

export function BuyListingsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid')
  const [filters, setFilters] = useState<ListingFilters>({
    priceRange: [0, 2_000_000],
    suburbs: [],
    beds: null,
    baths: null,
    propertyType: [],
    searchQuery: '',
  })

  const filteredListings = sampleListings.filter((listing) => {
    // Price filter
    if (listing.price < filters.priceRange[0] || listing.price > filters.priceRange[1]) {
      return false
    }

    // Suburb filter
    if (filters.suburbs.length > 0 && !filters.suburbs.includes(listing.suburb)) {
      return false
    }

    // Beds filter
    if (filters.beds !== null && listing.beds < filters.beds) {
      return false
    }

    // Baths filter
    if (filters.baths !== null && listing.baths < filters.baths) {
      return false
    }

    // Search query filter
    if (filters.searchQuery && !listing.address.toLowerCase().includes(filters.searchQuery.toLowerCase()) && !listing.suburb.toLowerCase().includes(filters.searchQuery.toLowerCase())) {
      return false
    }

    return true
  })

  return (
    <div className="pt-24 pb-16">
      <FilterBar filters={filters} setFilters={setFilters} viewMode={viewMode} setViewMode={setViewMode} />

      <div className="container mx-auto px-4 lg:px-8">
        {viewMode === 'grid' ? (
          <>
            <div className="mt-8 mb-6">
              <p className="text-foreground/60">
                Showing <span className="font-semibold text-foreground">{filteredListings.length}</span> properties
              </p>
            </div>

            {filteredListings.length > 0 ? (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2,
                    },
                  },
                }}
              >
                {filteredListings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: {
                        opacity: 1,
                        y: 0,
                        transition: { duration: 0.5 },
                      },
                    }}
                  >
                    <ListingCard listing={listing} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="py-16 text-center">
                <p className="text-foreground/60 mb-6">No properties match your filters.</p>
              </div>
            )}

            <InnerCircleLeadMagnet />
          </>
        ) : (
          <MapView listings={filteredListings} />
        )}
      </div>
    </div>
  )
}
