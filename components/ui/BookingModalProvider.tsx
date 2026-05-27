"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { m, AnimatePresence } from "framer-motion"

/* ─── Context ─────────────────────────────────────────────────────────── */

interface BookingModalContextValue {
  open: () => void
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
  "https://forms.hostyardplus.com/hostyardplus1/form/EnquiryForm/formperma/kVdrYuLSSm3okewj0idDblbkprRzVcXE7-k1S0mE_aU"

/* ─── Provider + Modal ────────────────────────────────────────────────── */

export default function BookingModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  const open  = () => setIsOpen(true)
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
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <h2 className="font-serif text-xl text-white tracking-wide">
                  Book Your Stay
                </h2>
                <button
                  onClick={close}
                  aria-label="Close booking form"
                  className="text-white/50 hover:text-white transition-colors p-1 rounded-md hover:bg-white/10"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <line x1="2" y1="2" x2="16" y2="16" />
                    <line x1="16" y1="2" x2="2" y2="16" />
                  </svg>
                </button>
              </div>

              {/* Zoho Form iframe */}
              <div className="h-[500px] md:h-[580px]">
                <iframe
                  aria-label="Enquiry Form"
                  frameBorder="0"
                  src={ZOHO_FORM_URL}
                  className="w-full h-full border-none"
                />
              </div>
            </m.div>
          </m.div>
        )}
      </AnimatePresence>
    </BookingModalContext.Provider>
  )
}
