"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { m, AnimatePresence } from "framer-motion"
import { track } from "@vercel/analytics"

/* ─── Prefill type ────────────────────────────────────────────────────── */

export interface BookingPrefill {
  property?: string  // hero "Where"     → Zoho Property dropdown
  stayType?: string  // hero "Stay Type" → Zoho Stay Type dropdown
  checkIn?: string   // "yyyy-mm-dd" from <input type="date">
  checkOut?: string  // "yyyy-mm-dd"
  guests?: string    // number as string
}

/* ─── Context ─────────────────────────────────────────────────────────── */

interface BookingModalContextValue {
  open: (prefill?: BookingPrefill) => void
  close: () => void
}

const BookingModalContext = createContext<BookingModalContextValue | null>(null)

export function useBookingModal() {
  const ctx = useContext(BookingModalContext)
  if (!ctx) throw new Error("useBookingModal must be used inside BookingModalProvider")
  return ctx
}

/* ─── Zoho form URL ───────────────────────────────────────────────────── */

const ZOHO_FORM_URL =
  "https://forms.hostyardplus.com/hostyardplus1/form/EnquiryForm/formperma/kVdrYuLSSm3okewj0idDbIbkprRzVcXE7-k1S0mE_aU"

/**
 * Real Zoho field link-names (read off the live EnquiryForm HTML — the input `compname`).
 *   Dropdown  = "Property"          Date  = "Check In Date"
 *   Dropdown1 = "Room Type"         Date1 = "Check Out Date"
 *   Number1   = "Number Of People"  (Number = "Number Of Days", not prefilled)
 *
 * Two DROPDOWNS are involved (Property + Room Type) — Zoho only fills a dropdown when the
 * prefilled value EXACTLY matches one of its options. So the client must keep the Zoho
 * option lists in sync with Sanity: Property options == each property's `location`, and
 * Room Type options == the `stayTypes` values (Hostel/Resort/Dorm/…). A mismatch fails
 * silently (field opens blank). The other 5 "Book Now" buttons open with no prefill.
 */
const ZOHO_FIELD_KEYS = {
  property: "Dropdown",   // Property dropdown   ← hero "Where"
  stayType: "Dropdown1",  // Room Type dropdown  ← hero "Stay Type"
  checkIn:  "Date",       // Check In Date       ← hero "Check-in"
  checkOut: "Date1",      // Check Out Date      ← hero "Check-out"
  guests:   "Number1",    // Number Of People    ← hero "Guest number"
} as const

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

/** <input type="date"> yields "2026-06-10"; Zoho date fields default to "10-Jun-2026".
 *  If the client's Zoho date format differs, change the format here to match it exactly. */
function formatZohoDate(iso: string): string {
  const [y, m, d] = iso.split("-")
  if (!y || !m || !d) return iso
  return `${d}-${MONTHS[Number(m) - 1]}-${y}`
}

/** Build the Zoho permalink with prefill query params from the hero fields. */
function buildFormUrl(prefill?: BookingPrefill): string {
  if (!prefill) return ZOHO_FORM_URL
  const p = new URLSearchParams()
  if (prefill.property) p.set(ZOHO_FIELD_KEYS.property, prefill.property)
  if (prefill.stayType) p.set(ZOHO_FIELD_KEYS.stayType, prefill.stayType)
  if (prefill.checkIn)  p.set(ZOHO_FIELD_KEYS.checkIn, formatZohoDate(prefill.checkIn))
  if (prefill.checkOut) p.set(ZOHO_FIELD_KEYS.checkOut, formatZohoDate(prefill.checkOut))
  if (prefill.guests)   p.set(ZOHO_FIELD_KEYS.guests, prefill.guests)
  const qs = p.toString()
  return qs ? `${ZOHO_FORM_URL}?${qs}` : ZOHO_FORM_URL
}

/* ─── Provider + Modal ────────────────────────────────────────────────── */

export default function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [formUrl, setFormUrl] = useState(ZOHO_FORM_URL)

  const open  = (prefill?: BookingPrefill) => {
    // Fires for every "Book Now" trigger site-wide (nav, hero, booking bar,
    // property pages) since they all funnel through this one open().
    track("book_now_click", { property: prefill?.property ?? "none" })
    setFormUrl(buildFormUrl(prefill))
    setIsOpen(true)
  }
  const close = () => setIsOpen(false)

  return (
    <BookingModalContext.Provider value={{ open, close }}>
      {children}

      <AnimatePresence>
        {isOpen && (
          /* Overlay — click outside closes */
          <m.div
            key="booking-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
            onClick={close}
          >
            {/* Dark blurred backdrop */}
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

            {/* Modal card */}
            <m.div
              initial={{ opacity: 0, scale: 0.97, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 16 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#052721] rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Floating close — no header bar; the Zoho form carries its own heading */}
              <button
                onClick={close}
                aria-label="Close booking form"
                className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/30 text-white/70 transition-colors hover:bg-black/50 hover:text-white"
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="2" y1="2" x2="16" y2="16" />
                  <line x1="16" y1="2" x2="2" y2="16" />
                </svg>
              </button>

              {/* Zoho Form iframe — overflow-hidden + oversized width clips the
                  cross-origin scrollbar gutter off the right edge (scroll still works) */}
              <div className="h-[500px] md:h-[580px] overflow-hidden">
                <iframe
                  aria-label="Enquiry Form"
                  frameBorder="0"
                  src={formUrl}
                  className="w-[calc(100%+18px)] h-full border-none"
                />
              </div>

              {/* Fallback — if the embed is blocked (CSP/whitelist) the iframe
                  shows blank; this link guarantees the user can still reach the form. */}
              <div className="px-6 py-3 border-t border-white/10 text-center">
                <a
                  href={formUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-white/40 hover:text-white/70 transition-colors"
                >
                  Form not loading? Open it in a new tab ↗
                </a>
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </BookingModalContext.Provider>
  )
}
