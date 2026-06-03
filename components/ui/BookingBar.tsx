"use client"

import { useState, useEffect } from "react"
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

export default function BookingBar({ properties }: BookingBarProps) {
  const { open: openBooking } = useBookingModal()
  const [where, setWhere] = useState("")
  const [stayType, setStayType] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("")

  // Today (local) as yyyy-mm-dd, set after mount so SSR/hydration can't mismatch.
  // Used as the earliest selectable date so past dates can't be picked.
  const [today, setToday] = useState("")
  useEffect(() => {
    const d = new Date()
    setToday(new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10))
  }, [])

  // Dependent dropdown: only the stay types the selected destination actually offers.
  // (e.g. Suryanelli has no Resort; Kozhikode does.)
  const stayTypeOptions = properties.find((p) => p.location === where)?.stayTypes ?? []

  // On mobile: 2-column grid so the 5 fields stack as 2+2+1.
  // On md+: single flex row with divide-x separators.
  return (
    <div className="bg-white rounded-lg border border-[#F5F5F5] grid grid-cols-2 md:flex md:flex-row md:items-stretch md:divide-x md:divide-[#F5F5F5]">
      {/* Where — col 1, row 1 */}
      <div className={`${cell} border-b border-r border-[#F5F5F5] md:border-b-0 md:border-r-0`}>
        <label className={labelCls}>Where</label>
        <select
          value={where}
          onChange={(e) => {
            setWhere(e.target.value)
            setStayType("") // reset — the previous stay type may not exist for the new destination
          }}
          className={`${placeholderCls} cursor-pointer appearance-none ${where ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        >
          <option value="">Select destination</option>
          {properties.map((p) => (
            <option key={p.location} value={p.location}>{p.location}</option>
          ))}
        </select>
      </div>

      {/* Room Type — col 2, row 1 — options depend on the selected destination.
          Matches the Zoho form's "Room Type" dropdown so the value prefills on Book Now. */}
      <div className={`${cell} border-b border-[#F5F5F5] md:border-b-0`}>
        <label className={labelCls}>Room Type</label>
        <select
          value={stayType}
          onChange={(e) => setStayType(e.target.value)}
          disabled={!where}
          className={`${placeholderCls} appearance-none ${where ? "cursor-pointer" : "cursor-not-allowed"} ${stayType ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        >
          <option value="">{where ? "Select type" : "Select destination first"}</option>
          {stayTypeOptions.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      {/* Check-in — col 1, row 2. Earliest selectable date is today (no past dates). */}
      <div className={`${cell} border-b border-r border-[#F5F5F5] md:border-b-0 md:border-r-0`}>
        <label className={labelCls}>Check-in</label>
        <input
          type="date"
          value={checkIn}
          min={today}
          onChange={(e) => {
            const v = e.target.value
            setCheckIn(v)
            // Clear check-out if it's no longer after the new check-in (same day or earlier).
            if (checkOut && v && checkOut <= v) setCheckOut("")
          }}
          className={`${placeholderCls} cursor-pointer placeholder:text-[#B1B1B1] ${checkIn ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        />
      </div>

      {/* Check-out — col 2, row 2. Locked until check-in is chosen, and can't be earlier than it. */}
      <div className={`${cell} border-b border-[#F5F5F5] md:border-b-0`}>
        <label className={labelCls}>Check-out</label>
        <input
          type="date"
          value={checkOut}
          min={checkIn ? nextDay(checkIn) : today}
          disabled={!checkIn}
          onChange={(e) => setCheckOut(e.target.value)}
          className={`${placeholderCls} placeholder:text-[#B1B1B1] ${checkIn ? "cursor-pointer" : "cursor-not-allowed"} ${checkOut ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        />
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
