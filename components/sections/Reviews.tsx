import ReviewMarquee from "@/components/ui/ReviewMarquee"
import SectionHeader from "@/components/ui/SectionHeader"
import AnimateIn from "@/components/ui/AnimateIn"
import type { Review } from "@/lib/types"
import { Star } from "lucide-react"

interface ReviewsProps {
  reviews: Review[]
  badge?: string
}

export default function Reviews({ reviews, badge }: ReviewsProps) {
  // Row 2 starts at the midpoint for visual variety between rows
  const pivot = Math.floor(reviews.length / 2)
  const row2 = [...reviews.slice(pivot), ...reviews.slice(0, pivot)]

  // 4× repetition: animation moves -50% so this covers viewports up to ~3000px
  const tile = (arr: Review[]) => [...arr, ...arr, ...arr, ...arr]

  return (
    <section className="bg-[#f8f6f1] py-14 md:py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <AnimateIn className="mb-8">
          <SectionHeader
            heading="What Our Guests Say"
            subheading="Real experiences from travelers across our stays"
          />
        </AnimateIn>

        {badge && (
          <AnimateIn className="mb-10 flex justify-center">
            <div className="inline-flex items-center gap-2 bg-white border border-gray-200 text-gray-700 text-sm font-sans px-4 py-2 rounded-full shadow-sm">
              <Star size={14} className="fill-sun-400 text-sun-400" />
              <span>{badge}</span>
            </div>
          </AnimateIn>
        )}
      </div>

      {/* Row 1 — auto-scrolls left, also drag/swipe-able */}
      <div className="mb-4">
        <ReviewMarquee reviews={tile(reviews)} direction="left" />
      </div>

      {/* Row 2 — auto-scrolls right, also drag/swipe-able */}
      <ReviewMarquee reviews={tile(row2)} direction="right" />
    </section>
  )
}
