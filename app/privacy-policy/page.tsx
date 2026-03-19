import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <p className="text-sm uppercase tracking-[0.18em] text-primary font-medium mb-4">Privacy Policy</p>
          <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tighter text-foreground mb-6">
            Privacy Policy
          </h1>
          <div className="space-y-8 text-muted-foreground leading-relaxed">
            <p>
              Luke Nass Real Estate respects your privacy and is committed to handling personal information responsibly. This
              page outlines the general way we collect, use, store, and protect information submitted through our website.
            </p>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">What We Collect</h2>
              <p>
                We may collect details such as your name, phone number, email address, property address, and any information
                you choose to include in an enquiry or appraisal request.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">How We Use It</h2>
              <p>
                We use submitted information to respond to enquiries, provide property guidance, arrange appraisals,
                communicate with buyers and sellers, and improve the services we provide.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">Sharing Information</h2>
              <p>
                We do not sell your information. We may share details with trusted service providers or partners only where
                required to assist with your enquiry or to operate our website and business processes.
              </p>
            </div>
            <div>
              <h2 className="font-serif text-2xl text-foreground mb-3">Contact</h2>
              <p>
                If you have any questions about privacy or how your information is handled, please contact Luke Nass Real
                Estate at `luke@lukenass.com.au` or call `08 9495 2226`.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
