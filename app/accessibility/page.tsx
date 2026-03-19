import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AccessibilityPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.18em] text-primary font-medium mb-4">Accessibility</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
            Accessibility
          </h1>
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p>
              Luke Nass Real Estate is committed to making this website easier to use for as many people as possible. We aim
              to provide clear navigation, readable content, and a consistent experience across modern devices and browsers.
            </p>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">Our Approach</h2>
              <p>
                We work to improve accessibility through clear headings, structured content, meaningful links, and
                mobile-friendly layouts. We also review the site regularly as content and functionality evolve.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">Need Assistance?</h2>
              <p>
                If you have trouble accessing any part of this website or need information in another format, please contact
                our office and we will do our best to assist you.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">Contact</h2>
              <p>
                Reach Luke Nass Real Estate at `08 9495 2226` or `luke@lukenass.com.au` if you encounter an accessibility
                issue on the site.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
