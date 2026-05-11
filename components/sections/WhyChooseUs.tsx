"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import AnimateIn from "@/components/ui/AnimateIn"

const TABS = [
  {
    id: "handpicked",
    label: "Handpicked Experiences",
    title: "Handpicked Experiences",
    description: "Every stay is hand-selected by our team for quality, character, and comfort that goes beyond expectations.",
    images: [
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
    images: [
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
    images: [
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
    images: [
      "https://fastly.picsum.photos/id/60/1400/800.jpg?hmac=LWnFxI0FVFR_8D8R5V2FHqy3lNfkE3IFhIRGgSAWxFE",
      "https://fastly.picsum.photos/id/48/1400/800.jpg?hmac=Q7MBDZw7rK2E5EFnr2E9fT6BFAI1FhI1FRGgSAWxFE",
      "https://fastly.picsum.photos/id/39/1400/800.jpg?hmac=9KMBDZw7rK2E5EFnr2E9fT6BFAI1FhI1FRGgSAWxFE",
    ],
  },
]

export default function WhyChooseUs() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)

  // Auto-advance slides every 3 s; reset when tab changes
  useEffect(() => {
    setSlideIndex(0)
    const id = setInterval(() => setSlideIndex((i) => (i + 1) % 3), 3000)
    return () => clearInterval(id)
  }, [activeIndex])

  const active = TABS[activeIndex]

  return (
    <section className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <AnimateIn className="mb-12 flex flex-col items-center text-center gap-3">
          <h2 className="font-serif italic text-4xl md:text-5xl text-gray-900 leading-tight">
            Why Choose Us
          </h2>
        </AnimateIn>

        {/* Tab bar */}
        <AnimateIn delay={150} className="flex items-center justify-center gap-2 md:gap-4 mb-8 flex-wrap">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => setActiveIndex(i)}
              className={`font-sans text-sm px-5 py-2 rounded-full transition-colors ${
                i === activeIndex
                  ? "border border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </AnimateIn>

        {/* Slideshow */}
        <AnimateIn delay={300}>
          <div className="relative rounded-2xl overflow-hidden h-[500px] md:h-[600px]">
            {/* All 3 images stacked, crossfade via opacity */}
            {active.images.map((src, i) => (
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

            {/* Bottom info card */}
            <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white rounded-xl p-5 sm:max-w-xs shadow-md">
              <h3 className="font-serif text-base text-gray-900 mb-2">{active.title}</h3>
              <p className="font-sans text-xs text-gray-600 leading-relaxed">{active.description}</p>
              {/* Slide dots */}
              <div className="flex gap-2 mt-4">
                {active.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setSlideIndex(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === slideIndex ? "w-6 bg-gray-900" : "w-1.5 bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}
