"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { DayPicker } from "react-day-picker"
import { ChevronDown, Star, Wifi, SquareParking, Coffee, Dumbbell, Sparkles, MapPin } from "lucide-react"
import type { PropertyDetail } from "@/lib/types"

const SVG_ICONS: Record<string, string> = {
  bonfire:  "/icons/CAMPFIRE.svg",
  mountain: "/icons/MOUNTAIN.svg",
  offroad:  "/icons/OFF-ROAD.svg",
  forest:   "/icons/FOREST.svg",
  camping:  "/icons/TENT.svg",
  pet:      "/icons/DOG.svg",
  view:     "/icons/SUNRISE%20%26%20SUNSET.svg",
  trek:     "/icons/TRECKING.svg",
  pool:     "/icons/WAVES.svg",
  river:    "/icons/WAVES.svg",
}

const LUCIDE_ICONS: Record<string, React.ReactNode> = {
  wifi:      <Wifi size={18} className="text-white" />,
  parking:   <SquareParking size={18} className="text-white" />,
  breakfast: <Coffee size={18} className="text-white" />,
  gym:       <Dumbbell size={18} className="text-white" />,
  spa:       <Sparkles size={18} className="text-white" />,
}

function AmenityIcon({ iconKey }: { iconKey: string }) {
  const svgSrc = SVG_ICONS[iconKey]
  if (svgSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={svgSrc} alt="" width={22} height={22} className="brightness-0 invert" />
    )
  }
  return <>{LUCIDE_ICONS[iconKey] ?? <MapPin size={18} className="text-white" />}</>
}

function fmt(d: Date) {
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
}

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8]

interface Props {
  property: PropertyDetail
}

export default function PropertyOverview({ property }: Props) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [stayType, setStayType]       = useState(property.stayTypes?.[0] ?? "")
  const [guests, setGuests]           = useState(2)
  const [showStayMenu, setShowStayMenu]   = useState(false)
  const [showGuestMenu, setShowGuestMenu] = useState(false)
  const [checkIn, setCheckIn]         = useState<Date | undefined>(undefined)
  const [checkOut, setCheckOut]       = useState<Date | undefined>(undefined)
  const [showCheckIn, setShowCheckIn]   = useState(false)
  const [showCheckOut, setShowCheckOut] = useState(false)

  const dateRowRef = useRef<HTMLDivElement>(null)

  // Close calendars when clicking outside the date row
  useEffect(() => {
    function onDown(e: MouseEvent) {
      if (dateRowRef.current && !dateRowRef.current.contains(e.target as Node)) {
        setShowCheckIn(false)
        setShowCheckOut(false)
      }
    }
    document.addEventListener("mousedown", onDown)
    return () => document.removeEventListener("mousedown", onDown)
  }, [])

  const checkOutMin = checkIn
    ? new Date(checkIn.getTime() + 86_400_000)
    : today

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

          {/* Left — description + amenities */}
          <div className="flex-1 min-w-0">
            {property.detailedHeading && (
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900 leading-snug mb-6">
                {property.detailedHeading}
              </h2>
            )}
            {property.description && (
              <div className="text-gray-600 font-sans text-base leading-relaxed mb-10 whitespace-pre-line">
                {property.description}
              </div>
            )}

            {property.amenities?.length > 0 && (
              <div>
                <h3 className="font-sans text-base font-semibold text-gray-900 mb-4">
                  What We Offers
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {property.amenities.map((amenity) => (
                    <div
                      key={amenity._key}
                      className="flex items-center gap-3 px-3 py-3 border border-gray-200 rounded-xl bg-white"
                    >
                      <span className="flex-shrink-0 w-9 h-9 rounded-full bg-primary flex items-center justify-center">
                        <AmenityIcon iconKey={amenity.iconKey} />
                      </span>
                      <span className="text-xs font-sans text-gray-800 leading-tight">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — booking card */}
          <div className="lg:w-[380px] shrink-0 relative z-10">
            {/* overflow-visible so calendar popovers aren't clipped */}
            <div className="border border-gray-200 rounded-2xl shadow-sm sticky top-24">

              {/* Price + rating */}
              <div className="flex items-baseline justify-between px-6 pt-6 pb-5 rounded-t-2xl">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-serif font-semibold text-gray-900">
                    ₹{property.pricePerNight?.toLocaleString("en-IN")}
                  </span>
                  <span className="text-gray-500 font-sans text-sm ml-0.5">/ night</span>
                </div>
                {property.rating && (
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-sans text-sm font-medium text-gray-800">
                      {property.rating}
                    </span>
                  </div>
                )}
              </div>

              {/* Stay Type */}
              {property.stayTypes?.length > 0 && (
                <div className="border-t border-gray-200 relative">
                  <button
                    onClick={() => {
                      setShowStayMenu(v => !v)
                      setShowGuestMenu(false)
                      setShowCheckIn(false)
                      setShowCheckOut(false)
                    }}
                    className="w-full text-left px-6 py-4"
                  >
                    <p className="text-[10px] font-sans uppercase tracking-widest text-gray-400 mb-1">
                      Stay Type
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="font-sans text-gray-900 font-medium">{stayType || "Select"}</span>
                      <ChevronDown
                        size={18}
                        className={`text-gray-500 transition-transform ${showStayMenu ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>
                  {showStayMenu && (
                    <div className="absolute left-0 right-0 bg-white border border-gray-200 shadow-lg z-50">
                      {property.stayTypes.map((t) => (
                        <button
                          key={t}
                          onClick={() => { setStayType(t); setShowStayMenu(false) }}
                          className="w-full text-left px-6 py-3 font-sans text-sm text-gray-800 hover:bg-gray-50"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Check In / Check Out */}
              <div ref={dateRowRef} className="border-t border-gray-200 relative">
                <div className="grid grid-cols-2">
                  {/* Check In button */}
                  <button
                    onClick={() => {
                      setShowCheckIn(v => !v)
                      setShowCheckOut(false)
                      setShowStayMenu(false)
                      setShowGuestMenu(false)
                    }}
                    className="text-left px-6 py-4 border-r border-gray-200 hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-[10px] font-sans uppercase tracking-widest text-gray-400 mb-1">
                      Check In
                    </p>
                    <p className={`font-sans font-medium text-sm ${checkIn ? "text-gray-900" : "text-gray-400"}`}>
                      {checkIn ? fmt(checkIn) : "Select date"}
                    </p>
                  </button>

                  {/* Check Out button */}
                  <button
                    onClick={() => {
                      setShowCheckOut(v => !v)
                      setShowCheckIn(false)
                      setShowStayMenu(false)
                      setShowGuestMenu(false)
                    }}
                    className="text-left px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <p className="text-[10px] font-sans uppercase tracking-widest text-gray-400 mb-1">
                      Check Out
                    </p>
                    <p className={`font-sans font-medium text-sm ${checkOut ? "text-gray-900" : "text-gray-400"}`}>
                      {checkOut ? fmt(checkOut) : "Select date"}
                    </p>
                  </button>
                </div>

                {/* Check In calendar */}
                {showCheckIn && (
                  <div className="absolute top-full left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-xl mt-1">
                    <DayPicker
                      mode="single"
                      selected={checkIn}
                      onSelect={(date) => {
                        setCheckIn(date)
                        // If chosen check-in is after existing check-out, clear check-out
                        if (date && checkOut && date >= checkOut) setCheckOut(undefined)
                        setShowCheckIn(false)
                        setShowCheckOut(true)
                      }}
                      disabled={{ before: today }}
                      defaultMonth={checkIn ?? today}
                    />
                  </div>
                )}

                {/* Check Out calendar */}
                {showCheckOut && (
                  <div className="absolute top-full right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-xl mt-1">
                    <DayPicker
                      mode="single"
                      selected={checkOut}
                      onSelect={(date) => {
                        setCheckOut(date)
                        setShowCheckOut(false)
                      }}
                      disabled={{ before: checkOutMin }}
                      defaultMonth={checkIn ?? today}
                    />
                  </div>
                )}
              </div>

              {/* Travelers */}
              <div className="border-t border-gray-200 relative">
                <button
                  onClick={() => {
                    setShowGuestMenu(v => !v)
                    setShowStayMenu(false)
                    setShowCheckIn(false)
                    setShowCheckOut(false)
                  }}
                  className="w-full text-left px-6 py-4"
                >
                  <p className="text-[10px] font-sans uppercase tracking-widest text-gray-400 mb-1">
                    Travelers
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-sans text-gray-900 font-medium">{guests} Guests</span>
                    <ChevronDown
                      size={18}
                      className={`text-gray-500 transition-transform ${showGuestMenu ? "rotate-180" : ""}`}
                    />
                  </div>
                </button>
                {showGuestMenu && (
                  <div className="absolute left-0 right-0 bg-white border border-gray-200 shadow-lg z-50">
                    {GUEST_OPTIONS.map((n) => (
                      <button
                        key={n}
                        onClick={() => { setGuests(n); setShowGuestMenu(false) }}
                        className="w-full text-left px-6 py-3 font-sans text-sm text-gray-800 hover:bg-gray-50"
                      >
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Book Now */}
              <div className="px-6 py-5 border-t border-gray-200">
                {property.bookingUrl ? (
                  <Link
                    href={property.bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-primary hover:bg-ocean-600 text-white font-sans text-sm font-semibold py-4 rounded-xl transition-colors"
                  >
                    Book Now
                  </Link>
                ) : (
                  <button className="block w-full text-center bg-primary text-white font-sans text-sm font-semibold py-4 rounded-xl">
                    Book Now
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
