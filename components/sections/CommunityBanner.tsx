import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import AnimateIn from "@/components/ui/AnimateIn"
import type { SiteSettings } from "@/lib/types"

interface CommunityBannerProps {
  settings: SiteSettings
}

export default function CommunityBanner({ settings }: CommunityBannerProps) {
  const bgUrl = settings.communityBannerImage?.asset?._ref
    ? urlFor(settings.communityBannerImage).width(1400).height(500).url()
    : "/photos/community.jpg"

  return (
    <section className="relative overflow-hidden rounded-3xl mx-6 lg:mx-12 my-6">
      <div className="relative h-72 md:h-80">
        <Image src={bgUrl} alt="Community Banner" fill className="object-cover" />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 gap-4">
          <AnimateIn>
            <h2 className="font-serif italic text-3xl md:text-4xl text-white">
              {settings.communityBannerHeading ?? "Comfort Meets Community"}
            </h2>
          </AnimateIn>
          <AnimateIn delay={150}>
            <p className="font-sans text-white/80 text-sm max-w-xl leading-relaxed">
              {settings.communityBannerSubheading}
            </p>
          </AnimateIn>
          <AnimateIn delay={300}>
            <Link
              href="#book"
              className="mt-2 inline-flex items-center justify-center px-8 py-3 border border-white text-white font-sans text-sm rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              Book Now
            </Link>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
