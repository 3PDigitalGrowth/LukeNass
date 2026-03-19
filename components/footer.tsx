"use client"

import Link from "next/link"
import Image from "next/image"
import { Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react"
import { useEffect, useState } from "react"

const quickLinks = [
  { href: "#selling", label: "Selling Your Property" },
  { href: "#buying", label: "Buying a Home" },
  { href: "#insights", label: "Market Insights" },
  { href: "#about", label: "About Luke" },
  { href: "#contact", label: "Contact Us" },
]

const seoLinks = [
  "Real Estate Agent Roleystone",
  "Homes for Sale Kelmscott",
  "Property Valuation Armadale",
  "Sell My House Bedfordale",
  "Property Marketing Perth Hills",
  "Luxury Homes Mount Nasura",
  "First Home Buyer Seville Grove",
  "Investment Property Camillo",
]

const socialLinks = [
  {
    href: "https://au.linkedin.com/company/luke-nass-real-estate",
    label: "LinkedIn",
    icon: Linkedin,
  },
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

      // Office hours: Mon-Fri 9am-5pm, Sat by appointment, Sun closed
      if (day >= 1 && day <= 5 && hour >= 9 && hour < 17) {
        setOfficeStatus({ isOpen: true, message: "Open Today — Visit us in Kelmscott" })
      } else if (day === 6) {
        setOfficeStatus({ isOpen: false, message: "Saturday — By Appointment Only" })
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
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.5fr)_minmax(220px,0.8fr)_minmax(260px,1fr)] gap-10 xl:gap-14 items-start">
          {/* Brand & Office Status */}
          <div className="max-w-xl">
            <Image
              src="/images/logo.png"
              alt="Luke Nass Real Estate"
              width={180}
              height={50}
              className="h-12 w-auto mb-6"
            />
            <p className="text-(--umber-foreground)/80 text-sm leading-relaxed mb-6">
              Your boutique real estate partner in Perth&apos;s SE Corridor. Backed by 65+ years combined local expertise,
              we deliver strategic results for discerning sellers and buyers.
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
              {socialLinks.map((social) => {
                const Icon = social.icon

                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit Luke Nass Real Estate on ${social.label}`}
                    className="text-(--umber-foreground)/60 hover:text-(--umber-foreground) transition-colors"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
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
          <div>
            <h4 className="font-serif text-lg text-(--umber-foreground) mb-5">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-(--umber-foreground)/60 mt-0.5" />
                <div>
                  <p className="text-(--umber-foreground) text-sm font-medium">08 9495 2226</p>
                  <p className="text-(--umber-foreground)/50 text-xs">Available by appointment</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-(--umber-foreground)/60 mt-0.5" />
                <p className="text-(--umber-foreground) text-sm">luke@lukenass.com.au</p>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-(--umber-foreground)/60 mt-0.5" />
                <div>
                  <p className="text-(--umber-foreground) text-sm">Unit 1/8 Rundle St</p>
                  <p className="text-(--umber-foreground)/50 text-xs">Kelmscott WA 6111</p>
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
            <Link
              href="/admin"
              className="text-(--umber-foreground)/50 hover:text-(--umber-foreground)/70 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
