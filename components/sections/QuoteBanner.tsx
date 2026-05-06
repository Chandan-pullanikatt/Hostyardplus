import AnimateIn from "@/components/ui/AnimateIn"

interface QuoteBannerProps {
  text: string
}

export default function QuoteBanner({ text }: QuoteBannerProps) {
  return (
    <section className="bg-cream relative overflow-hidden py-16 px-6 lg:px-12">
      {/* Subtle wave pattern background */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 30 Q15 0 30 30 Q45 60 60 30' stroke='%23a77459' stroke-width='1' fill='none'/%3E%3C/svg%3E")`,
          backgroundSize: "60px 60px",
        }}
      />
      <div className="relative max-w-[1000px] mx-auto text-center">
        <AnimateIn scale>
          <blockquote className="font-serif italic text-2xl md:text-3xl lg:text-4xl text-gray-800 leading-relaxed">
            &ldquo;{text}&rdquo;
          </blockquote>
        </AnimateIn>
      </div>
    </section>
  )
}
