import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import type { PropertyDetail } from "@/lib/types"

interface Props {
  property: PropertyDetail
}

export default function PropertyGallery({ property }: Props) {
  const images = property.galleryImages ?? []
  if (images.length < 2) return null

  // large hero + up to 3 clean grid + 1 overlay tile
  const [hero, second, third, fourth, fifth, ...rest] = images
  const extraCount = images.length - 4   // images beyond the 4 "preview" slots

  // grid tiles: 2nd, 3rd, 4th are shown cleanly; 5th (or last) carries the overlay
  const gridTiles = [second, third, fourth].filter(Boolean)
  const overlayImage = fifth ?? null

  return (
    <section className="bg-[#F5F4F0] py-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">

        {/* heading */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 mb-4">
            A Glimpse Into Your Stay
          </h2>
          <p className="text-gray-400 font-sans text-sm max-w-md mx-auto leading-relaxed">
            Explore the spaces, moments, and experiences that make every stay feel peaceful,
            luxurious, and unforgettable
          </p>
        </div>

        {/* grid */}
        <div className="flex flex-col lg:flex-row gap-3 h-auto lg:h-[500px]">

          {/* large left image */}
          <div className="relative flex-1 rounded-2xl overflow-hidden min-h-[320px]">
            {hero?.asset?._ref && (
              <Image
                src={urlFor(hero).width(900).height(700).url()}
                alt={hero.alt ?? property.title}
                fill
                className="object-cover"
                priority
              />
            )}
          </div>

          {/* right 2×2 grid */}
          <div className="grid grid-cols-2 grid-rows-2 gap-3 lg:w-[640px] shrink-0">

            {gridTiles.map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden">
                {img?.asset?._ref && (
                  <Image
                    src={urlFor(img).width(500).height(350).url()}
                    alt={img.alt ?? `${property.title} photo ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            ))}

            {/* overlay tile (5th image) */}
            {overlayImage && (
              <div className="relative rounded-2xl overflow-hidden">
                {overlayImage?.asset?._ref && (
                  <Image
                    src={urlFor(overlayImage).width(500).height(350).url()}
                    alt={overlayImage.alt ?? `${property.title} more photos`}
                    fill
                    className="object-cover"
                  />
                )}
                {/* dark overlay + count */}
                {extraCount > 0 && (
                  <div className="absolute inset-0 bg-black/55 flex items-center justify-center rounded-2xl">
                    <span className="font-serif text-white text-2xl font-medium tracking-wide">
                      +{extraCount} Images
                    </span>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  )
}
