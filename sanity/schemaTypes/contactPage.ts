import { defineField, defineType } from "sanity"

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact Us Page",
  type: "document",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string", initialValue: "Let's Talk" }),
    defineField({ name: "tagline", title: "Tagline", type: "text", rows: 2, initialValue: "We're approachable, we're fast, and we're on WhatsApp. Reach out — we'd love to hear from you." }),
    defineField({ name: "phone", title: "Phone Number (display)", type: "string", initialValue: "+91 70252 27733" }),
    defineField({ name: "whatsappNumber", title: "WhatsApp Number (digits only, with country code)", type: "string", initialValue: "917025227733" }),
    defineField({ name: "whatsappButtonText", title: "WhatsApp Button Label", type: "string", initialValue: "Chat on WhatsApp" }),
    defineField({ name: "phoneButtonText", title: "Phone Button Label", type: "string", initialValue: "Call Us" }),
  ],
  preview: { prepare() { return { title: "Contact Us Page" } } },
})
