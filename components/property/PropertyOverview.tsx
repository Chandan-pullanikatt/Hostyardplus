import Link from "next/link"
import {
  Flame, Mountain, Car, Trees, Tent, Wifi, Waves,
  SquareParking, Coffee, Dumbbell, Sparkles, Heart,
  Eye, Droplets, MapPin,
} from "lucide-react"
import type { PropertyDetail } from "@/lib/types"

const iconMap: Record<string, React.ReactNode> = {
  bonfire:  <Flame size={28} />,
  mountain: <Mountain size={28} />,
  offroad:  <Car size={28} />,
  forest:   <Trees size={28} />,
  camping:  <Tent size={28} />,
  wifi:     <Wifi size={28} />,
  pool:     <Waves size={28} />,
  parking:  <SquareParking size={28} />,
  breakfast:<Coffee size={28} />,
  gym:      <Dumbbell size={28} />,
  spa:      <Sparkles size={28} />,
  pet:      <Heart size={28} />,
  view:     <Eye size={28} />,
  river:    <Droplets size={28} />,
  trek:     <MapPin size={28} />,
}

interface Props {
  property: PropertyDetail
}

export default function PropertyOverview({ property }: Props) {
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
              <p className="text-gray-600 font-sans text-base leading-relaxed mb-10 whitespace-pre-line">
                {property.description}
              </p>
            )}

            {property.amenities?.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.amenities.map(amenity => (
                  <div
                    key={amenity._key}
                    className="flex flex-col items-center gap-2 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors"
                  >
                    <span className="text-gray-800">
                      {iconMap[amenity.iconKey] ?? <MapPin size={28} />}
                    </span>
                    <span className="text-xs font-sans text-gray-700 text-center leading-tight">
                      {amenity.label}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right — booking card */}
          <div className="lg:w-[380px] shrink-0">
            <div className="border border-gray-200 rounded-2xl p-6 shadow-sm sticky top-24">
              {/* Price + rating */}
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  {property.pricePerNight ? (
                    <span className="text-4xl font-serif font-semibold text-gray-900">
                      ₹{property.pricePerNight.toLocaleString()}
                    </span>
                  ) : null}
                  <span className="text-gray-500 font-sans text-sm ml-1">/ night</span>
                </div>
                {property.rating && (
                  <div className="flex items-center gap-1">
                    <span className="text-sun-400">★</span>
                    <span className="font-sans text-sm font-medium text-gray-800">{property.rating}</span>
                  </div>
                )}
              </div>

              <hr className="border-gray-100 mb-6" />

              {/* Location */}
              <div className="mb-6">
                <p className="text-xs font-sans uppercase tracking-widest text-gray-400 mb-1">Location</p>
                <p className="font-sans text-gray-800 font-medium">{property.location}</p>
              </div>

              {property.tagline && (
                <div className="mb-6">
                  <p className="text-xs font-sans uppercase tracking-widest text-gray-400 mb-1">Vibe</p>
                  <p className="font-sans text-gray-800">{property.tagline}</p>
                </div>
              )}

              <hr className="border-gray-100 mb-6" />

              {property.bookingUrl ? (
                <Link
                  href={property.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-primary hover:bg-ocean-600 text-white font-sans text-sm font-medium py-4 rounded-xl transition-colors"
                >
                  Book Now
                </Link>
              ) : (
                <button
                  disabled
                  className="block w-full text-center bg-gray-200 text-gray-400 font-sans text-sm font-medium py-4 rounded-xl cursor-not-allowed"
                >
                  Booking Coming Soon
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
