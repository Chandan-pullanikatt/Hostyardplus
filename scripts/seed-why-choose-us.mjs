#!/usr/bin/env node
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

function loadEnv() {
  const envPath = join(__dirname, '..', '.env.local')
  if (!existsSync(envPath)) return
  const lines = readFileSync(envPath, 'utf8').split('\n')
  for (const line of lines) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const idx = trimmed.indexOf('=')
    if (idx === -1) continue
    const key = trimmed.slice(0, idx).trim()
    const val = trimmed.slice(idx + 1).trim()
    if (!process.env[key]) process.env[key] = val
  }
}
loadEnv()

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  token: process.env.SANITY_WRITE_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const photosDir = join(__dirname, '..', 'public', 'photos')

async function uploadImage(filename) {
  const filePath = join(photosDir, filename)
  const buffer = readFileSync(filePath)
  const ext = filename.split('.').pop()
  const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : 'image/png'
  console.log(`  Uploading ${filename}...`)
  const asset = await client.assets.upload('image', buffer, {
    filename,
    contentType: mimeType,
  })
  return asset._id
}

const TABS = [
  {
    _id: 'whyChooseUs-handpicked',
    tabLabel: 'Handpicked Experiences',
    title: 'Handpicked Experiences',
    description: 'Every stay is hand-selected by our team for quality, character, and comfort that goes beyond expectations.',
    images: ['h1.jpg', 'h2.jpg', 'h3.jpg'],
    order: 1,
  },
  {
    _id: 'whyChooseUs-scenic',
    tabLabel: 'Scenic Destinations',
    title: 'Scenic Destinations',
    description: "Nestled in Kerala's most breathtaking landscapes — from misty mountains to tranquil backwaters.",
    images: ['suryanellihero.jpg', 'h4.jpg', 'h5.jpg'],
    order: 2,
  },
  {
    _id: 'whyChooseUs-connect',
    tabLabel: 'Connect & Belong',
    title: 'Connect & Belong',
    description: 'Our spaces are designed for connection — meet fellow travelers, share stories, and feel at home anywhere.',
    images: ['community.jpg', 'yoga.jpg', 'board.jpg'],
    order: 3,
  },
  {
    _id: 'whyChooseUs-verified',
    tabLabel: 'Verified Stays',
    title: 'Verified Stays',
    description: 'Every property is personally inspected and verified to meet our standards of safety, hygiene, and quality.',
    images: ['sunsetguide.jpg', 'h4.jpg', 'h5.jpg'],
    order: 4,
  },
]

async function run() {
  // Pre-upload all unique images
  const uniqueFiles = [...new Set(TABS.flatMap((t) => t.images))]
  const assetMap = {}
  console.log('Uploading images...')
  for (const file of uniqueFiles) {
    assetMap[file] = await uploadImage(file)
  }

  console.log('\nCreating/updating Why Choose Us documents...')
  for (const tab of TABS) {
    const doc = {
      _id: tab._id,
      _type: 'whyChooseUs',
      tabLabel: tab.tabLabel,
      title: tab.title,
      description: tab.description,
      order: tab.order,
      images: tab.images.map((file, i) => ({
        _key: `img-${i}`,
        _type: 'image',
        asset: { _type: 'reference', _ref: assetMap[file] },
        alt: `${tab.title} ${i + 1}`,
      })),
    }
    await client.createOrReplace(doc)
    console.log(`  ✓ ${tab.tabLabel}`)
  }

  console.log('\nDone! Why Choose Us section populated.')
}

run().catch((err) => { console.error(err); process.exit(1) })
