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
    photoTourSections[] { _key, categoryName, description, images[] { asset, alt } },
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

export const aboutPageQuery = groq`
  *[_type == "aboutPage"][0] {
    heroLabel,
    mainHeading,
    mainDescription,
    heroImage { asset, alt },
    stats[] { value, label },
    promiseSectionHeading,
    promiseSubtitle,
    promises[] { title, description },
    ctaHeading,
    ctaSubtitle,
    ctaButtonText,
    ctaButtonLink,
    ctaImage { asset, alt }
  }
`

export const partnerPageQuery = groq`
  *[_type == "partnerPage"][0] {
    heroLabel,
    heroHeading,
    heroDescription,
    partnerCards[] { _key, category, title, description, image { asset, alt } },
    ctaHeading,
    ctaSubtitle,
    ctaButtonText,
    ctaButtonLink,
    ctaImage { asset, alt },
    faqHeading,
    faqSubtitle,
    faqs[] { _key, question, answer }
  }
`

export const contactPageQuery = groq`
  *[_type == "contactPage"][0] {
    heading,
    tagline,
    phone,
    whatsappNumber,
    whatsappButtonText,
    phoneButtonText
  }
`

export const privacyPolicyQuery = groq`*[_type == "privacyPolicy"][0] { title, lastUpdated, body }`
export const guestPolicyQuery = groq`*[_type == "guestPolicy"][0] { title, lastUpdated, body }`
export const cancellationPolicyQuery = groq`*[_type == "cancellationPolicy"][0] { title, lastUpdated, body }`
export const termsConditionsQuery = groq`*[_type == "termsConditions"][0] { title, lastUpdated, body }`
