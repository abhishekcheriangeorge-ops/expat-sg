import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Page, Eyebrow } from "@/components/page";
import { neighbourhoods } from "@/data";
import { sgd } from "@/lib/utils";

export const Route = createFileRoute("/neighbourhoods/")({
  component: Hoods,
});

function Hoods() {
  return (
    <Page>
      <Eyebrow>Neighbourhoods</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">Twelve places, with rents</h1>
      <p className="mt-3 max-w-2xl text-muted">
        CCR is convenience. RCR is the value most EP households should look at first. OCR is space and school-run
        geography. Rents are 2026 planning ranges for private condos.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {neighbourhoods.map((n) => (
          <AppLink
            key={n.slug}
            to={`/neighbourhoods/${n.slug}`}
            className="rounded-xl border border-border bg-surface p-5 hover:border-fg/25"
          >
            <div className="flex items-baseline justify-between gap-3">
              <h2 className="font-display text-2xl font-medium tracking-tight">{n.name}</h2>
              <span className="text-xs uppercase tracking-[0.14em] text-muted">
                {n.district} · {n.region}
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{n.blurb}</p>
            <p className="mt-4 text-sm tabular-nums">
              1-bed {sgd(n.rent1br[0])}–{sgd(n.rent1br[1])}
              <span className="mx-2 text-subtle">·</span>
              2-bed {sgd(n.rent2br[0])}–{sgd(n.rent2br[1])}
            </p>
            <p className="mt-1 text-xs text-subtle">CBD {n.commuteCbd} · {n.mrt[0]}</p>
          </AppLink>
        ))}
      </div>
    </Page>
  );
}
