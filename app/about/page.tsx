import { sanityFetch } from "@/sanity/lib/client"
import { aboutPageQuery } from "@/sanity/lib/queries"
import type { AboutPage } from "@/lib/types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnimateIn from "@/components/ui/AnimateIn"

const FALLBACK: AboutPage = {
  heroLabel: "About us",
  mainHeading: "Where Modern Comfort Meets the Beauty of Nature",
  mainDescription:
    "Created for traveler's seeking calm, comfort, and meaningful experiences, our space blends modern luxury with the beauty of nature. From peaceful mornings and wellness activities to unforgettable sunsets and curated experiences, every detail is thoughtfully designed to help you disconnect from the noise and reconnect with yours.",
  heroImage: undefined,
  stats: [
    { value: "10,000+", label: "Happy Travelers" },
    { value: "8,000+", label: "Community Members" },
    { value: "6,000+", label: "Returning Guests" },
    { value: "95%", label: "Positive Reviews" },
    { value: "4 Years", label: "Trusted Hospitality" },
  ],
  promiseSectionHeading: "Our Promise",
  promiseSubtitle: "Promising Comfort, Quality, and Meaningful Travel Experiences",
  promises: [
    {
      title: "Thoughtful Hospitality",
      description:
        "We believe every traveler deserves a welcoming, comfortable, and seamless experience designed with care and attention to detail.",
    },
    {
      title: "Meaningful Connections",
      description:
        "We create spaces and experiences that bring people together, encouraging genuine connections between travelers, hosts, and destinations.",
    },
    {
      title: "Authentic Experiences",
      description:
        "We focus on creating memorable stays that reflect the beauty, culture, and uniqueness of every destination we offer.",
    },
    {
      title: "Trusted Quality",
      description:
        "We carefully curate and verify every stay to ensure consistent quality, comfort, and experiences travelers can rely on with confidence.",
    },
  ],
  ctaHeading: "Ready To Experience Your Perfect Escape",
  ctaSubtitle:
    "Discover Thoughtfully Curated Stays Designed For Comfort, Connection, And Unforgettable Experiences Across Every Destination",
  ctaButtonText: "Book Now",
  ctaButtonLink: "/",
  ctaImage: undefined,
}

async function fetchPage(): Promise<AboutPage> {
  try {
    const data = await sanityFetch<AboutPage>(aboutPageQuery)
    if (!data) return FALLBACK
    return {
      heroLabel: data.heroLabel || FALLBACK.heroLabel,
      mainHeading: data.mainHeading || FALLBACK.mainHeading,
      mainDescription: data.mainDescription || FALLBACK.mainDescription,
      heroImage: data.heroImage ?? undefined,
      stats: data.stats?.length ? data.stats : FALLBACK.stats,
      promiseSectionHeading: data.promiseSectionHeading || FALLBACK.promiseSectionHeading,
      promiseSubtitle: data.promiseSubtitle || FALLBACK.promiseSubtitle,
      promises: data.promises?.length ? data.promises : FALLBACK.promises,
      ctaHeading: data.ctaHeading || FALLBACK.ctaHeading,
      ctaSubtitle: data.ctaSubtitle || FALLBACK.ctaSubtitle,
      ctaButtonText: data.ctaButtonText || FALLBACK.ctaButtonText,
      ctaButtonLink: data.ctaButtonLink || FALLBACK.ctaButtonLink,
      ctaImage: data.ctaImage ?? undefined,
    }
  } catch {
    return FALLBACK
  }
}

export default async function AboutPage() {
  const page = await fetchPage()

  const heroImageSrc = page.heroImage?.asset?._ref
    ? urlFor(page.heroImage).width(1400).height(560).url()
    : "/photos/aboutusmain.jpg"

  const ctaImageSrc = page.ctaImage?.asset?._ref
    ? urlFor(page.ctaImage).width(1400).height(500).url()
    : "/photos/aboutusbottom.png"

  return (
    <main className="bg-white">
      <Navbar solid />

      {/* ── About Section ─────────────────────────────────────────────────── */}
      <section className="pt-28 lg:pt-32 pb-14 lg:pb-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">

          {/* Two-column header */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 mb-10 lg:mb-14">
            <AnimateIn>
              <p className="font-serif text-[24px] leading-none tracking-[0.01em] text-[#1B1C1D] mb-4">{page.heroLabel}</p>
              <h1 className="font-sans font-medium text-[36px] leading-none tracking-normal text-gray-900">
                {page.mainHeading}
              </h1>
            </AnimateIn>
            <AnimateIn delay={100} className="flex lg:items-center">
              <p className="font-sans font-normal text-[18px] leading-none tracking-normal text-gray-500">
                {page.mainDescription}
              </p>
            </AnimateIn>
          </div>

          {/* Hero image with stats overlay */}
          <AnimateIn delay={160}>
            <div className="relative h-[280px] sm:h-[380px] lg:h-[520px] rounded-2xl lg:rounded-3xl overflow-hidden">
              <Image
                src={heroImageSrc}
                alt="Hostyard+ property"
                fill
                className="object-cover"
                priority
              />
              {/* Gradient overlay covering the entire image: bottom 100% black to top 0% transparent */}
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />

              {/* Stats overlay */}
              <div className="absolute bottom-0 left-0 right-0 flex divide-x divide-white/25 pt-10">
                {page.stats.map((stat) => (
                  <div key={stat.label} className="flex-1 py-5 lg:py-7 text-center text-white z-10">
                    <p className="font-serif text-2xl lg:text-3xl xl:text-4xl leading-none">
                      {stat.value}
                    </p>
                    <p className="font-sans text-[11px] lg:text-xs mt-1.5 text-white/75 tracking-wide uppercase">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Our Promise ───────────────────────────────────────────────────── */}
      <section className="bg-white py-14 lg:py-20 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">

          {/* Section heading */}
          <AnimateIn className="text-center mb-10 lg:mb-12">
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900">
              {page.promiseSectionHeading}
            </h2>
            <p className="font-sans text-gray-400 text-sm mt-3">
              {page.promiseSubtitle}
            </p>
          </AnimateIn>

          {/* Promise items */}
          <div className="rounded-2xl overflow-hidden bg-[#EAF2F0] divide-y divide-black/[0.07]">
            {page.promises.map((promise, i) => (
              <AnimateIn key={promise.title} delay={i * 60}>
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-8 lg:gap-12 px-6 sm:px-8 lg:px-12 py-7 lg:py-9">
                  <span className="font-serif text-gray-400 text-[36px] leading-none tracking-normal flex-none w-14">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-[36px] leading-none tracking-normal text-gray-900 flex-none sm:w-[400px]">
                    {promise.title}
                  </h3>
                  <p className="font-sans text-gray-500 text-base leading-none tracking-normal flex-1">
                    {promise.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────────── */}
      <section className="pt-14 lg:pt-20 pb-20 px-6 lg:px-12 bg-white">
        <div className="max-w-[1400px] mx-auto">
          <AnimateIn>
            <div className="relative rounded-2xl lg:rounded-3xl overflow-hidden flex flex-col items-center justify-center text-center min-h-[260px] md:min-h-[320px] lg:min-h-[360px] px-6 py-16">
              <Image
                src={ctaImageSrc}
                alt="Book your stay"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/45" />
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

      <Footer />
    </main>
  )
}
