'use client'

import { Bed, Bath, Car, Ruler as Ruler2 } from 'lucide-react'

export function PropertyInfoBar() {
  return (
    <div className="border-b border-border py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left: Price & Address */}
        <div>
          <p className="text-5xl font-serif font-bold text-primary tracking-tighter mb-2">$1.25M</p>
          <h1 className="text-3xl font-serif font-bold text-foreground mb-2 tracking-tighter">
            42 Mountain View Drive
          </h1>
          <p className="text-lg text-muted-foreground">Roleystone, WA 6111</p>
        </div>

        {/* Right: Specs */}
        <div className="flex flex-wrap gap-6 md:justify-end items-center">
          <div className="flex flex-col items-center">
            <Bed className="w-6 h-6 text-primary mb-1" />
            <p className="text-sm text-muted-foreground">4 Bed</p>
          </div>
          <div className="flex flex-col items-center">
            <Bath className="w-6 h-6 text-primary mb-1" />
            <p className="text-sm text-muted-foreground">2 Bath</p>
          </div>
          <div className="flex flex-col items-center">
            <Car className="w-6 h-6 text-primary mb-1" />
            <p className="text-sm text-muted-foreground">2 Car</p>
          </div>
          <div className="flex flex-col items-center">
            <Ruler2 className="w-6 h-6 text-primary mb-1" />
            <p className="text-sm text-muted-foreground">2,100m²</p>
          </div>
        </div>
      </div>
    </div>
  )
}
