# Grill: Three mobile issues — reviews glitch, hero mute, glimpse section
Date: 2026-06-09

## Intent
Fix three mobile-specific problems on the landing/property pages:
1. Reviews marquee intermittently breaks (white gap + overlapping cards) on some phones.
2. Hero video stays muted on mobile even when CMS "mute by default" is turned off.
3. "A Glimpse Into Your Stay" section's image grid is invisible on mobile.

## Key decisions
- Reviews: KEEP both auto-scroll AND drag/swipe. Reason: user wants both; the two
  interactions are not the cause of the bug. Alternative considered: pure-CSS
  auto-only marquee (rejected — would drop manual drag).
- Reviews root cause: marquee reads scrollWidth once on mount, before avatar
  images/fonts load → wrong measurement → loop seam misaligns → white gap +
  overlap. Fix: recompute on ResizeObserver/after load, force flex-nowrap, and
  don't run the scroll step until content width exceeds the container.
- Hero mute on mobile: NOT a bug. Mobile browsers refuse unmuted video autoplay
  without a user gesture, so the code correctly falls back to muted. Decision on
  remedy deferred (see Open questions).
- Glimpse section: the right 2x2 grid tiles set height only at `lg:`, so `fill`
  images collapse to 0 height on mobile. Fix: give tiles an aspect ratio so they
  have height on mobile.

## Surfaced assumptions
- Gemini's "non-unique key / duplicate render" theory is wrong: duplicate reviews
  are the intentional 4x tiling for the seamless loop; keys are already unique.

## Open questions
- Hero mute: what UX do we want on mobile given autoplay-with-sound is impossible?
  (e.g. play muted + obvious tap-to-unmute, vs unmute on first user tap anywhere.)
