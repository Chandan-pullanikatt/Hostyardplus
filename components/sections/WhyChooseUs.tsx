"use client"

import { useState } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import SectionHeader from "@/components/ui/SectionHeader"
import AnimateIn from "@/components/ui/AnimateIn"
import type { WhyChooseUsTab } from "@/lib/types"

interface WhyChooseUsProps {
  tabs: WhyChooseUsTab[]
}

export default function WhyChooseUs({ tabs }: WhyChooseUsProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = tabs[activeIndex]

  return (
    <section className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <AnimateIn className="mb-12">
          <SectionHeader
            label="What sets us apart"
            heading="Why Choose Us"
            subheading="Thoughtfully curated stays designed for comfort, convenience, and memorable travel experiences."
          />
        </AnimateIn>

        {/* Tab bar */}
        <AnimateIn delay={150} className="flex items-center justify-center gap-2 md:gap-6 mb-8 flex-wrap">
          {tabs.map((tab, i) => (
            <button
              key={tab._id}
              onClick={() => setActiveIndex(i)}
              className={`font-sans text-sm px-4 py-2 rounded-full transition-colors ${
                i === activeIndex
                  ? "border border-gray-900 text-gray-900"
                  : "text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.tabLabel}
            </button>
          ))}
        </AnimateIn>

        {/* Image + card */}
        {active && (
          <AnimateIn delay={300}>
            <div className="relative rounded-2xl overflow-hidden h-[500px] md:h-[600px]">
              {active.image?.asset?._ref && (
                <Image
                  src={urlFor(active.image).width(1400).height(700).url()}
                  alt={active.image.alt ?? active.tabLabel}
                  fill
                  className="object-cover transition-opacity duration-300"
                />
              )}
              {/* Bottom card overlay */}
              <div className="absolute bottom-6 left-6 right-6 sm:right-auto bg-white rounded-xl p-5 sm:max-w-xs shadow-md">
                <h3 className="font-sans font-normal text-sm text-gray-900 mb-2">{active.title}</h3>
                <p className="font-sans text-xs text-gray-600 leading-relaxed">{active.description}</p>
                {/* Dot pagination */}
                <div className="flex gap-2 mt-4">
                  {tabs.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === activeIndex ? "w-6 bg-gray-900" : "w-1.5 bg-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </AnimateIn>
        )}
      </div>
    </section>
  )
}
