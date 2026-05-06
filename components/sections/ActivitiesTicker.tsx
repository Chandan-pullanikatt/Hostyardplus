import type { Activity } from "@/lib/types"

interface ActivitiesTickerProps {
  activities: Activity[]
}

const DotSeparator = () => (
  <span className="mx-4 text-primary/50">●</span>
)

export default function ActivitiesTicker({ activities }: ActivitiesTickerProps) {
  const doubled = [...activities, ...activities]

  return (
    <section className="bg-sun-400 py-4 overflow-hidden">
      <div className="flex items-center animate-marquee whitespace-nowrap">
        {doubled.map((activity, i) => (
          <span key={`${activity._id}-${i}`} className="inline-flex items-center">
            <span className="font-sans text-sm font-normal text-primary px-2">{activity.label}</span>
            <DotSeparator />
          </span>
        ))}
      </div>
    </section>
  )
}
