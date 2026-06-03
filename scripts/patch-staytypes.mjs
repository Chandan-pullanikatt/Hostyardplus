#!/usr/bin/env node
/**
 * Non-destructive patch: set distinct demo `stayTypes` on each property in Sanity,
 * so the per-property Stay Type dropdown in the hero is demonstrable AND the client
 * can see/edit the real values in the Studio.
 *
 * Only the `stayTypes` field is touched — no images, no other content is replaced.
 * Run: node scripts/patch-staytypes.mjs
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

const token = process.env.SANITY_WRITE_TOKEN
if (!token || token === 'your_write_token_here') {
  console.error('❌  SANITY_WRITE_TOKEN not set in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'rau319d3',
  dataset:   process.env.NEXT_PUBLIC_SANITY_DATASET    || 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

// Demo room types per location. Values MUST EXACTLY match the Zoho form's "Room Type"
// dropdown options: 4 Bed Mixed, 6 Bed Mixed, 6 Bed Female, 10 Bed Mixed, 12 Bed Mixed, Private Room.
const STAY_TYPES_BY_LOCATION = {
  suryanelli: ['4 Bed Mixed', '6 Bed Mixed', 'Private Room'],
  kozhikode:  ['6 Bed Female', '10 Bed Mixed', '12 Bed Mixed', 'Private Room'],
  thrissur:   ['4 Bed Mixed', 'Private Room'],
  alappuzha:  ['Private Room'],
}

function matchKey(p) {
  const hay = `${p.slug?.current ?? ''} ${p.location ?? ''}`.toLowerCase()
  return Object.keys(STAY_TYPES_BY_LOCATION).find((key) => hay.includes(key))
}

async function run() {
  // Published docs only (skip drafts.* so we update what the site actually serves).
  const props = await client.fetch(
    `*[_type == "property" && !(_id in path("drafts.**"))]{ _id, location, slug, stayTypes }`
  )
  if (!props.length) {
    console.error('No published property documents found.')
    process.exit(1)
  }

  for (const p of props) {
    const key = matchKey(p)
    if (!key) {
      console.log(`–  Skipped "${p.location}" (${p._id}) — no demo mapping`)
      continue
    }
    const stayTypes = STAY_TYPES_BY_LOCATION[key]
    await client.patch(p._id).set({ stayTypes }).commit()
    console.log(`✓  ${p.location}  →  [${stayTypes.join(', ')}]`)
  }
  console.log('\nDone. The values are now editable in Sanity Studio under each Property → Stay Types.')
}

run().catch((err) => {
  console.error('\n❌  Patch failed:', err.message)
  process.exit(1)
})
