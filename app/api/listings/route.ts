import { NextRequest, NextResponse } from 'next/server'
import { fetchListings } from '@/lib/rex-client'
import type { ListingState } from '@/lib/types/property'

export const revalidate = 300

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl
    const state = (searchParams.get('state') || 'current') as ListingState
    const limit = Math.min(Number(searchParams.get('limit')) || 50, 100)
    const offset = Number(searchParams.get('offset')) || 0

    if (state !== 'current' && state !== 'sold') {
      return NextResponse.json({ error: 'state must be "current" or "sold"' }, { status: 400 })
    }

    const data = await fetchListings(state, limit, offset)

    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (err) {
    console.error('[api/listings] Error:', err)
    return NextResponse.json(
      { error: 'Failed to fetch listings', properties: [], total: 0 },
      { status: 500 }
    )
  }
}
