"use client"

import { useRef, useState, useEffect } from "react"
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
  const [active, setActive] = useState(Math.floor(stories.length / 2))
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const scrollRef = useRef<HTMLDivElement>(null)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === active) {
        v.muted = muted
        v.play().then(() => setPlaying(true)).catch(() => setPlaying(false))
      } else {
        v.pause()
        v.currentTime = 0
        v.muted = true
      }
    })
  }, [active])

  // Sync muted state to the active video whenever it changes
  useEffect(() => {
    const v = videoRefs.current[active]
    if (v) v.muted = muted
  }, [muted, active])

  const handleCardClick = (i: number) => {
    if (i === active) {
      const v = videoRefs.current[i]
      if (!v) return
      if (v.paused) {
        v.play().then(() => setPlaying(true))
      } else {
        v.pause()
        setPlaying(false)
      }
    } else {
      setPlaying(false)
      setActive(i)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    setMuted(prev => !prev)
  }

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
                onClick={() => handleCardClick(i)}
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
                ) : story.cloudinaryUrl ? (
                  <video
                    ref={el => { videoRefs.current[i] = el }}
                    src={story.cloudinaryUrl}
                    className="w-full h-full object-cover"
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}

                {story.mediaType === "video" && isCenter && (
                  <>
                    {/* Play / Pause — centre of card */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        {playing ? (
                          <Pause size={24} className="text-white fill-white" />
                        ) : (
                          <Play size={24} className="text-white fill-white ml-1" />
                        )}
                      </div>
                    </div>

                    {/* Mute / Unmute — bottom-right corner */}
                    <button
                      onClick={toggleMute}
                      className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
                      aria-label={muted ? "Unmute" : "Mute"}
                    >
                      {muted ? (
                        <VolumeX size={16} className="text-white" />
                      ) : (
                        <Volume2 size={16} className="text-white" />
                      )}
                    </button>
                  </>
                )}
              </div>
            )
          })}
        </div>
      </AnimateIn>
    </section>
  )
}
