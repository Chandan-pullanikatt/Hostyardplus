"use client"

import { useState } from "react"
import Image from "next/image"
import type { PropertyDetail } from "@/lib/types"

const EXPERIENCES = [
  {
    id: "yoga",
    title: "Free Yoga Classes",
    description:
      "Begin your day with peaceful guided yoga sessions surrounded by calming natural views and fresh open air. Designed for all skill levels, our complimentary classes help improve flexibility, reduce stress.",
    image: "/photos/yoga.jpg",
  },
  {
    id: "board",
    title: "Balancing Board Experience",
    description:
      "Enjoy a unique wellness activity that combines movement, focus, and fun through our balancing board experience. Perfect for both beginners and enthusiasts.",
    image: "/photos/board.jpg",
  },
  {
    id: "sunset",
    title: "Sunset Guided Hike",
    description:
      "Experience the beauty of nature with our guided sunset hikes through scenic trails and breathtaking landscapes. As the sky transforms into warm golden tones, enjoy a peaceful evening walk.",
    image: "/photos/sunsetguide.jpg",
  },
]

interface Props {
  property: PropertyDetail
}

export default function PropertyExperiences({ property }: Props) {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="bg-[#F5F4F0] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex gap-4 h-[580px]">
          {EXPERIENCES.map((exp) => {
            const active = hovered === exp.id

            return (
              <div
                key={exp.id}
                onMouseEnter={() => setHovered(exp.id)}
                onMouseLeave={() => setHovered(null)}
                style={{ flex: active ? 2 : 1 }}
                className="relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out"
              >
                <Image
                  src={exp.image}
                  alt={exp.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out scale-100 hover:scale-[1.03]"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />

                {/* gradient overlay — stronger at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

                {/* bottom content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block bg-primary text-white text-xs font-sans px-3 py-1.5 rounded-full mb-3">
                    {property.location}
                  </span>

                  <h3
                    className={`font-serif italic text-white leading-tight transition-all duration-500 ease-in-out ${
                      active ? "text-3xl mb-3" : "text-2xl mb-0"
                    }`}
                  >
                    {exp.title}
                  </h3>

                  {/* description slides in/out */}
                  <div
                    className="overflow-hidden transition-all duration-500 ease-in-out"
                    style={{ maxHeight: active ? "120px" : "0px", opacity: active ? 1 : 0 }}
                  >
                    <p className="text-white/80 font-sans text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
