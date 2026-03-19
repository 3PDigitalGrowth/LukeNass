"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Home, Phone } from "lucide-react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function UpcomingOpenHomes() {
  return (
    <section className="py-20 lg:py-28 bg-background" id="open-homes">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <motion.div variants={itemVariants}>
            <Badge className="mb-4 bg-secondary/20 text-secondary-foreground border-secondary/30">
              <Calendar className="h-3 w-3 mr-1" />
              This Weekend
            </Badge>
          </motion.div>
          <motion.h2
            variants={itemVariants}
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4 tracking-tighter"
          >
            Upcoming Open Homes
          </motion.h2>
          <motion.p variants={itemVariants} className="text-muted-foreground text-lg max-w-2xl mx-auto">
            There are currently no open homes scheduled for the coming weekend.
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-3xl mx-auto rounded-2xl border border-border/50 bg-card p-8 lg:p-10 text-center shadow-lg"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
            <Home className="h-7 w-7 text-primary" />
          </div>
          <h3 className="font-serif text-2xl lg:text-3xl font-semibold text-foreground mb-4 tracking-tight">
            Looking for the right home this weekend?
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            Let us know your requirements and we&apos;ll help match you with suitable homes across Perth&apos;s southeast corridor,
            including upcoming listings that fit your brief.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <a href="/buy">Share Your Requirements</a>
            </Button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 max-w-xl mx-auto">
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 bg-transparent">
              <a href="tel:0418928082">
                <Phone className="h-4 w-4 mr-2" />
                Luke 0418 928 082
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-primary text-primary hover:bg-primary/5 bg-transparent">
              <a href="tel:0419600504">
                <Phone className="h-4 w-4 mr-2" />
                Andrew 0419 600 504
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
