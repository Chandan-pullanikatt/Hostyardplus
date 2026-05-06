import { createClient } from "next-sanity"

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset   = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production"
const token     = process.env.SANITY_API_READ_TOKEN

export const client = createClient({
  projectId: projectId ?? "placeholder",
  dataset,
  apiVersion: "2024-01-01",
  token: token && token !== "your_read_token_here" ? token : undefined,
  useCdn: !token,
})

export async function sanityFetch<T>(query: string, params?: Record<string, unknown>): Promise<T> {
  if (!projectId) return [] as unknown as T
  return client.fetch<T>(query, params ?? {})
}
