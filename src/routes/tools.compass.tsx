import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page, Eyebrow } from "@/components/page";
import { AppLink } from "@/components/app-link";
import { useCorpus } from "@/lib/corpus";

export const Route = createFileRoute("/tools/compass")({
  component: CompassTool,
});

function CompassTool() {
  const { numbers } = useCorpus();
  const COMPASS = numbers.compass;
  const [c1, setC1] = useState(10);
  const [c2, setC2] = useState(10);
  const [c3, setC3] = useState(10);
  const [c4, setC4] = useState(10);
  const [sol, setSol] = useState(false);
  const [solReduced, setSolReduced] = useState(false);
  const [c6, setC6] = useState(false);
  const [exempt, setExempt] = useState(false);

  const c5 = sol ? (solReduced ? COMPASS.c5.solReduced : COMPASS.c5.sol) : 0;
  const bonus6 = c6 ? COMPASS.c6 : 0;
  const total = useMemo(() => c1 + c2 + c3 + c4 + c5 + bonus6, [c1, c2, c3, c4, c5, bonus6]);
  const pass = exempt || total >= COMPASS.passMark;

  return (
    <Page className="max-w-3xl">
      <Eyebrow>Tools</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">COMPASS scorer</h1>
      <p className="mt-3 text-muted">
        40 points to pass. Small firms (under 25 PMETs) score 10 on C3 and C4 by default. This is the published rubric —
        not MOM’s SAT.
      </p>

      <label className="mt-6 flex h-12 items-center gap-3 rounded-md border border-border bg-surface px-4 text-sm">
        <input type="checkbox" checked={exempt} onChange={(e) => setExempt(e.target.checked)} />
        Fixed monthly salary ≥ S$22,500 (COMPASS-exempt)
      </label>

      <div className="mt-6 flex flex-col gap-5">
        <SelectRow label="C1 Salary vs local PMET (age + sector)" value={c1} onChange={setC1} options={COMPASS.c1} />
        <SelectRow label="C2 Qualifications" value={c2} onChange={setC2} options={COMPASS.c2} />
        <SelectRow label="C3 Diversity (nationality share of firm PMETs)" value={c3} onChange={setC3} options={COMPASS.c3} />
        <SelectRow label="C4 Support for local employment" value={c4} onChange={setC4} options={COMPASS.c4} />
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" className="mt-1" checked={sol} onChange={(e) => setSol(e.target.checked)} />
          <span>
            C5 Job on Shortage Occupation List (+{COMPASS.c5.sol}, or +{COMPASS.c5.solReduced} if nationality already
            ≥1/3 of PMETs)
          </span>
        </label>
        {sol ? (
          <label className="ml-7 flex items-center gap-3 text-sm">
            <input type="checkbox" checked={solReduced} onChange={(e) => setSolReduced(e.target.checked)} />
            Nationality already ≥ one-third of firm PMETs
          </label>
        ) : null}
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={c6} onChange={(e) => setC6(e.target.checked)} />
          C6 Firm meets strategic economic priorities (+{COMPASS.c6})
        </label>
      </div>

      <div className="mt-8 rounded-xl border border-border bg-sunken p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">Score</p>
        <p className="mt-1 font-display text-5xl tabular-nums tracking-tight">{exempt ? "—" : total}</p>
        <p className={`mt-3 text-sm font-medium ${pass ? "text-ok" : "text-danger"}`}>
          {exempt ? "Exempt from COMPASS." : pass ? "Clears the 40-point pass mark." : `${COMPASS.passMark - total} points short.`}
        </p>
      </div>
      <p className="mt-4 text-sm">
        <AppLink to="/guides/compass-explained" className="text-primary">
          How COMPASS is scored
        </AppLink>
      </p>
    </Page>
  );
}

function SelectRow({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: number;
  onChange: (n: number) => void;
  options: readonly { label: string; points: number }[];
}) {
  return (
    <label className="flex flex-col gap-2 text-sm">
      {label}
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-11 rounded-md border border-border bg-surface px-3"
      >
        {options.map((o) => (
          <option key={o.label} value={o.points}>
            {o.points} pts — {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
