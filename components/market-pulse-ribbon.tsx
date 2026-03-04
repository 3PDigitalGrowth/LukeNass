"use client"

import { TrendingUp, Clock, Trophy } from "lucide-react"

const stats = [
  { icon: TrendingUp, label: "114 Active Buyers in Roleystone" },
  { icon: Clock, label: "Avg. Days on Market: 9" },
  { icon: Trophy, label: "New Record: $1.2M in Seville Grove" },
  { icon: TrendingUp, label: "Market Growth: +12.4% YoY" },
  { icon: Clock, label: "Median Sale Time: 14 Days" },
  { icon: Trophy, label: "98% Asking Price Achieved" },
]

export function MarketPulseRibbon() {
  return (
    <section className="bg-primary py-4 overflow-hidden">
      <div className="flex animate-marquee">
        {[...stats, ...stats].map((stat, index) => (
          <div key={index} className="flex items-center gap-2 px-8 text-primary-foreground whitespace-nowrap">
            <stat.icon className="h-4 w-4" />
            <span className="text-sm font-medium">{stat.label}</span>
            <span className="text-primary-foreground/40 ml-8">•</span>
          </div>
        ))}
      </div>
    </section>
  )
}
