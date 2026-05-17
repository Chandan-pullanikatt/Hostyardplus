import { sanityFetch } from "@/sanity/lib/client"
import { termsConditionsQuery } from "@/sanity/lib/queries"
import type { PolicyPage } from "@/lib/types"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnimateIn from "@/components/ui/AnimateIn"
import PolicyBody from "@/components/ui/PolicyBody"

const FALLBACK_BODY = [
  { _type: "block", _key: "intro", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s0", text: "By accessing the Hostyard+ website or making a booking, you agree to be bound by the following Terms and Conditions. Please read them carefully.", marks: [] }] },
  { _type: "block", _key: "h1", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s1", text: "1. Bookings", marks: [] }] },
  { _type: "block", _key: "p1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "All bookings are subject to availability and confirmation by Hostyard+. A booking is only confirmed once you have received a written confirmation from our team. We reserve the right to decline any booking request at our discretion.", marks: [] }] },
  { _type: "block", _key: "h2", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s3", text: "2. Payment", marks: [] }] },
  { _type: "block", _key: "p2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s4", text: "Full payment is required at the time of booking unless otherwise agreed in writing. All prices are in Indian Rupees (INR) and inclusive of applicable taxes. Payment gateway charges, if any, are borne by the guest.", marks: [] }] },
  { _type: "block", _key: "h3", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s5", text: "3. Guest Conduct", marks: [] }] },
  { _type: "block", _key: "p3", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s6", text: "Guests are required to comply with all property rules and guidelines communicated at the time of booking and at check-in. Hostyard+ reserves the right to terminate a stay without refund if a guest violates property rules, causes damage, or engages in any illegal activity.", marks: [] }] },
  { _type: "block", _key: "h4", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s7", text: "4. Liability", marks: [] }] },
  { _type: "block", _key: "p4", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s8", text: "Hostyard+ acts as a hospitality management platform. While we take every reasonable precaution to ensure the safety and quality of all listed properties, we are not liable for any personal injury, loss, or damage to personal property occurring during a stay. Guests are advised to obtain travel insurance.", marks: [] }] },
  { _type: "block", _key: "h5", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s9", text: "5. Intellectual Property", marks: [] }] },
  { _type: "block", _key: "p5", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s10", text: "All content on the Hostyard+ website — including images, text, logos, and branding — is the intellectual property of Hostyard+ Private Limited and may not be reproduced or used without written permission.", marks: [] }] },
  { _type: "block", _key: "h6", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s11", text: "6. Dispute Resolution", marks: [] }] },
  { _type: "block", _key: "p6", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s12", text: "Any disputes arising from a booking or stay shall first be addressed through direct communication with our team. If unresolved, disputes shall be subject to the jurisdiction of the courts of Kerala, India, and governed by the laws of India.", marks: [] }] },
  { _type: "block", _key: "h7", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s13", text: "7. Modifications to Terms", marks: [] }] },
  { _type: "block", _key: "p7", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s14", text: "Hostyard+ reserves the right to update these Terms and Conditions at any time. Changes will be published on this page. Continued use of our services after any modifications constitutes your acceptance of the revised terms.", marks: [] }] },
  { _type: "block", _key: "h8", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s15", text: "8. Contact", marks: [] }] },
  { _type: "block", _key: "p8", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s16", text: "For any questions regarding these Terms and Conditions, please reach out to us via the Contact page or call us at +91 70252 27733.", marks: [] }] },
]

async function fetchPage(): Promise<PolicyPage> {
  try {
    const data = await sanityFetch<PolicyPage>(termsConditionsQuery)
    if (!data) return { title: "Terms & Conditions", lastUpdated: "2025-01-01", body: FALLBACK_BODY }
    return { ...data, body: data.body?.length ? data.body : FALLBACK_BODY }
  } catch {
    return { title: "Terms & Conditions", lastUpdated: "2025-01-01", body: FALLBACK_BODY }
  }
}

export default async function TermsPage() {
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
