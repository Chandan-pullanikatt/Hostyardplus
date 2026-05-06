import { Users, BedDouble, Globe, MapPin } from "lucide-react"
import AnimateIn from "@/components/ui/AnimateIn"
import type { Stat } from "@/lib/types"

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  traveler: Users,
  bed: BedDouble,
  community: Globe,
  destination: MapPin,
}

interface StatsProps {
  stats: Stat[]
}

export default function Stats({ stats }: StatsProps) {
  return (
    <section className="bg-[#f8f6f1] py-16 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, index) => {
            const Icon = iconMap[stat.iconKey] ?? MapPin
            return (
              <AnimateIn key={stat._id} delay={index * 80}>
                <div className="bg-white rounded-2xl p-6 flex flex-col gap-5">
                  <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center">
                    <Icon size={22} className="text-white" />
                  </div>
                  <div>
                    <p className="font-sans font-normal text-2xl text-gray-900">{stat.value}</p>
                    <p className="font-sans font-normal text-base text-gray-900">{stat.label}</p>
                    {stat.description && (
                      <p className="font-sans text-sm text-gray-500 mt-1">{stat.description}</p>
                    )}
                  </div>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
