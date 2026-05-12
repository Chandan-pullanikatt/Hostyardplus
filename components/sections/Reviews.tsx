import ReviewCard from "@/components/ui/ReviewCard"
import SectionHeader from "@/components/ui/SectionHeader"
import AnimateIn from "@/components/ui/AnimateIn"
import type { Review } from "@/lib/types"

interface ReviewsProps {
  reviews: Review[]
}

export default function Reviews({ reviews }: ReviewsProps) {
  // Row 2 starts at the midpoint for visual variety between rows
  const pivot = Math.floor(reviews.length / 2)
  const row2 = [...reviews.slice(pivot), ...reviews.slice(0, pivot)]

  // 4× repetition: animation moves -50% so this covers viewports up to ~3000px
  const tile = (arr: Review[]) => [...arr, ...arr, ...arr, ...arr]

  return (
    <section className="bg-[#f8f6f1] py-20 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <AnimateIn className="mb-14">
          <SectionHeader
            heading="What Our Guests Say"
            subheading="Real experiences from travelers across our stays"
          />
        </AnimateIn>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="mb-4 overflow-hidden">
        <div className="flex gap-4 animate-scroll-left">
          {tile(reviews).map((review, i) => (
            <ReviewCard key={`r1-${review._id}-${i}`} review={review} />
          ))}
        </div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="overflow-hidden">
        <div className="flex gap-4 animate-scroll-right">
          {tile(row2).map((review, i) => (
            <ReviewCard key={`r2-${review._id}-${i}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
