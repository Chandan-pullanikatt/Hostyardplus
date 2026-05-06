"use client"

import { useEffect, useRef, useState } from "react"
import { m } from "framer-motion"
import Link from "next/link"

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "FAQ", href: "#faq" },
  { label: "Review", href: "#reviews" },
  { label: "Partner", href: "#partner" },
  { label: "Contact", href: "#contact" },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastScrollY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const current = window.scrollY
      const diff = current - lastScrollY.current

      // Always show at the top of the page
      if (current < 80) {
        setHidden(false)
      } else if (diff > 6) {
        // Scrolling down — hide
        setHidden(true)
        setMenuOpen(false)
      } else if (diff < -6) {
        // Scrolling up — reveal
        setHidden(false)
      }

      setScrolled(current > 80)
      lastScrollY.current = current
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <m.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled || menuOpen ? "bg-primary shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 flex items-center justify-between py-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0" onClick={closeMenu}>
          <span className="text-white font-serif text-2xl font-normal tracking-tight">
            hostyard<span className="text-sun-400">+</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-white/90 hover:text-white text-sm font-sans transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="#book"
          className="hidden md:inline-flex items-center justify-center px-5 py-2.5 rounded-lg bg-ocean-600 text-white text-sm font-sans hover:bg-ocean-400 transition-colors"
        >
          Book Now
        </Link>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white p-2"
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
        <div className="md:hidden bg-primary border-t border-white/10">
          <nav className="flex flex-col px-6 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="text-white/90 hover:text-white text-base font-sans py-3 border-b border-white/10 last:border-0 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#book"
              onClick={closeMenu}
              className="mt-3 flex items-center justify-center px-5 py-3 rounded-lg bg-ocean-600 text-white text-sm font-sans hover:bg-ocean-400 transition-colors"
            >
              Book Now
            </Link>
          </nav>
        </div>
      )}
    </m.header>
  )
}
