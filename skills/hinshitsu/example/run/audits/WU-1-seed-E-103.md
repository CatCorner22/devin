devin-143e89c14e814635a1c564da4b3c1a43

# Seeder report

Commit: `b24ac5fcc6662e4ae20282371a10febd1a10d3eb` on `devin/hinshitsu-build`. Nothing committed or pushed.

**File and line changed:** `skills/hinshitsu/example/run/review/index.html`, line 74 (1 line, 1 character). The original `skills/hinshitsu/example/index.html` is unchanged.

**Before:**

```js
  var m = /^(\d+)(?:\.(\d{1,2}))?$/.exec(s);
```

**After:**

```js
  var m = /^(\d+)(?:\.(\d{0,2}))?$/.exec(s);
```

**CRITERION that now fails:** C4. An amount must be digits with an optional dot followed by 1 or 2 digits, and `10.` must get a message and no result. The copy now accepts a bill that ends in a dot.

**Trigger:** open the copy in Chrome. Type `10.` as the bill, `15` as the tip and `1` as the people. The copy shows no error beside the bill and shows a result (Bill 10.00, tip amount 1.50, total 11.50). The original shows the message "Enter an amount above 0 in digits, with at most 2 digits after a dot. Example: 12.50" and no result. All other C4 inputs, and the C2 and C3 tests, behave as in the original.

**Roles of rule 13.1 that must find it:** 1 correctness auditor (C4's test names `10.` as an input to type) and 4 adversarial tester (malformed-input probing of the bill field).

**SHA-256:**

- Seeded copy: `68a527cccb35991429c8bbee059448a042af80b62eeb6c91a8ce146fc54d57e5`
- Original: `11570cbe2cd97be8cb70a31f50aa15a63346cb9ad6f435e22f4fd0b69c3b8184`

**Verification done:** I tested the 2 patterns in Node against `10.`, `10.5`, `10.50`, `10`, `.5` and `10.555`; only `10.` differs. I did not run the copy in a browser; the result values above follow from reading lines 76-81.

I did not read `AUDIT-LOG.md`.
