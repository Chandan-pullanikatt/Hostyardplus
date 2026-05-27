"use client"

import { useBookingModal } from "./BookingModalProvider"

interface BookNowButtonProps {
  className?: string
  children?: React.ReactNode
  /** Called in addition to opening the modal (e.g. close a nav menu). */
  onBeforeOpen?: () => void
}

export default function BookNowButton({ className, children, onBeforeOpen }: BookNowButtonProps) {
  const { open } = useBookingModal()

  return (
    <button
      type="button"
      onClick={() => {
        onBeforeOpen?.()
        open()
      }}
      className={className}
    >
      {children ?? "Book Now"}
    </button>
  )
}
