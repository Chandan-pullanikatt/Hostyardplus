# Grill: Property overview booking card layout
Date: 2026-05-27

## Intent
The left content column (heading + description + amenities grid) and the right booking card must sit side-by-side as a visually matched rectangle — equal heights, gap aligned. The layout must be responsive: stacks vertically on smaller screens, never overlaps.

## Constraints
- Figma design target: 1440px viewport, 40px side padding → 1360px content width
- Card: 440px × 483px, border-radius 24px
- Gap between columns: 64px (not 80px)
- Fields group inside card: 374px × 287px, 16px gap
- Left column at design viewport: 1360 − 440 − 64 = 856px
- Both columns must be the same visual height (rectangle, not ragged)

## Key decisions
- Decision: Switch row layout breakpoint from `lg` (1024px) to `xl` (1280px). Reason: at 1024px, available content width is ~928px — card (440) + gap (64) leaves only 424px for the left text, which causes overflow and overlap. At 1280px, ~1184px is available, giving 680px to the left column — comfortable. Alternative considered: keep `lg` and compress the card — rejected because field labels become illegible.
- Decision: Use flex `items-stretch` (default) + `h-full` on the card inner div so both columns are equal height. Reason: user explicitly wants a matched rectangle. Alternative considered: fixed `lg:h-[483px]` on both — rejected because it breaks at non-Figma viewport widths.
- Decision: Remove `sticky top-24` from the card. Reason: when both columns are the same height by design, sticky never activates and adds unnecessary complexity. The section height at the design viewport is ~487px, shorter than most viewports.

## Surfaced assumptions
- The `lg:w-[793px]` hardcoded on the left description container (previous code) was trial-and-error, not a design spec.
- The Figma was designed at exactly 1440px; values like 856px (left width) and 64px (gap) are derivable from the spec, not directly in the component.
- Fixed paragraph heights (`lg:h-[95px]`) were also trial-and-error and can be removed safely.
