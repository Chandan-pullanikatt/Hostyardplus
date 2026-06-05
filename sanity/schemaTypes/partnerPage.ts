import { defineField, defineType, defineArrayMember } from "sanity"

export const partnerPage = defineType({
  name: "partnerPage",
  title: "Partner Page",
  type: "document",
  fields: [
    defineField({ name: "heroLabel", title: "Hero Label", type: "string", initialValue: "Partner With Us" }),
    defineField({ name: "heroHeading", title: "Hero Heading", type: "string", initialValue: "Grow Together With Hostyard+" }),
    defineField({ name: "heroDescription", title: "Hero Description", type: "text", rows: 3, initialValue: "Property owners, travel agencies, tour operators, and creators — join us in curating extraordinary staycation experiences across the country." }),
    defineField({
      name: "partnerCards",
      title: "Partner Type Cards",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "category", type: "string", title: "Category Badge" }),
            defineField({ name: "title", type: "string", title: "Card Title" }),
            defineField({ name: "description", type: "text", title: "Description", rows: 3 }),
            defineField({ name: "image", type: "image", title: "Card Image", options: { hotspot: true } }),
            defineField({ name: "ctaLabel", type: "string", title: "Button Label" }),
            defineField({ name: "formUrl", type: "url", title: "Zoho Form URL", description: "The Zoho formperma link opened in the enquiry modal." }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
      initialValue: [
        { _key: "owners", category: "Property Owners", title: "Transform Properties Into Stays", description: "Partner with us to reach more travelers, increase bookings, and create memorable experiences across destinations", ctaLabel: "List Your Property", formUrl: "https://forms.hostyardplus.com/hostyardplus1/form/EnquiryForm1/formperma/GlPubvgSC9cu6oTBbc_3CUHib-J02hvk6NN06Fy2_e8" },
        { _key: "agencies", category: "Travel Agencies & Tour Operators", title: "Create Better Travel Experiences", description: "Collaborate with us to offer curated stays, seamless planning, and unforgettable journeys for your travelers", ctaLabel: "Partner With Us", formUrl: "https://forms.hostyardplus.com/hostyardplus1/form/TravelAgenciesTourOperators/formperma/IhPwwJgwsMAj-YYts7OoBQz1u-eQTNWV0qv6Q40TlfQ" },
        { _key: "creators", category: "Creators & Influencers", title: "Inspire Through Travel Content", description: "Work with us to showcase destinations, create engaging travel content, and connect with a community of explorers", ctaLabel: "Collaborate With Us", formUrl: "https://forms.hostyardplus.com/hostyardplus1/form/CreatorsInfluencers/formperma/XrvnuVECBlO-x7sAq918is9X-PEk0CvW-dlm46wdwT8" },
      ],
    }),
    defineField({ name: "ctaHeading", title: "CTA Heading", type: "string", initialValue: "Ready To Partner With Hostyard+" }),
    defineField({ name: "ctaSubtitle", title: "CTA Subtitle", type: "text", rows: 2, initialValue: "Join A Growing Network Of Partners Creating Meaningful Travel Experiences Across Destinations." }),
    defineField({ name: "ctaButtonText", title: "CTA Button Text", type: "string", initialValue: "Talk to Our Team" }),
    defineField({ name: "ctaButtonLink", title: "CTA Button Link", type: "string", initialValue: "/contact" }),
    defineField({ name: "ctaImage", title: "CTA Banner Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "faqHeading", title: "FAQ Section Heading", type: "string", initialValue: "Frequently Asked Questions" }),
    defineField({ name: "faqSubtitle", title: "FAQ Section Subtitle", type: "string", initialValue: "Quick answers to common questions about your stay" }),
    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "question", type: "string", title: "Question" }),
            defineField({ name: "answer", type: "text", title: "Answer", rows: 3 }),
          ],
          preview: { select: { title: "question" } },
        }),
      ],
      initialValue: [
        { _key: "q1", question: "Who can partner with Hostyard+?", answer: "Property owners, travel agencies, tour operators, creators, and influencers can collaborate with Hostyard+." },
        { _key: "q2", question: "How do I apply for partnership?", answer: "Reach out to our team through the contact page or WhatsApp, and we'll guide you through the simple onboarding process." },
        { _key: "q3", question: "Are there any joining fees?", answer: "There are no upfront joining fees. We work on a partnership model where we grow together." },
        { _key: "q4", question: "How does Hostyard+ help partners grow?", answer: "We provide marketing support, access to our traveler network, professional photography, and operational assistance to help partners maximize their potential." },
        { _key: "q5", question: "Can I partner with multiple properties or services?", answer: "Absolutely. We welcome partners with multiple properties or services and provide tailored solutions for each." },
        { _key: "q6", question: "Do creators and influencers get collaboration opportunities?", answer: "Yes! We actively collaborate with creators and influencers for content creation, destination showcases, and travel campaigns." },
      ],
    }),
  ],
  preview: { prepare() { return { title: "Partner Page" } } },
})
