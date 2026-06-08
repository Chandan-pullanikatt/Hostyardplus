# Grill: Why Choose Us — arrow photo-stepper across sections
Date: 2026-06-04

## Intent
Add styled prev/next arrows to the Why Choose Us card that step through photos as
one continuous sequence across all sections (a1→a2→a3→b1→b2→b3…). Crossing a
section boundary auto-switches the active section/tab. Auto-rotate stays, looping
the photos *within* the currently shown section only.

## Key decisions
- Decision: Arrow = global photo stepper, not a direct section jump. Reason: matches
  client ask (finish a section's photos, then roll into next). Alternative considered:
  arrow jumps whole section (rejected — user corrected this mid-grill).
- Decision: Keep auto-rotate, but it only loops photos within the current section;
  it never auto-changes section. Reason: user's explicit model.
- Decision: Desktop gets prev+next arrows overlaid bottom-right of the image, soft
  cream/white rounded, matching existing mobile arrow style/mood. Reason: desktop
  card currently has no arrows; match site mood.
- Decision: Loop at the ends — next after last photo of last section → first photo
  of first section; prev from first → last. Reason: continuous feel, no dead stop.
- Decision: Repurpose the existing mobile arrows from tab-stepping to this same
  photo-stepping behavior, for consistency.

## Surfaced assumptions
- All sections have 3 photos; logic clamps to each section's real length.
- Desktop tab strip stays directly clickable (jumps to that section, photo resets to 1).
