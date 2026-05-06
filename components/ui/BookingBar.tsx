"use client"

import { useState } from "react"

interface BookingBarProps {
  destinations: string[]
}

export default function BookingBar({ destinations }: BookingBarProps) {
  const [where, setWhere] = useState("")
  const [stayType, setStayType] = useState("")
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState("")

  return (
    <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row items-stretch divide-y md:divide-y-0 md:divide-x divide-gray-200">
      {/* Where */}
      <div className="flex flex-col px-6 py-4 flex-1 min-w-0">
        <label className="text-xs font-sans text-gray-400 mb-1">Where</label>
        <select
          value={where}
          onChange={(e) => setWhere(e.target.value)}
          className="font-sans text-sm text-gray-700 bg-transparent border-none outline-none cursor-pointer appearance-none"
        >
          <option value="">Select destination</option>
          {destinations.map((d) => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      {/* Stay Type */}
      <div className="flex flex-col px-6 py-4 flex-1 min-w-0">
        <label className="text-xs font-sans text-gray-400 mb-1">Stay Type</label>
        <select
          value={stayType}
          onChange={(e) => setStayType(e.target.value)}
          className="font-sans text-sm text-gray-700 bg-transparent border-none outline-none cursor-pointer appearance-none"
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
        <label className="text-xs font-sans text-gray-400 mb-1">Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          placeholder="Select date"
          className="font-sans text-sm text-gray-700 bg-transparent border-none outline-none cursor-pointer"
        />
      </div>

      {/* Check-out */}
      <div className="flex flex-col px-6 py-4 flex-1 min-w-0">
        <label className="text-xs font-sans text-gray-400 mb-1">Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
          placeholder="Select date"
          className="font-sans text-sm text-gray-700 bg-transparent border-none outline-none cursor-pointer"
        />
      </div>

      {/* Guests */}
      <div className="flex flex-col px-6 py-4 flex-1 min-w-0">
        <label className="text-xs font-sans text-gray-400 mb-1">Guest number</label>
        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="Enter number"
          className="font-sans text-sm text-gray-700 bg-transparent border-none outline-none w-full"
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
