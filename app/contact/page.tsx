import { sanityFetch } from "@/sanity/lib/client"
import { contactPageQuery } from "@/sanity/lib/queries"
import type { ContactPage } from "@/lib/types"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnimateIn from "@/components/ui/AnimateIn"

const FALLBACK: ContactPage = {
  heading: "Let's Talk",
  tagline: "We're approachable, we're fast, and we're on WhatsApp. Reach out — we'd love to hear from you.",
  phone: "+91 70252 27733",
  whatsappNumber: "917025227733",
  whatsappButtonText: "Chat on WhatsApp",
  phoneButtonText: "Call Us",
}

async function fetchPage(): Promise<ContactPage> {
  try {
    const data = await sanityFetch<ContactPage>(contactPageQuery)
    if (!data) return FALLBACK
    return {
      heading: data.heading || FALLBACK.heading,
      tagline: data.tagline || FALLBACK.tagline,
      phone: data.phone || FALLBACK.phone,
      whatsappNumber: data.whatsappNumber || FALLBACK.whatsappNumber,
      whatsappButtonText: data.whatsappButtonText || FALLBACK.whatsappButtonText,
      phoneButtonText: data.phoneButtonText || FALLBACK.phoneButtonText,
    }
  } catch {
    return FALLBACK
  }
}

export default async function ContactPage() {
  const page = await fetchPage()
  const waUrl = `https://wa.me/${page.whatsappNumber}`
  const telUrl = `tel:+${page.whatsappNumber}`

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary min-h-[40vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-4">
          <AnimateIn>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-none">
              {page.heading}
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed">
              {page.tagline}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Contact options */}
      <section className="bg-[#f8f6f1] py-20 px-6 lg:px-12">
        <div className="max-w-[900px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* WhatsApp */}
          <AnimateIn>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center text-center gap-5 bg-white rounded-2xl p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-[#25D366]/10 flex items-center justify-center">
                <WhatsAppIcon className="w-7 h-7 text-[#25D366]" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-serif text-xl text-gray-900">{page.whatsappButtonText}</span>
                <span className="font-sans text-gray-500 text-sm">{page.phone}</span>
              </div>
              <span className="font-sans text-sm text-ocean-600 group-hover:text-ocean-400 transition-colors">
                Open WhatsApp →
              </span>
            </a>
          </AnimateIn>

          {/* Phone */}
          <AnimateIn delay={100}>
            <a
              href={telUrl}
              className="group flex flex-col items-center text-center gap-5 bg-white rounded-2xl p-10 border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center">
                <PhoneIcon className="w-7 h-7 text-primary" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-serif text-xl text-gray-900">{page.phoneButtonText}</span>
                <span className="font-sans text-gray-500 text-sm">{page.phone}</span>
              </div>
              <span className="font-sans text-sm text-ocean-600 group-hover:text-ocean-400 transition-colors">
                Tap to call →
              </span>
            </a>
          </AnimateIn>

        </div>
      </section>

      <Footer />
    </main>
  )
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.66A2 2 0 012 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
    </svg>
  )
}
