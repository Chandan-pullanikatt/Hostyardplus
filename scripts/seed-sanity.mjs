#!/usr/bin/env node
/**
 * Seed Sanity CMS with demo content for HostYard Plus.
 *
 * Setup:
 *   1. Go to sanity.io/manage → select project rau319d3 → API → Tokens
 *   2. Create an "Editor" token and add to .env.local:
 *        SANITY_WRITE_TOKEN=your_token_here
 *   3. Run: npm run seed
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ─── Load .env.local ──────────────────────────────────────────────────────────
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
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET    || 'production'
const token     = process.env.SANITY_WRITE_TOKEN

if (!token || token === 'your_write_token_here') {
  console.error('❌  SANITY_WRITE_TOKEN not configured.')
  console.error('   sanity.io/manage → project rau319d3 → API → Tokens → Add Editor token')
  console.error('   Then add it to .env.local as SANITY_WRITE_TOKEN=<token>')
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// ─── Image helpers ────────────────────────────────────────────────────────────
async function uploadImage(url, label) {
  process.stdout.write(`   ↑ ${label} … `)
  const res = await fetch(url, { redirect: 'follow' })
  if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())
  const contentType = res.headers.get('content-type') ?? 'image/jpeg'
  const asset = await client.assets.upload('image', buffer, {
    filename: `${label.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    contentType,
  })
  console.log('done')
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } }
}

// Picsum Photos — reliable, beautiful, seeded by string
const pic = (seed, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`

// ─── Main seed ────────────────────────────────────────────────────────────────
async function seed() {
  console.log('🌱  Seeding Sanity for HostYard Plus…\n')

  // 1 ─ Upload all images
  console.log('📸  Uploading images to Sanity…')
  const [
    imgSuryanelli,
    imgKozhikode,
    imgThrissur,
    imgAlappuzha,
    imgWhyStay,
    imgWhyLocal,
    imgWhyCare,
    imgCommunity,
    avatarRahul,
    avatarPriya,
    avatarArjun,
    avatarSneha,
    avatarVikram,
  ] = await Promise.all([
    uploadImage(pic(200,  800, 600), 'suryanelli-property'),
    uploadImage(pic(15,   800, 600), 'kozhikode-property'),
    uploadImage(pic(42,   800, 600), 'thrissur-property'),
    uploadImage(pic(1015, 800, 600), 'alappuzha-property'),
    uploadImage(pic(338, 1200, 800), 'why-curated-stays'),
    uploadImage(pic(430, 1200, 800), 'why-local-experiences'),
    uploadImage(pic(453, 1200, 800), 'why-personalized-care'),
    uploadImage(pic(37,  1600, 900), 'community-banner'),
    uploadImage(pic('rahul',  200, 200), 'avatar-rahul'),
    uploadImage(pic('priya',  200, 200), 'avatar-priya'),
    uploadImage(pic('arjun',  200, 200), 'avatar-arjun'),
    uploadImage(pic('sneha',  200, 200), 'avatar-sneha'),
    uploadImage(pic('vikram', 200, 200), 'avatar-vikram'),
  ])
  console.log('✓  All images uploaded\n')

  // 2 ─ Site Settings (singleton)
  console.log('⚙️   Site settings…')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    heroVideoUrl: '',
    heroRating: '4.93 / 5',
    heroRatingCount: '2,000+',
    heroHeading: 'Your Perfect Escape in the Mountains',
    heroHeadingItalic: 'Escape',
    heroSubheading:
      'Find calm in a modern hideaway with stunning views in the heart of Suryanelli',
    quoteBannerText:
      "We thoughtfully curate every stay, design every touchpoint with care, and move with a clear focus on experience. The difference? We're building memories with you — not just facilitating stays.",
    communityBannerImage: imgCommunity,
    communityBannerHeading: 'Comfort Meets Community',
    communityBannerSubheading:
      'Designed for travelers who value both comfort and community. Enjoy modern amenities, cozy common spaces, and opportunities to meet fellow explorers from around the world.',
  })
  console.log('✓  Site settings saved\n')

  // 3 ─ Properties
  console.log('🏡  Properties…')
  await Promise.all([
    client.createOrReplace({
      _id: 'property-suryanelli',
      _type: 'property',
      title: 'Suryanelli Hilltop Retreat',
      slug: { _type: 'slug', current: 'suryanelli' },
      location: 'Suryanelli',
      description:
        'Suryanelli is a scenic, high-altitude village in the Idukki district of Kerala, surrounded by lush forests and misty mountains. Our hilltop retreat offers breathtaking valley views, cool mountain air, and direct access to trekking trails.',
      pricePerNight: 1299,
      status: 'active',
      image: { ...imgSuryanelli, alt: 'Suryanelli hilltop retreat at dusk' },
      // Room types — values match the Zoho form's "Room Type" dropdown so the hero prefills.
      stayTypes: ['4 Bed Mixed', '6 Bed Mixed', 'Private Room'],
      order: 1,
    }),
    client.createOrReplace({
      _id: 'property-kozhikode',
      _type: 'property',
      title: 'Kozhikode Heritage Stay',
      slug: { _type: 'slug', current: 'kozhikode' },
      location: 'Kozhikode',
      description:
        "Cozy room in Kozhikode with modern amenities, peaceful ambiance, and easy access to beaches, food spots, and city attractions. Experience the rich heritage of Calicut — Kerala's most vibrant city.",
      pricePerNight: 1299,
      status: 'active',
      image: { ...imgKozhikode, alt: 'Kozhikode heritage stay' },
      stayTypes: ['6 Bed Female', '10 Bed Mixed', '12 Bed Mixed', 'Private Room'],
      order: 2,
    }),
    client.createOrReplace({
      _id: 'property-thrissur',
      _type: 'property',
      title: 'Thrissur Cultural Hub',
      slug: { _type: 'slug', current: 'thrissur' },
      location: 'Thrissur',
      description:
        "Comfortable room in Thrissur offering a central location, modern amenities, and easy access to temples, cultural spots, and local dining. Situated in the heart of Kerala's cultural capital.",
      pricePerNight: 999,
      status: 'work-in-progress',
      image: { ...imgThrissur, alt: 'Thrissur stay' },
      stayTypes: ['4 Bed Mixed', 'Private Room'],
      order: 3,
    }),
    client.createOrReplace({
      _id: 'property-alappuzha',
      _type: 'property',
      title: 'Alappuzha Houseboat Stay',
      slug: { _type: 'slug', current: 'alappuzha' },
      location: 'Alappuzha',
      description:
        "Relax on an Alappuzha houseboat with scenic backwaters, traditional meals, private rooms, and a peaceful cruise through Kerala's iconic waterways. Wake up to the sound of water and gentle morning light.",
      pricePerNight: 2999,
      status: 'coming-soon',
      image: { ...imgAlappuzha, alt: 'Alappuzha houseboat backwaters' },
      stayTypes: ['Private Room'],
      order: 4,
    }),
  ])
  console.log('✓  4 properties saved\n')

  // 4 ─ Stats
  console.log('📊  Stats…')
  await Promise.all([
    { _id: 'stat-travelers',    value: '10,000+', label: 'Happy Travelers',   description: "Guests who've stayed with us",  iconKey: 'traveler',    order: 1 },
    { _id: 'stat-destinations', value: '4',       label: 'Destinations',      description: "Across God's Own Country",      iconKey: 'destination', order: 2 },
    { _id: 'stat-rating',       value: '4.93',    label: 'Google Rating',     description: 'Based on 2,000+ reviews',       iconKey: 'community',   order: 3 },
    { _id: 'stat-years',        value: '2+',      label: 'Years of Hosting',  description: 'Trusted since 2022',            iconKey: 'bed',         order: 4 },
  ].map((s) => client.createOrReplace({ ...s, _type: 'stat' })))
  console.log('✓  4 stats saved\n')

  // 5 ─ Activities ticker
  console.log('🎯  Activities…')
  await Promise.all(
    [
      'Trekking Trails',
      'Backwater Cruises',
      'Beach Walks',
      'Elephant Encounters',
      'Tea Estate Tours',
      'Ayurvedic Spa',
      'Sunrise Yoga',
      'Kerala Cooking Classes',
      'Waterfall Hikes',
      'Cultural Performances',
    ].map((label, i) =>
      client.createOrReplace({ _id: `activity-${i + 1}`, _type: 'activity', label, order: i + 1 })
    )
  )
  console.log('✓  10 activities saved\n')

  // 6 ─ Reviews
  console.log('⭐  Reviews…')
  await Promise.all([
    {
      _id: 'review-1',
      reviewerName: 'Rahul Menon',
      rating: 5,
      text: 'Absolutely breathtaking! The Suryanelli property is a hidden gem. Woke up to mist-covered valleys every morning. The host was incredibly warm and the food was delicious. Already planning my next trip.',
      reviewerAvatar: avatarRahul,
      timeAgo: '2 days ago',
      source: 'Google',
      order: 1,
    },
    {
      _id: 'review-2',
      reviewerName: 'Priya Krishnan',
      rating: 5,
      text: "The Kozhikode stay was perfect. Clean, comfortable, and the location was ideal for exploring the city's incredible food scene. The host gave us the best local recommendations. Highly recommend!",
      reviewerAvatar: avatarPriya,
      timeAgo: '1 week ago',
      source: 'Google',
      order: 2,
    },
    {
      _id: 'review-3',
      reviewerName: 'Arjun Nair',
      rating: 4,
      text: 'Great experience overall. The property was exactly as described — peaceful, well-maintained, and with stunning views. The common areas were wonderful for meeting fellow travelers.',
      reviewerAvatar: avatarArjun,
      timeAgo: '2 weeks ago',
      source: 'Google',
      order: 3,
    },
    {
      _id: 'review-4',
      reviewerName: 'Sneha Thomas',
      rating: 5,
      text: 'HostYard Plus has redefined what hospitality means to me. Everything from check-in to check-out was seamless. The attention to detail and the personal touches made all the difference.',
      reviewerAvatar: avatarSneha,
      timeAgo: '1 month ago',
      source: 'Google',
      order: 4,
    },
    {
      _id: 'review-5',
      reviewerName: 'Vikram Pillai',
      rating: 5,
      text: "I've stayed at many guest houses across Kerala, but HostYard Plus stands out for its quality and community feel. Met incredible people, had amazing conversations over breakfast. This is travel done right.",
      reviewerAvatar: avatarVikram,
      timeAgo: '1 month ago',
      source: 'Google',
      order: 5,
    },
  ].map((r) => client.createOrReplace({ ...r, _type: 'review' })))
  console.log('✓  5 reviews saved\n')

  // 7 ─ FAQs
  console.log('❓  FAQs…')
  await Promise.all([
    {
      _id: 'faq-1',
      question: 'How do I book a stay?',
      answer:
        "Browse our available properties, select your preferred dates, and complete the reservation through our secure booking platform. You'll receive an instant confirmation with all check-in details.",
      order: 1,
    },
    {
      _id: 'faq-2',
      question: 'What is included in the room price?',
      answer:
        'All properties include complimentary breakfast, Wi-Fi, clean linens, and access to common areas. Some properties offer guided local tours or airport transfers — check the individual property listing for full details.',
      order: 2,
    },
    {
      _id: 'faq-3',
      question: 'Are your properties safe for solo travelers?',
      answer:
        'Absolutely. Safety is our top priority. All properties have 24/7 support, secure entry, lockers for valuables, and a community of like-minded travelers. Our hosts are carefully vetted and trained in hospitality.',
      order: 3,
    },
    {
      _id: 'faq-4',
      question: 'What is your cancellation policy?',
      answer:
        'We offer flexible cancellation — free cancellation up to 48 hours before check-in. Cancellations within 48 hours are subject to a one-night charge. Please refer to your booking confirmation for property-specific policies.',
      order: 4,
    },
    {
      _id: 'faq-5',
      question: 'Can I request early check-in or late check-out?',
      answer:
        "Early check-in and late check-out are subject to availability. Reach out to the property directly after booking and we'll do our best to accommodate your request at no extra charge.",
      order: 5,
    },
    {
      _id: 'faq-6',
      question: 'Do you accommodate families with children?',
      answer:
        'Yes! We welcome families. Please mention your group composition while booking so we can arrange the most suitable room configuration for you.',
      order: 6,
    },
  ].map((f) => client.createOrReplace({ ...f, _type: 'faq' })))
  console.log('✓  6 FAQs saved\n')

  // 8 ─ Why Choose Us
  console.log('✨  Why Choose Us tabs…')
  await Promise.all([
    {
      _id: 'why-1',
      tabLabel: 'Curated Stays',
      image: { ...imgWhyStay, alt: 'Curated property interior' },
      title: 'Every Stay, Thoughtfully Chosen',
      description:
        "We don't list just any property. Every HostYard Plus location goes through a rigorous selection process — ensuring the right blend of comfort, character, and location. From hilltop retreats to backwater escapes, each stay is unique and personally verified.",
      order: 1,
    },
    {
      _id: 'why-2',
      tabLabel: 'Local Experiences',
      image: { ...imgWhyLocal, alt: 'Kerala local experiences' },
      title: 'Go Beyond the Tourist Trail',
      description:
        'Our hosts are Kerala locals who genuinely love sharing their home state. From secret waterfalls and authentic sadya meals to dawn cruises through misty backwaters — we connect you with experiences most travelers never discover.',
      order: 2,
    },
    {
      _id: 'why-3',
      tabLabel: 'Personalized Care',
      image: { ...imgWhyCare, alt: 'Personalized guest care' },
      title: "We Remember You're a Person, Not a Booking",
      description:
        "Every guest gets a dedicated host, pre-arrival support, and post-stay follow-up. Whether you need a last-minute travel recommendation or help arranging an ayurvedic session, we're here — not a chatbot, but a real person who cares.",
      order: 3,
    },
  ].map((w) => client.createOrReplace({ ...w, _type: 'whyChooseUs' })))
  console.log('✓  3 Why Choose Us tabs saved\n')

  // 9 ─ Story Media (portrait images as demo — replace with Cloudinary videos later)
  console.log('🎬  Story media…')
  await Promise.all(
    [373, 219, 534, 671, 249].map((seed, i) =>
      client.createOrReplace({
        _id: `story-${i + 1}`,
        _type: 'storyMedia',
        mediaType: 'image',
        cloudinaryUrl: pic(seed, 400, 700),
        order: i + 1,
      })
    )
  )
  console.log('✓  5 stories saved\n')

  console.log('🎉  Done! Restart your dev server to see the content.')
  console.log('   Replace placeholder images with real photos via sanity.io/manage or /studio.')
}

seed().catch((err) => {
  console.error('\n❌  Seed failed:', err.message)
  process.exit(1)
})
