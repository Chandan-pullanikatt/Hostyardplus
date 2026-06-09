"use client"

import { useRef, useState, useEffect } from "react"
import { m } from "framer-motion"
import BookingBar from "@/components/ui/BookingBar"
import BookNowButton from "@/components/ui/BookNowButton"
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
  // Active properties only, carrying each one's per-property stayTypes so the
  // BookingBar's Stay Type dropdown can filter by the selected destination.
  const bookingProperties = properties
    .filter((p) => p.status === "active")
    .map((p) => ({ location: p.location, stayTypes: p.stayTypes ?? [] }))

  const heading = settings.heroHeading ?? "Experience Your Perfect Escape Across Scenic Destinations"

  // CMS toggle: when on (default), the video starts muted; when off, we attempt
  // to start it with sound. Browsers block unmuted autoplay, so that attempt may
  // fail — in which case we fall back to muted so the video still plays.
  const startMuted = settings.heroVideoMuted ?? true

  const videoRef       = useRef<HTMLVideoElement>(null)
  const sectionRef     = useRef<HTMLElement>(null)
  const hasScrolledRef = useRef(false)
  const [muted, setMuted] = useState(startMuted)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = startMuted
    setMuted(startMuted)
    v.play().catch(() => {
      // Likely an unmuted-autoplay block — retry muted so the video still plays.
      if (!v.muted) {
        v.muted = true
        setMuted(true)
        v.play().catch(() => {})
      }
    })
  }, [startMuted])

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  // Pause only once the hero is COMPLETELY off-screen (threshold 0 → fires when
  // zero pixels remain visible), and resume when any part scrolls back in.
  // Skip the initial callback so it doesn't interfere with the autoplay setup.
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
      { threshold: 0 }
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  // Turn sound ON (one-way). The clean trick: just flip `muted` — don't call
  // play() while it's already playing, so the video unmutes without restarting.
  // Muting again is done via the speaker icon.
  const enableSound = () => {
    const v = videoRef.current
    if (!v || !v.muted) return
    v.muted = false
    setMuted(false)
    // Only (re)play if the browser actually paused it as a side effect; if that
    // play is blocked too, fall back to muted so it never sits paused.
    if (v.paused) {
      v.play().catch(() => { v.muted = true; setMuted(true); v.play().catch(() => {}) })
    }
  }

  // Global first-interaction capture: the instant the user touches, scrolls,
  // clicks, or types anywhere on the page, unmute the hero video. A real gesture
  // (touchstart on mobile, pointer/click/keydown on desktop) is what the browser
  // requires to allow audio. Fires once, then tears all listeners down.
  useEffect(() => {
    const events = ["pointerdown", "touchstart", "click", "keydown", "scroll"]
    const remove = () =>
      events.forEach((e) => window.removeEventListener(e, onFirst, true))
    const onFirst = () => { enableSound(); remove() }
    events.forEach((e) =>
      window.addEventListener(e, onFirst, { passive: true, capture: true })
    )
    return remove
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <section ref={sectionRef} onClick={enableSound} className="relative min-h-[100svh] flex flex-col">
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
            onClick={(e) => { e.stopPropagation(); toggleMute() }}
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

          {/* Mobile only: a single Book Now button in place of the full booking bar,
              so the hero video stays fully visible. Desktop uses the BookingBar below. */}
          <m.div
            variants={heroVariants.booking}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.7, ease, delay: 0.7 }}
            className="md:hidden"
          >
            <BookNowButton className="inline-flex items-center justify-center rounded-full bg-transparent border border-white/70 text-white font-sans text-sm font-semibold px-8 py-3.5 shadow-lg hover:bg-white/10 transition-colors">
              Book Now
            </BookNowButton>
          </m.div>
        </div>

        <m.div
          variants={heroVariants.booking}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, ease, delay: 0.7 }}
          className="hidden md:block pb-8"
        >
          <BookingBar properties={bookingProperties} />
        </m.div>
      </div>
    </section>
  )
}
