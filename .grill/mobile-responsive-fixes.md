# Grill: Mobile Responsive Fixes
Date: 2026-05-17

## Intent
Fix four mobile-specific UX issues without touching desktop layout at all.

## Key decisions
- Decision: Why Choose Us — add left/right arrow buttons on mobile to cycle through tabs. Reason: tab strip is already scrollable but invisibly so; arrows are more obvious for touch users. Alternative considered: visible scrollbar / swipe hint — rejected in favour of explicit arrows.
- Decision: Reels mute button — always visible on mobile (not hover-only). Reason: touch devices have no hover state, so the button was unreachable.
- Decision: Custom cursor — disabled entirely on touch/pointer-coarse devices. Reason: the cursor div is meaningless on touch; also the global `cursor: none` CSS was hiding the native cursor on mobile. Both the CSS and JS component must be fixed.
- Decision: Property experiences (yoga/board/sunset) — vertical stack on mobile with description always visible. Reason: hover-to-expand doesn't work on touch; "down by down" = stacked. Desktop unchanged.

## Constraints
- Desktop layout must not change on any of the four items.
