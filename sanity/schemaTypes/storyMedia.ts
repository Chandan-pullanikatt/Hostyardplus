import { defineField, defineType } from "sanity"

export const storyMedia = defineType({
  name: "storyMedia",
  title: "Story Media (Reels)",
  type: "document",
  fields: [
    defineField({
      name: "mediaType",
      title: "Media Type",
      type: "string",
      options: {
        list: [
          { title: "Video", value: "video" },
          { title: "Image", value: "image" },
        ],
        layout: "radio",
      },
      initialValue: "video",
    }),
    defineField({
      name: "cloudinaryAsset",
      title: "Video / Image",
      type: "cloudinary.asset",
      description: "Upload directly from your computer",
    }),
    defineField({
      name: "thumbnail",
      title: "Thumbnail Image",
      type: "image",
      options: { hotspot: true },
      description: "Cover image shown before the video plays",
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "mediaType", media: "thumbnail" },
    prepare({ title }) {
      return { title: `${title === "video" ? "🎬" : "🖼️"} Story` }
    },
  },
})
