# Grill: Stories Section — Audio Autoplays on Reload
Date: 2026-05-17

## Intent
Fix a bug where the Stories/Reels section plays video audio on page reload even when the user is not scrolled to that section.

## Key decisions
- Decision: Gate the initial video play on viewport visibility, not on component mount. Reason: the existing `useEffect([activeOrigIdx])` fires immediately on mount and calls `v.play()` with `v.muted = false`, which succeeds in some browser states (after prior user interaction), causing audio to leak above the fold. The intersection observer only governed pause-on-scroll-away, not initial play. Alternative considered: always start muted — rejected because it doesn't fix the play-before-visible problem.

## Surfaced assumptions
- The user assumed the intersection observer was guarding ALL playback. It was only guarding the pause path.
- The `hasBeenVisibleRef` flag correctly prevented premature pausing but left the initial play ungated.

## Out of scope
- Changing the overall video autoplay behaviour once the section IS visible
