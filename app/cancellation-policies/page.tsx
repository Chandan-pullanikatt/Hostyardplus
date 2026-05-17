import { sanityFetch } from "@/sanity/lib/client"
import { cancellationPolicyQuery } from "@/sanity/lib/queries"
import type { PolicyPage } from "@/lib/types"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnimateIn from "@/components/ui/AnimateIn"
import PolicyBody from "@/components/ui/PolicyBody"

const FALLBACK_BODY = [
  { _type: "block", _key: "intro", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s0", text: "We understand plans change. Our cancellation policy is designed to be fair to both guests and our property partners. Please read the following terms carefully before booking.", marks: [] }] },
  { _type: "block", _key: "h1", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s1", text: "Standard Cancellation Windows", marks: [] }] },
  { _type: "block", _key: "p1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "Cancellations made 30 or more days before the check-in date will receive a full refund of the booking amount, minus any payment gateway processing fees.", marks: [] }] },
  { _type: "block", _key: "p2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s3", text: "Cancellations made between 15 and 29 days before the check-in date will receive a 50% refund of the total booking amount.", marks: [] }] },
  { _type: "block", _key: "p3", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s4", text: "Cancellations made between 7 and 14 days before the check-in date will receive a 25% refund of the total booking amount.", marks: [] }] },
  { _type: "block", _key: "p4", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s5", text: "Cancellations made within 7 days of the check-in date are non-refundable.", marks: [] }] },
  { _type: "block", _key: "h2", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s6", text: "No-Show Policy", marks: [] }] },
  { _type: "block", _key: "p5", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s7", text: "If a guest fails to check in on the confirmed date without prior notice, the full booking amount will be forfeited. No refund will be issued for any unused nights in the event of a no-show.", marks: [] }] },
  { _type: "block", _key: "h3", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s8", text: "How to Cancel", marks: [] }] },
  { _type: "block", _key: "p6", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s9", text: "All cancellation requests must be submitted in writing via WhatsApp or email to the Hostyard+ team using the contact details provided at the time of booking. Cancellations are only considered valid once acknowledged by our team in writing.", marks: [] }] },
  { _type: "block", _key: "h4", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s10", text: "Refund Timeline", marks: [] }] },
  { _type: "block", _key: "p7", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s11", text: "Approved refunds will be processed within 7–10 business days to the original payment method. Hostyard+ is not responsible for delays caused by your bank or payment provider.", marks: [] }] },
  { _type: "block", _key: "h5", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s12", text: "Force Majeure", marks: [] }] },
  { _type: "block", _key: "p8", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s13", text: "In the event of cancellation due to circumstances beyond reasonable control — including but not limited to natural disasters, government-declared emergencies, or pandemic restrictions — Hostyard+ will offer a full credit note valid for 12 months or a refund at its sole discretion.", marks: [] }] },
  { _type: "block", _key: "h6", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s14", text: "Cancellation by Hostyard+", marks: [] }] },
  { _type: "block", _key: "p9", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s15", text: "In the rare event that Hostyard+ must cancel a confirmed booking, you will receive a full refund and we will make best efforts to arrange an alternative stay of equal or higher value.", marks: [] }] },
]

async function fetchPage(): Promise<PolicyPage> {
  try {
    const data = await sanityFetch<PolicyPage>(cancellationPolicyQuery)
    if (!data) return { title: "Cancellation Policy", lastUpdated: "2025-01-01", body: FALLBACK_BODY }
    return { ...data, body: data.body?.length ? data.body : FALLBACK_BODY }
  } catch {
    return { title: "Cancellation Policy", lastUpdated: "2025-01-01", body: FALLBACK_BODY }
  }
}

export default async function CancellationPoliciesPage() {
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
