# Grill: Property page hero — ghost Book Now button
Date: 2026-06-09

## Intent
Make the property page hero's "Book Now" button use the transparent ghost style
(white border, pill) — the same look as the landing page hero's mobile button —
across all breakpoints on the property page.

## Key decisions
- Decision: Property hero Book Now → ghost style at every breakpoint. Reason: user
  wants it fully consistent with the landing mobile ghost button. Alternative
  considered: mobile-only ghost (rejected — user said "completely").
- Decision: Landing page hero is left untouched — mobile stays ghost, desktop keeps
  the current green booking bar. Reason: user clarified the landing page is fine
  as-is; only the property page changes.

## Surfaced assumptions
- Reuse the exact visual classes from the landing hero ghost button
  (bg-transparent, border-white/70, rounded-full) while keeping the property
  button's existing layout classes (self-start/md:self-auto, shrink-0).
