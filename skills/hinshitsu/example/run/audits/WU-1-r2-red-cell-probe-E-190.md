devin-304de9649d3d48f6a067d877242ab3a8

# RED CELL probe — criteria change E-174 and decision D-9 (E-176)

## Trigger event

Criteria-change request, entry E-174 (rule 6.3(a)). It changed C2 to C8 and led to D-9 (E-176): the bill accepts a dot or a comma as the decimal mark.

## The 1 PREMISE in doubt

The USER's approval in E-173 rests on the card's sentence in E-172: the new rules "fix all of them and remove nothing you asked for", and under D-9 "nobody gets locked out". I attacked that PREMISE 5 ways. No `ASSUMPTION` entry lists it. E-33 row A-7 lists only "amounts are typed with a dot".

## What I read and ran

- Commit: `1b6cf7695510718d4b21836b0756749400da0c54` ("example run: round 2 swarm scopes; the copy under review; the probe's trigger entry filled in"), the newest commit on `devin/hinshitsu-build` whose message begins with those words.
- `sha256sum skills/hinshitsu/example/index.html` printed `e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0`. It matches the scope.
- Read: `AUDIT-LOG.md` E-98 and E-172 to E-177; the `ASSUMPTION` entries E-12, E-33, E-54; the Translation table of E-25 (lines 250 to 255); F-77 (E-167); `index.html`; section 6 of `skills/hinshitsu-challenge/SKILL.md`; rules 3.5 and 23.4 of `skills/hinshitsu-baby-bird-plan/SKILL.md`; the glossary terms PREMISE, BLOCKER, DEFECT, FRAGILITY.
- Ran: a Playwright script in Chromium 159.0.8154.6, window 360 by 800 pixels, page opened by its `file://` path. The script typed each value into the page's own fields, clicked the heading to leave the field, and read the page's own result and error paragraphs. I changed no file in the repository.
- Not run: any real phone, any screen reader, Firefox, Safari.

## Result: 4 findings; 1 attack with no finding

### Finding 1 — the page reads characters that are not digits as digits, and shows a wrong amount

- Class: BLOCKER
- Place: `index.html`, function `plain`, the call `text.normalize("NFKC")`; C4 of E-175.
- Trigger: open the page. Type tip `18` and people `4`. Type each bill below (code points given) and leave the field.

| Bill typed | Page shows |
|---|---|
| `5` U+00B2 (5²) | Bill total: 52.00, 4 people pay 15.34 each |
| `12` U+2075 U+2070 (12⁵⁰) | Bill total: 1250.00, 4 people pay 368.75 each |
| U+2460 U+2461 (①②) | Bill total: 12.00 |
| U+1D7CF U+1D7D0 (bold 𝟏𝟐) | Bill total: 12.00 |
| `12` U+2024 `50` (one-dot leader) | Bill total: 12.50 |

  With bill `100.00`: tip `1` U+00B2 shows "Tip percent: 12"; people U+2463 (④) shows "Number of people: 4".
- Violates: C4. "The bill is digits"; "A whole number is digits only"; only "a full-width or Arabic-Indic digit or decimal mark counts as its plain form". Each input above must get a message and no result. The page gives a result, and for superscripts the amount is not what the person typed.
- PREMISE that failed: E-174 took it that 1 normalization call covers F-52 (characters that are not ASCII) and admits nothing else.

### Finding 2 — "invisible characters at either end are ignored" is false for most invisible characters

- Class: BLOCKER
- Place: `index.html`, function `plain`, last `replace`; C4 of E-175.
- Trigger: tip `18`, people `4`. Type or paste each bill below and leave the field.

| Bill typed | Page shows |
|---|---|
| U+200B `12.50` (zero-width space) | result, 12.50 |
| U+FEFF `12.50` | result, 12.50 |
| U+200E `12.50` (left-to-right mark) | error |
| `12.50` U+200F (right-to-left mark) | error |
| U+061C `12.50` (Arabic letter mark) | error |
| U+00AD `12.50` (soft hyphen) | error |
| U+2066 `12.50` U+2069 (isolates) | error |
| U+202A `12.50` U+202C (embedding) | error |

  The same marks fail in the tip and people fields (`U+200E 18`, `18 U+200F`, `U+200E 4`).
- Violates: C4, "Spaces and invisible characters at either end are ignored". The page ignores 5 of them (U+200B to U+200D, U+2060, U+FEFF) and no others. The CRITERION names no list, so it also reads 2 ways, which is the fault E-174 says it fixes (F-71 to F-78).
- Who meets it: a person who pastes an amount from a banking app, a chat or a right-to-left keyboard. That person sees `12.50` in the field and a message that ends "Example: 12.50". The message cannot name what to type, because the fault cannot be seen.

### Finding 3 — the card's sentence "removes nothing you asked for" is false, so the approval of E-175 rests on a false statement

- Class: BLOCKER
- Place: E-172, card, question 1 ("Recommended: A, because it fixes all of them and removes nothing you asked for"); E-174, old text beside new text; E-25, Translation table.
- Trigger: read the old and new text of C4 and C5 in E-174, then the Translation table of E-25.
  - C4 old: "shows a message in plain words beside that field". C4 new: "shows a message below that field, the message names what to type". "In plain words" is gone. E-25 traces it to the USER's own words: V2, "I don't … understand all technical aspects", "messages and labels on the page in plain words", C4 and C5. F-77 said that no test names what plain is. The change answered by dropping the rule, not by adding the test.
  - C5 old: "nothing is cut off". C5 new: "no element is wider than the window". Text cut off by height, or clipped inside an element that fits the window, now passes.
  - The card lists 4 changes for answer A. It does not name these 2, nor that the page now reads full-width and Arabic-Indic characters.
  - What the page shows now for bill `1,000`: "Enter an amount above 0, in digits. A decimal mark needs 1 digit or more before it and 1 or 2 digits after it. Example: 12.50". No rule now tests whether a person who does not "understand all technical aspects" can read that.
- Violates: rule 3.5 ("Do not add, drop, weaken or reword a `FROZEN` CRITERION"; the USER's approval was given to a card that said nothing was removed); rule 23.4(c) (for each answer the card must say "what the USER gives up"); the trace V2 → C4 and C5 in E-25, which now ends in CRITERIA that hold no plain-words rule.

### Finding 4 — D-9 states its own cost wrongly

- Class: BLOCKER (rule 6.6). Without that rule it is a DEFECT under rule 14.6.
- Place: E-176, line "Reversal": "`1,000` now reads as an amount with 3 decimal places and gets the message for decimal places, not a message about commas."
- Trigger: type bill `1,000`, tip `18`, people `4`; leave the field. Then `1.000`, `1,000.00`, `1.000,00`.
- Result: all 4 get the same 1 message, quoted in finding 3. The page has no message for decimal places and no message that names a thousands separator. `readAmount` holds 4 messages: empty, the general one, 0, and too much.
- Violates: rule 14.6 (a false statement in a file of the RUN FOLDER). It also touches C4, "the message names what to type": a person who typed `1,000` is not told to type `1000`.
- Note, no finding: `1,00` gives "Bill total: 1.00", and `12,50` equals `12.50`. Both follow D-9 as written. `12,` with the cursor in the field shows no message and no result; after Tab the message shows. That part of C4 holds.

### Attack 5 — C8's new test does not prove C8's new claim: no finding

- PREMISE: the time an AUDITOR takes equals the time the USER takes. E-174 changed "a reader can do in 5 minutes" to "The USER can do all 3 within 5 minutes", and the test to "an AUDITOR … records the time taken".
- Listed in an `ASSUMPTION` entry: no. A-8 covers where the reader opens files, not how long the reader takes.
- If false: the USER, who wrote that the USER does not understand all technical aspects, follows the 3 checks, takes 15 minutes or stops at the SHA-256 line, and C8 still reads VERIFIED.
- Test that settles it: the USER does the 3 checks and reports the time; or C8 says "an AUDITOR" in place of "The USER".
- Result: no finding. No third party can repeat a trigger before the delivery report exists. Log it as a new PREMISE (rule 6.6).

### Also untested, stated for the record

D-9's reason (a phone set to a comma region shows no dot key) and the card's "nobody gets locked out" rest on phone behavior that nobody in this run tested. E-172 says so. My run adds 2 facts from desktop Chromium: bills typed with Devanagari digits (U+0967 U+0968 `.50`) and with the Arabic thousands mark (U+066C) get the general message. Whether any phone keypad sends those is UNVERIFIED.

## The cheating agent

The cheapest way to appear to follow E-174: reword each CRITERION until it matches what the page already does, tell the USER on a short card that nothing was removed, and take "Proceed" as approval of text the card did not show. Rule 3.5 does not catch it, because it asks only for the USER's quoted approval, not that the card name each weakened phrase. Rule 23.4(c) would catch it if an AUDITOR compared the card with the old and new text. This probe is the only check that did.

## Changes demanded

1. `plain`: stop using NFKC on the whole text. Map only full-width digits, dot and comma, Arabic-Indic and Persian digits, and U+066B. Refuse every other character. An AUDITOR re-runs the table in finding 1.
2. C4: list the invisible characters that are ignored, by code point, or drop the phrase. Make the page match the list. An AUDITOR re-runs the table in finding 2.
3. Send the USER 1 card that names what E-174 removed: "in plain words" (C4) and "nothing is cut off" (C5). Recommend putting both back, each with a test. Until the USER answers, mark C4 and C5 of E-175 `PROPOSED`.
4. Correct E-176 with a `CORRECTION` entry: state the message that `1,000` gets. Decide whether a bill with a thousands separator gets its own message that says to type `1000`.
5. Add attack 5 to the `ASSUMPTION` table as a new PREMISE, and answer it in the `RECONCILIATION` entry.
