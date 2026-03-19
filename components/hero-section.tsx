"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useLeadModal } from "@/components/global/lead-capture-provider"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, SlidersHorizontal } from "lucide-react"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const searchTabs = [
  { id: "buy", label: "Buy" },
  { id: "sold", label: "Sold" },
  { id: "estimate", label: "Estimate" },
]

export function HeroSection() {
  const [activeTab, setActiveTab] = useState("buy")
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState({
    house: true,
    apartment: false,
    land: false,
    rural: false,
  })
  const { openLeadModal } = useLeadModal()

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/team-hero-new.jpg"
          alt="Luke Nass Real Estate team in park setting"
          fill
          priority
          className="object-cover object-[42%_center] sm:object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/60 lg:bg-gradient-to-r lg:from-transparent lg:via-background/18 lg:to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-transparent to-background/45" />
      </div>

      {/* Restructured layout to use grid with content on right half */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 pb-8 flex-1 flex flex-col">
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 items-center">
          {/* Empty left column to keep people visible */}
          <div className="hidden lg:block" />

          {/* Right column with all content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-right"
          >
            <motion.div variants={itemVariants}>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-foreground leading-tight text-balance mb-6 tracking-tighter">
                Strategy Over Luck.
                <br />
                <span className="text-primary">Your Boutique Edge</span> in Perth&apos;s SE Corridor.
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:ml-auto lg:mr-0 mb-10 text-pretty"
            >
              Navigating the 2026 market with 65+ years combined local expertise across Roleystone, Kelmscott, and beyond.
            </motion.p>

            {/* Seller CTA Panel */}
            <motion.div variants={itemVariants} className="max-w-lg mx-auto lg:ml-auto lg:mr-0">
              <div className="bg-card/80 backdrop-blur-sm rounded-xl p-5 shadow-2xl">
                <p className="text-sm uppercase tracking-[0.18em] text-primary font-medium mb-3">Seller Strategy Session</p>
                <p className="text-muted-foreground text-sm md:text-base mb-4">
                  Request a confidential appraisal and strategy conversation to understand how we would position your home,
                  communicate with buyers, and negotiate for the strongest result.
                </p>
                <div className="grid gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 min-h-12 h-auto px-5 py-3 font-medium whitespace-normal leading-snug"
                  >
                    <a href="/sell#sell-appraisal-form">
                      Request Confidential Appraisal
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="min-h-12 h-auto px-5 py-3 font-medium whitespace-normal leading-snug bg-background/60 border-border/50 hover:bg-muted"
                  >
                    <a href="/sell">See Our Selling Approach</a>
                  </Button>
                </div>
                <div className="mt-4 grid gap-2 sm:grid-cols-2">
                  <a
                    href="tel:0418928082"
                    className="rounded-lg border border-border/50 bg-background/55 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <span className="block font-medium text-foreground">Luke Nass</span>
                    <span className="text-muted-foreground">0418 928 082</span>
                  </a>
                  <a
                    href="tel:0419600504"
                    className="rounded-lg border border-border/50 bg-background/55 px-4 py-3 text-sm text-foreground hover:bg-muted transition-colors"
                  >
                    <span className="block font-medium text-foreground">Andrew Hill</span>
                    <span className="text-muted-foreground">0419 600 504</span>
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex justify-center lg:justify-end"
            >
              <div className="w-full max-w-2xl rounded-2xl bg-card/90 backdrop-blur-sm border border-secondary/30 shadow-lg hover:shadow-xl transition-shadow overflow-hidden">
                <div className="grid grid-cols-1 sm:grid-cols-3">
                  <div className="px-6 py-5 flex flex-col items-center lg:items-start text-center lg:text-left border-b sm:border-b-0 sm:border-r border-secondary/20">
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-secondary mb-2">3000+</span>
                    <span className="text-sm sm:text-base text-muted-foreground font-medium">Happy Buyers &amp; Sellers</span>
                  </div>
                  <div className="px-6 py-5 flex flex-col items-center lg:items-start text-center lg:text-left border-b sm:border-b-0 sm:border-r border-secondary/20">
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-secondary mb-2">65+</span>
                    <span className="text-sm sm:text-base text-muted-foreground font-medium">Years Combined Experience</span>
                  </div>
                  <div className="px-6 py-5 flex flex-col items-center lg:items-start text-center lg:text-left">
                    <span className="text-4xl sm:text-5xl font-serif font-bold text-secondary mb-2">$1.2B+</span>
                    <span className="text-sm sm:text-base text-muted-foreground font-medium">Total Sales Value</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="mt-auto pt-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:block" />
            <div className="bg-card/95 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-border/50">
                {searchTabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex-1 py-4 text-sm font-medium transition-colors ${
                      activeTab === tab.id ? "text-primary" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeSearchTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Search Input Row */}
              <div className="p-4 flex flex-col sm:flex-row gap-3 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search suburb, school or street"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    className="w-full h-12 pl-12 text-base bg-muted/50 border-0 rounded-lg focus-visible:ring-primary"
                  />
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="h-12 px-5 gap-2 border-border/50 bg-background hover:bg-muted">
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Property Type</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuCheckboxItem
                      checked={filters.house}
                      onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, house: checked }))}
                    >
                      House
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.apartment}
                      onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, apartment: checked }))}
                    >
                      Apartment
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.land}
                      onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, land: checked }))}
                    >
                      Land
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={filters.rural}
                      onCheckedChange={(checked) => setFilters((prev) => ({ ...prev, rural: checked }))}
                    >
                      Rural
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  size="lg"
                  className="h-12 px-8 bg-primary text-primary-foreground hover:bg-primary/90 font-medium gap-2"
                  onClick={() => {
                    if (activeTab === "estimate") {
                      openLeadModal({
                        type: "seller-appraisal",
                        source: "Homepage Hero Search",
                        defaults: {
                          propertyAddress: searchQuery,
                        },
                        metadata: {
                          "Selected Tab": "Estimate",
                        },
                      })
                      return
                    }

                    openLeadModal({
                      type: "buyer-brief",
                      source: "Homepage Hero Search",
                      defaults: {
                        preferredSuburbs: searchQuery,
                      },
                      metadata: {
                        "Selected Tab": activeTab === "sold" ? "Sold" : "Buy",
                      },
                    })
                  }}
                >
                  <Search className="h-4 w-4" />
                  Search
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
