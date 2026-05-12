"use client"

import { useRef, useState, useLayoutEffect, useEffect } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import SectionHeader from "@/components/ui/SectionHeader"
import AnimateIn from "@/components/ui/AnimateIn"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import type { StoryMedia } from "@/lib/types"

interface StoriesSectionProps {
  stories: StoryMedia[]
}

export default function StoriesSection({ stories }: StoriesSectionProps) {
  const N = stories.length
  const center = Math.floor(N / 2)

  const [slots, setSlots] = useState<number[]>(() =>
    Array.from({ length: N }, (_, i) => i)
  )
  const [active, setActive]   = useState(center)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted]     = useState(false)

  // videoRefs indexed by original story index — only the active card's ref is non-null
  const videoRefs   = useRef<(HTMLVideoElement | null)[]>(Array(N).fill(null))
  const cardRefs    = useRef<(HTMLDivElement  | null)[]>(Array(N).fill(null))
  const stripRef    = useRef<HTMLDivElement>(null)
  const sectionRef  = useRef<HTMLElement>(null)
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const slotsRef    = useRef(slots)
  const recenterRef = useRef(false)
  const activeOrigRef    = useRef(slots[center])
  const hasBeenVisibleRef = useRef(false)

  useEffect(() => { slotsRef.current = slots }, [slots])

  // ── Strip DOM helpers ──────────────────────────────────────────────────
  function moveStrip(x: number, animated: boolean) {
    const el = stripRef.current
    if (!el) return
    el.style.transition = animated
      ? "transform 0.55s cubic-bezier(0.25,0.46,0.45,0.94)"
      : "none"
    el.style.transform = `translateX(${x}px)`
  }

  function snapToSlot(slotIdx: number, animated: boolean) {
    const card = cardRefs.current[slotIdx]
    if (!card) return
    moveStrip(window.innerWidth / 2 - (card.offsetLeft + card.clientWidth / 2), animated)
  }
  // ──────────────────────────────────────────────────────────────────────

  useLayoutEffect(() => {
    snapToSlot(center, false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useLayoutEffect(() => {
    if (!recenterRef.current) return
    recenterRef.current = false
    snapToSlot(center, false)
  }, [slots]) // eslint-disable-line react-hooks/exhaustive-deps

  const activeOrigIdx = slots[active]
  useEffect(() => { activeOrigRef.current = activeOrigIdx }, [activeOrigIdx])

  // ── Play active video (only 1 video element in DOM at a time) ──────────
  useEffect(() => {
    const v = videoRefs.current[activeOrigIdx]
    if (!v) return

    let cancelled = false

    const start = async () => {
      v.muted = false
      try {
        await v.play()
        if (cancelled) return
        setMuted(false)
        setPlaying(true)
      } catch {
        if (cancelled) return
        // Unmuted play blocked — retry muted
        v.muted = true
        setMuted(true)
        try {
          await v.play()
          if (!cancelled) setPlaying(true)
        } catch { /* fully blocked */ }
      }
    }

    start()

    return () => {
      cancelled = true
      v.pause() // clean slate for Strict Mode re-invoke or next card
    }
  }, [activeOrigIdx])

  // Keep mute state in sync if toggled
  useEffect(() => {
    const v = videoRefs.current[activeOrigIdx]
    if (v) v.muted = muted
  }, [muted, activeOrigIdx])

  // Pause when section leaves viewport, resume when it returns.
  // Only start pausing AFTER the section has been visible at least once —
  // this prevents the observer's initial below-fold callback from stopping
  // a video that just started playing on mount.
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        const v = videoRefs.current[activeOrigRef.current]
        if (entry.isIntersecting) {
          hasBeenVisibleRef.current = true
          if (v) v.play().catch(() => {})
        } else if (hasBeenVisibleRef.current) {
          // Only pause after the section was previously visible
          if (v) { v.pause(); setPlaying(false) }
        }
      },
      { threshold: 0.1 }
    )
    obs.observe(section)
    return () => obs.disconnect()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  // ──────────────────────────────────────────────────────────────────────

  const handleCardClick = (slotIndex: number) => {
    const origIdx = slots[slotIndex]

    if (slotIndex === active) {
      const v = videoRefs.current[origIdx]
      if (!v) return
      if (v.paused) v.play().then(() => setPlaying(true))
      else { v.pause(); setPlaying(false) }
      return
    }

    setPlaying(false)
    setActive(slotIndex)
    snapToSlot(slotIndex, true)

    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const currentSlots = slotsRef.current
      const shift = slotIndex - center
      if (shift === 0) return

      const newSlots = shift > 0
        ? [...currentSlots.slice(shift), ...currentSlots.slice(0, shift)]
        : [...currentSlots.slice(N + shift), ...currentSlots.slice(0, N + shift)]

      recenterRef.current = true
      setSlots(newSlots)
      setActive(center)
    }, 570)
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMuted(prev => !prev)
  }

  return (
    <section ref={sectionRef} className="bg-[#f8f6f1] py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <AnimateIn className="mb-14">
          <SectionHeader
            heading="Stories From Every Stay"
            subheading="Scroll through quick glimpses of destinations, stays, and experiences before you plan your trip"
          />
        </AnimateIn>
      </div>

      <AnimateIn delay={200}>
        <div className="w-full overflow-hidden h-[480px] md:h-[560px]">
          <div
            ref={stripRef}
            className="flex items-center gap-4 h-full"
            style={{ willChange: "transform" }}
          >
            {slots.map((origIdx, slotIndex) => {
              const story    = stories[origIdx]
              const isCenter = slotIndex === active
              const thumbUrl = story.thumbnail?.asset?._ref
                ? urlFor(story.thumbnail).width(400).height(650).url()
                : null

              return (
                <div
                  key={story._id}
                  ref={el => { cardRefs.current[slotIndex] = el }}
                  onClick={() => handleCardClick(slotIndex)}
                  className={`group relative rounded-2xl overflow-hidden shrink-0 cursor-pointer
                    transition-[width,height,opacity] duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                    ${isCenter
                      ? "w-64 h-[480px] md:w-80 md:h-[560px] opacity-100"
                      : "w-44 h-[360px] md:w-56 md:h-[420px] opacity-50"
                    }`}
                >
                  {/* Thumbnail always visible as base layer */}
                  {thumbUrl ? (
                    <Image
                      src={thumbUrl}
                      alt={`Story ${origIdx + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-400" />
                  )}

                  {/* Video only rendered for active card, overlaid on thumbnail */}
                  {isCenter && story.cloudinaryAsset?.secure_url && (
                    <video
                      ref={el => { videoRefs.current[origIdx] = el }}
                      src={story.cloudinaryAsset.secure_url}
                      className="absolute inset-0 w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                    />
                  )}

                  {/* Play/pause + mute controls on active card */}
                  {story.mediaType === "video" && isCenter && (
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 flex items-center justify-center">
                          {playing
                            ? <Pause size={24} className="text-white fill-white" />
                            : <Play  size={24} className="text-white fill-white ml-1" />}
                        </div>
                      </div>
                      <button
                        onClick={toggleMute}
                        className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
                        aria-label={muted ? "Unmute" : "Mute"}
                      >
                        {muted
                          ? <VolumeX size={16} className="text-white" />
                          : <Volume2 size={16} className="text-white" />}
                      </button>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </AnimateIn>
    </section>
  )
}
