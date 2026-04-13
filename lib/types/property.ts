export interface PropertyImage {
  url: string
  thumbs: {
    '800x600': string
    '400x300': string
    '200x150': string
    '80x60': string
  }
}

export interface PropertyAgent {
  id: string
  name: string
  first_name: string
  last_name: string
  email_address: string
  phone_direct: string | null
  phone_mobile: string | null
  position: string | null
  profile_image: string | null
}

export interface Property {
  id: number
  listingId: number
  state: 'current' | 'sold' | string
  category: string
  subcategory: string | null

  address: {
    streetNumber: string
    streetName: string
    suburb: string
    stateRegion: string
    postcode: string
    full: string
    display: string
    lat: number | null
    lng: number | null
  }

  price: {
    display: string
    match: number | null
    matchMax: number | null
  }

  attributes: {
    bedrooms: number | null
    bathrooms: number | null
    garages: number | null
    carports: number | null
    openSpaces: number | null
    totalCars: number | null
    landArea: number | null
    landAreaUnit: string | null
    buildArea: number | null
    buildYear: number | null
  }

  images: PropertyImage[]
  primaryImage: string | null

  description: string | null
  headline: string | null

  agent1: PropertyAgent | null
  agent2: PropertyAgent | null

  underContract: boolean
  ebrochureLink: string | null

  opentimes: OpenTime[]

  soldDate: string | null
  soldPrice: string | null
}

export interface OpenTime {
  start: string
  end: string
  label?: string
}

export type ListingState = 'current' | 'sold'
