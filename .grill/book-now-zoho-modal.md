# Grill: Book Now → Zoho Form Modal
Date: 2026-05-27

## Intent
Connect every "Book Now" CTA on the site to a modal/lightbox that embeds the Zoho Enquiry Form inline — so users never leave the page.

## Constraints
- Must match the site's premium, dark mood exactly — no generic white popup feel
- All 6 "Book Now" instances must trigger the same modal
- Zoho form embed URL: `https://forms.hostyardplus.com/hostyardplus1/form/EnquiryForm/formperma/kVdrYuLSSm3okewj0idDblbkprRzVcXE7-k1S0mE_aU`

## Key decisions
- Decision: Modal/lightbox with iframe embed. Reason: User never leaves the page; feels premium. Alternative considered: new tab redirect (rejected — breaks flow), inline embed (rejected — clutters layout).
- Decision: Close on overlay click AND ✕ button. Reason: Standard premium UX pattern; intuitive. Alternative considered: close button only (rejected — could trap user mid-fill accidentally).
- Decision: All 6 CTAs trigger the same modal. Reason: Maximum conversion coverage across entire site.

## Surfaced assumptions
- The Zoho form is already live and publicly accessible at the embed URL
- All 6 locations (Navbar, BookingBar, PropertyHero, PropertyOverview ×2, CommunityBanner, Footer) should use identical behavior
- Footer link currently points to `/#book` — needs to be converted to modal trigger

## Update 2026-06-03 — URL fix
- Symptom: live form showed Zoho "sorry, page not found" (HTTP 404).
- Root cause: the URL string in code was wrong on TWO counts, not a code bug:
  1. Domain `forms.zoho.in` instead of the client's custom domain `forms.hostyardplus.com`.
  2. Permalink typo: `...0idDblbkpr...` (lowercase L) vs correct `...0idDbIbkpr...` (capital i).
- Correct URL (verified loads a working form via WebFetch):
  `https://forms.hostyardplus.com/hostyardplus1/form/EnquiryForm/formperma/kVdrYuLSSm3okewj0idDbIbkprRzVcXE7-k1S0mE_aU`
- Fixed `ZOHO_FORM_URL` in `components/ui/BookingModalProvider.tsx`. No other changes needed — wiring was already complete.
