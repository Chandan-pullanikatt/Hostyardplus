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

            // Editable page content (singletons — one document each)
            S.listItem().title("About Us Page").child(
              S.document().schemaType("aboutPage").documentId("aboutPage")
            ),
            S.listItem().title("Partner Page").child(
              S.document().schemaType("partnerPage").documentId("partnerPage")
            ),
            S.listItem().title("Contact Page").child(
              S.document().schemaType("contactPage").documentId("contactPage")
            ),
            S.listItem().title("Policy Pages").child(
              S.list()
                .title("Policy Pages")
                .items([
                  S.listItem().title("Privacy Policy").child(
                    S.document().schemaType("privacyPolicy").documentId("privacyPolicy")
                  ),
                  S.listItem().title("Guest Policy").child(
                    S.document().schemaType("guestPolicy").documentId("guestPolicy")
                  ),
                  S.listItem().title("Cancellation Policy").child(
                    S.document().schemaType("cancellationPolicy").documentId("cancellationPolicy")
                  ),
                  S.listItem().title("Terms & Conditions").child(
                    S.document().schemaType("termsConditions").documentId("termsConditions")
                  ),
                ])
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
