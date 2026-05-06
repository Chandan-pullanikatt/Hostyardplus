import Image from "next/image"
import { Star } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import type { Review } from "@/lib/types"

export default function ReviewCard({ review }: { review: Review }) {
  const avatarUrl = review.reviewerAvatar?.asset?._ref
    ? urlFor(review.reviewerAvatar).width(80).height(80).url()
    : null

  return (
    <div className="bg-white rounded-2xl p-5 w-72 shrink-0 flex flex-col gap-3">
      <div className="flex items-center gap-1">
        <Star size={14} className="fill-sun-400 text-sun-400" />
        <span className="font-sans text-sm text-gray-700">{review.rating.toFixed(1)}/5</span>
      </div>
      <p className="font-sans text-sm text-gray-700 leading-relaxed line-clamp-3">{review.text}</p>
      <div className="flex items-center gap-3 mt-auto pt-2">
        <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200 shrink-0">
          {avatarUrl && (
            <Image src={avatarUrl} alt={review.reviewerName} width={32} height={32} className="object-cover" />
          )}
        </div>
        <div>
          <p className="font-sans text-sm text-gray-900">{review.reviewerName}</p>
          <p className="font-sans text-xs text-gray-400">{review.timeAgo}</p>
        </div>
      </div>
    </div>
  )
}
