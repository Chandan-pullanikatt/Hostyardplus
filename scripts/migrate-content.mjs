#!/usr/bin/env node
/**
 * Non-destructive content migration for HostYard Plus.
 *
 * Safe to run against the LIVE dataset — it never overwrites existing data:
 *   • siteSettings  → patch().setIfMissing(...)   (only fills empty fields)
 *   • policy pages  → createIfNotExists(...)       (skips any already published)
 *
 * It does NOT touch the hero video or anything the client has already edited.
 *
 * Setup (same token as the seed):
 *   .env.local must contain SANITY_WRITE_TOKEN=<editor token>
 * Run:
 *   node scripts/migrate-content.mjs
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnv() {
  const envPath = join(__dirname, '..', '.env.local')
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx === -1) continue
    const key = trimmed.slice(0, eqIdx).trim()
    const value = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (!process.env[key]) process.env[key] = value
  }
}
loadEnv()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rau319d3'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!token || token === 'your_write_token_here') {
  console.error('❌  SANITY_WRITE_TOKEN not configured in .env.local')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', token, useCdn: false })

/* ─── Portable-text helpers ──────────────────────────────────────────────── */
const heading = (key, text) => ({ _type: 'block', _key: `h-${key}`, style: 'h2', markDefs: [], children: [{ _type: 'span', _key: `hs-${key}`, text, marks: [] }] })
const para = (key, text) => ({ _type: 'block', _key: `p-${key}`, style: 'normal', markDefs: [], children: [{ _type: 'span', _key: `ps-${key}`, text, marks: [] }] })

/* ─── Policy bodies (mirrors each page's in-code FALLBACK_BODY) ───────────── */
const privacyBody = [
  heading('1', '1. Information We Collect'),
  para('1', 'We collect personal information you provide when making a booking or contacting us — including your name, phone number, email address, and stay preferences. We also collect technical data such as your IP address and browsing behaviour on our website.'),
  heading('2', '2. How We Use Your Information'),
  para('2', 'Your information is used to process bookings, send booking confirmations and updates, respond to enquiries, improve our services, and comply with applicable laws. We do not sell or rent your personal data to third parties.'),
  heading('3', '3. Data Sharing'),
  para('3', 'We may share your information with property hosts to facilitate your stay, and with trusted service providers (payment processors, SMS gateways) who are bound by confidentiality obligations. We will disclose your data to authorities if required by law.'),
  heading('4', '4. Cookies'),
  para('4', 'Our website uses cookies to enhance your browsing experience, analyse traffic, and remember your preferences. You may disable cookies in your browser settings; some features may not function correctly if you do.'),
  heading('5', '5. Data Security'),
  para('5', 'We implement industry-standard security measures to protect your personal data. However, no method of electronic transmission or storage is 100% secure. You share information at your own risk.'),
  heading('6', '6. Your Rights'),
  para('6', 'Under the Information Technology Act, 2000 and applicable Indian data protection regulations, you have the right to access, correct, or request deletion of your personal data. To exercise any of these rights, contact us at the number listed on our Contact page.'),
  heading('7', '7. Changes to this Policy'),
  para('7', 'We may update this Privacy Policy from time to time. The updated version will be published on this page with a revised date. Continued use of our services after any changes constitutes acceptance of the updated policy.'),
]

const guestBody = [
  heading('1', 'Check-In & Check-Out'),
  para('1', 'Standard check-in time is 2:00 PM and check-out is 11:00 AM. Early check-in or late check-out may be arranged subject to availability and may attract an additional charge. Please communicate your arrival time at least 24 hours in advance so we can prepare your space.'),
  heading('2', 'Noise & Quiet Hours'),
  para('2', 'Our properties are designed for rest and reconnection. Quiet hours are observed from 10:00 PM to 7:00 AM. Loud music, disruptive gatherings, or any behaviour that disturbs other guests or neighbours is not permitted at any time.'),
  heading('3', 'No Parties Policy'),
  para('3', 'Parties, events, and large unsanctioned gatherings are strictly prohibited at all Hostyard+ properties. Bookings found to be in violation of this policy will be terminated immediately without refund, and the guest may be held liable for any damage caused.'),
  heading('4', 'Smoking & Substances'),
  para('4', 'Smoking is not permitted inside any Hostyard+ property. Designated outdoor areas may be available — please check with your host. Use of illegal substances is strictly prohibited on all premises.'),
  heading('5', 'Guests & Visitors'),
  para('5', 'Only registered guests are permitted to stay overnight. Visitors are allowed during daytime hours (8:00 AM – 9:00 PM) and must be accompanied by a registered guest at all times. Any additional overnight guests must be declared at the time of booking.'),
  heading('6', 'Property Care & Damages'),
  para('6', 'Guests are expected to treat the property and its contents with care. Any damage caused during the stay will be assessed and the cost recovered from the guest. A security deposit may be collected at check-in and refunded within 5 business days of check-out, subject to inspection.'),
  heading('7', 'ID Verification'),
  para('7', 'All guests are required to present a valid government-issued photo ID (Aadhaar, Passport, or Driving Licence) at check-in. This is mandatory under applicable Indian hospitality regulations.'),
]

const cancellationBody = [
  para('intro', 'We understand plans change. Our cancellation policy is designed to be fair to both guests and our property partners. Please read the following terms carefully before booking.'),
  heading('1', 'Standard Cancellation Windows'),
  para('1', 'Cancellations made 30 or more days before the check-in date will receive a full refund of the booking amount, minus any payment gateway processing fees.'),
  para('2', 'Cancellations made between 15 and 29 days before the check-in date will receive a 50% refund of the total booking amount.'),
  para('3', 'Cancellations made between 7 and 14 days before the check-in date will receive a 25% refund of the total booking amount.'),
  para('4', 'Cancellations made within 7 days of the check-in date are non-refundable.'),
  heading('2', 'No-Show Policy'),
  para('5', 'If a guest fails to check in on the confirmed date without prior notice, the full booking amount will be forfeited. No refund will be issued for any unused nights in the event of a no-show.'),
  heading('3', 'How to Cancel'),
  para('6', 'All cancellation requests must be submitted in writing via WhatsApp or email to the Hostyard+ team using the contact details provided at the time of booking. Cancellations are only considered valid once acknowledged by our team in writing.'),
  heading('4', 'Refund Timeline'),
  para('7', 'Approved refunds will be processed within 7–10 business days to the original payment method. Hostyard+ is not responsible for delays caused by your bank or payment provider.'),
  heading('5', 'Force Majeure'),
  para('8', 'In the event of cancellation due to circumstances beyond reasonable control — including but not limited to natural disasters, government-declared emergencies, or pandemic restrictions — Hostyard+ will offer a full credit note valid for 12 months or a refund at its sole discretion.'),
  heading('6', 'Cancellation by Hostyard+'),
  para('9', 'In the rare event that Hostyard+ must cancel a confirmed booking, you will receive a full refund and we will make best efforts to arrange an alternative stay of equal or higher value.'),
]

const termsBody = [
  para('intro', 'By accessing the Hostyard+ website or making a booking, you agree to be bound by the following Terms and Conditions. Please read them carefully.'),
  heading('1', '1. Bookings'),
  para('1', 'All bookings are subject to availability and confirmation by Hostyard+. A booking is only confirmed once you have received a written confirmation from our team. We reserve the right to decline any booking request at our discretion.'),
  heading('2', '2. Payment'),
  para('2', 'Full payment is required at the time of booking unless otherwise agreed in writing. All prices are in Indian Rupees (INR) and inclusive of applicable taxes. Payment gateway charges, if any, are borne by the guest.'),
  heading('3', '3. Guest Conduct'),
  para('3', 'Guests are required to comply with all property rules and guidelines communicated at the time of booking and at check-in. Hostyard+ reserves the right to terminate a stay without refund if a guest violates property rules, causes damage, or engages in any illegal activity.'),
  heading('4', '4. Liability'),
  para('4', 'Hostyard+ acts as a hospitality management platform. While we take every reasonable precaution to ensure the safety and quality of all listed properties, we are not liable for any personal injury, loss, or damage to personal property occurring during a stay. Guests are advised to obtain travel insurance.'),
  heading('5', '5. Intellectual Property'),
  para('5', 'All content on the Hostyard+ website — including images, text, logos, and branding — is the intellectual property of Hostyard+ Private Limited and may not be reproduced or used without written permission.'),
  heading('6', '6. Dispute Resolution'),
  para('6', 'Any disputes arising from a booking or stay shall first be addressed through direct communication with our team. If unresolved, disputes shall be subject to the jurisdiction of the courts of Kerala, India, and governed by the laws of India.'),
  heading('7', '7. Modifications to Terms'),
  para('7', 'Hostyard+ reserves the right to update these Terms and Conditions at any time. Changes will be published on this page. Continued use of our services after any modifications constitutes your acceptance of the revised terms.'),
  heading('8', '8. Contact'),
  para('8', 'For any questions regarding these Terms and Conditions, please reach out to us via the Contact page or call us at +91 70252 27733.'),
]

const policies = [
  { _id: 'privacyPolicy', _type: 'privacyPolicy', title: 'Privacy Policy', lastUpdated: '2025-01-01', body: privacyBody },
  { _id: 'guestPolicy', _type: 'guestPolicy', title: 'Guest Policy', lastUpdated: '2025-01-01', body: guestBody },
  { _id: 'cancellationPolicy', _type: 'cancellationPolicy', title: 'Cancellation Policy', lastUpdated: '2025-01-01', body: cancellationBody },
  { _id: 'termsConditions', _type: 'termsConditions', title: 'Terms & Conditions', lastUpdated: '2025-01-01', body: termsBody },
]

// Exact values currently rendered on the live site (the in-code fallbacks).
const SITE_DEFAULTS = {
  reviewsBadge: '4.93 / 5 · 2000+ reviews on Google',
  aboutUsHeading: 'About us',
  aboutUsText:
    'Created for travelers seeking calm, comfort, and meaningful experiences, our space blends modern luxury with the beauty of nature. From peaceful mornings and wellness activities to unforgettable sunsets and curated experiences, every detail is thoughtfully designed to help you disconnect from the noise and reconnect with yourself.',
}

async function run() {
  // 1 ─ Fill the empty siteSettings fields with the exact on-site values.
  //     Handles BOTH the published doc and any unpublished draft. A draft with
  //     null About/badge fields would wipe the live values on next Publish, so we
  //     backfill it from the published values. Only fills empty fields — never
  //     clobbers content the client has actually entered.
  console.log('⚙️   Filling empty siteSettings fields…')
  await client.createIfNotExists({ _id: 'siteSettings', _type: 'siteSettings' })
  const published = (await client.getDocument('siteSettings')) ?? {}

  for (const id of ['siteSettings', 'drafts.siteSettings']) {
    const doc = await client.getDocument(id)
    if (!doc) continue // don't create a draft that doesn't exist
    const patch = {}
    for (const [key, value] of Object.entries(SITE_DEFAULTS)) {
      if (!doc[key]) patch[key] = published[key] || value // prefer the live value
    }
    // Default the mute toggle to ON if it was never set (boolean — setIfMissing so
    // a deliberate "false" from the client is never overwritten).
    const needsMuteDefault = doc.heroVideoMuted === undefined || doc.heroVideoMuted === null
    if (Object.keys(patch).length || needsMuteDefault) {
      let tx = client.patch(id).set(patch)
      if (needsMuteDefault) tx = tx.setIfMissing({ heroVideoMuted: true })
      await tx.commit()
      const filled = [...Object.keys(patch), ...(needsMuteDefault ? ['heroVideoMuted'] : [])]
      console.log(`   ✓ ${id} — filled: ${filled.join(', ')}`)
    } else {
      console.log(`   ✓ ${id} — already populated`)
    }
  }
  console.log('')

  // 2 ─ Create policy documents only if they don't already exist
  console.log('📄  Seeding policy pages (createIfNotExists)…')
  for (const doc of policies) {
    await client.createIfNotExists(doc)
    console.log(`   ✓ ${doc.title}`)
  }
  console.log('\n✅  Migration complete.')
}

run().catch((err) => {
  console.error('❌  Migration failed:', err.message)
  process.exit(1)
})
