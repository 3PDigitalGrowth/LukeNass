import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.18em] text-primary font-medium mb-4">Terms of Service</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
            Terms of Service
          </h1>
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p>
              By using this website, you agree to use it for lawful purposes and to rely on its content as general
              information only. Property information, marketing content, and suburb commentary may change without notice.
            </p>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">Website Content</h2>
              <p>
                We aim to keep information accurate and up to date, but we do not guarantee that all content is complete,
                current, or suitable for your specific circumstances. Independent advice should be obtained before making
                property decisions.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">Third-Party Links</h2>
              <p>
                This site may contain links to third-party websites or services. Those links are provided for convenience,
                and Luke Nass Real Estate is not responsible for third-party content, availability, or privacy practices.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">Enquiries and Contact Forms</h2>
              <p>
                Submitting an enquiry does not create an agency agreement or guarantee a specific response timeframe. We will
                make reasonable efforts to respond promptly and appropriately.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">Contact</h2>
              <p>
                For questions about these terms, please contact Luke Nass Real Estate at `luke@lukenass.com.au` or
                `08 9495 2226`.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
