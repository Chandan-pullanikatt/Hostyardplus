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

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import Hero from "@/components/sections/Hero"
import Destinations from "@/components/sections/Destinations"
import QuoteBanner from "@/components/sections/QuoteBanner"
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

const FALLBACK_SETTINGS: SiteSettings = {
  heroVideoUrl: "",
  heroRating: "4.93 / 5",
  heroRatingCount: "2000+",
  heroHeading: "Your Perfect Escape in the Mountains",
  heroHeadingItalic: "Escape",
  heroSubheading: "Find calm in a modern hideaway with stunning views in the heart of Suryanelli",
  quoteBannerText:
    "We thoughtfully curate every stay, design every touchpoint with care, and move with a clear focus on experience. The difference? We're building memories with you not just facilitating stays",
  communityBannerHeading: "Comfort Meets Community",
  communityBannerSubheading:
    "Designed For Travelers Who Value Both Comfort And Community, Enjoy Modern Amenities, Cozy Common Spaces, And Opportunities To Meet Fellow Explorers From Around The World.",
}

async function fetchData<T>(query: string, fallback: T): Promise<T> {
  try {
    const data = await sanityFetch<T>(query)
    return data ?? fallback
  } catch {
    return fallback
  }
}

export default async function Home() {
  const [settings, properties, reviews, faqs, stats, activities, stories, whyChooseUsTabs] =
    await Promise.all([
      fetchData<SiteSettings>(siteSettingsQuery, FALLBACK_SETTINGS),
      fetchData<Property[]>(propertiesQuery, FALLBACK_PROPERTIES),
      fetchData<Review[]>(reviewsQuery, []),
      fetchData<FAQType[]>(faqsQuery, []),
      fetchData<Stat[]>(statsQuery, []),
      fetchData<Activity[]>(activitiesQuery, []),
      fetchData<StoryMedia[]>(storyMediaQuery, []),
      fetchData<WhyChooseUsTab[]>(whyChooseUsQuery, []),
    ])

  return (
    <main>
      <Navbar />
      <Hero settings={settings} properties={properties} />
      <Destinations properties={properties} />
      <QuoteBanner text={settings.quoteBannerText} />
      {whyChooseUsTabs.length > 0 && <WhyChooseUs tabs={whyChooseUsTabs} />}
      {stats.length > 0 && <Stats stats={stats} />}
      {activities.length > 0 && <ActivitiesTicker activities={activities} />}
      {stories.length > 0 && <StoriesSection stories={stories} />}
      {reviews.length > 0 && <Reviews reviews={reviews} />}
      <CommunityBanner settings={settings} />
      {faqs.length > 0 && <FAQ faqs={faqs} />}
      <Footer />
    </main>
  )
}
