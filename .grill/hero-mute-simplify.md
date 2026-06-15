# Grill: Simplify hero audio control — speaker button only
Date: 2026-06-09

## Intent
Remove the tap-to-unmute complexity. The speaker icon is the single control that
turns the hero video's audio on/off. Tapping the screen/video does nothing.

## Constraints
- Mobile browsers pause a muted-autoplay video when you set muted=false unless you
  re-play within the same user gesture — so unmute must call play() in the tap.

## Key decisions
- Decision: Speaker button (toggleMute) is the ONLY audio control. Remove the
  section onClick(enableSound) and the global first-interaction (scroll/touchstart)
  listeners + enableSound + desiredMutedRef. Reason: user wants less complexity and
  the tap-to-unmute was causing pauses and an unchanged icon. Alternative considered:
  fix tap-to-unmute too (rejected — user wants it gone).
- Decision: In toggleMute, after flipping muted, call v.play() within the tap (with
  a muted fallback). Reason: fixes the mobile pause-on-unmute.
- Decision: Keep the visibility observer (play ≥50% visible, pause when fully off)
  using a mutedRef mirror. Reason: prevents off-screen audio; still simple.

## Out of scope
- Tap-anywhere-to-unmute and first-interaction auto-unmute (removed).
