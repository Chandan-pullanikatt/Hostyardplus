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

    // The track is tiled, so the content width must exceed the visible width
    // before the loop math is valid. On mobile the avatar images/fonts often
    // load *after* mount, so the initial measurement is too small — we wait
    // until the layout is wide enough, and re-seed the start position then.
    let seeded = false
    const ready = () => el.scrollWidth > el.clientWidth + 1
    const seed = () => {
      if (!ready()) return
      // Start the rightward row from the middle so it has room to travel back.
      el.scrollLeft = direction === "right" ? el.scrollWidth / 2 : 0
      seeded = true
    }
    seed()

    // Re-measure when card sizes settle (images decoding, font swap, resize).
    const ro = new ResizeObserver(() => { if (!seeded) seed() })
    ro.observe(el)

    let raf = 0
    const step = () => {
      const half = el.scrollWidth / 2
      // Only advance once there is real content to loop through; otherwise the
      // seam wrap can fling the row into an empty region (the white-gap glitch).
      if (half > 0 && ready()) {
        if (!seeded) seed()
        if (!pausedRef.current && !draggingRef.current) {
          el.scrollLeft += direction === "left" ? speed : -speed
        }
        // Wrap every frame (even while dragging) so a fast drag past the seam
        // lands on identical tiled content instead of running out of cards.
        if (el.scrollLeft >= half) el.scrollLeft -= half
        else if (el.scrollLeft <= 0) el.scrollLeft += half
      }
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
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
