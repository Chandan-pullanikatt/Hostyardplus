import type { Activity } from "@/lib/types"

interface ActivitiesTickerProps {
  activities: Activity[]
}

const iconMap: Record<string, string> = {
  "sunrise views":  "/icons/SUNRISE%20%26%20SUNSET.svg",
  "mountain views": "/icons/MOUNTAIN.svg",
  "off-road rides": "/icons/OFF-ROAD.svg",
  "guided tours":   "/icons/COMPASS.svg",
  "kayaking access":"/icons/KAYAKING.svg",
  "forest stays":   "/icons/FOREST.svg",
  "music nights":   "/icons/MUSIC.svg",
  "easy access":    "/icons/ROAD.svg",
  "camping stays":  "/icons/TENT.svg",
  "bonfire nights": "/icons/CAMPFIRE.svg",
}

function getIcon(label: string): string | null {
  return iconMap[label.toLowerCase()] ?? null
}

export default function ActivitiesTicker({ activities }: ActivitiesTickerProps) {
  const doubled = [...activities, ...activities]

  return (
    <section className="bg-primary py-4 overflow-hidden">
      <div className="flex items-center animate-marquee whitespace-nowrap">
        {doubled.map((activity, i) => {
          const icon = getIcon(activity.label)
          return (
            <span
              key={`${activity._id}-${i}`}
              className="inline-flex items-center"
            >
              {/* Activity item: icon + label */}
              <span className="inline-flex items-center gap-2 px-4">
                {icon && (
                  <img
                    src={icon}
                    width={18}
                    height={18}
                    alt=""
                    className="[filter:brightness(0)_invert(1)] flex-shrink-0"
                  />
                )}
                <span className="font-sans text-sm text-white uppercase tracking-wide">{activity.label}</span>
              </span>

            </span>
          )
        })}
      </div>
    </section>
  )
}
