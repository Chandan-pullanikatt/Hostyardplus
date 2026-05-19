"use client"

import { useEffect, useRef, useState } from "react"
import { m } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

const navLinks = [
  { label: "About Us", href: "/about" },
  { label: "Partner", href: "/partner" },
]

interface NavbarProps {
  /** "dark" (default) — transparent → primary on scroll. "light" — always white with dark text. */
  theme?: "dark" | "light"
}

export default function Navbar({ theme = "dark" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)
  const isLight = theme === "light"

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      const diff = current - lastScrollY.current

      if (current < 80) {
        setHidden(false)
      } else if (diff > 6) {
        setHidden(true)
        setMenuOpen(false)
      } else if (diff < -6) {
        setHidden(false)
      }

      setScrolled(current > 80)
      lastScrollY.current = current
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  const headerBg = isLight
    ? scrolled || menuOpen
      ? "bg-white shadow-sm"
      : "bg-white"
    : scrolled || menuOpen
    ? "bg-primary shadow-lg"
    : "bg-transparent"

  return (
    <m.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 ${headerBg}`}
    >
      <div className="w-full px-4 sm:px-10 flex items-center justify-between py-4">
        {/* Logo — brightness-0 inverts the cream SVG to black on light backgrounds */}
        <Link href="/" className="flex items-center shrink-0" onClick={closeMenu}>
          <Image
            src="/logobeige.svg"
            alt="Hostyard+"
            width={140}
            height={40}
            priority
            className={isLight ? "brightness-0" : ""}
          />
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={
                isLight
                  ? "text-black hover:text-black/70 font-sans font-medium text-[15px] leading-none tracking-normal transition-colors"
                  : "text-white/90 hover:text-white font-sans font-medium text-[15px] leading-none tracking-normal transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="#book"
          className={
            isLight
              ? "hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-primary text-white text-sm font-sans hover:bg-primary/80 transition-colors"
              : "hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-ocean-600 text-white text-sm font-sans hover:bg-ocean-400 transition-colors"
          }
        >
          Book Now
        </Link>

        {/* Mobile menu button */}
        <button
          className={isLight ? "md:hidden text-gray-900 p-2" : "md:hidden text-white p-2"}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((v) => !v)}
        >
          {menuOpen ? (
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="2" y1="2" x2="18" y2="18" />
              <line x1="18" y1="2" x2="2" y2="18" />
            </svg>
          ) : (
            <svg width="22" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="0" y1="2" x2="22" y2="2" />
              <line x1="0" y1="8" x2="22" y2="8" />
              <line x1="0" y1="14" x2="22" y2="14" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div className={isLight ? "md:hidden bg-white border-t border-gray-100" : "md:hidden bg-primary border-t border-white/10"}>
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className={
                  isLight
                    ? "text-black hover:text-black/70 font-sans font-medium text-[15px] leading-none tracking-normal py-3 border-b border-gray-100 last:border-0 transition-colors"
                    : "text-white/90 hover:text-white font-sans font-medium text-[15px] leading-none tracking-normal py-3 border-b border-white/10 last:border-0 transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#book"
              onClick={closeMenu}
              className={
                isLight
                  ? "mt-3 flex items-center justify-center px-5 py-3 rounded-lg bg-primary text-white text-sm font-sans hover:bg-primary/80 transition-colors"
                  : "mt-3 flex items-center justify-center px-5 py-3 rounded-lg bg-ocean-600 text-white text-sm font-sans hover:bg-ocean-400 transition-colors"
              }
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </m.header>
  )
}
