import { groq } from "next-sanity"

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    heroVideo { secure_url, public_id, resource_type, format },
    heroRating,
    heroRatingCount,
    heroHeading,
    heroHeadingItalic,
    heroSubheading,
    aboutUsHeading,
    aboutUsText,
    quoteBannerText,
    communityBannerImage,
    communityBannerHeading,
    communityBannerSubheading
  }
`

export const propertiesQuery = groq`
  *[_type == "property"] | order(order asc) {
    _id,
    title,
    slug,
    location,
    description,
    pricePerNight,
    status,
    isClickable,
    image { asset, alt },
    stayTypes,
    order
  }
`

export const reviewsQuery = groq`
  *[_type == "review"] | order(order asc) {
    _id,
    reviewerName,
    rating,
    text,
    reviewerAvatar { asset },
    timeAgo,
    source
  }
`

export const faqsQuery = groq`
  *[_type == "faq"] | order(order asc) {
    _id,
    question,
    answer,
    order
  }
`

export const statsQuery = groq`
  *[_type == "stat"] | order(order asc) {
    _id,
    value,
    label,
    description,
    iconKey,
    order
  }
`

export const activitiesQuery = groq`
  *[_type == "activity"] | order(order asc) {
    _id,
    label,
    order
  }
`

export const storyMediaQuery = groq`
  *[_type == "storyMedia"] | order(order asc) {
    _id,
    mediaType,
    cloudinaryAsset { secure_url, public_id, resource_type, format },
    thumbnail { asset, alt },
    order
  }
`

export const propertyBySlugQuery = groq`
  *[_type == "property" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    location,
    tagline,
    description,
    detailedHeading,
    pricePerNight,
    rating,
    bookingUrl,
    status,
    image { asset, alt },
    heroImages[] { asset, alt },
    amenities[] { _key, iconKey, label },
    experiences[] { _key, title, description, image { asset, alt } },
    galleryImages[] { asset, alt },
    stayTypes,
    order
  }
`

export const whyChooseUsQuery = groq`
  *[_type == "whyChooseUs"] | order(order asc) {
    _id,
    tabLabel,
    images[] { asset, alt },
    title,
    description,
    order
  }
`
