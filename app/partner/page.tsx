import { sanityFetch } from "@/sanity/lib/client"
import { partnerPageQuery } from "@/sanity/lib/queries"
import type { PartnerPage } from "@/lib/types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnimateIn from "@/components/ui/AnimateIn"
import PartnerFAQSection from "./PartnerFAQSection"

const FALLBACK: PartnerPage = {
  heroLabel: "Partner With Us",
  heroHeading: "Grow Together With Hostyard+",
  heroDescription:
    "Property owners, travel agencies, tour operators, and creators — join us in curating extraordinary staycation experiences across the country.",
  partnerCards: [
    {
      _key: "owners",
      category: "Property Owners",
      title: "Transform Properties Into Stays",
      description:
        "Partner with us to reach more travelers, increase bookings, and create memorable experiences across destinations",
    },
    {
      _key: "agencies",
      category: "Travel Agencies & Tour Operators",
      title: "Create Better Travel Experiences",
      description:
        "Collaborate with us to offer curated stays, seamless planning, and unforgettable journeys for your travelers",
    },
    {
      _key: "creators",
      category: "Creators & Influencers",
      title: "Inspire Through Travel Content",
      description:
        "Work with us to showcase destinations, create engaging travel content, and connect with a community of explorers",
    },
  ],
  ctaHeading: "Ready To Partner With Hostyard+",
  ctaSubtitle:
    "Join A Growing Network Of Partners Creating Meaningful Travel Experiences Across Destinations.",
  ctaButtonText: "Talk to Our Team",
  ctaButtonLink: "/contact",
  faqHeading: "Frequently Asked Questions",
  faqSubtitle: "Quick answers to common questions about your stay",
  faqs: [
    { _key: "q1", question: "Who can partner with Hostyard+?", answer: "Property owners, travel agencies, tour operators, creators, and influencers can collaborate with Hostyard+." },
    { _key: "q2", question: "How do I apply for partnership?", answer: "Reach out to our team through the contact page or WhatsApp, and we'll guide you through the simple onboarding process." },
    { _key: "q3", question: "Are there any joining fees?", answer: "There are no upfront joining fees. We work on a partnership model where we grow together." },
    { _key: "q4", question: "How does Hostyard+ help partners grow?", answer: "We provide marketing support, access to our traveler network, professional photography, and operational assistance to help partners maximize their potential." },
    { _key: "q5", question: "Can I partner with multiple properties or services?", answer: "Absolutely. We welcome partners with multiple properties or services and provide tailored solutions for each." },
    { _key: "q6", question: "Do creators and influencers get collaboration opportunities?", answer: "Yes! We actively collaborate with creators and influencers for content creation, destination showcases, and travel campaigns." },
  ],
}

async function fetchPage(): Promise<PartnerPage> {
  try {
    const data = await sanityFetch<PartnerPage>(partnerPageQuery)
    if (!data) return FALLBACK
    return {
      heroLabel: data.heroLabel || FALLBACK.heroLabel,
      heroHeading: data.heroHeading || FALLBACK.heroHeading,
      heroDescription: data.heroDescription || FALLBACK.heroDescription,
      partnerCards: data.partnerCards?.length ? data.partnerCards : FALLBACK.partnerCards,
      ctaHeading: data.ctaHeading || FALLBACK.ctaHeading,
      ctaSubtitle: data.ctaSubtitle || FALLBACK.ctaSubtitle,
      ctaButtonText: data.ctaButtonText || FALLBACK.ctaButtonText,
      ctaButtonLink: data.ctaButtonLink || FALLBACK.ctaButtonLink,
      ctaImage: data.ctaImage ?? undefined,
      faqHeading: data.faqHeading || FALLBACK.faqHeading,
      faqSubtitle: data.faqSubtitle || FALLBACK.faqSubtitle,
      faqs: data.faqs?.length ? data.faqs : FALLBACK.faqs,
    }
  } catch {
    return FALLBACK
  }
}

export default async function PartnerPage() {
  const page = await fetchPage()

  const ctaImageSrc = page.ctaImage?.asset?._ref
    ? urlFor(page.ctaImage).width(1400).height(500).url()
    : "/photos/partner.jpg"

  return (
    <main className="bg-white">
      <Navbar theme="light" />      {/* Hero */}
      <section className="pt-28 lg:pt-32 pb-14 lg:pb-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20">
            <AnimateIn>
              <p className="font-serif text-[24px] leading-none tracking-[0.01em] text-[#1B1C1D] mb-4">
                {page.heroLabel}
              </p>
              <h1 className="font-sans font-medium text-[36px] leading-none tracking-normal text-gray-900">
                {page.heroHeading}
              </h1>
            </AnimateIn>
            <AnimateIn delay={100} className="flex lg:items-center">
              <p className="font-sans font-normal text-[18px] leading-relaxed tracking-normal text-gray-500">
                {page.heroDescription}
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>
 
      {/* Partner Cards */}
      <section className="py-14 lg:py-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {page.partnerCards.map((card, i) => {
              const imgSrc = card.image?.asset?._ref
                ? urlFor(card.image).width(600).height(400).url()
                : null
              return (
                <AnimateIn key={card._key} delay={i * 80}>
                  <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm h-full">
                    <div className="relative h-60 bg-[#e8f0ed]">
                      {imgSrc && (
                        <Image src={imgSrc} alt={card.title} fill className="object-cover" />
                      )}
                    </div>
                    <div className="p-6">
                      <span className="inline-block font-sans text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-1 mb-4">
                        {card.category}
                      </span>
                      <h3 className="font-serif text-2xl text-gray-900 mb-2 leading-snug">
                        {card.title}
                      </h3>
                      <p className="font-sans text-sm text-gray-500 leading-relaxed">
                        {card.description}
                      </p>
                    </div>
                  </div>
                </AnimateIn>
              )
            })}
          </div>
        </div>
      </section>
 
      {/* CTA Banner */}
      <section className="pt-14 lg:pt-20 pb-14 lg:pb-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <AnimateIn>
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center min-h-[260px] md:min-h-[320px] lg:min-h-[360px] px-6 py-16">
              <Image
                src={ctaImageSrc}
                alt="Partner with Hostyard+"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="relative z-10">
                <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-white leading-tight max-w-2xl mx-auto">
                  {page.ctaHeading}
                </h2>
                <p className="font-sans text-white/75 text-sm md:text-base mt-4 max-w-xl mx-auto leading-relaxed">
                  {page.ctaSubtitle}
                </p>
                <Link
                  href={page.ctaButtonLink}
                  className="mt-8 inline-block border border-white text-white font-sans text-sm px-8 py-3 rounded-md hover:bg-white/10 transition-colors"
                >
                  {page.ctaButtonText}
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* FAQ */}
      <PartnerFAQSection
        heading={page.faqHeading}
        subtitle={page.faqSubtitle}
        faqs={page.faqs}
      />

      <Footer />
    </main>
  )
}
