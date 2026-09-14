import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Page } from "@/components/page";
import { neighbourhoods } from "@/data";
import { sgd } from "@/lib/utils";

export const Route = createFileRoute("/neighbourhoods/$slug")({
  component: HoodPage,
});

function HoodPage() {
  const { slug } = Route.useParams();
  const n = neighbourhoods.find((x) => x.slug === slug);
  if (!n) throw notFound();

  const rents = [
    { label: "1-bed", range: n.rent1br },
    { label: "2-bed", range: n.rent2br },
    { label: "3-bed", range: n.rent3br },
  ];

  return (
    <Page className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        <AppLink to="/neighbourhoods" className="hover:text-primary">
          Neighbourhoods
        </AppLink>
        <span className="mx-2">/</span>
        {n.district} · {n.region}
      </p>
      <h1 className="mt-3 font-display text-4xl font-medium tracking-tight">{n.name}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{n.blurb}</p>

      <div className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3">
        {rents.map((r) => (
          <div key={r.label} className="bg-surface px-4 py-4">
            <p className="text-xs uppercase tracking-[0.14em] text-muted">{r.label} / month</p>
            <p className="mt-1 font-display text-xl tabular-nums">
              {sgd(r.range[0])}–{sgd(r.range[1])}
            </p>
          </div>
        ))}
      </div>

      <dl className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-muted">Best for</dt>
          <dd className="mt-1">{n.bestFor.join(" · ")}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-muted">CBD commute</dt>
          <dd className="mt-1">{n.commuteCbd}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-muted">MRT</dt>
          <dd className="mt-1">{n.mrt.join(", ")}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-muted">Schools nearby</dt>
          <dd className="mt-1">{n.schools.join(", ")}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-xs uppercase tracking-[0.14em] text-muted">Vibe</dt>
          <dd className="mt-1 leading-relaxed">{n.vibe}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-muted">Eat</dt>
          <dd className="mt-1">{n.eat.join(", ")}</dd>
        </div>
        <div>
          <dt className="text-xs uppercase tracking-[0.14em] text-muted">Watch</dt>
          <dd className="mt-1 leading-relaxed">{n.watch}</dd>
        </div>
      </dl>

      <div className="mt-10 flex gap-4 text-sm">
        <AppLink to="/guides/renting-in-singapore" className="text-primary">
          Renting guide
        </AppLink>
        <AppLink to="/directory/housing" className="text-primary">
          Housing agents
        </AppLink>
      </div>
    </Page>
  );
}
