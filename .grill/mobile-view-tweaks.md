# Grill: Mobile-view tweaks (hero, why-choose-us, stories, reviews)
Date: 2026-06-06

## Intent
Four mobile-focused refinements to the landing page so the visuals read cleanly and the
horizontal sections signal "there's more" and respond to touch:
1. Hero (mobile): drop the full BookingBar; show only the heading text with a single
   "Book Now" button below it, so the background video is fully visible.
2. WhyChooseUs (mobile): remove the border on the prev/next tab arrow buttons only;
   keep the card's main borders.
3. StoriesSection (mobile): keep tap-to-center, add swipe-to-advance, and fix peeking so
   neighbor cards always show a sliver at every screen width.
4. Reviews (all viewports): make the marquee rows drag-scrollable while keeping auto-scroll.

## Key decisions
- Hero mobile booking: replace BookingBar fields with a single Book Now button.
  Reason: user wants the video unobstructed but still wants a booking entry point.
  Alternative rejected: removing booking entirely (loses conversion path) and keeping fields.
- Book Now button reuses existing `components/ui/BookNowButton.tsx` / BookingModalProvider.
  Reason: consistent behavior, no second booking path invented.
- Stories mobile gesture: keep the spotlight center-zoom carousel AND add swipe on top of
  the existing tap-to-center. Reason: user wants both interactions.
  Alternative rejected: replacing with a native scroll-snap strip (would lose the zoom look).
- Stories drag model: one swipe = advance one card, snap on release (~40px threshold),
  reusing the existing `handleCardClick` snap path. Reason: tap and swipe land identically
  and it avoids fighting the transform/scale math. Alternative rejected: live finger-follow.
- Reviews: keep auto-scroll, add drag that pauses on grab and resumes after release.
  Reason: continuous motion signals "more content"; drag adds manual control.
- Reviews drag scope: all viewports (mouse-drag on desktop is harmless). The other three
  changes remain mobile-only.

## Surfaced assumptions
- "Book now card" = the BookingBar search widget, not a literal card component.
- Stories peek failure on narrow screens is caused by the scaled-up center card + 40px
  margins eating the available width — fix is reducing mobile card/scale size.
- Reviews currently has no scroll container at all (pure CSS keyframe marquee), so drag is
  a structural change, not a CSS tweak.

## Out of scope
- Desktop hero, desktop stories carousel — unchanged.
- WhyChooseUs card borders and any non-arrow styling — unchanged.
