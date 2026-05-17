import Link from "next/link"
import Image from "next/image"
import AnimateIn from "@/components/ui/AnimateIn"

const quickLinks = [
  { label: "About",    href: "/about" },
  { label: "Partner",  href: "/partner" },
  { label: "Contact",  href: "/contact" },
  { label: "Book Now", href: "/#book" },
]

const policies = [
  { label: "Privacy Policy",       href: "/privacy-policy" },
  { label: "Guest Policies",       href: "/guest-policies" },
  { label: "Cancellation Policies", href: "/cancellation-policies" },
  { label: "Terms & Conditions",   href: "/terms" },
]

const socials = [
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "X (Twitter)",
    href: "#",
    icon: (
      <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-12">
        <AnimateIn className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-2">
            <Image src="/logobeige.svg" alt="Hostyard+" width={140} height={40} />
            <p className="text-white/60 text-sm font-sans">Calm | Nature | Adventure</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white text-sm font-sans font-normal mb-4">Quick Links</h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-white text-sm font-sans transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="text-white text-sm font-sans font-normal mb-4">Policies</h4>
            <ul className="flex flex-col gap-3">
              {policies.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/70 hover:text-white text-sm font-sans transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-white text-sm font-sans font-normal mb-4">Contact Us</h4>
            <a
              href="tel:+917025227733"
              className="text-white/70 hover:text-white text-sm font-sans transition-colors"
            >
              Mob: 91 70252 27733
            </a>
          </div>

          {/* Socials */}
          <div>
            <h4 className="text-white text-sm font-sans font-normal mb-4">Socials</h4>
            <div className="flex items-center gap-3">
              {socials.map(({ icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-colors"
                >
                  {icon}
                </Link>
              ))}
            </div>
          </div>

        </AnimateIn>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-4 text-center">
          <p className="text-white/50 text-xs font-sans tracking-widest uppercase">
            © 2025 BY HOSTYARDPLUS PRIVATE LIMITED.
          </p>
        </div>
      </div>
    </footer>
  )
}
