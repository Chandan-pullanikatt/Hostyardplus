# Grill: Hamburger menu → compact floating card
Date: 2026-06-03

## Intent
Replace the current full-width drop-down drawer with a compact, rounded floating
card that matches the look of the shared screenshot (template reference for style,
not content).

## Key decisions
- Decision: Anchor card top-right, dropping from under the hamburger, ~320px wide,
  rounded corners + shadow. Reason: native to a top-right hamburger, works mobile +
  desktop. Alternative considered: fully-centered modal (rejected — feels heavier).
- Decision: Dimmed backdrop behind card; click backdrop to close. Reason: standard
  modal affordance, focuses attention.
- Decision: Hamburger keeps toggling to an X (existing behavior); no separate
  outside X button. Reason: simpler, already implemented.
- Decision: Content stays the project's own — About Us / Partner / Contact Us +
  Book Now CTA. Screenshot content (Process/Work/Get Template/social icons) is
  reference only.
- Decision: Card animates in (scale + fade). Reason: matches polished modal feel.

## Surfaced assumptions
- Screenshot is a style reference, not a content/structure spec.
- Menu applies on all screen sizes (hamburger currently shows on all sizes).

## Out of scope
- Adding social icons row from the screenshot.
- Restructuring nav link set.
