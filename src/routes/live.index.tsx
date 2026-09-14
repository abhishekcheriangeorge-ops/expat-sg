import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Page, Eyebrow } from "@/components/page";
import { useCorpus } from "@/lib/corpus";
import { FeaturedStory, StoryCard } from "@/components/story-card";
import { cn } from "@/lib/utils";

type Search = { cat?: string };

export const Route = createFileRoute("/live/")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    cat: typeof s.cat === "string" ? s.cat : undefined,
  }),
  component: LiveIndex,
});

function LiveIndex() {
  const { cat } = Route.useSearch();
  const { stories, events, site, eventsLead } = useCorpus();
  const list = cat ? stories.filter((s) => s.category === cat) : stories;
  const lead = list.find((s) => s.featured && s.hero) ?? list[0];
  const rest = list.filter((s) => s.slug !== lead?.slug);

  return (
    <div>
      <section className="border-b border-border bg-surface">
        <Page className="py-10 sm:py-12">
          <Eyebrow>Live</Eyebrow>
          <h1 className="mt-2 max-w-3xl font-display text-4xl font-medium tracking-tight sm:text-5xl">
            For people who live here.
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted sm:text-lg">
            Hawker orders, weekends that are not Orchard, the festival calendar, the repeating rooms where you actually
            make friends. The visa is in Guides. This is the rest of the week.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <AppLink
              to="/live"
              className={cn(
                "rounded-full border px-3 py-1.5 text-sm",
                !cat ? "border-fg bg-fg text-bg" : "border-border",
              )}
            >
              All
            </AppLink>
            {(site.liveCategories ?? []).map((c) => (
              <AppLink
                key={c.id}
                to={`/live?cat=${c.id}`}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm",
                  cat === c.id ? "border-fg bg-fg text-bg" : "border-border",
                )}
              >
                {c.label}
              </AppLink>
            ))}
          </div>
        </Page>
      </section>

      {lead ? (
        <Page className="pt-8">
          <FeaturedStory story={lead} />
        </Page>
      ) : null}

      <Page className="pt-0">
        <div className="grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="grid gap-6 sm:grid-cols-2">
              {rest.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          </div>
          <aside>
            <Eyebrow>What’s on</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">The next few weeks</h2>
            <p className="mt-2 text-sm text-muted">{eventsLead}</p>
            <ul className="mt-5 flex flex-col gap-3">
              {events.slice(0, 5).map((e) => (
                <li key={e.id}>
                  <AppLink
                    to={e.href}
                    className="block rounded-xl border border-border bg-surface p-4 hover:border-fg/25"
                  >
                    <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                      {e.dates}
                    </p>
                    <p className="mt-1 font-medium">{e.title}</p>
                    <p className="mt-1 text-sm text-muted">{e.venue}</p>
                  </AppLink>
                </li>
              ))}
            </ul>
            <AppLink to="/events" className="mt-4 inline-block text-sm font-medium text-primary">
              Full calendar
            </AppLink>
          </aside>
        </div>
      </Page>
    </div>
  );
}
