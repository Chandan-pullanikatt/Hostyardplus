"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import AnimateIn from "@/components/ui/AnimateIn"

interface WhyChooseUsTabData {
  id: string
  label: string
  title: string
  description: string
  imageUrls: string[]
}

const FALLBACK_TABS: WhyChooseUsTabData[] = [
  {
    id: "handpicked",
    label: "Handpicked Experiences",
    title: "Handpicked Experiences",
    description: "Every stay is hand-selected by our team for quality, character, and comfort that goes beyond expectations.",
    imageUrls: [
      "https://fastly.picsum.photos/id/28/1400/800.jpg?hmac=6z4E1Qa0OYxGUL78g5mGSNcPUt5eVCFrHHNKMvRHWBk",
      "https://fastly.picsum.photos/id/42/1400/800.jpg?hmac=6HWE17Rm7YuUNhE7q8b7tZKEfVvzYlXLHbUmEFEuGhE",
      "https://fastly.picsum.photos/id/96/1400/800.jpg?hmac=V5YLnNNH7nCDYyUZqAaSXQPEpAO-MXfleWJBZXEjBFc",
    ],
  },
  {
    id: "scenic",
    label: "Scenic Destinations",
    title: "Scenic Destinations",
    description: "Nestled in Kerala's most breathtaking landscapes — from misty mountains to tranquil backwaters.",
    imageUrls: [
      "https://fastly.picsum.photos/id/15/1400/800.jpg?hmac=XuaVl68xJMgXPnDrK07LqP0l9JEuaGh2e2Pl31LVWI",
      "https://fastly.picsum.photos/id/10/1400/800.jpg?hmac=YLhGqidl7LS9nXHujFSsqFSMqGI1FdAMuWI7YJvFxbw",
      "https://fastly.picsum.photos/id/29/1400/800.jpg?hmac=lWnFNWfB_BzxLBGWJHyEpRqT0AHWKcDNDMn1oZYniWA",
    ],
  },
  {
    id: "connect",
    label: "Connect & Belong",
    title: "Connect & Belong",
    description: "Our spaces are designed for connection — meet fellow travelers, share stories, and feel at home anywhere.",
    imageUrls: [
      "https://fastly.picsum.photos/id/65/1400/800.jpg?hmac=1zNlS3OqBTZRYtlGEr4FIJY_e7C91fblJ59AkLMioT0",
      "https://fastly.picsum.photos/id/49/1400/800.jpg?hmac=GzfNGPtfv9oW19YO7tTWvpS1Dg7f7yDjdyPM52qSUOI",
      "https://fastly.picsum.photos/id/83/1400/800.jpg?hmac=yKjPBSTXvGT3oeYd8kOL7kIHgdxETb6PrGYyVSSrNcs",
    ],
  },
  {
    id: "verified",
    label: "Verified Stays",
    title: "Verified Stays",
    description: "Every property is personally inspected and verified to meet our standards of safety, hygiene, and quality.",
    imageUrls: [
      "https://fastly.picsum.photos/id/60/1400/800.jpg?hmac=LWnFxI0FVFR_8D8R5V2FHqy3lNfkE3IFhIRGgSAWxFE",
      "https://fastly.picsum.photos/id/48/1400/800.jpg?hmac=Q7MBDZw7rK2E5EFnr2E9fT6BFAI1FhI1FRGgSAWxFE",
      "https://fastly.picsum.photos/id/39/1400/800.jpg?hmac=9KMBDZw7rK2E5EFnr2E9fT6BFAI1FhI1FRGgSAWxFE",
    ],
  },
]

interface Props {
  tabs?: WhyChooseUsTabData[]
}

export default function WhyChooseUs({ tabs }: Props) {
  const TABS = tabs ?? FALLBACK_TABS
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)

  const prevTab = () => setActiveIndex((i) => (i - 1 + TABS.length) % TABS.length)
  const nextTab = () => setActiveIndex((i) => (i + 1) % TABS.length)

  const active = TABS[activeIndex] ?? TABS[0]
  const slideCount = active?.imageUrls?.length ?? 0

  // Auto-advance slides every 3 s; reset when tab changes
  useEffect(() => {
    setSlideIndex(0)
    if (slideCount < 2) return
    const id = setInterval(() => setSlideIndex((i) => (i + 1) % slideCount), 3000)
    return () => clearInterval(id)
  }, [activeIndex, slideCount])

  if (!active) return null

  return (
    <section className="bg-[#f8f6f1] pt-14 md:pt-20 pb-0 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <AnimateIn className="mb-12 flex flex-col items-center text-center gap-3">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-tight">
            Why Choose Us
          </h2>
          <p className="font-sans text-sm text-gray-500 max-w-md leading-relaxed">
            Thoughtfully curated stays designed for comfort, convenience, and memorable travel experiences.
          </p>
        </AnimateIn>

        <AnimateIn delay={150} className="w-full">
          {/* --- Desktop tab strip: sits ABOVE the card --- */}
          <div className="hidden md:flex justify-center">
            <div className="inline-flex items-end gap-0 relative" style={{ marginBottom: '-1px' }}>
              {TABS.map((tab, i) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveIndex(i)}
                  className={`relative font-sans text-sm px-8 py-3 whitespace-nowrap transition-colors ${
                    i === activeIndex
                      ? "bg-white text-gray-900 font-semibold rounded-t-2xl border border-gray-200 border-b-white z-10"
                      : "text-gray-400 hover:text-gray-700 bg-transparent border border-transparent"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* White content card */}
          <div className="w-full bg-white border border-gray-200 rounded-[24px]">

            {/* Mobile tab navigation — sits inside the card */}
            <div className="flex md:hidden items-center gap-2 px-3">

              {/* Mobile prev arrow */}
              <button
                onClick={prevTab}
                aria-label="Previous tab"
                className="shrink-0 w-9 h-10 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="10 4 4 8 10 12" />
                </svg>
              </button>

              {/* Mobile active tab label */}
              <div className="flex-1 text-center py-3">
                <span className="font-sans text-sm text-gray-900 font-semibold whitespace-nowrap">
                  {TABS[activeIndex]?.label}
                </span>
              </div>

              {/* Mobile next arrow */}
              <button
                onClick={nextTab}
                aria-label="Next tab"
                className="shrink-0 w-9 h-10 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
              >
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="6 4 12 8 6 12" />
                </svg>
              </button>

            </div>

            {/* Image area */}
            <div className="p-3 md:p-4">
              <div className="relative h-[240px] md:h-[600px] w-full rounded-[16px] md:rounded-[20px] overflow-hidden">
                {active.imageUrls.map((src, i) => (
                  <Image
                    key={src}
                    src={src}
                    alt={`${active.title} ${i + 1}`}
                    fill
                    priority={i === 0}
                    className={`object-cover transition-opacity duration-700 ${
                      i === slideIndex ? "opacity-100" : "opacity-0"
                    }`}
                  />
                ))}

                {/* Info box — desktop overlay only */}
                <div className="hidden md:block absolute bottom-6 left-6 bg-white rounded-xl p-5 max-w-xs shadow-md">
                  <h3 className="font-serif text-base text-gray-900 mb-2">{active.title}</h3>
                  <p className="font-sans text-xs text-gray-600 leading-relaxed">{active.description}</p>
                </div>

                {/* Slide dots — center bottom of image */}
                {slideCount > 1 && (
                  <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
                    {active.imageUrls.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSlideIndex(i)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          i === slideIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Info block — mobile only, below image */}
              <div className="md:hidden px-3 pt-4 pb-2">
                <h3 className="font-serif text-base text-gray-900 mb-1">{active.title}</h3>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">{active.description}</p>
              </div>
            </div>

          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
