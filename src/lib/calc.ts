import type { NumbersData } from "@/lib/cms";

export function epMinimum(numbers: NumbersData, age: number, finance: boolean): number {
  const key = finance ? "finance" : "general";
  const clamped = Math.min(45, Math.max(23, Math.round(age)));
  const anchors = numbers.epAnchors;
  if (clamped <= anchors[0].age) return anchors[0][key];
  if (clamped >= anchors[anchors.length - 1].age) return anchors[anchors.length - 1][key];
  for (let i = 0; i < anchors.length - 1; i++) {
    const a = anchors[i];
    const b = anchors[i + 1];
    if (clamped >= a.age && clamped <= b.age) {
      const t = (clamped - a.age) / (b.age - a.age);
      return Math.round((a[key] + t * (b[key] - a[key])) / 100) * 100;
    }
  }
  return anchors[0][key];
}

export function residentTax(numbers: NumbersData, chargeable: number): number {
  let remaining = Math.max(0, chargeable);
  let prev = 0;
  let tax = 0;
  for (const b of numbers.taxBrackets) {
    const cap = b.upTo ?? Number.POSITIVE_INFINITY;
    const span = Math.min(remaining, cap - prev);
    if (span <= 0) break;
    tax += span * b.rate;
    remaining -= span;
    prev = cap;
    if (remaining <= 0) break;
  }
  return Math.round(tax);
}
