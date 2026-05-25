import { notFound } from "next/navigation"
import { sanityFetch } from "@/sanity/lib/client"
import { propertyBySlugQuery, reviewsQuery } from "@/sanity/lib/queries"
import type { PropertyDetail, Review } from "@/lib/types"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import PropertyHero from "@/components/property/PropertyHero"
import PropertyOverview from "@/components/property/PropertyOverview"
import PropertyExperiences from "@/components/property/PropertyExperiences"
import PropertyGallery from "@/components/property/PropertyGallery"
import Reviews from "@/components/sections/Reviews"

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params

  const [property, reviews] = await Promise.all([
    sanityFetch<PropertyDetail>(propertyBySlugQuery, { slug }),
    sanityFetch<Review[]>(reviewsQuery),
  ])

  if (!property) notFound()

  return (
    <main className="bg-[#F7F7F7]">
      <Navbar />
      <PropertyHero property={property} />
      <PropertyOverview property={property} />
      <PropertyExperiences property={property} />
      {property.galleryImages?.length > 1 && <PropertyGallery property={property} />}
      {reviews?.length > 0 && (
        <div className="[&>section]:bg-[#F7F7F7]">
          <Reviews reviews={reviews} />
        </div>
      )}
      <Footer />
    </main>
  )
}
