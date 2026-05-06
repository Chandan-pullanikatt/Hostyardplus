import { defineField, defineType } from "sanity"

export const review = defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({ name: "reviewerName", title: "Reviewer Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "rating", title: "Rating (out of 5)", type: "number", validation: (r) => r.required().min(1).max(5) }),
    defineField({ name: "text", title: "Review Text", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "reviewerAvatar",
      title: "Reviewer Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "timeAgo", title: "Time (e.g. '2 Days ago')", type: "string" }),
    defineField({
      name: "source",
      title: "Source",
      type: "string",
      options: { list: ["Google", "Direct"] },
      initialValue: "Google",
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
  ],
  preview: {
    select: { title: "reviewerName", subtitle: "rating", media: "reviewerAvatar" },
    prepare({ title, subtitle }) {
      return { title, subtitle: `${subtitle}/5` }
    },
  },
})
