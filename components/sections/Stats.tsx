import AnimateIn from "@/components/ui/AnimateIn"
import type { Stat } from "@/lib/types"

const iconMap: Record<string, string> = {
  traveler:    "/icons/happytraveller.svg",
  bed:         "/icons/verifiedstay.svg",
  community:   "/icons/communitymembers.svg",
  destination: "/icons/destinations.svg",
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
            const iconSrc = iconMap[stat.iconKey] ?? "/icons/destinations.svg"
            return (
              <AnimateIn key={stat._id} delay={index * 80}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 flex flex-col gap-10 h-full">
                  <img src={iconSrc} alt="" width={48} height={48} />
                  <div>
                    <p className="font-sans font-bold text-xl text-gray-900 leading-snug">
                      {stat.value} {stat.label}
                    </p>
                    {stat.description && (
                      <p className="font-sans text-sm text-gray-500 mt-2 leading-relaxed">
                        {stat.description}
                      </p>
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
