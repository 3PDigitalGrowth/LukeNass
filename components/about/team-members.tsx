'use client'

import { Button } from '@/components/ui/button'
import { useLeadModal } from '@/components/global/lead-capture-provider'
import { motion } from 'framer-motion'
import { Mail, Phone } from 'lucide-react'

export function TeamMembers() {
  const { openLeadModal } = useLeadModal()
  const team = [
    {
      name: 'Luke Nass',
      title: 'Licensee & Principal',
      phone: '0418 928 082',
      email: 'luke@lukenass.com.au',
      bio: 'Part of a team with 65+ years combined experience in the Hills, Luke specializes in distressed sales, high-end negotiation, and tailored buyer-seller strategy. A REIWA Award Achiever who guarantees personal integrity.',
      image: '/luke-nass-portrait.png'
    },
    {
      name: 'Andrew Hill',
      title: 'Senior Sales Negotiator',
      phone: '0419 600 504',
      email: 'andrew@lukenass.com.au',
      bio: 'Praised by clients for his ability to rescue failed campaigns. Andrew is known for securing buyers that match the property perfectly, often achieving prices above expectation through strategic negotiation.',
      quote: 'Andrew brought clarity, reassurance, and a steady hand throughout the campaign.',
      image: '/andrew-hill-portrait.png'
    },
    {
      name: 'Gill Nass',
      title: 'Client Success Manager',
      phone: '08 9495 2226',
      email: 'admin@lukenass.com.au',
      bio: 'The backbone of our boutique service. Gill ensures every campaign runs flawlessly, from compliance to settlement, giving sellers total peace of mind.',
      image: '/gill-nass-portrait.png'
    },
    {
      name: 'Ben Mathews',
      title: 'Principal, The Mathews Team',
      phone: '0488 997 018',
      bio: 'Ben leads The Mathews Team alongside his brother Steve, delivering strong outcomes through a considered, strategic approach. With 500+ career sales totalling over $300 million, Ben ranks in the top 30 operators across Greater Perth on realestate.com.au, with deep expertise across the 6112, 6111 and 6122 postcodes.',
      image: '/ben-mathews-portrait.png'
    },
    {
      name: 'Steve Mathews',
      title: 'Operations Manager, The Mathews Team',
      phone: '0488 997 018',
      bio: 'Working closely alongside his brother Ben, Steve drives the day-to-day operations of The Mathews Team, managing processes from initial buyer engagement through to settlement. With a solid real estate background and in-depth knowledge of the City of Armadale market, Steve ensures every campaign runs smoothly with a focus on communication, transparency, and client satisfaction.',
      image: '/steve-mathews-portrait.png'
    }
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  }

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
            Meet the Strategists
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A team of specialists dedicated to delivering results with integrity
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {team.map((member, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="rounded-2xl overflow-hidden bg-card border-2 border-foreground/20 shadow-lg hover:shadow-xl transition-all flex flex-col h-full"
            >
              {/* Photo */}
              <div className="relative bg-muted h-96 flex items-center justify-center overflow-hidden shrink-0">
                {member.image && (
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-full h-full object-contain"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-serif text-2xl font-bold text-foreground mb-1 tracking-tight">{member.name}</h3>
                <p className="text-sm font-medium text-secondary mb-4">{member.title}</p>

                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{member.bio}</p>

                {member.quote && (
                  <p className="text-sm text-muted-foreground italic mb-6 pb-6 border-b border-border/50">
                    "{member.quote}"
                  </p>
                )}

                {/* Footer: contact + Book Call pinned to the bottom so they align across cards */}
                <div className="mt-auto">
                  <div className="space-y-3 mb-6 pb-6 border-t border-border/50 pt-6">
                    <div className="flex items-center gap-2 text-foreground">
                      <Phone className="w-4 h-4 text-secondary" />
                      <a href={`tel:${member.phone}`} className="text-sm font-medium hover:text-primary transition-colors">
                        {member.phone}
                      </a>
                    </div>
                    {member.email && (
                      <div className="flex items-center gap-2 text-foreground">
                        <Mail className="w-4 h-4 text-secondary" />
                        <a href={`mailto:${member.email}`} className="text-sm font-medium hover:text-primary transition-colors">
                          {member.email}
                        </a>
                      </div>
                    )}
                  </div>

                  <Button
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium"
                    onClick={() =>
                      openLeadModal({
                        type: 'team-contact',
                        source: 'Team Members',
                        defaults: {
                          teamMember: member.name,
                        },
                        metadata: {
                          Agent: member.name,
                          Role: member.title,
                        },
                      })
                    }
                  >
                    Book Call
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
