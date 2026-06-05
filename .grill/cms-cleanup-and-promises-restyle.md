# Grill: CMS field cleanup + content seeding + About promises restyle
Date: 2026-06-06

## Intent
Reduce client confusion in the Sanity panel by removing dead fields and wiring up /
populating the ones that matter, and restyle the "Our Promise" section on the About page.

## Key decisions
- **Hero Rating + Hero Review Count**: NOT dead-removed — they belong in the Reviews
  section ("What Our Guests Say"), where the badge `4.93 / 5 · 2000+ reviews on Google`
  is currently HARDCODED in `Reviews.tsx:32`. Consolidate the two fields into ONE
  editable field `reviewsBadge` (whole badge string) and wire it into Reviews.
  Reason: client wanted the full badge editable as one string. Alt rejected: two
  separate value fields with fixed "reviews on Google" suffix.
- **Hero Italic Word (`heroHeadingItalic`)**: remove — never rendered.
- **Hero Subheading (`heroSubheading`)**: remove — never rendered.
- **Quote Banner Text (`quoteBannerText`)**: remove field AND delete the dead
  `QuoteBanner.tsx` component — it is not mounted on any page.
- **About Us (landing) vs About Us page**: already two independent sources
  (landing = `siteSettings.aboutUsHeading/aboutUsText`; `/about` = `aboutPage` doc).
  No split needed. Client decided NO relabel. Real issue: the siteSettings About
  fields were never seeded → show empty in panel → site renders the hardcoded
  fallback. Fix = populate them in the dataset so the CMS actually drives them.
- **Policy pages**: dataset has no policy documents; pages render hardcoded
  `FALLBACK_BODY`. Seed the four policy docs (privacy, guest, cancellation, terms)
  with their existing fallback text so the client can edit.
- **Seeding mechanism**: non-destructive migration script (NOT the existing
  `createOrReplace` seed, which would wipe the client's uploaded hero video etc.).
  Use `patch().setIfMissing(...)` on siteSettings and `createIfNotExists(...)` for
  policy docs. Client runs it once with their `SANITY_WRITE_TOKEN` (already set).
- **About page "Our Promise" restyle** (`app/about/page.tsx`):
  - panel background `#EAF2F0` → `#FFF9D066`
  - number ("01") + title ("Thoughtful Hospitality") → `#000000`
  - description text → `#6C6C6C`
  (User's original spec said title = #FFF9D066, which equals the background = invisible;
   corrected to #000000 on confirmation.)

## Surfaced assumptions
- The rating fields were assumed "broken"; actually they were just never connected
  to the already-existing hardcoded badge in the Reviews section.
- "Website shows About content but CMS field is empty" = the fallback rendering,
  not CMS-driven content. Same root cause as the blank policy pages.

## Out of scope
- Relabeling the siteSettings About fields (client declined).
- Seeding aboutPage / partnerPage / contactPage docs (not requested; they have
  working fallbacks and can be published from the Studio).
- Re-running the destructive `createOrReplace` seed.
