devin-772e4a8b245043efb9a0c032b2d4348a

# Seeder report — WU-1, 1 planted defect

Commit: `f3578b9b619eff2ab641959996ab634d6ba2fc9f` on `devin/hinshitsu-build`. I did not commit or push.

## File and line changed

`skills/hinshitsu/example/run/review/index.html`, line 92, in `readAmount`. I changed 1 character pair (`>` to `>=`). I changed nothing else.

Before:

```js
  if (cents > MAX_BILL_CENTS) { return { error: tooMuch }; }
```

After:

```js
  if (cents >= MAX_BILL_CENTS) { return { error: tooMuch }; }
```

## SHA-256

- Copy, after the change: `dc993923bda99787251fe78c9ba3a07eab64e987506cb7eb36700b26c75dad55`
- Original `skills/hinshitsu/example/index.html`, unchanged: `e866bfe5aee8c649d00f992abde6dd869e1fe1dc526b2a458f979e6a90d111d0`

## CRITERION that now fails

C3. Its spot case `1000000.00`, `100`, `100` shows no result. C2 fails too: it accepts bills "from 0.01 to 1000000.00", and the copy now rejects 1000000.00. C4 only rejects "a bill above 1000000.00".

## Trigger

Type `1000000.00` in the bill field, `100` in tip, `100` in people.

| | Bill message | Result |
|---|---|---|
| Copy | "Enter 1000000.00 or less." | none |
| Original | none | Tip amount 1000000.00, total with tip 2000000.00, "100 people pay 20000.00 each" |

The message contradicts the value typed. `1000000`, `1000000.0` and `1000000,00` trigger it too. `999999.99` and every lower bill behave as in the original; I ran `999999.99`, `100`, `100` and `100.00`, `18`, `4` in Chromium and both files gave the same result.

## Roles of rule 13.1 that must find it

- **1, correctness auditor.** The spot case is 1 of C3's named tests, so running C3 as written finds it.
- **4, adversarial tester.** The upper limit of the bill is a boundary that this role tests.

A reader of line 92 can also find it: the comparison does not match the message built on line 88.
