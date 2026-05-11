"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import type { PropertyDetail } from "@/lib/types"

interface Props {
  property: PropertyDetail
}

export default function PropertyHero({ property }: Props) {
  const images = property.heroImages?.length
    ? property.heroImages
    : property.image
    ? [property.image]
    : []

  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (images.length <= 1) return
    const t = setInterval(() => setCurrent(i => (i + 1) % images.length), 4000)
    return () => clearInterval(t)
  }, [images.length])

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {images.map((img, i) => {
        const src = img?.asset?._ref ? urlFor(img).width(1600).height(900).url() : null
        if (!src) return null
        return (
          <div
            key={i}
            className={`absolute inset-0 transition-opacity duration-1000 ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <Image src={src} alt={img.alt ?? property.title} fill className="object-cover" priority={i === 0} />
          </div>
        )
      })}

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

      {/* Bottom content */}
      <div className="absolute bottom-0 left-0 right-0 px-8 pb-10 flex items-end justify-between">
        <div>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-normal leading-none">
            {property.title}
          </h1>
          {property.tagline && (
            <p className="mt-2 text-white/80 text-base font-sans tracking-wide">
              {property.tagline}
            </p>
          )}
        </div>

        {/* Slide indicators */}
        {images.length > 1 && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-[3px] rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-white" : "w-4 bg-white/40"
                }`}
              />
            ))}
          </div>
        )}

        {/* Book Now button */}
        {property.bookingUrl && (
          <Link
            href={property.bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary hover:bg-ocean-600 text-white font-sans text-sm font-medium px-6 py-3 rounded-lg transition-colors"
          >
            Book Now
          </Link>
        )}
      </div>
    </section>
  )
}
