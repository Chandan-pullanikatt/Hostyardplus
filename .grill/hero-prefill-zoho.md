# Grill: Hero fields → Zoho form prefill + per-property dependent Stay Type
Date: 2026-06-04

## Intent
When a user fills the hero "search bar" (Where / Stay Type / Check-in / Check-out / Guests)
and clicks Book Now, those values should carry into the Zoho booking form so the user
never re-enters them. Additionally, the hero Stay Type dropdown must show only the stay
types that the selected destination actually offers (e.g. Suryanelli has no Resort,
Kozhikode does).

## Constraints
- The hero search fields are a MUST — they exist for the premium look and cannot be removed.
- Both the Zoho form fields AND the Sanity (CMS) options are maintained by the client.
  The client is rebuilding the Zoho form now to match.

## Key decisions
- Decision: Hero "second dropdown" = **Stay Type** (Hostel/Resort/Dorm/…), NOT Zoho's
  bed-config "Room Type" (4-Bed/12-Bed). Reason: Stay Type already exists per-property in
  Sanity (`stayTypes`); reuses existing data, no new modeling. Alternative rejected: adding
  a new per-property bed-config field to Sanity + syncing to Zoho (too heavy, wrong altitude
  for a homepage teaser).
- Decision: Stay Type is a **dependent dropdown** filtered by the selected destination,
  using each property's `stayTypes` array from Sanity. Reason: not every property offers
  every stay type.
- Decision: Check-out maps to a **new Check-out date field in Zoho** (date→date), NOT a
  computed "Number of Days". Reason: client is rebuilding Zoho anyway; exact dates are
  lossless and more useful than a day count. Alternative rejected: compute days in JS.
- Decision: Prefill mechanism = **Zoho URL query parameters** appended to the form permalink,
  carried into the modal iframe `src`. Only the hero BookingBar passes values; the other 5
  "Book Now" buttons open the form blank (no context).

## Final field mapping (hero → Zoho), all lossless
| Hero field   | Hero value source        | Zoho field        | Type      |
|--------------|--------------------------|-------------------|-----------|
| Where        | property.location (Sanity)| Property (dropdown)| value→option |
| Stay Type    | property.stayTypes (Sanity)| Stay Type (dropdown)| value→option |
| Check-in     | date input               | Check-in (date)   | date→date |
| Check-out    | date input               | Check-out (date)  | date→date |
| Guest number | number input             | Number of People  | number    |

## Surfaced assumptions / rules to enforce
- DROPDOWN PREFILL ONLY WORKS ON EXACT STRING MATCH. For Property and Stay Type, the Zoho
  dropdown option text MUST equal the Sanity value letter-for-letter, or the field prefills
  blank with no error. Client owns keeping the two lists in sync.
- Existing bug: `BookingBar` only receives `destinations: string[]` and uses a HARDCODED
  stay-type list — it never sees the per-property `stayTypes`. Must pass property objects in.
- `open()` in BookingModalProvider currently takes no args — hero values are collected then
  thrown away. Must thread prefill data through.

## Sequencing / dependency
- UNBLOCKED NOW (frontend + existing Sanity data): wire BookingBar to filter Stay Type per
  destination; thread hero values into the modal; build the iframe `src` query-string with a
  single clearly-marked config map of Zoho field link-names.
- BLOCKED ON CLIENT: the actual Zoho field "link names" (query-param keys) are unknown until
  the client finishes rebuilding the Zoho form (adding Stay Type + Check-out fields). Plug
  those into the config map once delivered, then verify each field prefills.

## Client's Zoho to-do (hand to client)
1. Add a **Stay Type** field (dropdown) — options must exactly match the Sanity stayTypes list.
2. Add a **Check-out** date field.
3. Ensure **Property** dropdown options exactly match each property's Sanity `location` string.
4. Send back each field's prefill link-name (Zoho: form field → Field Properties → prefill).

## Out of scope
- Zoho's bed-config "Room Type" and "Segment" fields are NOT prefilled from the hero.
- Adding brand-new stayType OPTIONS (beyond the schema's fixed list) still needs a code change;
  assigning existing options per-property is already CMS-editable.
