import { defineField, defineType, defineArrayMember } from "sanity"

export const partnerPage = defineType({
  name: "partnerPage",
  title: "Partner Page",
  type: "document",
  fields: [
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string", initialValue: "Your Property. Our Promise." }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text", rows: 3, initialValue: "Partner with Hostyard+ and let us handle everything — from professional photography to curated guest management — while you earn without the stress." }),
    defineField({ name: "featuresHeading", title: "Features Section Heading", type: "string", initialValue: "What We Bring to the Table" }),
    defineField({
      name: "features",
      title: "Feature Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "iconKey", type: "string", title: "Icon", description: "home | camera | shield", initialValue: "home" }),
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "description", type: "text", title: "Description", rows: 3 }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
      initialValue: [
        { _type: "object", _key: "mgmt", iconKey: "home", title: "Full Property Management", description: "We handle bookings, check-ins, check-outs, cleaning coordination, and guest communication. You hand us the keys; we give you passive income." },
        { _type: "object", _key: "photo", iconKey: "camera", title: "Professional Photography", description: "First impressions convert. Our photography team captures your property at its best — lighting, angles, and storytelling that fill your calendar." },
        { _type: "object", _key: "guests", iconKey: "shield", title: "Curated Guests Only", description: "Every booking is screened. We only bring you responsible travelers who respect your space. No parties, no surprises." },
      ],
    }),
    defineField({ name: "ctaHeading", title: "CTA Heading", type: "string", initialValue: "Ready to List Your Property?" }),
    defineField({ name: "ctaSubtitle", title: "CTA Subtitle", type: "text", rows: 2, initialValue: "Join our growing community of property owners earning passively across Kerala. Let's talk." }),
    defineField({ name: "ctaButtonText", title: "CTA Button Label", type: "string", initialValue: "Chat on WhatsApp" }),
  ],
  preview: { prepare() { return { title: "Partner Page" } } },
})
