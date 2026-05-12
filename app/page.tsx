import { sanityFetch } from "@/sanity/lib/client"
import {
  siteSettingsQuery,
  propertiesQuery,
  reviewsQuery,
  faqsQuery,
  statsQuery,
  activitiesQuery,
  storyMediaQuery,
  whyChooseUsQuery,
} from "@/sanity/lib/queries"
import type {
  SiteSettings,
  Property,
  Review,
  FAQ as FAQType,
  Stat,
  Activity,
  StoryMedia,
  WhyChooseUsTab,
} from "@/lib/types"
import { urlFor } from "@/sanity/lib/image"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import AboutUs from "@/components/sections/AboutUs"
import Destinations from "@/components/sections/Destinations"
import WhyChooseUs from "@/components/sections/WhyChooseUs"
import Stats from "@/components/sections/Stats"
import ActivitiesTicker from "@/components/sections/ActivitiesTicker"
import StoriesSection from "@/components/sections/StoriesSection"
import Reviews from "@/components/sections/Reviews"
import CommunityBanner from "@/components/sections/CommunityBanner"
import FAQ from "@/components/sections/FAQ"

const FALLBACK_PROPERTIES: Property[] = [
  {
    _id: "fallback-suryanelli",
    title: "Suryanelli",
    slug: { current: "suryanelli" },
    location: "Suryanelli",
    description: "Suryanelli is a scenic, high-altitude village located in the Idukki district of Kerala",
    pricePerNight: 1299,
    status: "active",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    stayTypes: [],
    order: 1,
  },
  {
    _id: "fallback-kozhikode",
    title: "Kozhikode",
    slug: { current: "kozhikode" },
    location: "Kozhikode",
    description: "Cozy room in Kozhikode with modern amenities, peaceful ambiance, and easy access to beaches, food spots, and city attractions",
    pricePerNight: 1299,
    status: "active",
    isClickable: false,
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    stayTypes: [],
    order: 2,
  },
  {
    _id: "fallback-thrissur",
    title: "Thrissur",
    slug: { current: "thrissur" },
    location: "Thrissur",
    description: "Comfortable room in Thrissur offering central location, modern amenities, and easy access to temples, cultural spots, and local dining...",
    pricePerNight: 0,
    status: "work-in-progress",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    stayTypes: [],
    order: 3,
  },
  {
    _id: "fallback-alappuzha",
    title: "Alappuzha",
    slug: { current: "alappuzha" },
    location: "Alappuzha",
    description: "Relax on an Alappuzha houseboat with scenic backwaters, traditional meals, private rooms, and a peaceful cruise through Kerala's iconic...",
    pricePerNight: 0,
    status: "coming-soon",
    image: { _type: "image", asset: { _ref: "", _type: "reference" } },
    stayTypes: [],
    order: 4,
  },
]

const FALLBACK_STATS: Stat[] = [
  { _id: "stat-1", value: "10,000+", label: "Happy Travelers",     description: "Trusted by guests for comfortable stay experiences",                                          iconKey: "traveler",    order: 1 },
  { _id: "stat-2", value: "500+",    label: "Verified Stays",      description: "Carefully selected properties that meet our standards for quality and comfort.",              iconKey: "bed",         order: 2 },
  { _id: "stat-3", value: "5,000+",  label: "Community Members",   description: "A network of travelers and hosts sharing experiences and connections.",                       iconKey: "community",   order: 3 },
  { _id: "stat-4", value: "25+",     label: "Destinations",        description: "Explore stays across scenic locations, cities, and hidden gems.",                             iconKey: "destination", order: 4 },
]

const FALLBACK_SETTINGS: SiteSettings = {
  heroVideo: undefined,
  heroRating: "4.93 / 5",
  heroRatingCount: "2000+",
  heroHeading: "Your Perfect Escape in the Mountains",
  heroHeadingItalic: "Escape",
  heroSubheading: "Find calm in a modern hideaway with stunning views in the heart of Suryanelli",
  aboutUsHeading: "About us",
  aboutUsText: "Created for travelers seeking calm, comfort, and meaningful experiences, our space blends modern luxury with the beauty of nature. From peaceful mornings and wellness activities to unforgettable sunsets and curated experiences, every detail is thoughtfully designed to help you disconnect from the noise and reconnect with yourself.",
  quoteBannerText:
    "We thoughtfully curate every stay, design every touchpoint with care, and move with a clear focus on experience. The difference? We're building memories with you not just facilitating stays",
  communityBannerHeading: "Comfort Meets Community",
  communityBannerSubheading:
    "Designed For Travelers Who Value Both Comfort And Community, Enjoy Modern Amenities, Cozy Common Spaces, And Opportunities To Meet Fellow Explorers From Around The World.",
}

async function fetchData<T>(query: string, fallback: T): Promise<T> {
  try {
    const data = await sanityFetch<T>(query)
    if (data === null || data === undefined) return fallback
    // For SiteSettings, merge so empty string fields fall back to defaults
    if (typeof fallback === "object" && !Array.isArray(fallback) && fallback !== null) {
      const merged = { ...fallback } as Record<string, unknown>
      const incoming = data as Record<string, unknown>
      for (const key of Object.keys(merged)) {
        if (incoming[key] !== null && incoming[key] !== undefined && incoming[key] !== "") {
          merged[key] = incoming[key]
        }
      }
      return merged as T
    }
    return data
  } catch {
    return fallback
  }
}

export default async function Home() {
  const [settings, properties, reviews, faqs, stats, activities, stories, whyChooseTabs] =
    await Promise.all([
      fetchData<SiteSettings>(siteSettingsQuery, FALLBACK_SETTINGS),
      fetchData<Property[]>(propertiesQuery, FALLBACK_PROPERTIES),
      fetchData<Review[]>(reviewsQuery, []),
      fetchData<FAQType[]>(faqsQuery, []),
      fetchData<Stat[]>(statsQuery, FALLBACK_STATS),
      fetchData<Activity[]>(activitiesQuery, []),
      fetchData<StoryMedia[]>(storyMediaQuery, []),
      fetchData<WhyChooseUsTab[]>(whyChooseUsQuery, []),
    ])

  // Kozhikode detail page is not ready yet — disable card link regardless of CMS value
  const processedProperties = properties.map((p) =>
    p.slug?.current === "kozhikode" ? { ...p, isClickable: false } : p
  )

  const processedWhyChooseTabs = whyChooseTabs.map((tab) => ({
    id: tab._id,
    label: tab.tabLabel,
    title: tab.title,
    description: tab.description,
    imageUrls: (tab.images ?? [])
      .filter((img) => img?.asset?._ref)
      .map((img) => urlFor(img).width(1400).height(800).url()),
  }))

  return (
    <main>
      <Navbar />
      <Hero settings={settings} properties={processedProperties} />
      <AboutUs settings={settings} />
      <WhyChooseUs tabs={processedWhyChooseTabs.length > 0 ? processedWhyChooseTabs : undefined} />
      <Stats stats={stats} />
      {activities.length > 0 && <ActivitiesTicker activities={activities} />}
      {stories.length > 0 && <StoriesSection stories={stories} />}
      {reviews.length > 0 && <Reviews reviews={reviews} />}
      <Destinations properties={processedProperties} />
      <CommunityBanner settings={settings} />
      {faqs.length > 0 && <FAQ faqs={faqs} />}
      <Footer />
    </main>
  )
}
