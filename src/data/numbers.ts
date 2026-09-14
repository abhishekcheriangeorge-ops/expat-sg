/** Canonical 2026 figures. Edit this file on GitHub to update calculators. */

export const EP_SALARY = {
  general: { age23: 5600, age45: 10700 },
  finance: { age23: 6200, age45: 11800 },
  compassExempt: 22500,
  nextYearGeneral: 6000,
  nextYearFinance: 6600,
  nextYearFrom: "1 January 2027",
} as const;

export const SPASS_SALARY = {
  general: { age23: 3300, age45: 4800 },
  finance: { age23: 3800, age45: 5650 },
  nextYearGeneral: 3600,
  nextYearFinance: 4000,
} as const;

/** Known MOM EP qualifying salary anchors (2026). Interpolated in between. */
export const EP_ANCHORS: { age: number; general: number; finance: number }[] = [
  { age: 23, general: 5600, finance: 6200 },
  { age: 28, general: 6800, finance: 7500 },
  { age: 34, general: 8200, finance: 9000 },
  { age: 40, general: 9500, finance: 10500 },
  { age: 45, general: 10700, finance: 11800 },
];

export function epMinimum(age: number, finance: boolean): number {
  const key = finance ? "finance" : "general";
  const clamped = Math.min(45, Math.max(23, Math.round(age)));
  const anchors = EP_ANCHORS;
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

/** Resident tax brackets — YA 2026 (income year 2025). Unchanged since YA 2024. */
export const TAX_BRACKETS: { upTo: number; rate: number }[] = [
  { upTo: 20_000, rate: 0 },
  { upTo: 30_000, rate: 0.02 },
  { upTo: 40_000, rate: 0.035 },
  { upTo: 80_000, rate: 0.07 },
  { upTo: 120_000, rate: 0.115 },
  { upTo: 160_000, rate: 0.15 },
  { upTo: 200_000, rate: 0.18 },
  { upTo: 240_000, rate: 0.19 },
  { upTo: 280_000, rate: 0.195 },
  { upTo: 320_000, rate: 0.2 },
  { upTo: 500_000, rate: 0.22 },
  { upTo: 1_000_000, rate: 0.23 },
  { upTo: Infinity, rate: 0.24 },
];

export function residentTax(chargeable: number): number {
  let remaining = Math.max(0, chargeable);
  let prev = 0;
  let tax = 0;
  for (const b of TAX_BRACKETS) {
    const span = Math.min(remaining, b.upTo - prev);
    if (span <= 0) break;
    tax += span * b.rate;
    remaining -= span;
    prev = b.upTo;
    if (remaining <= 0) break;
  }
  return Math.round(tax);
}

export const GST = 0.09;
export const NON_RESIDENT_EMPLOYMENT_RATE = 0.15;
export const NON_RESIDENT_OTHER_RATE = 0.24;

export const CPF = {
  ordinaryWageCeiling: 8000,
  employeeRate: 0.2,
  employerRate: 0.17,
  note: "EP and S Pass holders do not contribute to CPF. CPF applies to citizens and PRs only.",
} as const;

export const TRANSPORT = {
  mrtMin: 1.28,
  mrtMax: 2.57,
  adultMonthly: 122,
  simplyGo: true,
  earlyBirdDiscount: 0.5,
} as const;

export const LIVING = {
  hawkerMeal: [4, 8] as [number, number],
  coffeeShopMeal: [6, 12] as [number, number],
  midRestaurant: [25, 60] as [number, number],
  gym: [80, 250] as [number, number],
  helper: [850, 1200] as [number, number],
  helperLevy: 300,
  prepaidSim: [10, 30] as [number, number],
  postpaid: [20, 50] as [number, number],
  fibre1g: [29, 45] as [number, number],
  gpVisitPrivate: [40, 90] as [number, number],
  privateHospitalNight: [700, 1500] as [number, number],
} as const;

export const RENT = {
  ccr: { br1: [3500, 6000], br2: [5500, 10000], br3: [8000, 18000] },
  rcr: { br1: [2800, 4500], br2: [4000, 7500], br3: [6000, 12000] },
  ocr: { br1: [2200, 3500], br2: [3000, 5000], br3: [4500, 8000] },
} as const;

export const STAMP_DUTY_LEASE = 0.004; // 0.4% of total rent for leases > 1 year, typical

export const COMPASS = {
  passMark: 40,
  exemptSalary: 22500,
  c1: [
    { label: "At or above 90th percentile of local PMET pay (age + sector)", points: 20 },
    { label: "65th to under 90th percentile", points: 10 },
    { label: "Below 65th percentile", points: 0 },
  ],
  c2: [
    { label: "Top-tier institution (MOM list)", points: 20 },
    { label: "Degree-equivalent qualification", points: 10 },
    { label: "No degree-equivalent qualification", points: 0 },
  ],
  c3: [
    { label: "Candidate nationality under 5% of firm PMETs", points: 20 },
    { label: "5% to under 25%", points: 10 },
    { label: "25% or more", points: 0 },
  ],
  c4: [
    { label: "Local PMET share at or above 50th percentile of subsector", points: 20 },
    { label: "20th to under 50th percentile", points: 10 },
    { label: "Under 20th percentile", points: 0 },
  ],
  c5: { sol: 20, solReduced: 10 },
  c6: 10,
  smallFirmDefault: 10,
} as const;
