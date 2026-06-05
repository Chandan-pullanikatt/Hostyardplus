"use client"

import { useState, useEffect, useRef } from "react"
import { DayPicker } from "react-day-picker"
import { ChevronDown } from "lucide-react"
import { useBookingModal } from "./BookingModalProvider"

interface BookingBarProps {
  /** Active properties, each with its own per-property stay types (from Sanity). */
  properties: { location: string; stayTypes: string[] }[]
}

const labelCls = "text-base font-medium font-sans text-[#3A3A3A] tracking-[-0.02em] leading-none mb-[10px]"
const placeholderCls = "text-sm font-normal font-sans tracking-[-0.02em] leading-none bg-transparent border-none outline-none"

const cell = "flex flex-col px-4 py-3 md:px-6 md:py-4 md:flex-1 min-w-0"

/** Returns the day after the given yyyy-mm-dd (local), as yyyy-mm-dd. */
function nextDay(iso: string): string {
  const d = new Date(iso + "T00:00:00")
  d.setDate(d.getDate() + 1)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

/** yyyy-mm-dd → local Date (midnight), for seeding DayPicker. */
function isoToDate(iso: string): Date | undefined {
  return iso ? new Date(iso + "T00:00:00") : undefined
}

/** Date → yyyy-mm-dd (local), the shared source-of-truth format. */
function dateToIso(d: Date): string {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

/** Short display label for the desktop date triggers, e.g. "Jun 10, 2026". */
function fmt(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

type Menu = "where" | "stayType" | "checkIn" | "checkOut" | null

export default function BookingBar({ properties }: BookingBarProps) {
  const { open: openBooking } = useBookingModal()
  const [where, setWhere] = useState("")
  const [stayType, setStayType] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("")

  // Which desktop popover is open (md+ only — mobile uses native controls).
  const [menu, setMenu] = useState<Menu>(null)
  const barRef = useRef<HTMLDivElement>(null)

  // Today (local) as yyyy-mm-dd, set after mount so SSR/hydration can't mismatch.
  // Used as the earliest selectable date so past dates can't be picked.
  const [today, setToday] = useState("")
  useEffect(() => {
    const d = new Date()
    setToday(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10))
  }, [])

  // Close any open desktop popover on outside-click or Escape.
  useEffect(() => {
    if (!menu) return
    const onClick = (e: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(e.target as Node)) setMenu(null)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(null)
    }
    document.addEventListener("mousedown", onClick)
    window.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onClick)
      window.removeEventListener("keydown", onKey)
    }
  }, [menu])

  // Dependent dropdown: only the stay types the selected destination actually offers.
  // (e.g. Suryanelli has no Resort; Kozhikode does.)
  const stayTypeOptions = properties.find((p) => p.location === where)?.stayTypes ?? []

  const todayDate = isoToDate(today) ?? new Date()

  // Shared trigger styling for the desktop branded popovers — borderless so the
  // flat bar look is preserved; only the open panel carries the brand mood.
  const triggerCls = "flex w-full items-center justify-between gap-2 text-left"
  const panelCls =
    "absolute bottom-full left-0 z-50 mb-3 min-w-full rounded-xl border border-[#ECECEC] bg-white py-1.5 shadow-[0_-12px_40px_-12px_rgba(5,39,33,0.25)]"
  const optionCls =
    "w-full text-left px-4 py-2.5 font-sans text-sm text-[#3A3A3A] transition-colors hover:bg-[#e6efee] hover:text-[#052721]"

  // On mobile: 2-column grid so the 5 fields stack as 2+2+1.
  // On md+: single flex row with divide-x separators.
  return (
    <div
      ref={barRef}
      className="bg-white rounded-lg border border-[#F5F5F5] grid grid-cols-2 md:flex md:flex-row md:items-stretch md:divide-x md:divide-[#F5F5F5]"
    >
      {/* Destination — col 1, row 1 */}
      <div className={`${cell} border-b border-r border-[#F5F5F5] md:border-b-0 md:border-r-0 relative`}>
        <label className={labelCls}>Destination</label>

        {/* Mobile: native select */}
        <select
          value={where}
          onChange={(e) => {
            setWhere(e.target.value)
            setStayType("") // reset — the previous stay type may not exist for the new destination
          }}
          className={`${placeholderCls} md:hidden cursor-pointer appearance-none ${where ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        >
          <option value="">Select destination</option>
          {properties.map((p) => (
            <option key={p.location} value={p.location}>{p.location}</option>
          ))}
        </select>

        {/* Desktop: branded popover */}
        <button
          type="button"
          onClick={() => setMenu(menu === "where" ? null : "where")}
          className={`${placeholderCls} hidden md:flex ${triggerCls} cursor-pointer ${where ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        >
          <span className="truncate">{where || "Select destination"}</span>
          <ChevronDown size={15} className={`shrink-0 text-[#B1B1B1] transition-transform ${menu === "where" ? "rotate-180" : ""}`} />
        </button>
        {menu === "where" && (
          <div className={`${panelCls} hidden md:block max-h-64 overflow-auto`}>
            {properties.map((p) => (
              <button
                key={p.location}
                type="button"
                onClick={() => {
                  setWhere(p.location)
                  setStayType("")
                  setMenu(null)
                }}
                className={optionCls}
              >
                {p.location}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stay Type — col 2, row 1 — options depend on the selected destination.
          Maps to the Zoho form's "Room Type" dropdown so the value prefills on Book Now. */}
      <div className={`${cell} border-b border-[#F5F5F5] md:border-b-0 relative`}>
        <label className={labelCls}>Stay Type</label>

        {/* Mobile: native select */}
        <select
          value={stayType}
          onChange={(e) => setStayType(e.target.value)}
          disabled={!where}
          className={`${placeholderCls} md:hidden appearance-none ${where ? "cursor-pointer" : "cursor-not-allowed"} ${stayType ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        >
          <option value="">{where ? "Select type" : "Select destination first"}</option>
          {stayTypeOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>

        {/* Desktop: branded popover */}
        <button
          type="button"
          disabled={!where}
          onClick={() => setMenu(menu === "stayType" ? null : "stayType")}
          className={`${placeholderCls} hidden md:flex ${triggerCls} ${where ? "cursor-pointer" : "cursor-not-allowed"} ${stayType ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        >
          <span className="truncate">{stayType || (where ? "Select type" : "Select destination first")}</span>
          <ChevronDown size={15} className={`shrink-0 text-[#B1B1B1] transition-transform ${menu === "stayType" ? "rotate-180" : ""}`} />
        </button>
        {menu === "stayType" && where && (
          <div className={`${panelCls} hidden md:block max-h-64 overflow-auto`}>
            {stayTypeOptions.length === 0 ? (
              <p className="px-4 py-2.5 font-sans text-sm text-[#B1B1B1]">No stay types</p>
            ) : (
              stayTypeOptions.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setStayType(t)
                    setMenu(null)
                  }}
                  className={optionCls}
                >
                  {t}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Check-in — col 1, row 2. Earliest selectable date is today (no past dates). */}
      <div className={`${cell} border-b border-r border-[#F5F5F5] md:border-b-0 md:border-r-0 relative`}>
        <label className={labelCls}>Check-in</label>

        {/* Mobile: native date input */}
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => {
            const v = e.target.value
            setCheckIn(v)
            if (checkOut && v && checkOut <= v) setCheckOut("")
          }}
          className={`${placeholderCls} md:hidden cursor-pointer placeholder:text-[#B1B1B1] ${checkIn ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        />

        {/* Desktop: react-day-picker popover (same as property page) */}
        <button
          type="button"
          onClick={() => setMenu(menu === "checkIn" ? null : "checkIn")}
          className={`${placeholderCls} hidden md:flex ${triggerCls} cursor-pointer ${checkIn ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        >
          <span className="truncate">{checkIn ? fmt(checkIn) : "Select date"}</span>
        </button>
        {menu === "checkIn" && (
          <div className={`${panelCls} hidden md:block p-2`}>
            <DayPicker
              mode="single"
              selected={isoToDate(checkIn)}
              onSelect={(date) => {
                if (!date) return
                const iso = dateToIso(date)
                setCheckIn(iso)
                if (checkOut && checkOut <= iso) setCheckOut("")
                setMenu("checkOut")
              }}
              disabled={{ before: todayDate }}
              defaultMonth={isoToDate(checkIn) ?? todayDate}
            />
          </div>
        )}
      </div>

      {/* Check-out — col 2, row 2. Locked until check-in is chosen, and can't be earlier than it. */}
      <div className={`${cell} border-b border-[#F5F5F5] md:border-b-0 relative`}>
        <label className={labelCls}>Check-out</label>

        {/* Mobile: native date input */}
        <input
          type="date"
          value={checkOut}
          min={checkIn ? nextDay(checkIn) : today}
          disabled={!checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
          className={`${placeholderCls} md:hidden placeholder:text-[#B1B1B1] ${checkIn ? "cursor-pointer" : "cursor-not-allowed"} ${checkOut ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        />

        {/* Desktop: react-day-picker popover (same as property page). Aligned right to avoid clipping. */}
        <button
          type="button"
          disabled={!checkIn}
          onClick={() => setMenu(menu === "checkOut" ? null : "checkOut")}
          className={`${placeholderCls} hidden md:flex ${triggerCls} ${checkIn ? "cursor-pointer" : "cursor-not-allowed"} ${checkOut ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        >
          <span className="truncate">{checkOut ? fmt(checkOut) : "Select date"}</span>
        </button>
        {menu === "checkOut" && checkIn && (
          <div className={`${panelCls} hidden md:block left-auto right-0 p-2`}>
            <DayPicker
              mode="single"
              selected={isoToDate(checkOut)}
              onSelect={(date) => {
                if (!date) return
                setCheckOut(dateToIso(date))
                setMenu(null)
              }}
              disabled={{ before: new Date(isoToDate(checkIn)!.getTime() + 86_400_000) }}
              defaultMonth={isoToDate(checkOut) ?? isoToDate(checkIn) ?? todayDate}
            />
          </div>
        )}
      </div>

      {/* Guests — spans both columns on mobile */}
      <div className={`${cell} col-span-2 border-b border-[#F5F5F5] md:border-b-0`}>
        <label className={labelCls}>Guest number</label>
        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="Enter number"
          className={`${placeholderCls} placeholder:text-[#B1B1B1] w-full ${guests ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        />
      </div>

      {/* Book Now — spans both columns on mobile. Carries the hero values into the Zoho form. */}
      <div className="px-4 py-3 flex items-center col-span-2">
        <button
          type="button"
          onClick={() => openBooking({ property: where, stayType, checkIn, checkOut, guests })}
          className="w-full md:w-auto bg-primary text-white font-sans text-sm px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}
