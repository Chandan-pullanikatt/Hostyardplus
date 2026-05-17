import { sanityFetch } from "@/sanity/lib/client"
import { guestPolicyQuery } from "@/sanity/lib/queries"
import type { PolicyPage } from "@/lib/types"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnimateIn from "@/components/ui/AnimateIn"
import PolicyBody from "@/components/ui/PolicyBody"

const FALLBACK_BODY = [
  { _type: "block", _key: "h1", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Check-In & Check-Out", marks: [] }] },
  { _type: "block", _key: "p1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "Standard check-in time is 2:00 PM and check-out is 11:00 AM. Early check-in or late check-out may be arranged subject to availability and may attract an additional charge. Please communicate your arrival time at least 24 hours in advance so we can prepare your space.", marks: [] }] },
  { _type: "block", _key: "h2", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s3", text: "Noise & Quiet Hours", marks: [] }] },
  { _type: "block", _key: "p2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s4", text: "Our properties are designed for rest and reconnection. Quiet hours are observed from 10:00 PM to 7:00 AM. Loud music, disruptive gatherings, or any behaviour that disturbs other guests or neighbours is not permitted at any time.", marks: [] }] },
  { _type: "block", _key: "h3", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s5", text: "No Parties Policy", marks: [] }] },
  { _type: "block", _key: "p3", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s6", text: "Parties, events, and large unsanctioned gatherings are strictly prohibited at all Hostyard+ properties. Bookings found to be in violation of this policy will be terminated immediately without refund, and the guest may be held liable for any damage caused.", marks: [] }] },
  { _type: "block", _key: "h4", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s7", text: "Smoking & Substances", marks: [] }] },
  { _type: "block", _key: "p4", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s8", text: "Smoking is not permitted inside any Hostyard+ property. Designated outdoor areas may be available — please check with your host. Use of illegal substances is strictly prohibited on all premises.", marks: [] }] },
  { _type: "block", _key: "h5", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s9", text: "Guests & Visitors", marks: [] }] },
  { _type: "block", _key: "p5", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s10", text: "Only registered guests are permitted to stay overnight. Visitors are allowed during daytime hours (8:00 AM – 9:00 PM) and must be accompanied by a registered guest at all times. Any additional overnight guests must be declared at the time of booking.", marks: [] }] },
  { _type: "block", _key: "h6", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s11", text: "Property Care & Damages", marks: [] }] },
  { _type: "block", _key: "p6", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s12", text: "Guests are expected to treat the property and its contents with care. Any damage caused during the stay will be assessed and the cost recovered from the guest. A security deposit may be collected at check-in and refunded within 5 business days of check-out, subject to inspection.", marks: [] }] },
  { _type: "block", _key: "h7", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s13", text: "ID Verification", marks: [] }] },
  { _type: "block", _key: "p7", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s14", text: "All guests are required to present a valid government-issued photo ID (Aadhaar, Passport, or Driving Licence) at check-in. This is mandatory under applicable Indian hospitality regulations.", marks: [] }] },
]

async function fetchPage(): Promise<PolicyPage> {
  try {
    const data = await sanityFetch<PolicyPage>(guestPolicyQuery)
    if (!data) return { title: "Guest Policy", lastUpdated: "2025-01-01", body: FALLBACK_BODY }
    return { ...data, body: data.body?.length ? data.body : FALLBACK_BODY }
  } catch {
    return { title: "Guest Policy", lastUpdated: "2025-01-01", body: FALLBACK_BODY }
  }
}

export default async function GuestPoliciesPage() {
  const page = await fetchPage()
  const updated = page.lastUpdated ? new Date(page.lastUpdated).toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }) : ""

  return (
    <main>
      <Navbar />
      <section className="bg-primary pt-28 pb-16 px-6 text-center">
        <AnimateIn>
          <h1 className="font-serif text-4xl md:text-5xl text-white">{page.title}</h1>
        </AnimateIn>
        {updated && (
          <AnimateIn delay={100}>
            <p className="font-sans text-white/50 text-sm mt-3">Last updated: {updated}</p>
          </AnimateIn>
        )}
      </section>
      <section className="bg-[#f8f6f1] py-16 px-6 lg:px-12">
        <AnimateIn>
          <div className="max-w-3xl mx-auto">
            <PolicyBody body={page.body!} />
          </div>
        </AnimateIn>
      </section>
      <Footer />
    </main>
  )
}
