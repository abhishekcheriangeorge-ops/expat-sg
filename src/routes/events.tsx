import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Page, Eyebrow } from "@/components/page";
import { useCorpus } from "@/lib/corpus";

export const Route = createFileRoute("/events")({
  component: EventsPage,
});

function EventsPage() {
  const { events, eventsLead } = useCorpus();
  const dated = events.filter((e) => e.when !== "recurring");
  const recurring = events.filter((e) => e.when === "recurring");

  return (
    <Page>
      <Eyebrow>Events</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">What’s on</h1>
      <p className="mt-3 max-w-2xl text-muted">{eventsLead}</p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-medium tracking-tight">Dated</h2>
        <ul className="mt-5 flex flex-col gap-3">
          {dated.map((e) => (
            <li key={e.id}>
              <AppLink
                to={e.href}
                className="grid gap-2 rounded-xl border border-border bg-surface p-5 hover:border-fg/25 sm:grid-cols-[10rem_1fr]"
              >
                <p className="text-sm font-medium text-primary">{e.dates}</p>
                <div>
                  <p className="font-display text-xl font-medium tracking-tight">{e.title}</p>
                  <p className="mt-1 text-sm text-muted">{e.venue}</p>
                  <p className="mt-2 text-sm leading-relaxed">{e.blurb}</p>
                </div>
              </AppLink>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-medium tracking-tight">Every week</h2>
        <ul className="mt-5 grid gap-3 sm:grid-cols-2">
          {recurring.map((e) => (
            <li key={e.id}>
              <AppLink
                to={e.href}
                className="block h-full rounded-xl border border-border bg-surface p-5 hover:border-fg/25"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{e.dates}</p>
                <p className="mt-2 font-display text-xl font-medium">{e.title}</p>
                <p className="mt-1 text-sm text-muted">{e.venue}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{e.blurb}</p>
              </AppLink>
            </li>
          ))}
        </ul>
      </section>
    </Page>
  );
}
