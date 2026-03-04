'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export function SoldContentSection() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="space-y-12"
    >
      {/* The Strategy */}
      <motion.div variants={item} className="p-8 rounded-2xl bg-secondary/5 border border-secondary/20">
        <h2 className="font-serif text-3xl font-bold text-foreground mb-4 tracking-tight">How We Did It</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          By utilizing our Inner Circle database, we secured 3 pre-market viewings before launching to REA, creating early competition. This strategy resulted in 5 written offers within 9 days and a final sale price of $1.185M—exactly in line with our initial positioning strategy.
        </p>
      </motion.div>

      {/* The Home */}
      <motion.div variants={item}>
        <h2 className="font-serif text-3xl font-bold text-foreground mb-4 tracking-tight">The Home</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          42 Hilltop Drive is a stunning contemporary home nestled in prestigious Roleystone. This 4-bedroom, 2-bathroom residence features luxurious finishes, abundant natural light, and panoramic views of the surrounding hills. The open-plan living areas flow seamlessly onto entertaining spaces, making it the perfect home for discerning families seeking lifestyle and location.
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <motion.div variants={item}>
        <h3 className="font-serif text-2xl font-bold text-foreground mb-6 tracking-tight">View the Gallery</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { src: '/property-42-hilltop-gallery-1.jpg', alt: 'Interior living space' },
            { src: '/property-42-hilltop-gallery-2.jpg', alt: 'Master bedroom' },
            { src: '/property-42-hilltop-gallery-3.jpg', alt: 'Outdoor entertaining area' }
          ].map((image, idx) => (
            <div key={idx} className="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
              <Image
                src={image.src || "/placeholder.svg"}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}
