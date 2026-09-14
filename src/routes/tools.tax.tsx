import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page, Eyebrow } from "@/components/page";
import { AppLink } from "@/components/app-link";
import { NON_RESIDENT_EMPLOYMENT_RATE, residentTax } from "@/data/numbers";
import { sgd } from "@/lib/utils";

export const Route = createFileRoute("/tools/tax")({
  component: TaxTool,
});

function TaxTool() {
  const [income, setIncome] = useState(120000);
  const [resident, setResident] = useState(true);
  const res = useMemo(() => residentTax(income), [income]);
  const nonRes = Math.max(income * NON_RESIDENT_EMPLOYMENT_RATE, res);
  const tax = resident ? res : nonRes;
  const eff = income > 0 ? tax / income : 0;

  return (
    <Page className="max-w-3xl">
      <Eyebrow>Tools</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">Income tax</h1>
      <p className="mt-3 text-muted">
        YA 2026 resident brackets on chargeable income. Reliefs are not modelled. Non-resident employment is the higher
        of 15% or the resident scale.
      </p>
      <div className="mt-8 grid gap-6 rounded-xl border border-border bg-surface p-5">
        <label className="flex flex-col gap-2 text-sm">
          Chargeable income (SGD / year)
          <input
            type="number"
            min={0}
            step={1000}
            value={income}
            onChange={(e) => setIncome(Number(e.target.value))}
            className="h-11 rounded-md border border-border bg-bg px-3 tabular-nums"
          />
        </label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setResident(true)}
            className={`h-11 rounded-md border px-4 text-sm ${resident ? "border-fg bg-fg text-bg" : "border-border"}`}
          >
            Tax resident (183+ days)
          </button>
          <button
            type="button"
            onClick={() => setResident(false)}
            className={`h-11 rounded-md border px-4 text-sm ${!resident ? "border-fg bg-fg text-bg" : "border-border"}`}
          >
            Non-resident
          </button>
        </div>
      </div>
      <div className="mt-6 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        <Stat label="Tax payable" value={sgd(tax)} />
        <Stat label="Effective rate" value={`${(eff * 100).toFixed(1)}%`} />
        <Stat label="Take-home" value={sgd(income - tax)} />
      </div>
      <p className="mt-4 text-sm text-muted">
        EP holders do not pay CPF.{" "}
        <AppLink to="/guides/income-tax-expats" className="text-primary">
          Tax guide
        </AppLink>
      </p>
    </Page>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-sunken px-4 py-4">
      <p className="text-xs uppercase tracking-[0.14em] text-muted">{label}</p>
      <p className="mt-1 font-display text-2xl tabular-nums">{value}</p>
    </div>
  );
}
