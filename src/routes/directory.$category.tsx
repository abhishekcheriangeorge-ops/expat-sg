import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Page } from "@/components/page";
import { SponsoredBadge } from "@/components/sponsored";
import { useCorpus } from "@/lib/corpus";
import type { DirectoryCategory } from "@/data/types";

export const Route = createFileRoute("/directory/$category")({
  component: DirectoryCategoryPage,
});

function DirectoryCategoryPage() {
  const { category } = Route.useParams();
  const { directoryCategories, listings } = useCorpus();
  const meta = directoryCategories.find((c) => c.id === category);
  if (!meta) throw notFound();
  const items = listings
    .filter((l) => l.category === (category as DirectoryCategory))
    .sort((a, b) => Number(!!b.sponsored) - Number(!!a.sponsored));

  return (
    <Page className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        <AppLink to="/directory" className="hover:text-primary">
          Directory
        </AppLink>
      </p>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">{meta.label}</h1>
      <p className="mt-3 text-muted">{meta.blurb}</p>
      <ul className="mt-8 flex flex-col gap-3">
        {items.map((l) => (
          <li key={l.id} id={l.id}>
            <a
              href={l.url}
              target="_blank"
              rel="noreferrer"
              className="block rounded-xl border border-border bg-surface p-5 hover:border-fg/25"
            >
              <div className="flex items-center gap-2">
                {l.sponsored ? <SponsoredBadge /> : null}
                {l.area ? <span className="text-xs text-subtle">{l.area}</span> : null}
              </div>
              <p className="mt-2 font-display text-xl font-medium">{l.name}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted">{l.blurb}</p>
            </a>
          </li>
        ))}
      </ul>
    </Page>
  );
}
