"use client"

import { useEffect, useRef } from "react"
import ReviewCard from "@/components/ui/ReviewCard"
import type { Review } from "@/lib/types"

interface ReviewMarqueeProps {
  reviews: Review[]
  direction: "left" | "right"
  /** Pixels advanced per animation frame (~60fps). */
  speed?: number
}

// A horizontally auto-scrolling row of reviews that the user can also grab and
// drag. Native touch scrolling handles finger drag on mobile; pointer events add
// mouse click-drag on desktop. Auto-scroll pauses while the user interacts and
// resumes shortly after. The track is tiled (see Reviews.tsx), so we wrap at the
// halfway point for a seamless loop.
export default function ReviewMarquee({ reviews, direction, speed = 0.5 }: ReviewMarqueeProps) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const pausedRef   = useRef(false)
  const draggingRef = useRef(false)
  const resumeRef   = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const el = scrollerRef.current
    if (!el) return

    // The track is tiled, so its content must be wider than the viewport before
    // the loop math is valid. On mobile the avatar images/fonts often load after
    // mount, so we don't advance until the row is actually wide enough.
    const ready = () => el.scrollWidth > el.clientWidth + 1

    // We track the target position ourselves instead of reading/writing the
    // browser's scrollLeft directly: scrollLeft is clamped to >= 0, so the
    // right-moving row (which counts *down*) would otherwise stick at the 0
    // floor and never animate. Normalizing with modulo keeps the mapped
    // scrollLeft a valid positive value in [0, half) for both directions.
    let pos = 0
    let raf = 0
    const step = () => {
      const half = el.scrollWidth / 2
      if (half > 0 && ready()) {
        if (pausedRef.current || draggingRef.current) {
          // User is in control — follow their scroll so auto-scroll resumes
          // smoothly from wherever they let go.
          pos = el.scrollLeft
        } else {
          pos += direction === "left" ? speed : -speed
          pos = ((pos % half) + half) % half
          el.scrollLeft = pos
        }
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [direction, speed])

  const pause = () => {
    pausedRef.current = true
    if (resumeRef.current) clearTimeout(resumeRef.current)
  }
  const resume = () => {
    if (resumeRef.current) clearTimeout(resumeRef.current)
    resumeRef.current = setTimeout(() => { pausedRef.current = false }, 800)
  }

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    pause()
    // Native scrolling already drives touch; only emulate drag for mouse/pen.
    if (e.pointerType === "mouse") {
      draggingRef.current = true
      scrollerRef.current?.setPointerCapture(e.pointerId)
    }
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current || !scrollerRef.current) return
    scrollerRef.current.scrollLeft -= e.movementX
  }
  const endDrag = () => {
    draggingRef.current = false
    resume()
  }

  return (
    <div
      ref={scrollerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onTouchStart={pause}
      onTouchEnd={resume}
      className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing select-none"
    >
      <div className="flex flex-nowrap gap-4 w-max">
        {reviews.map((review, i) => (
          <ReviewCard key={`${review._id}-${i}`} review={review} />
        ))}
      </div>
    </div>
  )
}
