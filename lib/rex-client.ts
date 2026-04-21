import type { Property, PropertyImage, PropertyAgent, OpenTime } from './types/property'

const REX_BASE = process.env.REX_API_BASE_URL || 'https://api.rexsoftware.com'
const REX_EMAIL = process.env.REX_API_EMAIL
const REX_PASSWORD = process.env.REX_API_PASSWORD

let cachedToken: string | null = null
let tokenExpiresAt = 0

function ensureHttps(url: unknown): string {
  if (!url || typeof url !== 'string') return ''
  if (url.startsWith('//')) return `https:${url}`
  return url
}

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < tokenExpiresAt) return cachedToken

  if (!REX_EMAIL || !REX_PASSWORD) {
    throw new Error('REX_API_EMAIL and REX_API_PASSWORD must be set')
  }

  const res = await fetch(`${REX_BASE}/v1/rex/Authentication/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: REX_EMAIL, password: REX_PASSWORD }),
  })

  if (!res.ok) {
    throw new Error(`Rex auth failed: ${res.status} ${res.statusText}`)
  }

  const data = await res.json()
  cachedToken = data.result as string
  tokenExpiresAt = Date.now() + 55 * 60 * 1000
  return cachedToken
}

async function rexPost<T = unknown>(endpoint: string, body: Record<string, unknown>): Promise<T> {
  const token = await getToken()
  const res = await fetch(`${REX_BASE}/v1/rex/${endpoint}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Rex API ${endpoint} failed: ${res.status} – ${text}`)
  }

  const data = await res.json()
  return data.result as T
}

function normalizeImage(img: Record<string, unknown>): PropertyImage {
  const thumbs = (img.thumbs || {}) as Record<string, string>
  return {
    url: ensureHttps(img.url as string),
    thumbs: {
      '800x600': ensureHttps(thumbs['800x600'] || ''),
      '400x300': ensureHttps(thumbs['400x300'] || ''),
      '200x150': ensureHttps(thumbs['200x150'] || ''),
      '80x60': ensureHttps(thumbs['80x60'] || ''),
    },
  }
}

function normalizeAgent(agent: Record<string, unknown> | null): PropertyAgent | null {
  if (!agent || !agent.id) return null
  return {
    id: String(agent.id),
    name: (agent.name as string) || '',
    first_name: (agent.first_name as string) || '',
    last_name: (agent.last_name as string) || '',
    email_address: (agent.email_address as string) || '',
    phone_direct: (agent.phone_direct as string) || null,
    phone_mobile: (agent.phone_mobile as string) || null,
    position: (agent.position as string) || null,
    profile_image: agent.profile_image ? ensureHttps(agent.profile_image as string) : null,
  }
}

function normalizeEvent(evt: Record<string, unknown>): OpenTime | null {
  if (evt.event_type !== 'open_home') return null
  return {
    start: (evt.event_datetime_start as string) || '',
    end: (evt.event_datetime_end as string) || '',
    label: (evt.event_type_display as string) || 'Open Home',
  }
}

const VIDEO_HOSTS = ['youtube.com', 'youtu.be', 'www.youtube.com', 'm.youtube.com', 'vimeo.com', 'player.vimeo.com', 'www.vimeo.com']

function looksLikeVideoUrl(url: string): boolean {
  if (!url) return false
  try {
    const u = new URL(url)
    if (VIDEO_HOSTS.includes(u.hostname.toLowerCase())) return true
  } catch {
    // fall through
  }
  return /\.(mp4|mov|webm|m4v)(\?|$)/i.test(url)
}

function looksLikeVideoType(value: unknown): boolean {
  if (!value) return false
  const s = String(value).toLowerCase()
  return s === 'video' || s.includes('video') || s.includes('youtube') || s.includes('vimeo')
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extractVideoUrl(row: any): string | null {
  const links = Array.isArray(row?.links) ? row.links : []

  for (const link of links) {
    if (!link) continue
    const url = ensureHttps((link.url as string) || (link.link as string) || '')
    if (!url) continue
    if (
      looksLikeVideoType(link.type) ||
      looksLikeVideoType(link.type_id) ||
      looksLikeVideoType(link.name) ||
      looksLikeVideoType(link.label) ||
      looksLikeVideoType(link.category) ||
      looksLikeVideoType(link.type_name)
    ) {
      return url
    }
  }

  for (const link of links) {
    if (!link) continue
    const url = ensureHttps((link.url as string) || (link.link as string) || '')
    if (url && looksLikeVideoUrl(url)) return url
  }

  const fallbacks: unknown[] = [
    row?.video_link,
    row?.video_url,
    row?.advert_internet?.video_link,
    row?.advert_internet?.video_url,
    Array.isArray(row?.videos) && row.videos.length > 0 ? row.videos[0]?.url : null,
  ]
  for (const candidate of fallbacks) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return ensureHttps(candidate)
    }
  }

  return null
}

function buildVideoEmbedUrl(url: string | null): string | null {
  if (!url) return null
  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    return null
  }

  const host = parsed.hostname.toLowerCase().replace(/^www\./, '')

  if (host === 'youtu.be') {
    const id = parsed.pathname.replace(/^\//, '').split('/')[0]
    return id ? `https://www.youtube.com/embed/${id}` : null
  }

  if (host === 'youtube.com' || host === 'm.youtube.com') {
    if (parsed.pathname === '/watch') {
      const id = parsed.searchParams.get('v')
      return id ? `https://www.youtube.com/embed/${id}` : null
    }
    const shortsMatch = parsed.pathname.match(/^\/shorts\/([^/]+)/)
    if (shortsMatch) return `https://www.youtube.com/embed/${shortsMatch[1]}`
    const embedMatch = parsed.pathname.match(/^\/embed\/([^/]+)/)
    if (embedMatch) return `https://www.youtube.com/embed/${embedMatch[1]}`
    const vMatch = parsed.pathname.match(/^\/v\/([^/]+)/)
    if (vMatch) return `https://www.youtube.com/embed/${vMatch[1]}`
  }

  if (host === 'vimeo.com') {
    const id = parsed.pathname.replace(/^\//, '').split('/')[0]
    return /^\d+$/.test(id) ? `https://player.vimeo.com/video/${id}` : null
  }

  if (host === 'player.vimeo.com') {
    const videoMatch = parsed.pathname.match(/^\/video\/(\d+)/)
    if (videoMatch) return `https://player.vimeo.com/video/${videoMatch[1]}`
  }

  return null
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function normalizePublishedListing(row: any): Property {
  const addr = row.address || {}
  const attrs = row.attributes || {}
  const formats = addr.formats || {}
  const images = Array.isArray(row.images) ? row.images.map(normalizeImage) : []
  const events = Array.isArray(row.events) ? row.events : []
  const opentimes = events.map(normalizeEvent).filter((e): e is OpenTime => e !== null)

  const primaryUrl = images.length > 0 ? images[0].thumbs['800x600'] || images[0].url : null

  const contract = row.contract || {}
  const soldDate = contract.date || row.state_date || null
  const soldPrice = contract.price_display || row.state_value_price_display || null

  const videoUrl = extractVideoUrl(row)
  const videoEmbedUrl = buildVideoEmbedUrl(videoUrl)

  return {
    id: Number(row.property_id) || 0,
    listingId: Number(row.id),
    state: row.system_listing_state || 'current',
    category: row.listing_category?.text || row.listing_sale_or_rental || '',
    subcategory: Array.isArray(row.subcategories) && row.subcategories.length > 0
      ? row.subcategories[0]
      : typeof row.subcategories === 'string' ? row.subcategories : null,

    address: {
      streetNumber: addr.street_number || '',
      streetName: addr.street_name || '',
      suburb: addr.suburb_or_town || '',
      stateRegion: addr.state_or_region || '',
      postcode: addr.postcode || '',
      full: formats.full_address || `${addr.street_number || ''} ${addr.street_name || ''}, ${addr.suburb_or_town || ''} ${addr.state_or_region || ''} ${addr.postcode || ''}`.trim(),
      display: formats.display_address || formats.full_address || '',
      lat: addr.latitude ? parseFloat(addr.latitude) : null,
      lng: addr.longitude ? parseFloat(addr.longitude) : null,
    },

    price: {
      display: row.price_advertise_as || '',
      match: row.price_match ? Number(row.price_match) : null,
      matchMax: row.price_match_max ? Number(row.price_match_max) : null,
    },

    attributes: {
      bedrooms: attrs.bedrooms ? Number(attrs.bedrooms) : null,
      bathrooms: attrs.bathrooms ? Number(attrs.bathrooms) : null,
      garages: attrs.garages ? Number(attrs.garages) : null,
      carports: attrs.carports ? Number(attrs.carports) : null,
      openSpaces: attrs.open_spaces ? Number(attrs.open_spaces) : null,
      totalCars: attrs.total_car_accom ? Number(attrs.total_car_accom) : null,
      landArea: attrs.landarea_m2 ? parseFloat(attrs.landarea_m2) : null,
      landAreaUnit: attrs.landarea_unit || null,
      buildArea: attrs.buildarea_m2 ? parseFloat(attrs.buildarea_m2) : null,
      buildYear: attrs.build_year ? Number(attrs.build_year) : null,
    },

    images,
    primaryImage: primaryUrl,

    description: row.advert_internet?.body || null,
    headline: row.advert_internet?.heading || null,

    agent1: normalizeAgent(row.listing_agent_1),
    agent2: normalizeAgent(row.listing_agent_2),

    underContract: row.under_contract === '1' || row.under_contract === true,
    ebrochureLink: row.ebrochure_link || row.ebrochure_custom_link || null,

    opentimes,

    soldDate,
    soldPrice,

    videoUrl,
    videoEmbedUrl,
  }
}

interface SearchResult {
  rows: unknown[]
  total: number
}

export async function fetchListings(
  state: 'current' | 'sold',
  limit = 50,
  offset = 0
): Promise<{ properties: Property[]; total: number }> {
  const result = await rexPost<SearchResult>('PublishedListings/search', {
    limit,
    offset,
    criteria: [{ name: 'system_listing_state', value: state, type: '=' }],
    order_by: { system_modtime: 'desc' },
    extra_options: {
      extra_fields: ['images', 'advert_internet', 'subcategories', 'events', 'links'],
    },
  })

  return {
    properties: result.rows.map(normalizePublishedListing),
    total: result.total,
  }
}

export async function fetchListingById(listingId: number): Promise<Property | null> {
  const result = await rexPost<SearchResult>('PublishedListings/search', {
    limit: 1,
    criteria: [{ name: 'listing_id', value: listingId, type: '=' }],
    extra_options: {
      extra_fields: ['images', 'advert_internet', 'subcategories', 'events', 'links'],
    },
  })

  if (!result.rows || result.rows.length === 0) return null
  return normalizePublishedListing(result.rows[0])
}
