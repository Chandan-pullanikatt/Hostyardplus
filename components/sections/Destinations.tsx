import PropertyCard from "@/components/ui/PropertyCard"
import AnimateIn from "@/components/ui/AnimateIn"
import type { Property } from "@/lib/types"

interface DestinationsProps {
  properties: Property[]
}

export default function Destinations({ properties }: DestinationsProps) {
  const activeProperties = properties.filter((p) => p.status === "active")

  return (
    <section className="bg-[#f8f6f1] py-20 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <AnimateIn className="mb-14 flex flex-col items-center text-center gap-3">
          <h2 className="font-serif italic text-4xl md:text-5xl text-gray-900 leading-tight">
            Your Next Destination
          </h2>
          <p className="font-sans text-sm text-gray-500">Browse curated stays across destinations</p>
        </AnimateIn>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {activeProperties.map((property, index) => (
            <AnimateIn key={property._id} delay={index * 80}>
              <PropertyCard property={property} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
