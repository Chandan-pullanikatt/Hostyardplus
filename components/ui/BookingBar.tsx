"use client"

import { useState } from "react"

interface BookingBarProps {
  destinations: string[]
}

const labelCls = "text-base font-medium font-sans text-[#3A3A3A] tracking-[-0.02em] leading-none mb-[10px]"
const placeholderCls = "text-sm font-normal font-sans tracking-[-0.02em] leading-none bg-transparent border-none outline-none"

export default function BookingBar({ destinations }: BookingBarProps) {
  const [where, setWhere] = useState("")
  const [stayType, setStayType] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("")

  return (
    <div className="bg-white rounded-lg border border-[#F5F5F5] flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-[#F5F5F5]">
      {/* Where */}
      <div className="flex flex-col px-6 py-4 flex-1 min-w-0">
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

      {/* Stay Type */}
      <div className="flex flex-col px-6 py-4 flex-1 min-w-0">
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

      {/* Check-in */}
      <div className="flex flex-col px-6 py-4 flex-1 min-w-0">
        <label className={labelCls}>Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          placeholder="Select date"
          className={`${placeholderCls} cursor-pointer placeholder:text-[#B1B1B1] ${checkIn ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        />
      </div>

      {/* Check-out */}
      <div className="flex flex-col px-6 py-4 flex-1 min-w-0">
        <label className={labelCls}>Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          placeholder="Select date"
          className={`${placeholderCls} cursor-pointer placeholder:text-[#B1B1B1] ${checkOut ? "text-[#3A3A3A]" : "text-[#B1B1B1]"}`}
        />
      </div>

      {/* Guests */}
      <div className="flex flex-col px-6 py-4 flex-1 min-w-0">
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

      {/* Book Now */}
      <div className="px-4 py-3 flex items-center">
        <button
          type="button"
          className="w-full md:w-auto bg-primary text-white font-sans text-sm px-7 py-3.5 rounded-xl hover:bg-primary/90 transition-colors whitespace-nowrap"
        >
          Book Now
        </button>
      </div>
    </div>
  )
}
