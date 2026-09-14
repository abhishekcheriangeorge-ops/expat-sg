import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Page, Eyebrow } from "@/components/page";
import { sgd } from "@/lib/utils";

export const Route = createFileRoute("/tools/cost-of-living")({
  component: ColTool,
});

function ColTool() {
  const [rent, setRent] = useState(4200);
  const [food, setFood] = useState(900);
  const [transport, setTransport] = useState(180);
  const [school, setSchool] = useState(0);
  const [helper, setHelper] = useState(0);
  const [insurance, setInsurance] = useState(250);
  const [other, setOther] = useState(500);
  const total = useMemo(
    () => rent + food + transport + school + helper + insurance + other,
    [rent, food, transport, school, helper, insurance, other],
  );

  const rows: [string, number, (n: number) => void, number][] = [
    ["Rent + utilities", rent, setRent, 18000],
    ["Food", food, setFood, 4000],
    ["Transport", transport, setTransport, 2000],
    ["School fees (monthly)", school, setSchool, 15000],
    ["Helper + levy", helper, setHelper, 2000],
    ["Health insurance top-up", insurance, setInsurance, 2500],
    ["Other", other, setOther, 4000],
  ];

  return (
    <Page className="max-w-3xl">
      <Eyebrow>Tools</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">Cost of living</h1>
      <p className="mt-3 text-muted">
        A monthly sketch in SGD. Housing and school dominate; hawker lunches do not. Drag until it looks like your life.
      </p>
      <div className="mt-8 flex flex-col gap-5 rounded-xl border border-border bg-surface p-5">
        {rows.map(([label, value, set, max]) => (
          <label key={label} className="grid gap-2 sm:grid-cols-[1fr_7rem] sm:items-center">
            <span className="flex items-center justify-between text-sm">
              {label}
              <span className="tabular-nums text-muted sm:hidden">{sgd(value)}</span>
            </span>
            <input
              type="range"
              min={0}
              max={max}
              step={50}
              value={value}
              onChange={(e) => set(Number(e.target.value))}
              className="accent-primary sm:col-span-2"
            />
            <span className="hidden text-right text-sm tabular-nums sm:block">{sgd(value)}</span>
          </label>
        ))}
      </div>
      <div className="mt-6 rounded-xl bg-primary px-5 py-6 text-primary-fg">
        <p className="text-xs uppercase tracking-[0.14em] opacity-80">Estimated monthly</p>
        <p className="mt-1 font-display text-5xl tabular-nums tracking-tight">{sgd(total)}</p>
        <p className="mt-2 text-sm opacity-80">≈ {sgd(total * 12)} / year, before tax.</p>
      </div>
    </Page>
  );
}
