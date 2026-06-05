"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import AnimateIn from "@/components/ui/AnimateIn"
import { urlFor } from "@/sanity/lib/image"
import type { PartnerCard } from "@/lib/types"

interface Props {
  cards: PartnerCard[]
}

export default function PartnerCardsSection({ cards }: Props) {
  const [active, setActive] = useState<PartnerCard | null>(null)

  // Close on Escape + lock body scroll while the modal is open
  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null)
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [active])

  return (
    <section className="py-14 lg:py-20 px-6 lg:px-12 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const imgSrc = card.image?.asset?._ref
              ? urlFor(card.image).width(600).height(400).url()
              : null
            return (
              <AnimateIn key={card._key} delay={i * 80}>
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm h-full flex flex-col">
                  <div className="relative h-60 bg-[#e8f0ed]">
                    {imgSrc && (
                      <Image src={imgSrc} alt={card.title} fill className="object-cover" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-block self-start font-sans text-xs text-gray-600 border border-gray-200 rounded-full px-3 py-1 mb-4">
                      {card.category}
                    </span>
                    <h3 className="font-serif text-2xl text-gray-900 mb-2 leading-snug">
                      {card.title}
                    </h3>
                    <p className="font-sans text-sm text-gray-500 leading-relaxed">
                      {card.description}
                    </p>
                    {card.formUrl && (
                      <button
                        type="button"
                        onClick={() => setActive(card)}
                        className="mt-6 inline-flex items-center justify-center self-start rounded-full bg-gray-900 px-6 py-3 font-sans text-sm text-white transition-colors hover:bg-gray-700"
                      >
                        {card.ctaLabel || "Enquire"}
                      </button>
                    )}
                  </div>
                </div>
              </AnimateIn>
            )
          })}
        </div>
      </div>

      {active && active.formUrl && (
        <div
          className="fixed inset-0 z-[100] flex items-stretch justify-center bg-black/60 sm:items-center sm:p-6"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${active.category} enquiry form`}
        >
          <div
            className="relative flex h-full w-full flex-col bg-white shadow-xl sm:h-[85vh] sm:max-w-[640px] sm:rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <span className="font-sans text-sm font-medium text-gray-900">
                {active.category}
              </span>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
              >
                <X size={20} />
              </button>
            </div>
            <iframe
              src={active.formUrl}
              title={`${active.category} enquiry form`}
              className="h-full w-full flex-1 border-0"
            />
          </div>
        </div>
      )}
    </section>
  )
}
