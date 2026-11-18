identifier: devin-157eabdcba17427e822ddeaa2311cee0

# Seeder report — WU-1, round 3

Commit: `0882a0fe6c8f9df3cf1ec0c78dbee1a65818a2c1` on `devin/hinshitsu-build`. I did not commit or push.

## File and line changed

`skills/hinshitsu/example/run/review/index.html`, line 107, inside `readAmount`. I changed no other line and no other file.

- SHA-256 before: `d5e4f980b2fcf0f7a883101d5d648ca48c264f246514aeb3816b671a0b6587b6`
- SHA-256 after: `a615ada402bc8ebfc5884b0eb6b1e62a12d3335b92d4be6790b6c91846a5af45`
- The original `skills/hinshitsu/example/index.html` still has the "before" hash.

## Text before

```js
  var cents = parseInt(whole, 10) * 100 + parseInt(((m[2] || "") + "00").slice(0, 2), 10);
```

## Text after

```js
  var cents = parseInt(whole, 10) * 100 + parseInt(m[2] || "0", 10);
```

## What the defect does

The page reads a bill with 1 decimal digit as hundredths, not tenths. `12.5` becomes 12.05, not 12.50. Bills with 0 or 2 decimal digits are unchanged.

## CRITERION that now fails

C2. Its last test fails: `0100.5`, `007`, `02` must show 100.50, 7 and 2.

## Trigger

Open the copy in Chrome. Type `0100.5` as the bill, `007` as the tip and `02` as the people.

| | Original | Seeded copy |
|---|---|---|
| Bill total | 100.50 | 100.05 |
| Tip amount | 7.04 | 7.00 |
| Total with tip | 107.54 | 107.05 |
| Payments | 2 people pay 53.77 each | 1 person pays 53.53; 1 person pays 53.52 |

A second trigger: `12,5`, `0`, `1` shows "Bill total: 12.05". I ran both triggers in headless Chromium against both files.

The other C2 tests, and the C3 spot cases as typed, still pass, because each of those bills has 2 decimal digits. A C3 sweep that types every bill with 2 decimal digits does not show the defect. A sweep that types `0.5` for 0.50 does.

## Roles of rule 13.1 that must find it

- Role 1, correctness auditor: the last test of C2, as written, fails.
- Role 4, adversarial tester: any bill with 1 decimal digit (`0.5`, `12,5`, `1000000.0`) shows the wrong amount.
