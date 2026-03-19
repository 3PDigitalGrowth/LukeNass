'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useLeadModal } from '@/components/global/lead-capture-provider'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, Clock } from 'lucide-react'

export function LocalOffice() {
  const { openLeadModal } = useLeadModal()

  return (
    <section className="py-20 lg:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tighter">
            Our Local Office
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-serif text-3xl font-bold text-foreground mb-8 tracking-tight">
              Luke Nass Real Estate
            </h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <MapPin className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-foreground">Address</p>
                  <p className="text-muted-foreground">Unit 1/8 Rundle St</p>
                  <p className="text-muted-foreground">Kelmscott WA 6111</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Phone className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-foreground">Phone</p>
                  <p className="text-muted-foreground">08 9495 2226</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Mail className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-foreground">Email</p>
                  <p className="text-muted-foreground">luke@lukenass.com.au</p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock className="w-6 h-6 text-secondary flex-shrink-0 mt-1" />
                <div>
                  <p className="font-bold text-foreground">Office Hours</p>
                  <p className="text-muted-foreground">Monday–Friday: 9am–5pm</p>
                  <p className="text-muted-foreground">Saturday: By Appointment Only</p>
                  <p className="text-muted-foreground">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold flex items-center gap-2 py-6">
                <a href="tel:0894952226">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
              </Button>
              <Button
                variant="outline"
                className="border-2 border-secondary font-bold py-6 bg-transparent"
                onClick={() =>
                  openLeadModal({
                    type: 'general-contact',
                    source: 'Local Office',
                    defaults: {
                      topic: 'General Enquiry',
                    },
                    metadata: {
                      Location: 'Kelmscott Office',
                    },
                  })
                }
              >
                <Mail className="w-5 h-5 mr-2" />
                Email Now
              </Button>
            </div>
          </motion.div>

          {/* Office Location Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl overflow-hidden shadow-xl h-96 bg-muted border border-border/50 relative"
          >
            <Image
              src="/local-office-map.png"
              alt="Map showing Unit 1/8 Rundle St, Kelmscott WA 6111"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
