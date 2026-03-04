"use client"

import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react"
import { useEffect, useState } from "react"

const theHills = [
  { name: "Roleystone", href: "/areas/roleystone" },
  { name: "Bedfordale", href: "/areas/bedfordale" },
  { name: "Mount Nasura", href: "/areas/mount-nasura" },
  { name: "Karragullen", href: "/areas/karragullen" },
  { name: "Pickering Brook", href: "/areas/pickering-brook" },
]

const theValley = [
  { name: "Kelmscott", href: "/areas/kelmscott" },
  { name: "Armadale", href: "/areas/armadale" },
  { name: "Seville Grove", href: "/areas/seville-grove" },
  { name: "Camillo", href: "/areas/camillo" },
  { name: "Champion Lakes", href: "/areas/champion-lakes" },
]

const quickLinks = [
  { href: "#selling", label: "Selling Your Property" },
  { href: "#buying", label: "Buying a Home" },
  { href: "#inner-circle", label: "The Inner Circle" },
  { href: "#insights", label: "Market Insights" },
  { href: "#about", label: "About Luke" },
  { href: "#contact", label: "Contact Us" },
]

const seoLinks = [
  "Real Estate Agent Roleystone",
  "Homes for Sale Kelmscott",
  "Property Valuation Armadale",
  "Sell My House Bedfordale",
  "Off-Market Properties Perth Hills",
  "Luxury Homes Mount Nasura",
  "First Home Buyer Seville Grove",
  "Investment Property Camillo",
]

export function Footer() {
  const [officeStatus, setOfficeStatus] = useState<{ isOpen: boolean; message: string }>({
    isOpen: false,
    message: "Closed",
  })

  useEffect(() => {
    const checkOfficeStatus = () => {
      const now = new Date()
      const perthTime = new Date(now.toLocaleString("en-US", { timeZone: "Australia/Perth" }))
      const day = perthTime.getDay()
      const hour = perthTime.getHours()

      // Office hours: Mon-Fri 9am-5pm, Sat 9am-1pm, Sun closed
      if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        setOfficeStatus({ isOpen: true, message: "Open Today — Visit us in Roleystone" })
      } else if (day === 6 && hour >= 9 && hour < 13) {
        setOfficeStatus({ isOpen: true, message: "Open Today — Visit us in Roleystone" })
      } else if (day === 0) {
        setOfficeStatus({ isOpen: false, message: "Closed Today — Opens Monday 9am" })
      } else if (hour < 9) {
        setOfficeStatus({ isOpen: false, message: `Opens Today at 9am` })
      } else {
        setOfficeStatus({ isOpen: false, message: "Closed — Opens Tomorrow 9am" })
      }
    }

    checkOfficeStatus()
    const interval = setInterval(checkOfficeStatus, 60000)
    return () => clearInterval(interval)
  }, [])

  return (
    <footer className="bg-(--umber) text-(--umber-foreground)">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand & Office Status */}
          <div className="lg:col-span-4">
            <Image
              src="/images/logo.png"
              alt="Luke Nass Real Estate"
              width={180}
              height={50}
              className="h-12 w-auto mb-6 brightness-0 invert opacity-90"
            />
            <p className="text-(--umber-foreground)/80 text-sm leading-relaxed mb-6">
              Your boutique real estate partner in Perth&apos;s SE Corridor. Two decades of local expertise, delivering
              strategic results for discerning sellers and buyers.
            </p>

            <div className="bg-(--umber-foreground)/5 rounded-lg p-4 mb-6 border border-(--umber-foreground)/10">
              <div className="flex items-center gap-3 mb-2">
                <div
                  className={`w-2.5 h-2.5 rounded-full ${officeStatus.isOpen ? "bg-green-500 animate-pulse" : "bg-(--umber-foreground)/40"}`}
                />
                <span className="text-sm font-medium text-(--umber-foreground)">
                  {officeStatus.isOpen ? "Office Open" : "Office Closed"}
                </span>
              </div>
              <p className="text-(--umber-foreground)/70 text-sm flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {officeStatus.message}
              </p>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              <Link href="#" className="text-(--umber-foreground)/60 hover:text-(--umber-foreground) transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-(--umber-foreground)/60 hover:text-(--umber-foreground) transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-(--umber-foreground)/60 hover:text-(--umber-foreground) transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg text-(--umber-foreground) mb-5">The Hills</h4>
            <ul className="space-y-3">
              {theHills.map((suburb) => (
                <li key={suburb.name}>
                  <Link
                    href={suburb.href}
                    className="text-(--umber-foreground)/70 hover:text-(--umber-foreground) text-sm transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/60 group-hover:bg-primary transition-colors" />
                    {suburb.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg text-(--umber-foreground) mb-5">The Valley</h4>
            <ul className="space-y-3">
              {theValley.map((suburb) => (
                <li key={suburb.name}>
                  <Link
                    href={suburb.href}
                    className="text-(--umber-foreground)/70 hover:text-(--umber-foreground) text-sm transition-colors inline-flex items-center gap-1.5 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-secondary/60 group-hover:bg-secondary transition-colors" />
                    {suburb.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg text-(--umber-foreground) mb-5">Explore</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-(--umber-foreground)/70 hover:text-(--umber-foreground) text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg text-(--umber-foreground) mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-(--umber-foreground)/60 mt-0.5" />
                <div>
                  <p className="text-(--umber-foreground) text-sm font-medium">0412 345 678</p>
                  <p className="text-(--umber-foreground)/50 text-xs">Available 7 days</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-(--umber-foreground)/60 mt-0.5" />
                <p className="text-(--umber-foreground) text-sm">luke@lukenass.com.au</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-(--umber-foreground)/60 mt-0.5" />
                <div>
                  <p className="text-(--umber-foreground) text-sm">Shop 2, Roleystone Village</p>
                  <p className="text-(--umber-foreground)/50 text-xs">Perth SE Corridor, WA</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-(--umber-foreground)/10 bg-(--umber-foreground)/5">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {seoLinks.map((link) => (
              <Link
                key={link}
                href="#"
                className="text-(--umber-foreground)/40 hover:text-(--umber-foreground)/60 text-xs transition-colors"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-(--umber-foreground)/10">
        <div className="container mx-auto px-4 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-(--umber-foreground)/50 text-xs">
            © {new Date().getFullYear()} Luke Nass Real Estate. All rights reserved. REIWA Member.
          </p>
          <div className="flex gap-6 text-xs">
            <Link
              href="#"
              className="text-(--umber-foreground)/50 hover:text-(--umber-foreground)/70 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-(--umber-foreground)/50 hover:text-(--umber-foreground)/70 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="#"
              className="text-(--umber-foreground)/50 hover:text-(--umber-foreground)/70 transition-colors"
            >
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
