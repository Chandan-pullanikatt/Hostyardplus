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

  // Fully CMS-controlled — empty means empty (no hardcoded fallback text).
  const heading = settings.heroHeading ?? ""

  // CMS toggle: when on (default), the video starts muted; when off, we attempt
  // to start it with sound. Browsers block unmuted autoplay, so that attempt may
  // fail — in which case we fall back to muted so the video still plays.
  const startMuted = settings.heroVideoMuted ?? true

  const videoRef       = useRef<HTMLVideoElement>(null)
  const sectionRef     = useRef<HTMLElement>(null)
  const [muted, setMuted] = useState(startMuted)
  // Mirror of `muted` so the visibility observer can read the latest value
  // without re-subscribing.
  const mutedRef = useRef(startMuted)

  useEffect(() => {
    mutedRef.current = muted
  }, [muted])

  useEffect(() => {
    setMuted(startMuted)
  }, [startMuted])

  // Visibility-driven play/pause. The <video> starts muted (its `muted`
  // attribute) so the browser's initial autoplay is always silent and no audio
  // leaks from an off-screen hero. We play (respecting the current mute state)
  // once the hero is at least HALF visible, and pause only when it is
  // COMPLETELY off-screen.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        const v = videoRef.current
        if (!v) return
        if (entry.intersectionRatio === 0) {
          v.pause()
        } else if (entry.intersectionRatio >= 0.5) {
          v.muted = mutedRef.current
          v.play().catch(() => {
            v.muted = true
            setMuted(true)
            v.play().catch(() => {})
          })
        }
      },
      { threshold: [0, 0.5] }
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, [])

  // The speaker icon is the ONLY audio control. Unmuting a muted-autoplay video
  // on mobile pauses it unless we re-play within the same tap, so we always call
  // play() here (falling back to muted if an unmute is still blocked).
  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    const next = !v.muted
    v.muted = next
    setMuted(next)
    v.play().catch(() => {
      if (!next) {
        v.muted = true
        setMuted(true)
        v.play().catch(() => {})
      }
    })
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
          {heading && (
            <m.h1
              variants={heroVariants.heading}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.85, ease, delay: 0.38 }}
              className="text-white text-2xl md:text-3xl lg:text-[52px] font-serif leading-none lg:whitespace-nowrap"
            >
              {heading}
            </m.h1>
          )}

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
