# Grill: Airbnb-style Photo Tour Page
Date: 2026-05-27

## Intent
When the user clicks the `+N Images` overlay in the "A Glimpse Into Your Stay" gallery section, they should be taken to a dedicated photo tour page (`/properties/[slug]/photos`) that shows all property photos organised by room category (Living Room, Kitchen, Bedroom, etc.) — styled like the Airbnb photo tour with a sticky left sidebar of category pills and a scrollable right panel.

## Constraints
- The existing `galleryImages` field must not change — it continues to power the 1+4 preview grid on the property page.
- Room category names are free-text (not a fixed dropdown), to support unusual spaces like "Rooftop" or "Private Pool".
- Must be a separate page route, not a modal.

## Key decisions
- **Separate page route (`/properties/[slug]/photos`)** — Decision: separate page. Reason: user chose it; also simpler to implement without state management overhead. Alternative considered: full-screen modal (rejected).
- **New `photoTourSections` field in Sanity** — Decision: extend schema. Reason: flat `galleryImages` has no room categories; free-text category names per section. Alternative considered: using alt text as category prefix (rejected as fragile).
- **Two separate Sanity fields** — `galleryImages` keeps powering the preview grid; new `photoTourSections` powers the tour page exclusively. Reason: independent control over what appears in the preview vs. the full tour. Alternative considered: auto-derive grid from tour sections (rejected).
- **Airbnb-style layout** — Sticky left sidebar with room category pills; clicking a pill scrolls to that section. Scrollable right panel with section headings and image grid. Alternative considered: simple flat scroll with no sidebar (rejected).
- **Free-text category names** — Reason: different properties may have non-standard spaces. Alternative considered: fixed dropdown (rejected).

## Surfaced assumptions
- The `+N Images` overlay in `PropertyGallery.tsx` is currently a non-interactive div — it needs to become a clickable `Link`.
- The photos page needs a back button / close mechanism to return to the property page.
- On mobile, the sidebar pills should collapse to a horizontal scrolling row (Airbnb pattern).

## Out of scope
- No lightbox/fullscreen individual image viewer for now.
- No URL-hash deep-linking to specific sections (e.g., `/photos#kitchen`).
- No changes to the existing `galleryImages` field or the preview grid layout.
