import SectionHeader from "@/components/ui/SectionHeader"
import PropertyCard from "@/components/ui/PropertyCard"
import AnimateIn from "@/components/ui/AnimateIn"
import type { Property } from "@/lib/types"

interface DestinationsProps {
  properties: Property[]
}

export default function Destinations({ properties }: DestinationsProps) {
  return (
    <section className="bg-[#f8f6f1] py-20 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <AnimateIn className="mb-14">
          <SectionHeader
            label="Find your stay"
            heading="Your Next Destination"
            subheading="Browse curated stays across destinations"
          />
        </AnimateIn>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <AnimateIn key={property._id} delay={index * 80}>
              <PropertyCard property={property} />
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  )
}
