import { NextRequest, NextResponse } from 'next/server'
import { fetchListingById } from '@/lib/rex-client'

export const revalidate = 300

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const listingId = Number(id)
    if (!listingId || isNaN(listingId)) {
      return NextResponse.json({ error: 'Invalid listing ID' }, { status: 400 })
    }

    const property = await fetchListingById(listingId)

    if (!property) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    return NextResponse.json(property, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    })
  } catch (err) {
    console.error('[api/listings/[id]] Error:', err)
    return NextResponse.json({ error: 'Failed to fetch listing' }, { status: 500 })
  }
}
