import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import type { Property } from "@/lib/types"

interface PropertyCardProps {
  property: Property
}

const statusBadge = {
  active: null,
  "work-in-progress": "Work in Progress",
  "coming-soon": "Coming Soon",
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { title, location, description, pricePerNight, status, image, slug } = property
  const badge = statusBadge[status]
  const isAvailable = status === "active"
  const imageUrl = image?.asset?._ref ? urlFor(image).width(900).height(600).url() : null

  const cardContent = (
    <div className="relative rounded-2xl overflow-hidden group cursor-pointer aspect-[3/2]">
      {/* Image */}
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={image?.alt ?? title}
          fill
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${!isAvailable ? "grayscale opacity-70" : ""}`}
        />
      ) : (
        <div className="w-full h-full bg-gray-200" />
      )}

      {/* Gradient overlay for available cards */}
      {isAvailable && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      )}
      {/* Overlay for unavailable */}
      {!isAvailable && (
        <div className="absolute inset-0 bg-black/30" />
      )}

      {/* Price / Status badge */}
      <div className="absolute top-4 left-4">
        {badge ? (
          <span className="bg-primary text-white text-xs font-sans px-3 py-1.5 rounded-full">
            {badge}
          </span>
        ) : (
          <span className="bg-primary text-white text-xs font-sans px-3 py-1.5 rounded-full">
            From ₹{pricePerNight?.toLocaleString("en-IN")}/night
          </span>
        )}
      </div>

      {/* Bottom text for unavailable */}
      {!isAvailable && (
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="text-white font-serif text-xl">{location}</h3>
          <p className="text-white/80 text-sm font-sans mt-1 line-clamp-2">{description}</p>
        </div>
      )}
    </div>
  )

  return (
    <div className="flex flex-col gap-3">
      {isAvailable ? (
        <Link href={`/properties/${slug?.current}`}>{cardContent}</Link>
      ) : (
        cardContent
      )}
      {isAvailable && (
        <div className="px-1 pt-1">
          <h3 className="font-serif text-2xl text-gray-900">{location}</h3>
          <p className="font-sans text-sm text-gray-500 mt-1.5 line-clamp-2">{description}</p>
        </div>
      )}
    </div>
  )
}
