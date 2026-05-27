"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import type { PropertyDetail } from "@/lib/types"

interface Props {
  property: PropertyDetail
}

export default function PhotoTourGallery({ property }: Props) {
  const sections = property.photoTourSections ?? []
  const [activeKey, setActiveKey] = useState(sections[0]?._key ?? "")
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({})

  // Scroll spy — highlight the sidebar pill for whichever section is most in view
  useEffect(() => {
    if (sections.length === 0) return
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const el = sectionRefs.current[section._key]
      if (!el) return
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveKey(section._key)
        },
        // trigger when section enters the upper 40% of the viewport
        { rootMargin: "-10% 0px -55% 0px", threshold: 0 },
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections.length])

  function scrollTo(key: string) {
    const el = sectionRefs.current[key]
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-28 lg:pt-32 pb-24">

      {/* ── Back bar ── */}
      <Link
        href={`/properties/${property.slug?.current}`}
        className="inline-flex items-center gap-2 text-sm font-sans text-gray-500 hover:text-gray-900 transition-colors mb-8"
      >
        <ArrowLeft size={15} />
        Back to {property.title}
      </Link>

      {/* ── Page heading ── */}
      <h1 className="font-serif text-4xl md:text-5xl text-gray-900 mb-1">Photo Tour</h1>
      <p className="font-sans text-sm text-gray-400 mb-8">{property.location}</p>

      {/* ── Mobile: horizontal category pills ── */}
      <div className="lg:hidden flex gap-2 overflow-x-auto pb-3 mb-8 no-scrollbar">
        {sections.map((section) => (
          <button
            key={section._key}
            onClick={() => scrollTo(section._key)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-sans font-medium transition-all ${
              activeKey === section._key
                ? "bg-primary text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-700 hover:border-primary/40"
            }`}
          >
            {section.categoryName}
          </button>
        ))}
      </div>

      {/* ── Desktop: sticky sidebar + content ── */}
      <div className="flex gap-14 items-start">

        {/* Sidebar */}
        <aside className="hidden lg:block w-[200px] shrink-0 sticky top-24">
          <p className="text-[10px] font-sans font-semibold uppercase tracking-widest text-gray-400 mb-4 pl-4">
            Spaces
          </p>
          <nav className="flex flex-col gap-0.5">
            {sections.map((section) => (
              <button
                key={section._key}
                onClick={() => scrollTo(section._key)}
                className={`text-left px-4 py-2.5 rounded-xl text-sm font-sans font-medium transition-all ${
                  activeKey === section._key
                    ? "bg-primary text-white shadow-sm"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {section.categoryName}
              </button>
            ))}
          </nav>
        </aside>

        {/* Sections */}
        <div className="flex-1 min-w-0 space-y-16">
          {sections.map((section) => (
            <div
              key={section._key}
              ref={(el) => { sectionRefs.current[section._key] = el }}
            >
              {/* Section header */}
              <h2 className="font-serif text-3xl md:text-4xl text-gray-900 mb-1">
                {section.categoryName}
              </h2>
              {section.description && (
                <p className="font-sans text-sm text-gray-500 mb-5 leading-relaxed">
                  {section.description}
                </p>
              )}

              {/* Image grid */}
              {section.images?.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
                  {section.images.map((img, i) => (
                    <div
                      key={i}
                      className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100"
                    >
                      {img?.asset?._ref && (
                        <Image
                          src={urlFor(img).width(720).height(540).url()}
                          alt={img.alt ?? `${section.categoryName} — photo ${i + 1}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
