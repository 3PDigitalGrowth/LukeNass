'use client'

import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, ExternalLink } from 'lucide-react'

interface PropertyVideoHeroProps {
  videoUrl: string | null
  videoEmbedUrl: string | null
  posterUrl: string | null
  title?: string
}

function extractYouTubeId(embedUrl: string): string | null {
  const match = embedUrl.match(/youtube\.com\/embed\/([^/?]+)/)
  return match ? match[1] : null
}

export function PropertyVideoHero({
  videoUrl,
  videoEmbedUrl,
  posterUrl,
  title,
}: PropertyVideoHeroProps) {
  const [playing, setPlaying] = useState(false)

  const poster = useMemo(() => {
    if (videoEmbedUrl) {
      const ytId = extractYouTubeId(videoEmbedUrl)
      if (ytId) return `https://i.ytimg.com/vi/${ytId}/maxresdefault.jpg`
    }
    return posterUrl || '/placeholder.svg'
  }, [videoEmbedUrl, posterUrl])

  if (!videoUrl) return null

  if (!videoEmbedUrl) {
    return (
      <motion.section
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block w-full aspect-video rounded-lg overflow-hidden bg-muted"
          aria-label={title ? `Watch video of ${title}` : 'Watch property video'}
        >
          <img
            src={poster}
            alt={title ? `${title} video` : 'Property video'}
            className="object-cover w-full h-full group-hover:brightness-75 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform duration-300 group-hover:scale-110">
              <ExternalLink className="h-8 w-8" />
            </div>
            <span className="text-white font-semibold text-sm uppercase tracking-wider drop-shadow-lg">
              Watch Video
            </span>
          </div>
        </a>
      </motion.section>
    )
  }

  return (
    <motion.section
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
    >
      <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-black">
        {playing ? (
          <iframe
            src={`${videoEmbedUrl}${videoEmbedUrl.includes('?') ? '&' : '?'}autoplay=1&rel=0`}
            title={title ? `${title} video` : 'Property video'}
            className="absolute inset-0 w-full h-full"
            frameBorder={0}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 w-full h-full cursor-pointer"
            aria-label={title ? `Play video of ${title}` : 'Play property video'}
          >
            <img
              src={poster}
              alt={title ? `${title} video thumbnail` : 'Property video thumbnail'}
              className="object-cover w-full h-full group-hover:brightness-75 transition-all duration-300"
              onError={(e) => {
                const img = e.currentTarget
                const ytId = videoEmbedUrl ? extractYouTubeId(videoEmbedUrl) : null
                if (ytId && img.src.includes('maxresdefault')) {
                  img.src = `https://i.ytimg.com/vi/${ytId}/hqdefault.jpg`
                } else if (posterUrl && img.src !== posterUrl) {
                  img.src = posterUrl
                }
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-transform duration-300 group-hover:scale-110">
                <Play className="h-8 w-8 fill-current ml-1" />
              </div>
              <span className="text-white font-semibold text-sm uppercase tracking-wider drop-shadow-lg">
                Watch the Property Video
              </span>
            </div>
          </button>
        )}
      </div>
    </motion.section>
  )
}
