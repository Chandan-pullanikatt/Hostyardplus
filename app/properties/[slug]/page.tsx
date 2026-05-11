import { notFound } from "next/navigation"
import { sanityFetch } from "@/sanity/lib/client"
import { propertyBySlugQuery, reviewsQuery, siteSettingsQuery } from "@/sanity/lib/queries"
import type { PropertyDetail, Review, SiteSettings } from "@/lib/types"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import PropertyHero from "@/components/property/PropertyHero"
import PropertyOverview from "@/components/property/PropertyOverview"
import PropertyExperiences from "@/components/property/PropertyExperiences"
import PropertyGallery from "@/components/property/PropertyGallery"
import Reviews from "@/components/sections/Reviews"
import CommunityBanner from "@/components/sections/CommunityBanner"

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const [property, reviews, settings] = await Promise.all([
    sanityFetch<PropertyDetail>(propertyBySlugQuery, { slug }),
    sanityFetch<Review[]>(reviewsQuery),
    sanityFetch<SiteSettings>(siteSettingsQuery),
  ])

  if (!property) notFound()

  return (
    <>
      <Navbar />
      <PropertyHero property={property} />
      <PropertyOverview property={property} />
      {property.experiences?.length > 0 && <PropertyExperiences property={property} />}
      {property.galleryImages?.length > 1 && <PropertyGallery property={property} />}
      {reviews?.length > 0 && <Reviews reviews={reviews} />}
      {settings && <CommunityBanner settings={settings} />}
      <Footer />
    </>
  )
}
