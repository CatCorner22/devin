// Checks the 2 claims of A-4. Run: node skills/hinshitsu/example/run/evidence/a4-check.js
function toCents(s) {
  const m = /^(\d+)(?:\.(\d{1,2}))?$/.exec(s);
  if (!m) return null;
  return parseInt(m[1], 10) * 100 + parseInt(((m[2] || "") + "00").slice(0, 2), 10);
}
let bad = 0;
for (let c = 1; c <= 100000000; c += 1) {
  const s = Math.floor(c / 100) + "." + String(c % 100).padStart(2, "0");
  if (toCents(s) !== c) bad++;
}
console.log("digits-to-cents: every amount from 0.01 to 1000000.00 checked; wrong:", bad);
const top = 100000000 * 100 + 50;
console.log("largest product billCents*tipPercent+50 =", top, "; safe integer:", Number.isSafeInteger(top));
const tip = (b, t) => Math.floor((b * t + 50) / 100);
console.log("tip cents: 0.30 at 15 =", tip(30, 15), "; 10.10 at 15 =", tip(1010, 15), "; 12.25 at 18 =", tip(1225, 18));
