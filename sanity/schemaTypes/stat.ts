import { defineField, defineType } from "sanity"

export const stat = defineType({
  name: "stat",
  title: "Stat",
  type: "document",
  fields: [
    defineField({ name: "value", title: "Value (e.g. '10,000+')", type: "string", validation: (r) => r.required() }),
    defineField({ name: "label", title: "Label (e.g. 'Happy Travelers')", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "string" }),
    defineField({
      name: "iconKey",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { title: "Traveler / Person", value: "traveler" },
          { title: "Bed / Stay", value: "bed" },
          { title: "Community / People", value: "community" },
          { title: "Destination / Pin", value: "destination" },
        ],
        layout: "radio",
      },
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "label", subtitle: "value" },
  },
})
