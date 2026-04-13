'use client'

import { useState, useEffect } from 'react'
import type { Property, ListingState } from '@/lib/types/property'

interface UseListingsResult {
  properties: Property[]
  total: number
  loading: boolean
  error: string | null
}

export function useListings(state: ListingState, limit = 50): UseListingsResult {
  const [properties, setProperties] = useState<Property[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`/api/listings?state=${state}&limit=${limit}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        setProperties(data.properties || [])
        setTotal(data.total || 0)
      })
      .catch((err) => {
        if (cancelled) return
        console.error(`[useListings] ${state}:`, err)
        setError(err.message)
        setProperties([])
        setTotal(0)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [state, limit])

  return { properties, total, loading, error }
}

interface UseListingDetailResult {
  property: Property | null
  loading: boolean
  error: string | null
}

export function useListingDetail(listingId: string | number): UseListingDetailResult {
  const [property, setProperty] = useState<Property | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    fetch(`/api/listings/${listingId}`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.json()
      })
      .then((data) => {
        if (cancelled) return
        if (data.error) {
          setError(data.error)
          setProperty(null)
        } else {
          setProperty(data)
        }
      })
      .catch((err) => {
        if (cancelled) return
        console.error(`[useListingDetail] ${listingId}:`, err)
        setError(err.message)
        setProperty(null)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [listingId])

  return { property, loading, error }
}
