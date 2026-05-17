import { defineField, defineType, defineArrayMember } from "sanity"

const bodyField = defineField({
  name: "body",
  title: "Content",
  type: "array",
  of: [
    defineArrayMember({ type: "block" }),
  ],
})

export const privacyPolicy = defineType({
  name: "privacyPolicy",
  title: "Privacy Policy",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page Title", type: "string", initialValue: "Privacy Policy" }),
    defineField({ name: "lastUpdated", title: "Last Updated", type: "date", initialValue: "2025-01-01" }),
    bodyField,
  ],
  preview: { prepare() { return { title: "Privacy Policy" } } },
})

export const guestPolicy = defineType({
  name: "guestPolicy",
  title: "Guest Policy",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page Title", type: "string", initialValue: "Guest Policy" }),
    defineField({ name: "lastUpdated", title: "Last Updated", type: "date", initialValue: "2025-01-01" }),
    bodyField,
  ],
  preview: { prepare() { return { title: "Guest Policy" } } },
})

export const cancellationPolicy = defineType({
  name: "cancellationPolicy",
  title: "Cancellation Policy",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page Title", type: "string", initialValue: "Cancellation Policy" }),
    defineField({ name: "lastUpdated", title: "Last Updated", type: "date", initialValue: "2025-01-01" }),
    bodyField,
  ],
  preview: { prepare() { return { title: "Cancellation Policy" } } },
})

export const termsConditions = defineType({
  name: "termsConditions",
  title: "Terms & Conditions",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Page Title", type: "string", initialValue: "Terms & Conditions" }),
    defineField({ name: "lastUpdated", title: "Last Updated", type: "date", initialValue: "2025-01-01" }),
    bodyField,
  ],
  preview: { prepare() { return { title: "Terms & Conditions" } } },
})
