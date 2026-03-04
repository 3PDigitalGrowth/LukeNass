'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { MapPin, Settings2, Map, Grid3X3 } from 'lucide-react'

interface FilterBarProps {
  filters: {
    priceRange: [number, number]
    suburbs: string[]
    beds: number | null
    baths: number | null
    propertyType: string[]
    searchQuery: string
  }
  setFilters: (filters: any) => void
  viewMode: 'grid' | 'map'
  setViewMode: (mode: 'grid' | 'map') => void
}

const suburbs = ['Roleystone', 'Kelmscott', 'Armadale', 'Bedfordale', 'Seville Grove', 'Mount Nasura']

export function FilterBar({ filters, setFilters, viewMode, setViewMode }: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="sticky top-20 z-40 bg-background/95 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        <div className="flex flex-col gap-4">
          {/* Search and view mode */}
          <div className="flex items-center gap-2">
            <div className="flex-1">
              <Input
                placeholder="Search suburb, address or street..."
                value={filters.searchQuery}
                onChange={(e) => setFilters({ ...filters, searchQuery: e.target.value })}
                className="h-10"
              />
            </div>
            <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
              <Button
                size="sm"
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                onClick={() => setViewMode('grid')}
                className="h-8"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                size="sm"
                variant={viewMode === 'map' ? 'default' : 'ghost'}
                onClick={() => setViewMode('map')}
                className="h-8"
              >
                <Map className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Filter pills */}
          <div className="flex flex-wrap items-center gap-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-9 bg-transparent">
                  <Settings2 className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="start">
                <div className="space-y-6">
                  {/* Price Range */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">Price Range</label>
                    <Slider
                      min={0}
                      max={2_000_000}
                      step={50_000}
                      value={[filters.priceRange[0], filters.priceRange[1]]}
                      onValueChange={(value) => setFilters({ ...filters, priceRange: [value[0], value[1]] })}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-foreground/60">
                      <span>${(filters.priceRange[0] / 1000).toFixed(0)}K</span>
                      <span>${(filters.priceRange[1] / 1000).toFixed(0)}K</span>
                    </div>
                  </div>

                  {/* Suburbs */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">Suburbs</label>
                    <div className="space-y-2">
                      {suburbs.map((suburb) => (
                        <div key={suburb} className="flex items-center gap-2">
                          <Checkbox
                            id={`suburb-${suburb}`}
                            checked={filters.suburbs.includes(suburb)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setFilters({ ...filters, suburbs: [...filters.suburbs, suburb] })
                              } else {
                                setFilters({ ...filters, suburbs: filters.suburbs.filter((s) => s !== suburb) })
                              }
                            }}
                          />
                          <label htmlFor={`suburb-${suburb}`} className="text-sm cursor-pointer">
                            {suburb}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bedrooms */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">Minimum Bedrooms</label>
                    <Select value={filters.beds?.toString() || 'any'} onValueChange={(value) => setFilters({ ...filters, beds: value !== 'any' ? parseInt(value) : null })}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1 Bed</SelectItem>
                        <SelectItem value="2">2 Beds</SelectItem>
                        <SelectItem value="3">3 Beds</SelectItem>
                        <SelectItem value="4">4 Beds</SelectItem>
                        <SelectItem value="5">5+ Beds</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Bathrooms */}
                  <div className="space-y-3">
                    <label className="text-sm font-semibold">Minimum Bathrooms</label>
                    <Select value={filters.baths?.toString() || 'any'} onValueChange={(value) => setFilters({ ...filters, baths: value !== 'any' ? parseInt(value) : null })}>
                      <SelectTrigger className="h-9">
                        <SelectValue placeholder="Any" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="any">Any</SelectItem>
                        <SelectItem value="1">1 Bath</SelectItem>
                        <SelectItem value="2">2 Baths</SelectItem>
                        <SelectItem value="3">3 Baths</SelectItem>
                        <SelectItem value="4">4+ Baths</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            {/* Clear filters button */}
            {(filters.suburbs.length > 0 || filters.beds !== null || filters.baths !== null || filters.searchQuery !== '') && (
              <Button
                variant="ghost"
                size="sm"
                className="h-9 text-foreground/60 hover:text-foreground"
                onClick={() =>
                  setFilters({
                    priceRange: [0, 2_000_000],
                    suburbs: [],
                    beds: null,
                    baths: null,
                    propertyType: [],
                    searchQuery: '',
                  })
                }
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
