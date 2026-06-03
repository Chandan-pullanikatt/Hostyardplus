"use client"

import { useState, useRef, useEffect } from "react"
import { DayPicker } from "react-day-picker"
import { useBookingModal } from "@/components/ui/BookingModalProvider"
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
  compass:  "/icons/COMPASS.svg",
  atv:      "/icons/ATV.svg",
  zipline:  "/icons/ZIPLINE.svg",
  kayaking: "/icons/KAYAKING.svg",
  boots:    "/icons/BOOTS.svg",
}

const LUCIDE_ICONS: Record<string, React.ReactNode> = {
  wifi:      <Wifi size={18} className="text-white" />,
  parking:   <SquareParking size={18} className="text-white" />,
  breakfast: <Coffee size={18} className="text-white" />,
  gym:       <Dumbbell size={18} className="text-white" />,
  spa:       <Sparkles size={18} className="text-white" />,
}

function AmenityIcon({ iconKey, size = 12 }: { iconKey: string; size?: number }) {
  const svgSrc = SVG_ICONS[iconKey]
  if (svgSrc) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={svgSrc} alt="" width={size} height={size} className="brightness-0 invert" />
    )
  }
  return <>{LUCIDE_ICONS[iconKey] ?? <MapPin size={size} className="text-white" />}</>
}

function fmt(d: Date) {
  return d.toLocaleDateString("en-IN", { month: "short", day: "numeric", year: "numeric" })
}

const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8]

interface Props {
  property: PropertyDetail
}

export default function PropertyOverview({ property }: Props) {
  const { open: openBooking } = useBookingModal()
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

  const isSuryanelli = property.slug?.current === "suryanelli"

  const detailedHeading = isSuryanelli
    ? "Where Heritage Meets Modern Serenity"
    : (property.detailedHeading || "")

  const description = isSuryanelli
    ? `Discover a stay where peaceful landscapes, refined interiors, and unforgettable experiences come together in perfect harmony. Designed for travelers seeking calm, comfort, and exclusivity, every moment here invites you to slow down, unwind, and reconnect with what truly matters.
Wake up to serene mornings, indulge in thoughtfully curated comforts, and experience hospitality that feels both warm and elevated

From breathtaking sunrise views to cozy evenings under the stars, your stay is crafted to feel effortless, intimate, and deeply memorable — a destination you will never want to leave.
Whether you seek relaxation, adventure, or a quiet escape from the everyday, every detail is designed to make your journey unforgettable`
    : (property.description || "")

  // Deduplicate and uniquely populate the amenities using icons inside public/icons
  const processedAmenities: Array<{ _key: string; iconKey: string; label: string }> = []
  const seenIconKeys = new Set<string>()
  const seenLabels = new Set<string>()

  if (isSuryanelli) {
    processedAmenities.push(
      { _key: "suryanelli-bonfire",  iconKey: "bonfire",  label: "Bonfire Nights" },
      { _key: "suryanelli-compass",  iconKey: "compass",  label: "Guided Trekking" },
      { _key: "suryanelli-river",    iconKey: "river",    label: "River Side" },
      { _key: "suryanelli-camping",  iconKey: "camping",  label: "Camping Stay" },
      { _key: "suryanelli-mountain", iconKey: "mountain", label: "Mountain Views" },
      { _key: "suryanelli-offroad",  iconKey: "offroad",  label: "Off-road Drives" },
      { _key: "suryanelli-forest",   iconKey: "forest",   label: "Forest Stay" },
      { _key: "suryanelli-pet",      iconKey: "pet",      label: "Pet Friendly" },
      { _key: "suryanelli-view",     iconKey: "view",     label: "Sunrise Views" },
      { _key: "suryanelli-trek",     iconKey: "trek",     label: "Trekking Trails" },
      { _key: "suryanelli-atv",      iconKey: "atv",      label: "ATV Rides" },
      { _key: "suryanelli-zipline",  iconKey: "zipline",  label: "Zipline Adventure" },
    )
  } else if (property.amenities?.length > 0) {
    // Step 1: Scan and collect already unique amenities
    property.amenities.forEach((amenity) => {
      if (!seenIconKeys.has(amenity.iconKey) && !seenLabels.has(amenity.label)) {
        processedAmenities.push(amenity)
        seenIconKeys.add(amenity.iconKey)
        seenLabels.add(amenity.label)
      }
    })

    // Step 2: Fill duplicate/repeated slots with high-quality unique amenities from the icons pool
    const desiredLength = property.amenities.length
    const fallbackPool = [
      { iconKey: "bonfire",  label: "Bonfire Nights" },
      { iconKey: "compass",  label: "Guided Trekking" },
      { iconKey: "river",    label: "River Side" },
      { iconKey: "camping",  label: "Camping Stay" },
      { iconKey: "mountain", label: "Mountain Views" },
      { iconKey: "offroad",  label: "Off-road Drives" },
      { iconKey: "forest",   label: "Forest Stay" },
      { iconKey: "pet",      label: "Pet Friendly" },
      { iconKey: "view",     label: "Sunrise Views" },
      { iconKey: "trek",     label: "Trekking Trails" },
      { iconKey: "atv",      label: "ATV Rides" },
      { iconKey: "zipline",  label: "Zipline Adventure" },
      { iconKey: "kayaking", label: "Kayaking Tours" },
      { iconKey: "boots",    label: "Hiking Boots" },
    ]

    let poolIdx = 0
    while (processedAmenities.length < desiredLength && poolIdx < fallbackPool.length) {
      const candidate = fallbackPool[poolIdx++]
      if (!seenIconKeys.has(candidate.iconKey) && !seenLabels.has(candidate.label)) {
        processedAmenities.push({
          _key: `fallback-${candidate.iconKey}`,
          iconKey: candidate.iconKey,
          label: candidate.label,
        })
        seenIconKeys.add(candidate.iconKey)
        seenLabels.add(candidate.label)
      }
    }
  }

  return (
    <section className="bg-[#F7F7F7] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col xl:flex-row gap-12 xl:gap-16">

          {/* Left — description + amenities */}
          <div className="flex-1 min-w-0">
            {detailedHeading && (
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900 leading-snug mb-6">
                {detailedHeading}
              </h2>
            )}
            {isSuryanelli ? (
              <div className="flex flex-col gap-6 mb-10 w-full">
                <p className="text-[#4b5563] font-sans text-base font-normal leading-[1.5] text-left">
                  Discover a stay where peaceful landscapes, refined interiors, and unforgettable experiences come together in perfect harmony. Designed for travelers seeking calm, comfort, and exclusivity, every moment here invites you to slow down, unwind, and reconnect with what truly matters. Wake up to serene mornings, indulge in thoughtfully curated comforts, and experience hospitality that feels both warm and elevated
                </p>
                <p className="text-[#4b5563] font-sans text-base font-normal leading-[1.5] text-left">
                  From breathtaking sunrise views to cozy evenings under the stars, your stay is crafted to feel effortless, intimate, and deeply memorable — a destination you will never want to leave. Whether you seek relaxation, adventure, or a quiet escape from the everyday, every detail is designed to make your journey unforgettable
                </p>
              </div>
            ) : (
              description && (
                <div className="text-gray-600 font-sans text-base leading-relaxed mb-10 whitespace-pre-line max-w-[793px]">
                  {description}
                </div>
              )
            )}

            {processedAmenities.length > 0 && (
              <div>
                <h3 className="font-sans text-base font-semibold text-gray-900 mb-4">
                  What We Offer
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {processedAmenities.map((amenity) => (
                    <div
                      key={amenity._key}
                      className="flex items-center h-10 px-4 gap-4 border-[0.5px] border-[#002922]/30 rounded-[6px] bg-[#002922]/[0.02]"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                        <AmenityIcon iconKey={amenity.iconKey} size={12} />
                      </span>
                      <span className="text-xs font-sans font-medium text-[#002922] leading-none truncate">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — booking card */}
          <div className="w-full xl:w-[440px] shrink-0 relative z-10">
            {/* overflow-visible so calendar popovers aren't clipped */}
            <div className="border border-gray-200/80 rounded-[24px] p-6 bg-white shadow-sm flex flex-col justify-between h-full gap-6 xl:gap-0">

              {/* Price + rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-1">
                  <span className="text-[32px] font-serif font-semibold text-gray-900 leading-none">
                    ₹{property.pricePerNight?.toLocaleString("en-IN")}
                  </span>
                  <span className="text-gray-500 font-sans text-sm ml-0.5">/ night</span>
                </div>
                {property.rating && (
                  <div className="flex items-center gap-1 bg-yellow-50 border border-yellow-200/50 px-2.5 py-1 rounded-full">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-sans text-xs font-semibold text-gray-800 leading-none">
                      {property.rating}
                    </span>
                  </div>
                )}
              </div>

              {/* Input Fields Group */}
              <div className="flex flex-col gap-4">
                {/* Stay Type */}
                {property.stayTypes?.length > 0 && (
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowStayMenu(v => !v)
                        setShowGuestMenu(false)
                        setShowCheckIn(false)
                        setShowCheckOut(false)
                      }}
                      className="w-full text-left px-5 py-3 border border-gray-200 rounded-xl hover:border-primary/50 transition-colors flex items-center justify-between bg-white"
                    >
                      <div>
                        <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                          Stay Type
                        </p>
                        <span className="font-sans text-sm text-gray-900 font-semibold">{stayType || "Select"}</span>
                      </div>
                      <ChevronDown
                        size={16}
                        className={`text-gray-500 transition-transform duration-200 ${showStayMenu ? "rotate-180" : ""}`}
                      />
                    </button>
                    {showStayMenu && (
                      <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                        {property.stayTypes.map((t) => (
                          <button
                            key={t}
                            onClick={() => { setStayType(t); setShowStayMenu(false) }}
                            className="w-full text-left px-5 py-2.5 font-sans text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Check In / Check Out */}
                <div ref={dateRowRef} className="grid grid-cols-2 gap-4 relative">
                  {/* Check In button */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowCheckIn(v => !v)
                        setShowCheckOut(false)
                        setShowStayMenu(false)
                        setShowGuestMenu(false)
                      }}
                      className="w-full text-left px-5 py-3 border border-gray-200 rounded-xl hover:border-primary/50 transition-colors bg-white"
                    >
                      <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                        Check In
                      </p>
                      <p className={`font-sans font-semibold text-sm ${checkIn ? "text-gray-900" : "text-gray-400"}`}>
                        {checkIn ? fmt(checkIn) : "Select date"}
                      </p>
                    </button>
                    {/* Check In calendar */}
                    {showCheckIn && (
                      <div className="absolute top-full left-0 z-50 bg-white border border-gray-200 rounded-xl shadow-xl mt-1 p-2">
                        <DayPicker
                          mode="single"
                          selected={checkIn}
                          onSelect={(date) => {
                            setCheckIn(date)
                            if (date && checkOut && date >= checkOut) setCheckOut(undefined)
                            setShowCheckIn(false)
                            setShowCheckOut(true)
                          }}
                          disabled={{ before: today }}
                          defaultMonth={checkIn ?? today}
                        />
                      </div>
                    )}
                  </div>

                  {/* Check Out button */}
                  <div className="relative">
                    <button
                      onClick={() => {
                        setShowCheckOut(v => !v)
                        setShowCheckIn(false)
                        setShowStayMenu(false)
                        setShowGuestMenu(false)
                      }}
                      className="w-full text-left px-5 py-3 border border-gray-200 rounded-xl hover:border-primary/50 transition-colors bg-white"
                    >
                      <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                        Check Out
                      </p>
                      <p className={`font-sans font-semibold text-sm ${checkOut ? "text-gray-900" : "text-gray-400"}`}>
                        {checkOut ? fmt(checkOut) : "Select date"}
                      </p>
                    </button>
                    {/* Check Out calendar */}
                    {showCheckOut && (
                      <div className="absolute top-full right-0 z-50 bg-white border border-gray-200 rounded-xl shadow-xl mt-1 p-2">
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
                </div>

                {/* Travelers */}
                <div className="relative">
                  <button
                    onClick={() => {
                      setShowGuestMenu(v => !v)
                      setShowStayMenu(false)
                      setShowCheckIn(false)
                      setShowCheckOut(false)
                    }}
                    className="w-full text-left px-5 py-3 border border-gray-200 rounded-xl hover:border-primary/50 transition-colors flex items-center justify-between bg-white"
                  >
                    <div>
                      <p className="text-[10px] font-sans font-semibold uppercase tracking-wider text-gray-400 mb-0.5">
                        Travelers
                      </p>
                      <span className="font-sans text-sm text-gray-900 font-semibold">{guests} Guests</span>
                    </div>
                    <ChevronDown
                      size={16}
                      className={`text-gray-500 transition-transform duration-200 ${showGuestMenu ? "rotate-180" : ""}`}
                    />
                  </button>
                  {showGuestMenu && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                      {GUEST_OPTIONS.map((n) => (
                        <button
                          key={n}
                          onClick={() => { setGuests(n); setShowGuestMenu(false) }}
                          className="w-full text-left px-5 py-2.5 font-sans text-sm text-gray-800 hover:bg-gray-50 transition-colors"
                        >
                          {n} {n === 1 ? "Guest" : "Guests"}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Book Now Button */}
              <div className="w-full">
                <button
                  type="button"
                  onClick={() => openBooking()}
                  className="flex w-full items-center justify-center bg-primary hover:bg-[#0b3c33] text-white font-sans text-sm font-semibold h-12 rounded-xl transition-all shadow-sm"
                >
                  Book Now
                </button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
