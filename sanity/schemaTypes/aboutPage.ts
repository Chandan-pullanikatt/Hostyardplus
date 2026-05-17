import { defineField, defineType, defineArrayMember } from "sanity"

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Us Page",
  type: "document",
  fields: [
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string", initialValue: "About Us" }),
    defineField({ name: "heroSubtitle", title: "Hero Subtitle", type: "text", rows: 2, initialValue: "Calm · Nature · Adventure" }),
    defineField({ name: "storyHeading", title: "Story Section Heading", type: "string", initialValue: "Our Story" }),
    defineField({ name: "storyText", title: "Founding Story", type: "text", rows: 8, initialValue: "Hostyard+ was born from a simple belief: that travel should feel like coming home. Founded in Kerala, India, we started with a single property in the mountains of Suryanelli — a quiet place where guests could slow down, breathe deeper, and reconnect with what matters.\n\nWhat began as one stay has grown into a curated collection of homes across Kerala's most beautiful landscapes. But our founding philosophy hasn't changed: every property we add must earn its place. We look for spaces that have soul — where the architecture speaks to the land, the hosts care, and the experience lingers long after checkout." }),
    defineField({ name: "valuesHeading", title: "Values Section Heading", type: "string", initialValue: "What We Stand For" }),
    defineField({
      name: "values",
      title: "Values",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "description", type: "text", title: "Description", rows: 3 }),
            defineField({ name: "accent", type: "string", title: "Accent Colour", description: "Tailwind colour token, e.g. ocean-400, sun-400, earthy-500", initialValue: "ocean-400" }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
      initialValue: [
        { _type: "object", _key: "calm", title: "Calm over noise", description: "We curate spaces that offer genuine rest. No party crowds, no compromise on the quiet that real travel requires.", accent: "ocean-400" },
        { _type: "object", _key: "care", title: "Care in every detail", description: "From the first message to checkout, every touchpoint is designed with intention. The difference is in what you don't have to think about.", accent: "sun-400" },
        { _type: "object", _key: "connection", title: "Connection over transaction", description: "We're not just facilitating stays. We're building a community of hosts and travelers who believe travel should be meaningful.", accent: "earthy-500" },
      ],
    }),
    defineField({ name: "teamHeading", title: "Team Section Heading", type: "string", initialValue: "Meet the Team" }),
    defineField({
      name: "teamMembers",
      title: "Team Members",
      type: "array",
      description: "Leave empty to hide the team section",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "name", type: "string", title: "Name" }),
            defineField({ name: "role", type: "string", title: "Role" }),
            defineField({ name: "bio", type: "text", title: "Short Bio", rows: 2 }),
            defineField({ name: "photo", type: "image", title: "Photo", options: { hotspot: true } }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "photo" } },
        }),
      ],
    }),
  ],
  preview: { prepare() { return { title: "About Us Page" } } },
})
