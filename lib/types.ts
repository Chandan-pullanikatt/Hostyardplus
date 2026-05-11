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
  cloudinaryUrl: string
  thumbnail?: SanityImage
  order: number
}

export interface WhyChooseUsTab {
  _id: string
  tabLabel: string
  image: SanityImage
  title: string
  description: string
  order: number
}

export interface SiteSettings {
  heroVideoUrl: string
  heroRating: string
  heroRatingCount: string
  heroHeading: string
  heroHeadingItalic: string
  heroSubheading: string
  aboutUsHeading: string
  aboutUsText: string
  quoteBannerText: string
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
