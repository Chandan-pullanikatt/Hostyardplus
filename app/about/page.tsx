import { sanityFetch } from "@/sanity/lib/client"
import { aboutPageQuery } from "@/sanity/lib/queries"
import type { AboutPage } from "@/lib/types"
import { urlFor } from "@/sanity/lib/image"
import Image from "next/image"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnimateIn from "@/components/ui/AnimateIn"

const FALLBACK: AboutPage = {
  heroHeading: "About Us",
  heroSubtitle: "Calm · Nature · Adventure",
  storyHeading: "Our Story",
  storyText:
    "Hostyard+ was born from a simple belief: that travel should feel like coming home. Founded in Kerala, India, we started with a single property in the mountains of Suryanelli — a quiet place where guests could slow down, breathe deeper, and reconnect with what matters.\n\nWhat began as one stay has grown into a curated collection of homes across Kerala's most beautiful landscapes. But our founding philosophy hasn't changed: every property we add must earn its place. We look for spaces that have soul — where the architecture speaks to the land, the hosts care, and the experience lingers long after checkout.",
  valuesHeading: "What We Stand For",
  values: [
    { title: "Calm over noise", description: "We curate spaces that offer genuine rest. No party crowds, no compromise on the quiet that real travel requires.", accent: "ocean-400" },
    { title: "Care in every detail", description: "From the first message to checkout, every touchpoint is designed with intention. The difference is in what you don't have to think about.", accent: "sun-400" },
    { title: "Connection over transaction", description: "We're not just facilitating stays. We're building a community of hosts and travelers who believe travel should be meaningful.", accent: "earthy-500" },
  ],
  teamHeading: "Meet the Team",
  teamMembers: [],
}

const accentBorderMap: Record<string, string> = {
  "ocean-400": "border-ocean-400",
  "sun-400": "border-sun-400",
  "earthy-500": "border-earthy-500",
}

const accentTextMap: Record<string, string> = {
  "ocean-400": "text-ocean-400",
  "sun-400": "text-sun-400",
  "earthy-500": "text-earthy-500",
}

async function fetchPage(): Promise<AboutPage> {
  try {
    const data = await sanityFetch<AboutPage>(aboutPageQuery)
    if (!data) return FALLBACK
    return {
      heroHeading: data.heroHeading || FALLBACK.heroHeading,
      heroSubtitle: data.heroSubtitle || FALLBACK.heroSubtitle,
      storyHeading: data.storyHeading || FALLBACK.storyHeading,
      storyText: data.storyText || FALLBACK.storyText,
      valuesHeading: data.valuesHeading || FALLBACK.valuesHeading,
      values: data.values?.length ? data.values : FALLBACK.values,
      teamHeading: data.teamHeading || FALLBACK.teamHeading,
      teamMembers: data.teamMembers ?? [],
    }
  } catch {
    return FALLBACK
  }
}

export default async function AboutPage() {
  const page = await fetchPage()
  const paragraphs = page.storyText.split("\n\n").filter(Boolean)
  const hasTeam = (page.teamMembers?.length ?? 0) > 0

  return (
    <main>
      <Navbar />

      {/* Hero */}
      <section className="relative bg-primary min-h-[40vh] flex flex-col items-center justify-center text-center px-6 pt-28 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center gap-4">
          <AnimateIn>
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white leading-none">
              {page.heroHeading}
            </h1>
          </AnimateIn>
          <AnimateIn delay={120}>
            <p className="font-sans text-white/70 text-base md:text-lg tracking-widest uppercase">
              {page.heroSubtitle}
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Story */}
      <section className="bg-[#f8f6f1] py-20 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-10 lg:gap-20 items-start">
          <AnimateIn>
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-tight">
              {page.storyHeading}
            </h2>
          </AnimateIn>
          <AnimateIn delay={100}>
            <div className="flex flex-col gap-5">
              {paragraphs.map((p, i) => (
                <p key={i} className="font-sans text-gray-600 text-base md:text-lg leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Values */}
      <section className="bg-white py-20 px-6 lg:px-12">
        <div className="max-w-[1400px] mx-auto">
          <AnimateIn className="mb-12 text-center">
            <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-tight">
              {page.valuesHeading}
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {page.values.map((val, i) => (
              <AnimateIn key={val.title} delay={i * 80}>
                <div className={`h-full border-t-4 ${accentBorderMap[val.accent] ?? "border-ocean-400"} bg-[#f8f6f1] rounded-2xl p-8 flex flex-col gap-4`}>
                  <h3 className={`font-serif text-2xl ${accentTextMap[val.accent] ?? "text-ocean-400"} leading-snug`}>
                    {val.title}
                  </h3>
                  <p className="font-sans text-gray-600 text-sm leading-relaxed flex-1">
                    {val.description}
                  </p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Team — hidden when empty */}
      {hasTeam && (
        <section className="bg-[#f8f6f1] py-20 px-6 lg:px-12">
          <div className="max-w-[1400px] mx-auto">
            <AnimateIn className="mb-12 text-center">
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-tight">
                {page.teamHeading}
              </h2>
            </AnimateIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {page.teamMembers!.map((member, i) => (
                <AnimateIn key={member.name} delay={i * 80}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col">
                    {member.photo?.asset?._ref ? (
                      <div className="relative h-64 w-full">
                        <Image
                          src={urlFor(member.photo).width(600).height(512).url()}
                          alt={member.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="h-64 w-full bg-primary/10 flex items-center justify-center">
                        <span className="font-serif text-5xl text-primary/30">
                          {member.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="p-6 flex flex-col gap-1">
                      <h3 className="font-serif text-xl text-gray-900">{member.name}</h3>
                      <p className="font-sans text-ocean-600 text-sm">{member.role}</p>
                      {member.bio && (
                        <p className="font-sans text-gray-500 text-sm leading-relaxed mt-2">{member.bio}</p>
                      )}
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  )
}
