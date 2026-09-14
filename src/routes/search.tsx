import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AppLink } from "@/components/app-link";
import { Page, Eyebrow } from "@/components/page";
import { SponsoredBadge } from "@/components/sponsored";
import { kindLabel, searchDocs } from "@/lib/search";

type Search = { q: string };

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    q: typeof s.q === "string" ? s.q : "",
  }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const navigate = useNavigate();
  const [draft, setDraft] = useState(q);
  const results = useMemo(() => searchDocs(q, 40), [q]);

  return (
    <Page>
      <Eyebrow>Search</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">The index</h1>
      <form
        className="mt-6"
        onSubmit={(e) => {
          e.preventDefault();
          void navigate({ to: "/search", search: { q: draft } });
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          className="h-12 w-full max-w-xl rounded-md border border-border bg-surface px-4 text-base outline-none ring-ring focus:ring-2"
          placeholder="Try EP, COMPASS, Katong, Tanglin, tax…"
        />
      </form>
      <p className="mt-3 text-sm text-muted">
        {q ? (
          <>
            {results.length} results for <span className="text-fg">“{q}”</span>
          </>
        ) : (
          "Type to search guides, areas, schools, tools and the directory. Sponsored results sit at the top when they match."
        )}
      </p>
      <ul className="mt-8 flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
        {results.map((r) => (
          <li key={r.id}>
            <AppLink to={r.href} className="block px-4 py-4 hover:bg-sunken">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                  {kindLabel(r.kind)}
                </span>
                {r.sponsored ? <SponsoredBadge /> : null}
              </div>
              <p className="mt-1 font-display text-xl font-medium tracking-tight">{r.title}</p>
              <p className="mt-1 line-clamp-2 text-sm text-muted">{r.excerpt}</p>
            </AppLink>
          </li>
        ))}
      </ul>
    </Page>
  );
}
