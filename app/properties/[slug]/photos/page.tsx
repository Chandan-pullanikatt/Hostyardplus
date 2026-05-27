import { notFound, redirect } from "next/navigation"
import { sanityFetch } from "@/sanity/lib/client"
import { propertyBySlugQuery } from "@/sanity/lib/queries"
import type { PropertyDetail } from "@/lib/types"

import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import PhotoTourGallery from "@/components/property/PhotoTourGallery"

export default async function PhotoTourPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const property = await sanityFetch<PropertyDetail>(propertyBySlugQuery, { slug })

  if (!property) notFound()

  // If no photo tour sections have been set up yet, fall back to the property page
  if (!property.photoTourSections?.length) {
    redirect(`/properties/${slug}`)
  }

  return (
    <main className="bg-[#F7F7F7] min-h-screen">
      <Navbar solid />
      <PhotoTourGallery property={property} />
      <Footer />
    </main>
  )
}
