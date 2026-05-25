# Grill: Navbar, Hero, Footer, Partner Page, Cursor
Date: 2026-05-25

## Intent
Clean up the site's navigation and visual noise: collapse the navbar to a hamburger-only approach on all screen sizes, move the hero rating badge into the Reviews section, add WhatsApp to the footer, trim the Partner page's CTA banner, and simplify the cursor to native with the custom SVG only on button hover.

## Key decisions
- Decision: Hamburger appears on ALL screen sizes (not just mobile). Reason: removing the visible desktop nav links and Book Now CTA means there's nothing left to show on desktop — the hamburger replaces everything. Alternative considered: keeping a desktop nav and only removing Book Now.
- Decision: Hamburger menu contains About Us → Partner → Contact Us → Book Now (styled button). Reason: Book Now stays accessible via the menu even though it's no longer a persistent CTA. Alternative considered: removing Book Now entirely from the nav.
- Decision: Rating badge placed centered below "What Our Guests Say" heading + subheading in the Reviews section, styled as a light-background pill (white with border). Reason: user confirmed this recommendation.
- Decision: Remove the CTA Banner section from the Partner page ("Ready To Partner With Hostyard+" full-bleed image card). Reason: user clarified this is the "image grid section" they meant — not the Partner Cards. Alternative considered: removing only the image areas from the Partner Cards.
- Decision: Default/system cursor everywhere; `Cursor.svg` shown only on button hover. Reason: user confirmed the Cursor.svg is the "branding animation cursor". Alternative considered: keeping the custom cursor globally.
- Decision: WhatsApp icon added to Footer socials, linked to `https://wa.me/917025227733` (same number already in the tel: link).

## Surfaced assumptions
- The "logo/branding animation" cursor = the existing `Cursor.svg` currently shown globally via `CustomCursor.tsx`.
- The "image grid section" on the Partner page = the CTA Banner section, not the Partner Cards grid.
- The WhatsApp number is +917025227733, derived from the existing `tel:+917025227733` link in the footer.

## Out of scope
- Changes to the About Us page content (only the shared Navbar is being updated there).
- Removing or changing the Partner Cards (Property Owners, Travel Agencies, Creators).
- Redesigning the Reviews section layout beyond adding the rating badge.
