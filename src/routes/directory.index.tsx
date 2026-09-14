import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Page, Eyebrow } from "@/components/page";
import { useCorpus } from "@/lib/corpus";

export const Route = createFileRoute("/directory/")({
  component: DirectoryIndex,
});

function DirectoryIndex() {
  const { directoryCategories, listings } = useCorpus();
  return (
    <Page>
      <Eyebrow>Directory</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">People who do this for a living</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Banks, movers, schools, clinics, insurers. Featured listings are paid and labelled.{" "}
        <AppLink to="/advertise" className="text-primary">
          Buy a position
        </AppLink>
        .
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {directoryCategories.map((c) => {
          const count = listings.filter((l) => l.category === c.id).length;
          const featured = listings.filter((l) => l.category === c.id && l.sponsored).length;
          return (
            <AppLink
              key={c.id}
              to={`/directory/${c.id}`}
              className="rounded-xl border border-border bg-surface p-5 hover:border-fg/25"
            >
              <h2 className="font-display text-xl font-medium tracking-tight">{c.label}</h2>
              <p className="mt-2 text-sm text-muted">{c.blurb}</p>
              <p className="mt-3 text-xs text-subtle">
                {count} listings · {featured} sponsored
              </p>
            </AppLink>
          );
        })}
      </div>
    </Page>
  );
}
