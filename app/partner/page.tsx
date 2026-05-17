import { sanityFetch } from "@/sanity/lib/client"
import { partnerPageQuery } from "@/sanity/lib/queries"
import type { PartnerPage } from "@/lib/types"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnimateIn from "@/components/ui/AnimateIn"
import { Home, Camera, Shield } from "lucide-react"

const FALLBACK: PartnerPage = {
  heroHeading: "Your Property. Our Promise.",
  heroSubtitle:
    "Partner with Hostyard+ and let us handle everything — from professional photography to curated guest management — while you earn without the stress.",
  featuresHeading: "What We Bring to the Table",
  features: [
    { iconKey: "home", title: "Full Property Management", description: "We handle bookings, check-ins, check-outs, cleaning coordination, and guest communication. You hand us the keys; we give you passive income." },
    { iconKey: "camera", title: "Professional Photography", description: "First impressions convert. Our photography team captures your property at its best — lighting, angles, and storytelling that fill your calendar." },
    { iconKey: "shield", title: "Curated Guests Only", description: "Every booking is screened. We only bring you responsible travelers who respect your space. No parties, no surprises." },
  ],
  ctaHeading: "Ready to List Your Property?",
  ctaSubtitle: "Join our growing community of property owners earning passively across Kerala. Let's talk.",
  ctaButtonText: "Chat on WhatsApp",
}

const WHATSAPP_NUMBER = "917025227733"
const WHATSAPP_MESSAGE = "Hi, I'd like to list my property with Hostyard+"

function FeatureIcon({ iconKey }: { iconKey: string }) {
  const cls = "w-7 h-7 text-ocean-400"
  if (iconKey === "camera") return <Camera className={cls} />
  if (iconKey === "shield") return <Shield className={cls} />
  return <Home className={cls} />
}

async function fetchPage(): Promise<PartnerPage> {
  try {
    const data = await sanityFetch<PartnerPage>(partnerPageQuery)
    if (!data) return FALLBACK
    return {
      heroHeading: data.heroHeading || FALLBACK.heroHeading,
      heroSubtitle: data.heroSubtitle || FALLBACK.heroSubtitle,
      featuresHeading: data.featuresHeading || FALLBACK.featuresHeading,
      features: data.features?.length ? data.features : FALLBACK.features,
      ctaHeading: data.ctaHeading || FALLBACK.ctaHeading,
      ctaSubtitle: data.ctaSubtitle || FALLBACK.ctaSubtitle,
      ctaButtonText: data.ctaButtonText || FALLBACK.ctaButtonText,
    }
  } catch {
    return FALLBACK
  }
}

export default async function PartnerPage() {
  const page = await fetchPage()
  const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary min-h-[60vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-6">
          <AnimateIn>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight">
              {page.heroHeading}
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="font-sans text-white/80 text-base md:text-lg leading-relaxed max-w-2xl">
              {page.heroSubtitle}
            </p>
          </AnimateIn>
          <AnimateIn delay={220}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ocean-400 hover:bg-ocean-200 text-white px-7 py-3.5 rounded-lg font-sans text-sm transition-colors"
            >
              <WhatsAppIcon />
              {page.ctaButtonText}
            </a>
          </AnimateIn>
        </div>
      </section>

      {/* Features */}
      <section className="bg-[#f8f6f1] py-20 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <AnimateIn className="mb-12 text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-tight">
              {page.featuresHeading}
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {page.features.map((feat, i) => (
              <AnimateIn key={feat.title} delay={i * 80}>
                <div className="h-full bg-white rounded-2xl p-8 flex flex-col gap-5 border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                    <FeatureIcon iconKey={feat.iconKey} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-serif text-xl text-gray-900">{feat.title}</h3>
                    <p className="font-sans text-gray-600 text-sm leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="bg-primary py-20 px-6 lg:px-12">
        <div className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
          <AnimateIn>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-tight">
              {page.ctaHeading}
            </h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <p className="font-sans text-white/70 text-base md:text-lg leading-relaxed">
              {page.ctaSubtitle}
            </p>
          </AnimateIn>
          <AnimateIn delay={180}>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ocean-400 hover:bg-ocean-200 text-white px-8 py-4 rounded-lg font-sans text-sm transition-colors"
            >
              <WhatsAppIcon />
              {page.ctaButtonText}
            </a>
          </AnimateIn>
        </div>
      </section>

      <Footer />
    </main>
  )
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}
