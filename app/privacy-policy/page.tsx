import { sanityFetch } from "@/sanity/lib/client"
import { privacyPolicyQuery } from "@/sanity/lib/queries"
import type { PolicyPage } from "@/lib/types"
import Navbar from "@/components/layout/Navbar"
import Footer from "@/components/layout/Footer"
import AnimateIn from "@/components/ui/AnimateIn"
import PolicyBody from "@/components/ui/PolicyBody"

const FALLBACK_BODY = [
  { _type: "block", _key: "h1", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s1", text: "1. Information We Collect", marks: [] }] },
  { _type: "block", _key: "p1", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s2", text: "We collect personal information you provide when making a booking or contacting us — including your name, phone number, email address, and stay preferences. We also collect technical data such as your IP address and browsing behaviour on our website.", marks: [] }] },
  { _type: "block", _key: "h2", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s3", text: "2. How We Use Your Information", marks: [] }] },
  { _type: "block", _key: "p2", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s4", text: "Your information is used to process bookings, send booking confirmations and updates, respond to enquiries, improve our services, and comply with applicable laws. We do not sell or rent your personal data to third parties.", marks: [] }] },
  { _type: "block", _key: "h3", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s5", text: "3. Data Sharing", marks: [] }] },
  { _type: "block", _key: "p3", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s6", text: "We may share your information with property hosts to facilitate your stay, and with trusted service providers (payment processors, SMS gateways) who are bound by confidentiality obligations. We will disclose your data to authorities if required by law.", marks: [] }] },
  { _type: "block", _key: "h4", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s7", text: "4. Cookies", marks: [] }] },
  { _type: "block", _key: "p4", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s8", text: "Our website uses cookies to enhance your browsing experience, analyse traffic, and remember your preferences. You may disable cookies in your browser settings; some features may not function correctly if you do.", marks: [] }] },
  { _type: "block", _key: "h5", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s9", text: "5. Data Security", marks: [] }] },
  { _type: "block", _key: "p5", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s10", text: "We implement industry-standard security measures to protect your personal data. However, no method of electronic transmission or storage is 100% secure. You share information at your own risk.", marks: [] }] },
  { _type: "block", _key: "h6", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s11", text: "6. Your Rights", marks: [] }] },
  { _type: "block", _key: "p6", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s12", text: "Under the Information Technology Act, 2000 and applicable Indian data protection regulations, you have the right to access, correct, or request deletion of your personal data. To exercise any of these rights, contact us at the number listed on our Contact page.", marks: [] }] },
  { _type: "block", _key: "h7", style: "h2", markDefs: [], children: [{ _type: "span", _key: "s13", text: "7. Changes to this Policy", marks: [] }] },
  { _type: "block", _key: "p7", style: "normal", markDefs: [], children: [{ _type: "span", _key: "s14", text: "We may update this Privacy Policy from time to time. The updated version will be published on this page with a revised date. Continued use of our services after any changes constitutes acceptance of the updated policy.", marks: [] }] },
]

async function fetchPage(): Promise<PolicyPage> {
  try {
    const data = await sanityFetch<PolicyPage>(privacyPolicyQuery)
    if (!data) return { title: "Privacy Policy", lastUpdated: "2025-01-01", body: FALLBACK_BODY }
    return { ...data, body: data.body?.length ? data.body : FALLBACK_BODY }
  } catch {
    return { title: "Privacy Policy", lastUpdated: "2025-01-01", body: FALLBACK_BODY }
  }
}

export default async function PrivacyPolicyPage() {
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
