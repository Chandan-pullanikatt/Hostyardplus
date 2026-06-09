import type { Metadata } from "next"
import { Instrument_Serif, Inclusive_Sans } from "next/font/google"
import MotionProvider from "@/components/ui/MotionProvider"
import BookingModalProvider from "@/components/ui/BookingModalProvider"
import CustomCursor from "@/components/ui/CustomCursor"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const instrumentSerif = Instrument_Serif({
  weight: ["400"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-serif",
})

const inclusiveSans = Inclusive_Sans({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Hostyard Plus — Your Perfect Escape in the Mountains",
  description:
    "Find calm in a modern hideaway with stunning views. Book resorts, hostels, and dorms across Kerala with Hostyard Plus.",
  keywords: ["hostyard", "kerala stays", "mountain retreat", "suryanelli", "hostel booking"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${inclusiveSans.variable}`}>
      <body className="antialiased">
        <CustomCursor />
        <MotionProvider>
          <BookingModalProvider>
            {children}
          </BookingModalProvider>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}
