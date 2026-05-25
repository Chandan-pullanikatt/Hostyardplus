import AnimateIn from "@/components/ui/AnimateIn"
import type { SiteSettings } from "@/lib/types"

interface AboutUsProps {
  settings: SiteSettings
}

export default function AboutUs({ settings }: AboutUsProps) {
  return (
    <section className="bg-[#f8f6f1] py-20 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10 lg:gap-20 items-start">
        <AnimateIn>
          <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-tight">
            {settings.aboutUsHeading ?? "About us"}
          </h2>
        </AnimateIn>
        <AnimateIn delay={100}>
          <p className="font-sans text-gray-400 text-base md:text-lg leading-relaxed">
            {settings.aboutUsText ?? "Created for travelers seeking calm, comfort, and meaningful experiences, our space blends modern luxury with the beauty of nature. From peaceful mornings and wellness activities to unforgettable sunsets and curated experiences, every detail is thoughtfully designed to help you disconnect from the noise and reconnect with yourself."}
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}
