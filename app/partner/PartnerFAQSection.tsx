"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import AnimateIn from "@/components/ui/AnimateIn"
import type { PartnerPageFAQ } from "@/lib/types"

interface Props {
  heading: string
  subtitle: string
  faqs: PartnerPageFAQ[]
}

export default function PartnerFAQSection({ heading, subtitle, faqs }: Props) {
  const [open, setOpen] = useState<string | null>(faqs[0]?._key ?? null)

  return (
    <section className="bg-white py-20 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          <AnimateIn>
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-tight">{heading}</h2>
              <p className="font-sans text-sm text-gray-500">{subtitle}</p>
            </div>
          </AnimateIn>

          <AnimateIn delay={150} className="flex flex-col divide-y divide-gray-200">
            {faqs.map((faq) => {
              const isOpen = open === faq._key
              return (
                <div key={faq._key}>
                  <button
                    onClick={() => setOpen(isOpen ? null : faq._key)}
                    className="w-full flex items-center justify-between py-5 text-left gap-4"
                  >
                    <span className="font-sans text-sm md:text-base text-gray-900">{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp size={18} className="text-gray-500 shrink-0" />
                    ) : (
                      <ChevronDown size={18} className="text-gray-500 shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="pb-5">
                      <p className="font-sans text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
                </div>
              )
            })}
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}
