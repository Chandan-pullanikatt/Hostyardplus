"use client"

import { useRef, useState } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import SectionHeader from "@/components/ui/SectionHeader"
import AnimateIn from "@/components/ui/AnimateIn"
import { Play } from "lucide-react"
import type { StoryMedia } from "@/lib/types"

interface StoriesSectionProps {
  stories: StoryMedia[]
}

export default function StoriesSection({ stories }: StoriesSectionProps) {
  const [active, setActive] = useState(Math.floor(stories.length / 2))
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="bg-[#f8f6f1] py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <AnimateIn className="mb-14">
          <SectionHeader
            label="Explore before you go"
            heading="Stories From Every Stay"
            subheading="Scroll through quick glimpses of destinations, stays, and experiences before you plan your trip"
          />
        </AnimateIn>
      </div>

      {/* Horizontal scroll reel */}
      <AnimateIn delay={200}>
        <div
          ref={scrollRef}
          className="flex items-center gap-4 overflow-x-auto scrollbar-hide px-[10vw] scroll-smooth"
          style={{ scrollSnapType: "x mandatory" }}
        >
          {stories.map((story, i) => {
            const isCenter = i === active
            const thumbnailUrl = story.thumbnail?.asset?._ref
              ? urlFor(story.thumbnail).width(400).height(650).url()
              : null

            return (
              <div
                key={story._id}
                onClick={() => setActive(i)}
                style={{ scrollSnapAlign: "center" }}
                className={`relative rounded-2xl overflow-hidden shrink-0 cursor-pointer transition-all duration-500 ${
                  isCenter
                    ? "w-64 h-[480px] md:w-80 md:h-[560px] opacity-100"
                    : "w-44 h-[360px] md:w-56 md:h-[420px] opacity-50"
                }`}
              >
                {thumbnailUrl ? (
                  <Image
                    src={thumbnailUrl}
                    alt={`Story ${i + 1}`}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
                {story.mediaType === "video" && isCenter && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                      <Play size={24} className="text-white fill-white ml-1" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </AnimateIn>
    </section>
  )
}
