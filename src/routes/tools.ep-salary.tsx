import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page, Eyebrow } from "@/components/page";
import { AppLink } from "@/components/app-link";
import { EP_SALARY, epMinimum } from "@/data/numbers";
import { sgd } from "@/lib/utils";

export const Route = createFileRoute("/tools/ep-salary")({
  component: EpSalary,
});

function EpSalary() {
  const [age, setAge] = useState(32);
  const [finance, setFinance] = useState(false);
  const [salary, setSalary] = useState(8000);
  const min = useMemo(() => epMinimum(age, finance), [age, finance]);
  const ok = salary >= min;
  const exempt = salary >= EP_SALARY.compassExempt;

  return (
    <Page className="max-w-3xl">
      <Eyebrow>Tools</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">EP salary check</h1>
      <p className="mt-3 text-muted">
        Qualifying salary only — Stage 1. You still need 40 COMPASS points unless you hit {sgd(EP_SALARY.compassExempt)}{" "}
        a month.
      </p>
      <div className="mt-8 grid gap-6 rounded-xl border border-border bg-surface p-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          Age
          <input
            type="range"
            min={22}
            max={55}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <span className="tabular-nums text-muted">{age}</span>
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Fixed monthly salary (SGD)
          <input
            type="number"
            min={0}
            step={100}
            value={salary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="h-11 rounded-md border border-border bg-bg px-3 tabular-nums"
          />
        </label>
        <fieldset className="sm:col-span-2">
          <legend className="text-sm">Sector</legend>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => setFinance(false)}
              className={`h-11 rounded-md border px-4 text-sm ${!finance ? "border-fg bg-fg text-bg" : "border-border"}`}
            >
              Most sectors
            </button>
            <button
              type="button"
              onClick={() => setFinance(true)}
              className={`h-11 rounded-md border px-4 text-sm ${finance ? "border-fg bg-fg text-bg" : "border-border"}`}
            >
              Financial services
            </button>
          </div>
        </fieldset>
      </div>

      <div className="mt-6 rounded-xl border border-border bg-sunken p-5">
        <p className="text-xs uppercase tracking-[0.14em] text-muted">2026 qualifying salary</p>
        <p className="mt-1 font-display text-4xl tabular-nums tracking-tight">{sgd(min)}</p>
        <p className={`mt-3 text-sm font-medium ${ok ? "text-ok" : "text-danger"}`}>
          {ok
            ? `Clears Stage 1 by ${sgd(salary - min)}.`
            : `Short by ${sgd(min - salary)} / month on fixed pay.`}
        </p>
        <p className="mt-2 text-sm text-muted">
          {exempt
            ? "At this salary, COMPASS is typically exempt."
            : `COMPASS still applies below ${sgd(EP_SALARY.compassExempt)} fixed monthly.`}
        </p>
      </div>
      <p className="mt-4 text-sm text-muted">
        From {EP_SALARY.nextYearFrom}, new EP floors rise to {sgd(EP_SALARY.nextYearGeneral)} /{" "}
        {sgd(EP_SALARY.nextYearFinance)} finance.{" "}
        <AppLink to="/guides/employment-pass-2026" className="text-primary">
          Full EP guide
        </AppLink>
        {" · "}
        <AppLink to="/tools/compass" className="text-primary">
          COMPASS scorer
        </AppLink>
      </p>
    </Page>
  );
}
