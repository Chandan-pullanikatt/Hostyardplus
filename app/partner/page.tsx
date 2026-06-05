import { sanityFetch } from "@/sanity/lib/client"
import { partnerPageQuery } from "@/sanity/lib/queries"
import type { PartnerPage } from "@/lib/types"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnimateIn from "@/components/ui/AnimateIn"
import PartnerFAQSection from "./PartnerFAQSection"
import PartnerCardsSection from "./PartnerCardsSection"

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
      ctaLabel: "List Your Property",
      formUrl:
        "https://forms.hostyardplus.com/hostyardplus1/form/EnquiryForm1/formperma/GlPubvgSC9cu6oTBbc_3CUHib-J02hvk6NN06Fy2_e8",
    },
    {
      _key: "agencies",
      category: "Travel Agencies & Tour Operators",
      title: "Create Better Travel Experiences",
      description:
        "Collaborate with us to offer curated stays, seamless planning, and unforgettable journeys for your travelers",
      ctaLabel: "Partner With Us",
      formUrl:
        "https://forms.hostyardplus.com/hostyardplus1/form/TravelAgenciesTourOperators/formperma/IhPwwJgwsMAj-YYts7OoBQz1u-eQTNWV0qv6Q40TlfQ",
    },
    {
      _key: "creators",
      category: "Creators & Influencers",
      title: "Inspire Through Travel Content",
      description:
        "Work with us to showcase destinations, create engaging travel content, and connect with a community of explorers",
      ctaLabel: "Collaborate With Us",
      formUrl:
        "https://forms.hostyardplus.com/hostyardplus1/form/CreatorsInfluencers/formperma/XrvnuVECBlO-x7sAq918is9X-PEk0CvW-dlm46wdwT8",
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

  return (
    <main className="bg-white">
      <Navbar solid />

      {/* Hero */}
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
      <PartnerCardsSection cards={page.partnerCards} />

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
