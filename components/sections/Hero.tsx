"use client"

import { useRef, useState, useEffect } from "react"
import { m } from "framer-motion"
import BookingBar from "@/components/ui/BookingBar"
import type { SiteSettings, Property } from "@/lib/types"
import { Volume2, VolumeX } from "lucide-react"

interface HeroProps {
  settings: SiteSettings
  properties: Property[]
}

const heroVariants = {
  heading:  { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } },
  booking:  { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } },
}

const ease = [0.16, 1, 0.3, 1] as const

export default function Hero({ settings, properties }: HeroProps) {
  const destinations = properties
    .filter((p) => p.status === "active")
    .map((p) => p.location)

  const heading = settings.heroHeading ?? "Experience Your Perfect Escape Across Scenic Destinations"

  const videoRef       = useRef<HTMLVideoElement>(null)
  const sectionRef     = useRef<HTMLElement>(null)
  const hasScrolledRef = useRef(false)
  const [muted, setMuted] = useState(true) // matches the muted HTML attribute

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    // Programmatic play as a fallback — keeps audio muted (matches the HTML attribute).
    // Browsers block autoPlay only when unmuted; muted autoplay is always allowed.
    v.muted = true
    v.play().catch(() => {})
  }, [])

  // Pause when hero scrolls out of view, resume when it comes back.
  // Skip the initial callback (hero is visible on load) to avoid interfering
  // with the autoplay that's already been triggered.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current
        if (!v) return
        if (entry.isIntersecting) {
          if (hasScrolledRef.current) v.play().catch(() => {})
        } else {
          hasScrolledRef.current = true
          v.pause()
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <section ref={sectionRef} className="relative min-h-[100svh] flex flex-col">
      {/* Video / image background */}
      <div className="absolute inset-0 overflow-hidden">
        {settings.heroVideo?.secure_url ? (
          <video
            ref={videoRef}
            src={settings.heroVideo.secure_url}
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

        {/* Mute / unmute toggle */}
        {settings.heroVideo?.secure_url && (
          <button
            onClick={toggleMute}
            aria-label={muted ? "Unmute video" : "Mute video"}
            className="absolute bottom-6 right-6 z-20 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/60 transition-colors"
          >
            {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          </button>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col flex-1 max-w-[1400px] mx-auto px-6 lg:px-12 w-full">
        <div className="h-16 md:h-24" />

        <div className="flex flex-col items-center justify-end flex-1 text-center gap-5 pb-10">
          <m.h1
            variants={heroVariants.heading}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.85, ease, delay: 0.38 }}
            className="text-white text-2xl md:text-3xl lg:text-[52px] font-serif leading-none lg:whitespace-nowrap"
          >
            {heading}
          </m.h1>
        </div>

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
