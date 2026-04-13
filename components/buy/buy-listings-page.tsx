'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ArrowRight, Home, Phone, Loader2 } from 'lucide-react'
import { FilterBar } from './filter-bar'
import { ListingCard } from './listing-card'
import { MapView } from './map-view'
import { InnerCircleLeadMagnet } from './inner-circle-lead-magnet'
import { useListings } from '@/lib/hooks/use-listings'

interface ListingFilters {
  priceRange: [number, number]
  suburbs: string[]
  beds: number | null
  baths: number | null
  propertyType: string[]
  searchQuery: string
}

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

  const { properties, loading, error } = useListings('current', 50)

  const mappedListings = useMemo(
    () =>
      properties.map((p) => ({
        id: p.listingId,
        address: `${p.address.streetNumber} ${p.address.streetName}`.trim(),
        suburb: `${p.address.suburb} ${p.address.stateRegion} ${p.address.postcode}`.trim(),
        price: p.price.match || 0,
        priceDisplay: p.price.display || 'Contact Agent',
        beds: p.attributes.bedrooms ?? 0,
        baths: p.attributes.bathrooms ?? 0,
        cars: p.attributes.totalCars ?? p.attributes.garages ?? p.attributes.carports ?? 0,
        image: p.primaryImage || '',
        status: p.underContract ? 'Under Offer' : null,
        description: p.headline || p.subcategory || '',
        landArea: p.attributes.landArea,
      })),
    [properties]
  )

  const filteredListings = useMemo(() => {
    return mappedListings.filter((listing) => {
      if (listing.price > 0 && (listing.price < filters.priceRange[0] || listing.price > filters.priceRange[1])) {
        return false
      }
      if (filters.suburbs.length > 0 && !filters.suburbs.some((s) => listing.suburb.toLowerCase().includes(s.toLowerCase()))) {
        return false
      }
      if (filters.beds !== null && listing.beds < filters.beds) {
        return false
      }
      if (filters.baths !== null && listing.baths < filters.baths) {
        return false
      }
      if (
        filters.searchQuery &&
        !listing.address.toLowerCase().includes(filters.searchQuery.toLowerCase()) &&
        !listing.suburb.toLowerCase().includes(filters.searchQuery.toLowerCase())
      ) {
        return false
      }
      return true
    })
  }, [mappedListings, filters])

  const hasListings = !loading && mappedListings.length > 0

  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 flex justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center py-20">
          <p className="text-muted-foreground">Unable to load listings at this time. Please try again later.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8">
        {hasListings ? (
          <>
            <FilterBar filters={filters} setFilters={setFilters} viewMode={viewMode} setViewMode={setViewMode} />

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
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="overflow-hidden border border-border/50 bg-gradient-to-br from-card via-card to-primary/5 shadow-xl">
              <CardContent className="p-8 lg:p-12 text-center">
                <div className="inline-flex items-center rounded-full border border-primary/15 bg-primary/8 px-4 py-1.5 text-sm font-medium text-primary mb-6">
                  Current Market Availability
                </div>
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 shadow-sm">
                  <Home className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-serif text-2xl lg:text-4xl font-semibold text-foreground mb-4 tracking-tight">
                  There are currently no properties for sale
                </h3>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
                  If you&apos;re in the market to buy, tell us exactly what your ideal property looks like and we&apos;ll keep you
                  informed about suitable opportunities, including homes that may not be publicly advertised yet.
                </p>
                <p className="text-base lg:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-8">
                  Need help selling before you buy? We can also help you plan the right sales strategy so your next move is
                  smooth, well-timed, and positioned for the best possible result.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <a href="/buy#buyer-match-form">
                      Submit Your Requirements
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="bg-transparent border-primary text-primary hover:bg-primary/5">
                    <a href="/sell#sell-appraisal-form">
                      Need Help Selling?
                    </a>
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
        )}
      </div>
    </div>
  )
}
