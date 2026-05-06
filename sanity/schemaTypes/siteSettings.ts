import { defineField, defineType } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroVideoUrl",
      title: "Hero Video URL (Cloudinary)",
      type: "url",
      description: "Paste your Cloudinary video URL for the hero section background",
    }),
    defineField({ name: "heroRating", title: "Hero Rating (e.g. 4.93 / 5)", type: "string", initialValue: "4.93 / 5" }),
    defineField({ name: "heroRatingCount", title: "Hero Review Count (e.g. 2000+)", type: "string", initialValue: "2000+" }),
    defineField({ name: "heroHeading", title: "Hero Main Heading", type: "string", initialValue: "Your Perfect Escape in the Mountains" }),
    defineField({ name: "heroHeadingItalic", title: "Hero Italic Word (highlighted)", type: "string", initialValue: "Escape", description: "This word will be rendered in italic serif style" }),
    defineField({ name: "heroSubheading", title: "Hero Subheading", type: "string", initialValue: "Find calm in a modern hideaway with stunning views in the heart of Suryanelli" }),
    defineField({ name: "quoteBannerText", title: "Quote Banner Text", type: "text", rows: 3, initialValue: "We thoughtfully curate every stay, design every touchpoint with care, and move with a clear focus on experience. The difference? We're building memories with you not just facilitating stays" }),
    defineField({
      name: "communityBannerImage",
      title: "Community Banner Background Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({ name: "communityBannerHeading", title: "Community Banner Heading", type: "string", initialValue: "Comfort Meets Community" }),
    defineField({ name: "communityBannerSubheading", title: "Community Banner Subheading", type: "text", rows: 2, initialValue: "Designed For Travelers Who Value Both Comfort And Community, Enjoy Modern Amenities, Cozy Common Spaces, And Opportunities To Meet Fellow Explorers From Around The World." }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" }
    },
  },
})
