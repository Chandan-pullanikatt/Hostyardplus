# Grill: Remaining Pages — About, Partner, Contact, Policies
Date: 2026-05-17

## Intent
Complete the Hostyard+ website by building 7 standalone pages that match the existing landing page and property page UI exactly: About Us, Partner, Contact Us, Privacy Policy, Guest Policy, Cancellation Policy, Terms & Conditions.

## Constraints
- All pages must be fully CMS-editable via Sanity
- Must match existing brand exactly: primary (#052721), cream (#fff9d0), sun/ocean/sky/earthy palettes, Instrument Serif + Inclusive Sans fonts, AnimateIn animations, custom cursor
- Mobile responsive
- Policy pages need real (non-placeholder) India-appropriate content written from scratch

## Key decisions
- Decision: Separate pages at `/about`, `/partner`, `/contact`, `/privacy-policy`, `/guest-policies`, `/cancellation-policies`, `/terms`. Reason: landing page is already content-rich; these pages need their own URL and SEO. Alternative considered: anchor sections on the landing page.
- Decision: WhatsApp CTA for both Partner and Contact Us pages (number: +91 70252 27733). Reason: Indian hospitality context — WhatsApp is the professional channel; guests and owners expect fast, human contact. Alternative considered: email form (rejected — too slow, too cold for the brand's "approachable and fast" positioning).
- Decision: Write policy content from scratch. Reason: no existing legal text; placeholder text is a legal liability. Content will be CMS-editable so client can update without a developer.
- Decision: Partner page uses a WhatsApp deep-link CTA rather than routing to Contact Us. Reason: property owner intent must be preserved through the conversion — a generic contact page breaks momentum.

## Surfaced assumptions
- The WhatsApp number is +91 70252 27733 (taken from existing footer code).
- The Partner page value propositions are: full property management, professional photography, curated guests only (no parties). Revenue guarantees were NOT confirmed as an offering.
- About Us page needs to go meaningfully deeper than the landing page's one-paragraph section: founding story + values + team with optional photos.
- Team photos are optional — section should gracefully hide if no photos are added in CMS.
- Navbar anchor links (#about, #partner, #contact) need updating to actual page routes (/about, /partner, /contact).

## Open questions
- Email address for Contact Us page (only phone number was confirmed from footer).
- Whether there is a guaranteed occupancy/revenue offering for property owners (not confirmed, left out of Partner page copy).
- Actual founding story details and team member names/roles (will write placeholder copy that is CMS-editable).

## Out of scope
- Backend form handling / database for contact submissions (WhatsApp replaces this)
- Authentication or owner dashboard
- Booking flow changes
