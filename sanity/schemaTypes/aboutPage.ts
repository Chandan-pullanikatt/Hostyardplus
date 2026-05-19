import { defineField, defineType, defineArrayMember } from "sanity"

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About Us Page",
  type: "document",
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: "heroLabel",
      title: "Section Label",
      type: "string",
      initialValue: "About us",
      description: "Small label above the main heading",
    }),
    defineField({
      name: "mainHeading",
      title: "Main Heading",
      type: "string",
      initialValue: "Where Modern Comfort Meets the Beauty of Nature",
    }),
    defineField({
      name: "mainDescription",
      title: "Description",
      type: "text",
      rows: 4,
      initialValue:
        "Created for traveler's seeking calm, comfort, and meaningful experiences, our space blends modern luxury with the beauty of nature. From peaceful mornings and wellness activities to unforgettable sunsets and curated experiences, every detail is thoughtfully designed to help you disconnect from the noise and reconnect with yours.",
    }),
    defineField({
      name: "heroImage",
      title: "Main Image",
      type: "image",
      description: "Large image displayed below the heading with stats overlay",
      options: { hotspot: true },
    }),

    // ── Stats ─────────────────────────────────────────────────────────────────
    defineField({
      name: "stats",
      title: "Statistics",
      type: "array",
      description: "Overlaid on the main image at the bottom",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", title: "Value", description: "e.g. 10,000+" }),
            defineField({ name: "label", type: "string", title: "Label", description: "e.g. Happy Travelers" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        }),
      ],
      initialValue: [
        { _type: "object", _key: "stat1", value: "10,000+", label: "Happy Travelers" },
        { _type: "object", _key: "stat2", value: "8,000+", label: "Community Members" },
        { _type: "object", _key: "stat3", value: "6,000+", label: "Returning Guests" },
        { _type: "object", _key: "stat4", value: "95%", label: "Positive Reviews" },
        { _type: "object", _key: "stat5", value: "4 Years", label: "Trusted Hospitality" },
      ],
    }),

    // ── Our Promise ───────────────────────────────────────────────────────────
    defineField({
      name: "promiseSectionHeading",
      title: "Promise Section Heading",
      type: "string",
      initialValue: "Our Promise",
    }),
    defineField({
      name: "promiseSubtitle",
      title: "Promise Subtitle",
      type: "string",
      initialValue: "Promising Comfort, Quality, and Meaningful Travel Experiences",
    }),
    defineField({
      name: "promises",
      title: "Promises",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "description", type: "text", title: "Description", rows: 2 }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
      initialValue: [
        {
          _type: "object",
          _key: "p1",
          title: "Thoughtful Hospitality",
          description:
            "We believe every traveler deserves a welcoming, comfortable, and seamless experience designed with care and attention to detail.",
        },
        {
          _type: "object",
          _key: "p2",
          title: "Meaningful Connections",
          description:
            "We create spaces and experiences that bring people together, encouraging genuine connections between travelers, hosts, and destinations.",
        },
        {
          _type: "object",
          _key: "p3",
          title: "Authentic Experiences",
          description:
            "We focus on creating memorable stays that reflect the beauty, culture, and uniqueness of every destination we offer.",
        },
        {
          _type: "object",
          _key: "p4",
          title: "Trusted Quality",
          description:
            "We carefully curate and verify every stay to ensure consistent quality, comfort, and experiences travelers can rely on with confidence.",
        },
      ],
    }),

    // ── CTA Banner ────────────────────────────────────────────────────────────
    defineField({
      name: "ctaHeading",
      title: "CTA Heading",
      type: "string",
      initialValue: "Ready To Experience Your Perfect Escape",
    }),
    defineField({
      name: "ctaSubtitle",
      title: "CTA Subtitle",
      type: "string",
      initialValue:
        "Discover Thoughtfully Curated Stays Designed For Comfort, Connection, And Unforgettable Experiences Across Every Destination",
    }),
    defineField({
      name: "ctaButtonText",
      title: "CTA Button Text",
      type: "string",
      initialValue: "Book Now",
    }),
    defineField({
      name: "ctaButtonLink",
      title: "CTA Button Link",
      type: "string",
      initialValue: "/",
      description: "URL the button points to",
    }),
    defineField({
      name: "ctaImage",
      title: "CTA Background Image",
      type: "image",
      description: "Dark background image for the CTA banner",
      options: { hotspot: true },
    }),
  ],
  preview: { prepare() { return { title: "About Us Page" } } },
})
