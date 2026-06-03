"use client"

import { useEffect, useRef, useState } from "react"
import { m } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { useBookingModal } from "@/components/ui/BookingModalProvider"

const menuLinks = [
  { label: "About Us",   href: "/about" },
  { label: "Partner",    href: "/partner" },
  { label: "Contact Us", href: "/contact" },
]

interface NavbarProps {
  /** "dark" (default) — transparent → primary on scroll. "light" — always white with dark text. */
  theme?: "dark" | "light"
  /** Force solid background from the start (no transparent phase). */
  solid?: boolean
}

export default function Navbar({ theme = "dark", solid = false }: NavbarProps) {
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
  const { open: openBooking } = useBookingModal()

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
      style={solid ? { backgroundColor: "#052721" } : undefined}
      className={`fixed top-0 left-0 right-0 z-50 ${headerBg}`}
    >
      <div className="w-full px-4 sm:px-10 flex items-center justify-between py-4">
        {/* Logo */}
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

        {/* Hamburger toggle — visible on all screen sizes */}
        <button
          className={isLight ? "text-gray-900 p-2" : "text-white p-2"}
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

      {/* Backdrop + compact floating menu card */}
      {menuOpen && (
        <>
          {/* Dimmed backdrop — click to close */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 -z-10 bg-black/40"
            onClick={closeMenu}
            aria-hidden
          />

          {/* Floating card, anchored top-right under the hamburger */}
          <m.div
            initial={{ opacity: 0, scale: 0.95, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-4 sm:right-10 top-full mt-2 w-[300px] max-w-[calc(100vw-2rem)] origin-top-right rounded-2xl shadow-2xl ring-1 bg-white ring-black/5"
          >
            <nav className="flex flex-col p-5 gap-1">
              {menuLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className="text-black hover:text-black/70 font-sans font-medium text-[15px] leading-none tracking-normal py-3 border-b border-gray-100 last:border-0 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <button
                type="button"
                onClick={() => { closeMenu(); openBooking() }}
                className="mt-4 flex items-center justify-center px-5 py-3 rounded-lg bg-primary text-white text-sm font-sans hover:bg-primary/80 transition-colors"
              >
                Book Now
              </button>
            </nav>
          </m.div>
        </>
      )}
    </m.header>
  )
}
