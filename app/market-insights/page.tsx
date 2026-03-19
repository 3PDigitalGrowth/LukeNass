import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"

const insightHighlights = [
  {
    title: "Seller Positioning",
    description:
      "Different suburbs, property types, and buyer pools require different campaign strategies. We tailor presentation, pricing guidance, and communication to the property rather than defaulting to a generic template.",
  },
  {
    title: "Buyer Behaviour",
    description:
      "Momentum is often shaped by confidence, clarity, and timing. Understanding how buyers compare homes across Roleystone, Kelmscott, Bedfordale, Armadale, and the wider corridor helps shape stronger campaigns.",
  },
  {
    title: "Local Strategy",
    description:
      "Market insight is not just about numbers. It is about knowing what matters in each pocket of Perth's southeast corridor and using that insight to guide better decisions for buyers and sellers.",
  },
]

export default function MarketInsightsPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 border-b border-border/30 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <p className="text-sm uppercase tracking-[0.18em] text-primary font-medium mb-4">Market Insights</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-foreground mb-6">
            Local insight for smarter property decisions.
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
            We use local knowledge, strategic positioning, and buyer feedback to help clients make clearer decisions across
            Perth&apos;s southeast corridor. If you&apos;re planning your next move, we&apos;re happy to talk through the market with
            you directly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/sell#sell-appraisal-form"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              Request Seller Guidance
            </Link>
            <Link
              href="/buy#buyer-match-form"
              className="inline-flex items-center justify-center rounded-lg border border-border bg-card px-6 py-3 text-foreground font-medium hover:bg-muted transition-colors"
            >
              Explore Buyer Guidance
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-6">
            {insightHighlights.map((item) => (
              <article key={item.title} className="rounded-2xl border border-border/50 bg-card p-8 shadow-sm">
                <h2 className="font-serif text-2xl tracking-tight text-foreground mb-4">{item.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
