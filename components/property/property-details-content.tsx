'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLeadModal } from '@/components/global/lead-capture-provider'
import { useListingDetail } from '@/lib/hooks/use-listings'
import { PropertyVideoHero } from './property-video-hero'
import {
  ChevronDown, Phone, Calendar, Bed, Bath, Car, Ruler, MapPin,
  ExternalLink, Loader2, ChevronLeft, ChevronRight, X, Clock,
} from 'lucide-react'

interface PropertyDetailsContentProps {
  propertyId: string
}

export function PropertyDetailsContent({ propertyId }: PropertyDetailsContentProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const { openLeadModal } = useLeadModal()
  const { property, loading, error } = useListingDetail(propertyId)

  if (loading) {
    return (
      <div className="pt-24 pb-16 flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-8 text-center py-20">
          <h2 className="text-2xl font-serif font-semibold text-foreground mb-4">Property Not Found</h2>
          <p className="text-muted-foreground mb-8">
            This listing may no longer be available or the link may be incorrect.
          </p>
          <Button asChild>
            <a href="/buy">Browse Available Properties</a>
          </Button>
        </div>
      </div>
    )
  }

  const images = property.images.length > 0
    ? property.images.map((img) => img.thumbs['800x600'] || img.url)
    : ['/placeholder.svg']

  const cars = property.attributes.totalCars ?? property.attributes.garages ?? property.attributes.carports ?? 0

  const specs = [
    { label: 'Price', value: property.price.display || 'Contact Agent' },
    ...(property.attributes.bedrooms != null ? [{ label: 'Beds', value: property.attributes.bedrooms }] : []),
    ...(property.attributes.bathrooms != null ? [{ label: 'Baths', value: property.attributes.bathrooms }] : []),
    ...(cars > 0 ? [{ label: 'Cars', value: cars }] : []),
    ...(property.attributes.landArea != null ? [{ label: 'Land Size', value: `${Math.round(property.attributes.landArea)} m²` }] : []),
  ]

  const mosaicImages = images.slice(0, 5)
  const mosaicLayout = [
    { row: 0, col: 0, rowSpan: 2, colSpan: 2, imageIndex: 0 },
    ...(mosaicImages.length > 1 ? [{ row: 0, col: 2, rowSpan: 1, colSpan: 1, imageIndex: 1 }] : []),
    ...(mosaicImages.length > 2 ? [{ row: 1, col: 2, rowSpan: 1, colSpan: 1, imageIndex: 2 }] : []),
    ...(mosaicImages.length > 3 ? [{ row: 0, col: 3, rowSpan: 2, colSpan: 1, imageIndex: 3 }] : []),
    ...(mosaicImages.length > 4 ? [{ row: 2, col: 0, rowSpan: 1, colSpan: 1, imageIndex: 4 }] : []),
  ]

  const agentName = property.agent1?.name || 'Luke Nass'
  const agentPhone = property.agent1?.phone_direct || property.agent1?.phone_mobile || '0894952226'
  const agentPhoneDisplay = agentPhone.replace(/(\d{2})(\d{4})(\d{4})/, '$1 $2 $3')

  function prevImage() {
    setSelectedImage((i) => (i - 1 + images.length) % images.length)
  }
  function nextImage() {
    setSelectedImage((i) => (i + 1) % images.length)
  }

  return (
    <div className="pt-24 pb-16">
      {/* Lightbox */}
      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
            onClick={() => setLightboxOpen(false)}
          >
            <button
              onClick={(e) => { e.stopPropagation(); setLightboxOpen(false) }}
              className="absolute top-4 right-4 text-white/80 hover:text-white z-50"
            >
              <X className="h-8 w-8" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              className="absolute left-4 text-white/80 hover:text-white z-50"
            >
              <ChevronLeft className="h-10 w-10" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              className="absolute right-4 text-white/80 hover:text-white z-50"
            >
              <ChevronRight className="h-10 w-10" />
            </button>
            <img
              src={images[selectedImage]}
              alt={`Property image ${selectedImage + 1}`}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded"
              onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute bottom-4 text-white/70 text-sm">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Headline & Description with truncation */}
      {(property.headline || property.description) && (
        <section className="container mx-auto px-4 lg:px-8 mb-8">
          <motion.div
            className="bg-card border border-border rounded-lg p-6 lg:p-8 shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {property.headline && (
              <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground tracking-tighter mb-4">
                {property.headline}
              </h1>
            )}
            {property.description && (
              <>
                <div
                  className={`text-base text-foreground/80 leading-relaxed whitespace-pre-line ${
                    !descriptionExpanded ? 'line-clamp-4' : ''
                  }`}
                >
                  {property.description}
                </div>
                {property.description.length > 300 && (
                  <button
                    onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                    className="mt-3 text-primary font-medium text-sm hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  >
                    {descriptionExpanded ? 'Show less' : 'View more'}
                    <ChevronDown className={`h-4 w-4 transition-transform ${descriptionExpanded ? 'rotate-180' : ''}`} />
                  </button>
                )}
              </>
            )}
          </motion.div>
        </section>
      )}

      {/* Hero Gallery */}
      <section className="container mx-auto px-4 lg:px-8 mb-12">
        {property.underContract && (
          <div className="mb-4">
            <Badge className="bg-amber-500 text-white border-0 text-sm px-4 py-1.5">Under Offer</Badge>
          </div>
        )}

        {property.videoUrl && (
          <PropertyVideoHero
            videoUrl={property.videoUrl}
            videoEmbedUrl={property.videoEmbedUrl}
            posterUrl={property.primaryImage}
            title={property.address.display}
          />
        )}

        <div className="grid grid-cols-4 gap-3 h-[500px] lg:h-[600px] mb-8">
          {mosaicLayout.map((item, idx) => (
            <motion.div
              key={idx}
              className="relative rounded-lg overflow-hidden cursor-pointer group"
              style={{
                gridColumn: `${item.col + 1} / span ${item.colSpan}`,
                gridRow: `${item.row + 1} / span ${item.rowSpan}`,
              }}
              onClick={() => { setSelectedImage(item.imageIndex); setLightboxOpen(true) }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={mosaicImages[item.imageIndex] || '/placeholder.svg'}
                alt={`Property image ${item.imageIndex + 1}`}
                className="object-cover w-full h-full group-hover:brightness-75 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {idx === mosaicLayout.length - 1 && images.length > 5 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
                  <span className="text-white font-semibold text-lg">+{images.length - 5} photos</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Key Specs Bar */}
        <motion.div
          className="bg-gradient-to-r from-primary/10 to-secondary/10 border border-border rounded-lg p-6 flex flex-wrap gap-8 justify-between items-center backdrop-blur-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {specs.map((spec, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <span className="text-sm text-muted-foreground font-medium tracking-wide">{spec.label}</span>
              <span className={`${spec.label === 'Price' ? 'text-2xl font-serif font-bold text-primary' : 'text-lg font-semibold text-foreground'}`}>
                {spec.value}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          {/* Address & Property Type */}
          <motion.section
            className="bg-card border border-border rounded-lg p-8 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            <div className="flex items-start gap-3 mb-4">
              <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
              <div>
                <h1 className="text-2xl lg:text-3xl font-serif font-bold text-foreground tracking-tighter">
                  {property.address.display}
                </h1>
                {property.subcategory && (
                  <p className="text-muted-foreground mt-1">{property.subcategory}</p>
                )}
              </div>
            </div>

            {/* Detailed Attributes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              {property.attributes.bedrooms != null && (
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <Bed className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Bedrooms</div>
                  <div className="text-xl font-semibold text-foreground">{property.attributes.bedrooms}</div>
                </div>
              )}
              {property.attributes.bathrooms != null && (
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <Bath className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Bathrooms</div>
                  <div className="text-xl font-semibold text-foreground">{property.attributes.bathrooms}</div>
                </div>
              )}
              {cars > 0 && (
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <Car className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Parking</div>
                  <div className="text-xl font-semibold text-foreground">{cars}</div>
                </div>
              )}
              {property.attributes.landArea != null && (
                <div className="rounded-lg bg-muted/50 p-4 text-center">
                  <Ruler className="h-5 w-5 mx-auto mb-2 text-primary" />
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Land Area</div>
                  <div className="text-xl font-semibold text-foreground">{Math.round(property.attributes.landArea)} m²</div>
                </div>
              )}
            </div>

            {/* Open Home Times in main content */}
            {property.opentimes.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border/60">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Upcoming Open Homes
                </h3>
                <div className="grid gap-2 sm:grid-cols-2">
                  {property.opentimes.map((ot, idx) => {
                    const s = new Date(ot.start.replace(' ', 'T'))
                    const e = new Date(ot.end.replace(' ', 'T'))
                    return (
                      <div key={idx} className="rounded-lg bg-primary/5 border border-primary/10 p-3 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 shrink-0">
                          <Clock className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground">
                            {s.toLocaleDateString('en-AU', { weekday: 'long', day: 'numeric', month: 'short' })}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {s.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true })} –{' '}
                            {e.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true })}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </motion.section>

          {/* eBrochure link */}
          {property.ebrochureLink && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <a
                href={property.ebrochureLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-medium"
              >
                <ExternalLink className="h-4 w-4" />
                View eBrochure
              </a>
            </motion.div>
          )}

          {/* Image Gallery Thumbnails */}
          {images.length > 1 && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-xl font-serif font-bold text-foreground mb-4 tracking-tighter">Gallery</h3>
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setSelectedImage(idx); setLightboxOpen(true) }}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === idx ? 'border-primary shadow-lg' : 'border-transparent hover:border-border'
                    }`}
                  >
                    <img
                      src={property.images[idx]?.thumbs['200x150'] || img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </motion.section>
          )}
        </div>

        {/* Sticky Agent Card Sidebar */}
        <motion.div
          className="lg:sticky lg:top-28 h-fit"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-border rounded-lg p-8 shadow-xl backdrop-blur-sm">
            {property.agent1?.profile_image && (
              <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden">
                <img
                  src={property.agent1.profile_image}
                  alt={agentName}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <h3 className="text-2xl font-serif font-bold text-primary mb-2 tracking-tighter">{agentName}</h3>
            {property.agent1?.position && (
              <p className="text-sm text-muted-foreground mb-1 font-medium">{property.agent1.position}</p>
            )}
            {property.agent1?.email_address && (
              <a href={`mailto:${property.agent1.email_address}`} className="text-sm text-primary/80 hover:text-primary mb-4 block">
                {property.agent1.email_address}
              </a>
            )}

            <a
              href={`tel:${agentPhone.replace(/\s/g, '')}`}
              className="flex items-center gap-2 bg-primary text-primary-foreground w-full justify-center py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors mb-4"
            >
              <Phone className="h-4 w-4" />
              {agentPhoneDisplay}
            </a>

            <Button
              onClick={() =>
                openLeadModal({
                  type: 'inspection-request',
                  source: `Property ${property.listingId}`,
                  defaults: {
                    propertyAddress: property.address.display,
                  },
                  metadata: {
                    Property: property.address.display,
                  },
                })
              }
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold py-6"
              size="lg"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Book Inspection
            </Button>

            {/* Agent 2 */}
            {property.agent2 && (
              <div className="mt-6 pt-6 border-t border-border/60">
                <h4 className="text-lg font-serif font-bold text-foreground mb-1">{property.agent2.name}</h4>
                {property.agent2.position && (
                  <p className="text-sm text-muted-foreground mb-2">{property.agent2.position}</p>
                )}
                {(property.agent2.phone_direct || property.agent2.phone_mobile) && (
                  <a
                    href={`tel:${(property.agent2.phone_direct || property.agent2.phone_mobile || '').replace(/\s/g, '')}`}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 font-medium text-sm"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    {property.agent2.phone_direct || property.agent2.phone_mobile}
                  </a>
                )}
              </div>
            )}

            {/* Open homes */}
            {property.opentimes.length > 0 && (
              <div className="mt-6 pt-6 border-t border-border/60">
                <h4 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">Open Home Times</h4>
                {property.opentimes.map((ot, idx) => {
                  const s = new Date(ot.start)
                  const e = new Date(ot.end)
                  return (
                    <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-3.5 w-3.5 text-primary" />
                      <span>
                        {s.toLocaleDateString('en-AU', { weekday: 'short', day: 'numeric', month: 'short' })}{' '}
                        {s.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true })} –{' '}
                        {e.toLocaleTimeString('en-AU', { hour: 'numeric', minute: '2-digit', hour12: true })}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
