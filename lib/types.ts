export interface PropertyAmenity {
  _key: string
  iconKey: string
  label: string
}

export interface PropertyExperience {
  _key: string
  title: string
  description: string
  image: SanityImage
}

export interface PhotoTourSection {
  _key: string
  categoryName: string
  description?: string
  images: SanityImage[]
}

export interface PropertyDetail {
  _id: string
  title: string
  slug: { current: string }
  location: string
  tagline: string
  description: string
  detailedHeading: string
  pricePerNight: number
  rating: number
  bookingUrl: string
  status: "active" | "work-in-progress" | "coming-soon"
  image: SanityImage
  heroImages: SanityImage[]
  amenities: PropertyAmenity[]
  experiences: PropertyExperience[]
  galleryImages: SanityImage[]
  photoTourSections?: PhotoTourSection[]
  stayTypes: string[]
  order: number
}

export interface Property {
  _id: string
  title: string
  slug: { current: string }
  location: string
  description: string
  pricePerNight: number
  status: "active" | "work-in-progress" | "coming-soon"
  showOnWebsite?: boolean
  isClickable?: boolean
  image: SanityImage
  stayTypes: string[]
  order: number
}

export interface Review {
  _id: string
  rating: number
  text: string
  reviewerName: string
  reviewerAvatar?: SanityImage
  timeAgo: string
}

export interface FAQ {
  _id: string
  question: string
  answer: string
  order: number
}

export interface Stat {
  _id: string
  value: string
  label: string
  description: string
  iconKey: string
  order: number
}

export interface Activity {
  _id: string
  label: string
  order: number
}

export interface StoryMedia {
  _id: string
  mediaType: "video" | "image"
  cloudinaryAsset?: CloudinaryAsset
  thumbnail?: SanityImage
  order: number
}

export interface WhyChooseUsTab {
  _id: string
  tabLabel: string
  images: SanityImage[]
  title: string
  description: string
  order: number
}

export interface CloudinaryAsset {
  _type?: "cloudinary.asset"
  secure_url: string
  public_id?: string
  resource_type?: string
  format?: string
}

export interface SiteSettings {
  heroVideo?: CloudinaryAsset
  heroHeading: string
  reviewsBadge: string
  aboutUsHeading: string
  aboutUsText: string
  communityBannerImage?: SanityImage
  communityBannerHeading: string
  communityBannerSubheading: string
}

export interface SanityImage {
  _type: "image"
  asset: {
    _ref: string
    _type: "reference"
  }
  alt?: string
}

export interface AboutPageStat {
  value: string
  label: string
}

export interface AboutPagePromise {
  title: string
  description: string
}

export interface AboutPage {
  heroLabel: string
  mainHeading: string
  mainDescription: string
  heroImage?: SanityImage
  stats: AboutPageStat[]
  promiseSectionHeading: string
  promiseSubtitle: string
  promises: AboutPagePromise[]
  ctaHeading: string
  ctaSubtitle: string
  ctaButtonText: string
  ctaButtonLink: string
  ctaImage?: SanityImage
}

export interface PartnerCard {
  _key: string
  category: string
  title: string
  description: string
  image?: SanityImage
  ctaLabel?: string
  formUrl?: string
}

export interface PartnerPageFAQ {
  _key: string
  question: string
  answer: string
}

export interface PartnerPage {
  heroLabel: string
  heroHeading: string
  heroDescription: string
  partnerCards: PartnerCard[]
  ctaHeading: string
  ctaSubtitle: string
  ctaButtonText: string
  ctaButtonLink: string
  ctaImage?: SanityImage
  faqHeading: string
  faqSubtitle: string
  faqs: PartnerPageFAQ[]
}

export interface ContactPage {
  heading: string
  tagline: string
  phone: string
  whatsappNumber: string
  whatsappButtonText: string
  phoneButtonText: string
}

export interface PolicyPage {
  title: string
  lastUpdated: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  body?: any[]
}
