import { defineField, defineType } from "sanity"

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroVideo",
      title: "Hero Background Video",
      type: "cloudinary.asset",
      description: "Upload a video directly from your computer — no links needed",
    }),
    defineField({
      name: "heroVideoMuted",
      title: "Mute hero video by default",
      type: "boolean",
      initialValue: true,
      description:
        "On: the video starts muted (visitors can unmute with the speaker button). Off: it tries to start with sound — but most browsers block autoplay with audio, so it may still begin muted until the visitor clicks the page.",
    }),
    defineField({ name: "heroHeading", title: "Hero Main Heading", type: "string", initialValue: "Your Perfect Escape in the Mountains" }),
    defineField({ name: "reviewsBadge", title: "Reviews Rating Badge", type: "string", initialValue: "4.93 / 5 · 2000+ reviews on Google", description: "The full badge text shown above the reviews on the homepage (e.g. 4.93 / 5 · 2000+ reviews on Google)" }),
    defineField({ name: "aboutUsHeading", title: "About Us Heading", type: "string", initialValue: "About us", description: "Controls the 'About' block on the homepage — NOT the About Us page" }),
    defineField({ name: "aboutUsText", title: "About Us Description", type: "text", rows: 4, initialValue: "Created for travelers seeking calm, comfort, and meaningful experiences, our space blends modern luxury with the beauty of nature. From peaceful mornings and wellness activities to unforgettable sunsets and curated experiences, every detail is thoughtfully designed to help you disconnect from the noise and reconnect with yourself.", description: "Controls the 'About' block on the homepage — NOT the About Us page" }),
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
