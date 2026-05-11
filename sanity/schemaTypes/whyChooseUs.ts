import { defineField, defineType } from "sanity"

export const whyChooseUs = defineType({
  name: "whyChooseUs",
  title: "Why Choose Us Tab",
  type: "document",
  fields: [
    defineField({ name: "tabLabel", title: "Tab Label", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "images",
      title: "Tab Images (upload up to 3 — used as slideshow)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }],
      validation: (r) => r.max(3),
    }),
    defineField({ name: "title", title: "Content Title", type: "string" }),
    defineField({ name: "description", title: "Content Description", type: "text", rows: 3 }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "tabLabel", media: "images.0" },
  },
})
