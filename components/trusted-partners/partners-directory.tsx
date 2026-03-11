'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, Globe, FileText, Zap, Home, Briefcase, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

const partnersData = {
  'Settlement & Legal': {
    icon: FileText,
    partners: [
      { company: 'Jarrah Settlements', contact: 'Adam', phone: '9397 5600', website: 'https://www.jarrahsettlements.com.au/' },
      { company: 'Roleystone Settlements', contact: 'Karen or Tania', phone: '9496 1662', website: 'https://rksettlements.com.au/' },
    ],
  },
  'Finance': {
    icon: Briefcase,
    partners: [
      { company: 'Westate Finance', contact: 'Bruce Campbell', phone: '0419 945 228', website: 'https://www.coniannello.com.au/' },
      { company: 'Everfirst Financial', contact: 'Richard Siegers', phone: '0447 300 519', website: 'https://www.everfirst.net.au/' },
    ],
  },
  'Property Inspections': {
    icon: Home,
    partners: [
      { company: 'Directional Services (Pest)', contact: 'Colin', phone: '0403 825 628' },
    ],
  },
  'Trades & Maintenance': {
    icon: Zap,
    partners: [
      { company: 'Always Electrical', contact: 'Ron', phone: '0417 179 468', website: 'https://alwayselectrical.com.au/' },
      { company: 'GSS Security', contact: 'Gordon', phone: '0419 927 119', website: 'https://www.gssgroup.au/gss-security/' },
      { company: 'Sue Coe Photography', contact: 'Sue Coe', phone: '0438 137 728', website: 'https://www.susancoephotography.com/' },
    ],
  },
  'Council & Planning': {
    icon: CheckCircle2,
    partners: [
      { company: 'Dykstra Planning', contact: 'Henry', phone: '9495 1947', website: 'https://www.harleydykstra.com.au/' },
      { company: 'City of Armadale', contact: 'Inquiry', phone: '9394 5000', website: 'https://www.armadale.wa.gov.au/' },
      { company: 'City of Gosnells', contact: 'Inquiry', phone: '9397 3000', website: 'https://www.gosnells.wa.gov.au/' },
    ],
  },
}

type CategoryKey = keyof typeof partnersData

export function PartnersDirectory() {
  const [activeTab, setActiveTab] = useState<CategoryKey>('Settlement & Legal')

  const categories = Object.keys(partnersData) as CategoryKey[]

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  }

  const activeData = partnersData[activeTab]
  const ActiveIcon = activeData.icon

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        {/* Tabbed Navigation */}
        <div className="mb-12 overflow-x-auto">
          <div className="flex gap-2 md:gap-4 pb-4 md:pb-0">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium text-sm md:text-base whitespace-nowrap transition-all ${
                  activeTab === category
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'bg-card text-foreground border border-border/50 hover:border-primary/30'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Partner Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {activeData.partners.map((partner, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-card rounded-xl border border-border/50 shadow-lg hover:shadow-2xl transition-all p-6 flex flex-col"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex p-3 rounded-lg bg-secondary/20 w-fit">
                <ActiveIcon className="w-6 h-6 text-secondary" />
              </div>

              {/* Company Name */}
              <h3 className="text-lg font-serif font-bold text-foreground mb-1 tracking-tight">
                {partner.company}
              </h3>

              {/* Contact Person */}
              <p className="text-sm text-muted-foreground mb-4">Ask for {partner.contact}</p>

              {/* Phone Number */}
              <a
                href={`tel:${partner.phone}`}
                className="text-2xl font-bold text-primary mb-6 hover:text-primary/80 transition-colors"
              >
                {partner.phone}
              </a>

              {/* Call Button */}
              <Button
                onClick={() => window.location.href = `tel:${partner.phone}`}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium py-2 rounded-lg transition-all mt-auto"
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>

              {partner.website ? (
                <Button
                  asChild
                  variant="outline"
                  className="w-full mt-3 border-border/50 bg-transparent hover:bg-muted/50"
                >
                  <a href={partner.website} target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Website
                  </a>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  disabled
                  className="w-full mt-3 border-border/50 bg-transparent opacity-60"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Website Unavailable
                </Button>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
