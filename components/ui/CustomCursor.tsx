"use client"

import { useEffect, useRef } from "react"

export default function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onMove = (e: MouseEvent) => {
      // translate so the hotspot (centre of the 16×16 SVG) aligns with the pointer
      el.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`
    }

    const onEnter = () => { el.style.opacity = "1" }
    const onLeave = () => { el.style.opacity = "0" }

    window.addEventListener("mousemove", onMove)
    document.documentElement.addEventListener("mouseleave", onLeave)
    document.documentElement.addEventListener("mouseenter", onEnter)

    return () => {
      window.removeEventListener("mousemove", onMove)
      document.documentElement.removeEventListener("mouseleave", onLeave)
      document.documentElement.removeEventListener("mouseenter", onEnter)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden
      style={{ opacity: 0, transform: "translate(-100px, -100px)" }}
      className="fixed top-0 left-0 z-[9999] pointer-events-none will-change-transform"
    >
      <img src="/icons/Cursor.svg" width={16} height={16} alt="" />
    </div>
  )
}
