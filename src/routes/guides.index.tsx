import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Page, Eyebrow } from "@/components/page";
import { SponsoredBadge } from "@/components/sponsored";
import { CATEGORY_LABEL, guides } from "@/data";
import type { GuideCategory } from "@/data/types";

type Search = { cat?: string };

export const Route = createFileRoute("/guides/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: typeof s.cat === "string" ? s.cat : undefined,
  }),
  component: GuidesIndex,
});

function GuidesIndex() {
  const { cat } = Route.useSearch();
  const cats = Array.from(new Set(guides.map((g) => g.category)));
  const list = cat ? guides.filter((g) => g.category === cat) : guides;

  return (
    <Page>
      <Eyebrow>Guides</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">Plain-English, dated 2026</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Cross-checked against MOM, ICA, IRAS and school fee schedules. Sponsored pieces are labelled.
      </p>
      <div className="mt-6 flex flex-wrap gap-2">
        <AppLink
          to="/guides"
          className={`rounded-full border px-3 py-1.5 text-sm ${!cat ? "border-fg bg-fg text-bg" : "border-border"}`}
        >
          All
        </AppLink>
        {cats.map((c) => (
          <AppLink
            key={c}
            to={`/guides?cat=${c}`}
            className={`rounded-full border px-3 py-1.5 text-sm ${cat === c ? "border-fg bg-fg text-bg" : "border-border"}`}
          >
            {CATEGORY_LABEL[c as GuideCategory] ?? c}
          </AppLink>
        ))}
      </div>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {list.map((g) => (
          <AppLink
            key={g.slug}
            to={`/guides/${g.slug}`}
            className="rounded-xl border border-border bg-surface p-5 hover:border-fg/25"
          >
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {CATEGORY_LABEL[g.category]}
              {g.sponsored ? <SponsoredBadge /> : null}
            </div>
            <h2 className="mt-2 font-display text-xl font-medium tracking-tight">{g.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted">{g.excerpt}</p>
            <p className="mt-3 text-xs text-subtle">
              {g.updated} · {g.readMinutes} min
            </p>
          </AppLink>
        ))}
      </div>
    </Page>
  );
}
