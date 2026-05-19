"use client"

import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import AnimateIn from "@/components/ui/AnimateIn"
import type { FAQ as FAQType } from "@/lib/types"

interface FAQProps {
  faqs: FAQType[]
}

export default function FAQ({ faqs }: FAQProps) {
  const [open, setOpen] = useState<string | null>(faqs[0]?._id ?? null)

  return (
    <section className="bg-[#f8f6f1] py-20 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">
          {/* Left: heading */}
          <AnimateIn>
            <div className="flex flex-col gap-3">
              <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-tight">
                Frequently Asked Questions
              </h2>
              <p className="font-sans text-sm text-gray-500">Quick answers to common questions about your stay</p>
            </div>
          </AnimateIn>

          {/* Right: accordion */}
          <AnimateIn delay={150} className="flex flex-col divide-y divide-gray-200">
            {faqs.map((faq) => {
              const isOpen = open === faq._id
              return (
                <div key={faq._id}>
                  <button
                    onClick={() => setOpen(isOpen ? null : faq._id)}
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
