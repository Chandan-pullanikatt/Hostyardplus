/**
 * Uploads the local /public/photos room images to Sanity and
 * patches the Suryanelli property document with photoTourSections.
 *
 * Run once:  node scripts/seed-photo-tour.mjs
 */

import { createClient } from "@sanity/client"
import { createReadStream } from "fs"
import { resolve, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, "..")

const client = createClient({
  projectId: "rau319d3",
  dataset: "production",
  apiVersion: "2024-01-01",
  token:
    "sk77fjCMtqSTQDLmJWYVOJvDXc1j1KAibn6bKefiLsTgCdp7pvCc7ugEfXouJQIeunNkYRTymWWtFpXPJ1DPI56RoiJ3mHsyHfIGc6EdzevJgSuTdODK2ER6NMu6sLb3iBWwpMituePNxthLCEfWgNl5XWYXTIoXNMuIIcHDYaL3Qu1BeY0D",
  useCdn: false,
})

// ── Sections definition ────────────────────────────────────────────────────────
const SECTIONS = [
  {
    categoryName: "Living Room",
    description: "Books · Sound system · Board games",
    files: ["livingroom.JPEG"],
  },
  {
    categoryName: "Bedroom",
    description: "King-size bed · AC · Wardrobe",
    files: ["bedroom.JPEG"],
  },
  {
    categoryName: "Bathroom",
    description: "Hot water · Rain shower · Toiletries provided",
    files: ["bathroom1.JPEG", "bathroom2.JPEG", "bathroom3.JPEG"],
  },
  {
    categoryName: "Dorm",
    description: "Bunk beds · Shared lounge · Lockers",
    files: ["dorm1.JPEG", "dorm2.JPEG", "dorm3.JPEG"],
  },
]

// ── Upload a single file, return a Sanity image reference ─────────────────────
async function uploadImage(filename) {
  const filePath = resolve(ROOT, "public", "photos", filename)
  console.log(`  Uploading ${filename} …`)
  const asset = await client.assets.upload("image", createReadStream(filePath), {
    filename,
  })
  return {
    _type: "image",
    asset: { _type: "reference", _ref: asset._id },
    alt: filename.replace(/\.[^.]+$/, "").replace(/\d+$/, "").replace(/([a-z])([A-Z])/g, "$1 $2"),
  }
}

// ── Main ───────────────────────────────────────────────────────────────────────
async function main() {
  // 1. Find the Suryanelli property document
  const property = await client.fetch(
    `*[_type == "property" && slug.current == "suryanelli"][0]{ _id, title }`,
  )
  if (!property) {
    console.error("❌  Could not find a property with slug 'suryanelli'.")
    process.exit(1)
  }
  console.log(`✅  Found property: "${property.title}" (${property._id})\n`)

  // 2. Build photoTourSections by uploading each file
  const photoTourSections = []
  for (const section of SECTIONS) {
    console.log(`📂  Section: ${section.categoryName}`)
    const images = []
    for (const file of section.files) {
      const img = await uploadImage(file)
      images.push(img)
    }
    photoTourSections.push({
      _type: "object",
      _key: section.categoryName.toLowerCase().replace(/\s+/g, "-"),
      categoryName: section.categoryName,
      description: section.description,
      images,
    })
    console.log(`   ✓ ${images.length} image(s) uploaded\n`)
  }

  // 3. Patch the property document
  console.log("🔄  Patching Sanity document …")
  await client
    .patch(property._id)
    .set({ photoTourSections })
    .commit()

  console.log("🎉  Done! photoTourSections saved to Sanity.")
  console.log(`    Visit /properties/suryanelli/photos to preview the tour page.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
