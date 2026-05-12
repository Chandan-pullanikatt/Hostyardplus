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

  // slots[i] = original story index at flex position i
  const [slots, setSlots] = useState<number[]>(() =>
    Array.from({ length: N }, (_, i) => i)
  )
  const [active, setActive] = useState(center)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  const videoRefs   = useRef<(HTMLVideoElement | null)[]>(Array(N).fill(null))
  const cardRefs    = useRef<(HTMLDivElement  | null)[]>(Array(N).fill(null))
  const stripRef    = useRef<HTMLDivElement>(null)
  const timerRef    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const slotsRef    = useRef(slots)
  const recenterRef = useRef(false)   // flag: do a no-animation recenter after slot rotation

  // Keep slotsRef in sync so the timeout callback always reads current slots
  useEffect(() => { slotsRef.current = slots }, [slots])

  // ── Direct-DOM helpers (no React state → no extra re-renders) ──────────
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

  // Initial centering — runs once, before first paint
  useLayoutEffect(() => {
    snapToSlot(center, false)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // After a slot rotation React re-renders the strip — recenter silently
  useLayoutEffect(() => {
    if (!recenterRef.current) return
    recenterRef.current = false
    snapToSlot(center, false)
  }, [slots]) // eslint-disable-line react-hooks/exhaustive-deps

  const activeOrigIdx = slots[active]

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
    snapToSlot(slotIndex, true)   // animate strip to clicked card

    // After the strip animation settles, rotate slots so the active card
    // returns to the centre slot — keeping cards ready on both sides
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const currentSlots = slotsRef.current
      const shift = slotIndex - center
      if (shift === 0) return

      const newSlots = shift > 0
        ? [...currentSlots.slice(shift), ...currentSlots.slice(0, shift)]
        : [...currentSlots.slice(N + shift), ...currentSlots.slice(0, N + shift)]

      recenterRef.current = true   // tell useLayoutEffect to recenter
      setSlots(newSlots)
      setActive(center)
    }, 570)
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMuted(prev => !prev)
  }

  // ── Video playback ─────────────────────────────────────────────────────
  useEffect(() => {
    videoRefs.current.forEach((v, origIdx) => {
      if (!v) return
      if (origIdx === activeOrigIdx) {
        v.muted = muted
        v.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
      } else {
        v.pause()
        v.currentTime = 0
        v.muted = true
      }
    })
  }, [activeOrigIdx]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const v = videoRefs.current[activeOrigIdx]
    if (v) v.muted = muted
  }, [muted, activeOrigIdx])
  // ──────────────────────────────────────────────────────────────────────

  return (
    <section className="bg-[#f8f6f1] py-20 overflow-hidden">
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
                  {thumbUrl ? (
                    <Image
                      src={thumbUrl}
                      alt={`Story ${origIdx + 1}`}
                      fill
                      className="object-cover"
                    />
                  ) : story.cloudinaryAsset?.secure_url ? (
                    <video
                      ref={el => { videoRefs.current[origIdx] = el }}
                      src={story.cloudinaryAsset.secure_url}
                      className="w-full h-full object-cover"
                      muted
                      loop
                      playsInline
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300" />
                  )}

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
