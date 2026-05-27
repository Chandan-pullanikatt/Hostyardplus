"use client"

import { useState } from "react"
import { useBookingModal } from "./BookingModalProvider"

interface BookingBarProps {
  destinations: string[]
}

const labelCls = "text-base font-medium font-sans text-[#3A3A3A] tracking-[-0.02em] leading-none mb-[10px]"
const placeholderCls = "text-sm font-normal font-sans tracking-[-0.02em] leading-none bg-transparent border-none outline-none"

const cell = "flex flex-col px-4 py-3 md:px-6 md:py-4 md:flex-1 min-w-0"

export default function BookingBar({ destinations }: BookingBarProps) {
  const { open: openBooking } = useBookingModal()
  const [where, setWhere] = useState("")
  const [stayType, setStayType] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("")

  // On mobile: 2-column grid so the 5 fields stack as 2+2+1.
  // On md+: single flex row with divide-x separators.
  return (
    <div className="bg-white rounded-lg border border-[#F5F5F5] grid grid-cols-2 md:flex md:flex-row md:items-stretch md:divide-x md:divide-[#F5F5F5]">
      {/* Where — col 1, row 1 */}
      <div className={`${cell} border-b border-r border-[#F5F5F5] md:border-b-0 md:border-r-0`}>
        <label className={labelCls}>Where</label>
        <select
          value={where}
          onChange={(e) => setWhere(e.target.value)}
          className={`${placeholderCls} cursor-pointer appearance-none ${where ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        >
          <option value="">Select destination</option>
          {destinations.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Stay Type — col 2, row 1 */}
      <div className={`${cell} border-b border-[#F5F5F5] md:border-b-0`}>
        <label className={labelCls}>Stay Type</label>
        <select
          value={stayType}
          onChange={(e) => setStayType(e.target.value)}
          className={`${placeholderCls} cursor-pointer appearance-none ${stayType ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        >
          <option value="">Select type</option>
          <option value="hostel">Hostel</option>
          <option value="resort">Resort</option>
          <option value="dorm">Dorm</option>
          <option value="private-room">Private Room</option>
          <option value="houseboat">Houseboat</option>
        </select>
      </div>

      {/* Check-in — col 1, row 2 */}
      <div className={`${cell} border-b border-r border-[#F5F5F5] md:border-b-0 md:border-r-0`}>
        <label className={labelCls}>Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          placeholder="Select date"
          className={`${placeholderCls} cursor-pointer placeholder:text-[#B1B1B1] ${checkIn ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        />
      </div>

      {/* Check-out — col 2, row 2 */}
      <div className={`${cell} border-b border-[#F5F5F5] md:border-b-0`}>
        <label className={labelCls}>Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          placeholder="Select date"
          className={`${placeholderCls} cursor-pointer placeholder:text-[#B1B1B1] ${checkOut ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
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

      {/* Book Now — spans both columns on mobile */}
      <div className="px-4 py-3 flex items-center col-span-2">
        <button
          type="button"
          onClick={openBooking}
          className="w-full md:w-auto bg-primary text-white font-sans text-sm px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}
