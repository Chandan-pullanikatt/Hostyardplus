import { defineField, defineType } from "sanity"

export const activity = defineType({
  name: "activity",
  title: "Activity (Ticker)",
  type: "document",
  fields: [
    defineField({ name: "label", title: "Activity Label", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "label" },
  },
})
