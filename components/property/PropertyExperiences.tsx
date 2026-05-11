import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import type { PropertyDetail } from "@/lib/types"

interface Props {
  property: PropertyDetail
}

export default function PropertyExperiences({ property }: Props) {
  const experiences = property.experiences ?? []
  if (!experiences.length) return null

  const [first, ...rest] = experiences

  return (
    <section className="bg-white py-16">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-10">Experiences</h2>

        <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[560px]">
          {/* Featured card (large) */}
          <div className="relative flex-1 rounded-2xl overflow-hidden min-h-[380px]">
            {first.image?.asset?._ref && (
              <Image
                src={urlFor(first.image).width(800).height(700).url()}
                alt={first.image.alt ?? first.title}
                fill
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <span className="inline-block bg-primary text-white text-xs font-sans px-3 py-1 rounded-full mb-3">
                {property.location}
              </span>
              <h3 className="font-serif text-3xl text-white mb-2">{first.title}</h3>
              {first.description && (
                <p className="text-white/80 font-sans text-sm leading-relaxed line-clamp-3">
                  {first.description}
                </p>
              )}
            </div>
          </div>

          {/* Secondary cards */}
          {rest.length > 0 && (
            <div className="flex flex-col gap-4 lg:w-[340px] shrink-0">
              {rest.slice(0, 2).map(exp => (
                <div key={exp._key} className="relative flex-1 rounded-2xl overflow-hidden min-h-[180px]">
                  {exp.image?.asset?._ref && (
                    <Image
                      src={urlFor(exp.image).width(500).height(400).url()}
                      alt={exp.image.alt ?? exp.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <span className="inline-block bg-primary text-white text-xs font-sans px-3 py-1 rounded-full mb-2">
                      {property.location}
                    </span>
                    <h3 className="font-serif text-xl text-white">{exp.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
