import { defineField, defineType } from "sanity"

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Property Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "location", title: "Location", type: "string", validation: (r) => r.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({ name: "pricePerNight", title: "Price Per Night (₹)", type: "number" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Active", value: "active" },
          { title: "Work in Progress", value: "work-in-progress" },
          { title: "Coming Soon", value: "coming-soon" },
        ],
        layout: "radio",
      },
      initialValue: "active",
    }),
    defineField({
      name: "image",
      title: "Cover Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string", title: "Alt text" })],
    }),
    defineField({
      name: "stayTypes",
      title: "Stay Types",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: ["Hostel", "Resort", "Dorm", "Private Room", "Houseboat", "Homestay"],
      },
    }),
    defineField({ name: "order", title: "Display Order", type: "number", initialValue: 0 }),
    defineField({ name: "tagline", title: "Tagline", type: "string", description: 'e.g. "Calm • Spacious • Elegant"' }),
    defineField({ name: "detailedHeading", title: "Detail Page Heading", type: "string" }),
    defineField({ name: "rating", title: "Rating (e.g. 4.98)", type: "number" }),
    defineField({ name: "bookingUrl", title: "Booking URL", type: "url" }),
    defineField({
      name: "heroImages",
      title: "Hero Images (Slideshow)",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }],
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({
            name: "iconKey", title: "Icon", type: "string",
            options: {
              list: [
                { title: "Bonfire Nights", value: "bonfire" },
                { title: "Mountain Views", value: "mountain" },
                { title: "Off-road Drives", value: "offroad" },
                { title: "Forest Stay", value: "forest" },
                { title: "Camping Stay", value: "camping" },
                { title: "WiFi", value: "wifi" },
                { title: "Swimming Pool", value: "pool" },
                { title: "Parking", value: "parking" },
                { title: "Breakfast", value: "breakfast" },
                { title: "Gym", value: "gym" },
                { title: "Spa", value: "spa" },
                { title: "Pet Friendly", value: "pet" },
                { title: "Scenic Views", value: "view" },
                { title: "River Side", value: "river" },
                { title: "Trekking", value: "trek" },
              ],
              layout: "dropdown",
            },
          }),
          defineField({ name: "label", title: "Label", type: "string" }),
        ],
        preview: { select: { title: "label", subtitle: "iconKey" } },
      }],
    }),
    defineField({
      name: "experiences",
      title: "Experiences",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", title: "Title", type: "string" }),
          defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
          defineField({ name: "image", title: "Image", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }),
        ],
        preview: { select: { title: "title", media: "image" } },
      }],
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string", title: "Alt text" })] }],
    }),
  ],
  orderings: [{ title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "location", media: "image" },
  },
})
