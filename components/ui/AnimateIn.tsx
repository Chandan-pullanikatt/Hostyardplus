"use client"

import { m } from "framer-motion"

interface AnimateInProps {
  children: React.ReactNode
  className?: string
  /** Delay in milliseconds */
  delay?: number
  /** Add a subtle scale (0.96 → 1) alongside the fade-up — good for hero quotes, banners */
  scale?: boolean
}

export default function AnimateIn({ children, className = "", delay = 0, scale = false }: AnimateInProps) {
  const initial = scale
    ? { opacity: 0, y: 40, scale: 0.96 }
    : { opacity: 0, y: 52 }

  const animate = scale
    ? { opacity: 1, y: 0, scale: 1 }
    : { opacity: 1, y: 0 }

  return (
    <m.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: 0.75,
        ease: [0.16, 1, 0.3, 1],
        delay: delay / 1000,
        opacity: { duration: 0.6 },
      }}
      className={className}
    >
      {children}
    </m.div>
  )
}
