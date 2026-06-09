# Grill: Mobile hero video — tap-to-unmute for the visual treat
Date: 2026-06-09

## Intent
Keep mobile visitors engaged with the hero stay-video. Visuals are the priority and
play instantly (muted autoplay); audio is the reward for engaging. User taps the
video to turn sound on.

## Constraints
- Mobile browsers cannot autoplay video with sound — first moment is always silent
  and unavoidable. Not a bug, a browser policy.
- Visual treat is the top priority: no large overlay covering the video.

## Key decisions
- Trigger: tapping the hero video unmutes it (Q1 option C + Q2 option C). Reason:
  a tap only happens while the hero is on screen, so audio never blasts after the
  user scrolls away — the failure mode of unmute-on-scroll. Alternative considered:
  unmute on any first scroll/tap (rejected — fires audio as the user leaves).
- Keep the existing speaker icon as the explicit mute/unmute toggle. Reason: user
  needs a clear way to mute again; tap-on-video only turns sound ON (one-way).
- No separate "Tap for sound" prompt label. Reason: user chose the whole-video tap
  + existing icon; keep visuals uncluttered. (Discoverability tradeoff accepted.)
- Desktop unchanged — already honors the CMS mute setting.

## Surfaced assumptions
- Audio drives retention. Noted counter-risk (unexpected sound on a personal device
  can increase bounce); mitigated by making sound opt-in via deliberate tap.
