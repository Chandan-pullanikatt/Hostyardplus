interface SectionHeaderProps {
  label: string
  heading: string
  subheading?: string
  className?: string
}

export default function SectionHeader({ label, heading, subheading, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
      <div className="flex items-center gap-3">
        <span className="h-px w-12 bg-gray-400" />
        <span className="font-sans text-sm text-gray-500">{label}</span>
        <span className="h-px w-12 bg-gray-400" />
      </div>
      <h2 className="font-serif italic text-4xl md:text-5xl text-gray-900 leading-tight">{heading}</h2>
      {subheading && <p className="font-sans text-sm text-gray-500 max-w-sm">{subheading}</p>}
      {/* Decorative squiggle */}
      <svg width="40" height="12" viewBox="0 0 40 12" fill="none" className="text-gray-400">
        <path d="M2 10 Q10 2 20 6 Q30 10 38 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      </svg>
    </div>
  )
}
