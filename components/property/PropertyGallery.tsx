import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import type { PropertyDetail } from "@/lib/types"

interface Props {
  property: PropertyDetail
}

export default function PropertyGallery({ property }: Props) {
  const images = property.galleryImages ?? []
  if (images.length < 2) return null

  const [hero, ...grid] = images

  return (
    <section className="bg-[#f8f6f1] py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 text-center mb-10">
          Why Choose Us
        </h2>

        <div className="flex flex-col lg:flex-row gap-3 h-auto lg:h-[540px]">
          {/* Large left image */}
          <div className="relative flex-1 rounded-2xl overflow-hidden min-h-[300px]">
            {hero.asset?._ref && (
              <Image
                src={urlFor(hero).width(800).height(700).url()}
                alt={hero.alt ?? property.title}
                fill
                className="object-cover"
              />
            )}
          </div>

          {/* Right 2×2 grid */}
          <div className="grid grid-cols-2 gap-3 lg:w-[420px] shrink-0">
            {grid.slice(0, 4).map((img, i) => (
              <div key={i} className="relative rounded-2xl overflow-hidden min-h-[130px]">
                {img.asset?._ref && (
                  <Image
                    src={urlFor(img).width(400).height(350).url()}
                    alt={img.alt ?? `${property.title} photo ${i + 2}`}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
