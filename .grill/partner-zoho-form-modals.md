# Grill: Embedding Zoho forms in the Partner page
Date: 2026-06-06

## Intent
Add per-audience enquiry forms (Zoho) to the three partner cards on `/partner`
(Property Owners, Travel Agencies & Tour Operators, Creators & Influencers) so
visitors can apply/enquire without leaving the page.

## Key decisions
- Interaction: **Modal**. Each card gets a button that opens the relevant Zoho
  form in an overlay. Reason: lowest friction, keeps card layout, loads only one
  iframe at a time on demand. Rejected: inline (3 iframes = slow/busy) and
  separate routes per audience (more pages to build).
- Trigger: **explicit button** per card, not whole-card click. Reason: clear CTA
  signal, better conversion.
- Labels: **distinct per card** — Property Owners → "List Your Property",
  Travel Agencies & Tour Operators → "Partner With Us",
  Creators & Influencers → "Collaborate With Us". Reason: identity-matched labels
  convert better than a uniform "Apply Now".
- Data source: **Sanity-driven** (`formUrl` + `ctaLabel` per card) with the three
  URLs/labels seeded in the code FALLBACK and schema initialValue. Reason: matches
  the existing CMS pattern, survives Zoho `formperma` link regeneration without a
  deploy, avoids brittle order/category-string mapping.
- Post-submit: **let Zoho own the thank-you** inside the iframe. Reason: iframe is
  cross-origin, so reliable submit detection is hacky; Zoho's built-in confirmation
  is controlled from each form's settings.
- Modal sizing: full-screen sheet on mobile; centered ~640px panel, scrollable,
  ~85vh on desktop. Close via X / Esc / backdrop click. Body scroll locked when open.

## Form URLs (seeded)
- Property Owners: https://forms.hostyardplus.com/hostyardplus1/form/EnquiryForm1/formperma/GlPubvgSC9cu6oTBbc_3CUHib-J02hvk6NN06Fy2_e8
- Travel Agencies & Tour Operators: https://forms.hostyardplus.com/hostyardplus1/form/TravelAgenciesTourOperators/formperma/IhPwwJgwsMAj-YYts7OoBQz1u-eQTNWV0qv6Q40TlfQ
- Creators & Influencers: https://forms.hostyardplus.com/hostyardplus1/form/CreatorsInfluencers/formperma/XrvnuVECBlO-x7sAq918is9X-PEk0CvW-dlm46wdwT8

## Surfaced assumptions
- Zoho `formperma` links embed in a plain iframe (no special embed script needed).
- Each Zoho form's own thank-you message is configured nicely in Zoho settings.

## Out of scope
- Custom success state / auto-close on submit.
- Capturing submissions on our side (Zoho handles storage).
