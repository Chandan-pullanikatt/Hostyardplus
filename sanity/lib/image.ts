import { createImageUrlBuilder } from "@sanity/image-url"
import { client } from "./client"
import type { SanityImage } from "@/lib/types"

const builder = createImageUrlBuilder(client)

export function urlFor(source: SanityImage) {
  return builder.image(source)
}
