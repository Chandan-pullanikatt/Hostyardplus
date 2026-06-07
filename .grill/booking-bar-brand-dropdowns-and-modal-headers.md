
# Grill: Hero booking-bar brand restyle + iframe modal header removal
Date: 2026-06-06

## Intent
Two unrelated polish passes:
1. Remove the redundant title bar from the two Zoho iframe modals (the form already
   carries its own heading inside the iframe).
2. Relabel + brand the landing-page hero booking bar (`BookingBar.tsx`): rename
   fields, give the Destination/Stay Type dropdowns an on-brand open state, and
   reuse the property page's react-day-picker calendar for the date fields.

## Key decisions
- **Modal headers**: remove the entire header bar in both `BookingModalProvider.tsx`
  ("Book Your Stay") and `PartnerCardsSection.tsx` (card category). Float a small
  circular X in the top-right over the iframe instead. Reason: no leftover empty
  strip, maximises form space; Esc + backdrop-click closing already exist.
  Rejected: keeping the bar with just the X (leaves an empty strip).
- **Field relabels** (both viewports): "Where" → "Destination", "Room Type" →
  "Stay Type". Note: visual label only — the Zoho prefill key for stay type stays
  `Dropdown1` / "Room Type" so prefill keeps working.
- **Brand restyle scope = desktop only**. On md+ the Destination/Stay Type fields
  open a subtle branded white popover list, and Check-in/Check-out open the same
  react-day-picker `DayPicker` calendar used on the property page (brand green
  #052721 accent, already styled globally). On mobile the bar keeps its current
  native `<select>` and native `<input type="date">` controls unchanged.
  Reason: native mobile pickers are full-screen OS UI — they never clip or
  overlap, which resolves the width conflict below. Rejected: custom popovers on
  mobile (the ~280px calendar can't fit under a half-width grid cell without
  overflowing) and a mobile bottom-sheet pattern (user wanted mobile left alone).
- **Restyle keeps the flat bar look**: only the *open* state is branded; closed
  triggers stay borderless/inline. Rejected: converting each cell into the
  property page's bordered rounded-xl button boxes (that redesigns the hero).

## Surfaced assumptions
- "No overlap" meant don't clip / don't collide awkwardly — not "the popover may
  never float over other content." Mooted anyway since mobile keeps native pickers.
- Zoho `formperma` forms render their own heading, so the modal title is duplicate.

## Out of scope
- Redesigning the hero bar layout.
- Changing the Zoho prefill field mapping.
- Custom popover/calendar UI on mobile.
