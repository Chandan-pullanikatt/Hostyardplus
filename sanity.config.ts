import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import { visionTool } from "@sanity/vision"
import { cloudinarySchemaPlugin } from "sanity-plugin-cloudinary"
import { schemaTypes } from "@/sanity/schemaTypes"

export default defineConfig({
  name: "hostyard-plus",
  title: "Hostyard Plus CMS",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem().title("Site Settings").child(
              S.document().schemaType("siteSettings").documentId("siteSettings")
            ),
            S.divider(),
            S.documentTypeListItem("property").title("Properties"),
            S.documentTypeListItem("review").title("Reviews"),
            S.documentTypeListItem("faq").title("FAQs"),
            S.documentTypeListItem("stat").title("Stats"),
            S.documentTypeListItem("activity").title("Activities (Ticker)"),
            S.documentTypeListItem("storyMedia").title("Stories / Reels"),
            S.documentTypeListItem("whyChooseUs").title("Why Choose Us Tabs"),
          ]),
    }),
    visionTool(),
    cloudinarySchemaPlugin(),
  ],
  schema: { types: schemaTypes },
  basePath: "/studio",
})
