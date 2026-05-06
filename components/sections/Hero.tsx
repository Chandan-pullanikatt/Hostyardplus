"use client"

import { m } from "framer-motion"
import BookingBar from "@/components/ui/BookingBar"
import type { SiteSettings, Property } from "@/lib/types"
import { Star } from "lucide-react"

interface HeroProps {
  settings: SiteSettings
  properties: Property[]
}

const heroVariants = {
  badge:    { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  heading:  { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } },
  sub:      { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } },
  booking:  { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
}

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero({ settings, properties }: HeroProps) {
  const destinations = properties
    .filter((p) => p.status === "active")
    .map((p) => p.location)

  const heading = settings.heroHeading ?? "Your Perfect Escape in the Mountains"
  const italicWord = settings.heroHeadingItalic ?? "Escape"
  const parts = heading.split(italicWord)

  return (
    <section className="relative min-h-screen flex flex-col">
      {/* Video / image background */}
      <div className="absolute inset-0 overflow-hidden">
        {settings.heroVideoUrl ? (
          <video
            src={settings.heroVideoUrl}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-primary" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <div className="h-24" />

        <div className="flex flex-col items-center justify-center flex-1 text-center gap-6 pb-16">
          {/* Rating badge */}
          <m.div
            variants={heroVariants.badge}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm text-white text-sm font-sans px-4 py-2 rounded-full"
          >
            <Star size={14} className="fill-sun-400 text-sun-400" />
            <span>
              {settings.heroRating ?? "4.93 / 5"} · {settings.heroRatingCount ?? "2000+"} reviews on Google
            </span>
          </m.div>

          {/* Main heading */}
          <m.h1
            variants={heroVariants.heading}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.85, ease, delay: 0.38 }}
            className="text-white text-5xl md:text-6xl lg:text-7xl font-serif leading-tight max-w-3xl"
          >
            {parts[0]}
            <em className="italic">{italicWord}</em>
            {parts[1]}
          </m.h1>

          {/* Subheading */}
          <m.p
            variants={heroVariants.sub}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.75, ease, delay: 0.54 }}
            className="text-white/80 font-sans text-base md:text-lg max-w-xl leading-relaxed"
          >
            {settings.heroSubheading ?? "Find calm in a modern hideaway with stunning views in the heart of Suryanelli"}
          </m.p>
        </div>

        {/* Booking bar */}
        <m.div
          variants={heroVariants.booking}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease, delay: 0.7 }}
          className="pb-8"
        >
          <BookingBar destinations={destinations} />
        </m.div>
      </div>
    </section>
  )
}
