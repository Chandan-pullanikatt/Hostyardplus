interface SectionHeaderProps {
  label?: string
  heading: string
  subheading?: string
  className?: string
}

export default function SectionHeader({ label, heading, subheading, className = "" }: SectionHeaderProps) {
  return (
    <div className={`flex flex-col items-center text-center gap-3 ${className}`}>
      {label && (
        <div className="flex items-center gap-3">
          <span className="h-px w-12 bg-gray-400" />
          <span className="font-sans text-sm text-gray-500">{label}</span>
          <span className="h-px w-12 bg-gray-400" />
        </div>
      )}
      <h2 className="font-serif text-4xl md:text-5xl text-gray-900 leading-tight">{heading}</h2>
      {subheading && <p className="font-sans text-sm text-gray-500 max-w-sm">{subheading}</p>}
    </div>
  )
}
