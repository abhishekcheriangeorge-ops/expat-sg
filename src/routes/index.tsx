import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Calculator, MapPin, Newspaper } from "lucide-react";
import { useMemo, useState } from "react";
import { AppLink } from "@/components/app-link";
import { Page, Eyebrow } from "@/components/page";
import { SearchTrigger, CommandSearch } from "@/components/search/command-search";
import { SponsoredBadge } from "@/components/sponsored";
import { FeaturedStory, StoryCard } from "@/components/story-card";
import { useCorpus } from "@/lib/corpus";
import { sgd } from "@/lib/utils";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { site, stats, ticker: tickerSrc, guides, listings, neighbourhoods, tools, stories, events } =
    useCorpus();
  const [open, setOpen] = useState(false);
  const featuredGuides = guides.filter((g) => g.featured).slice(0, 4);
  const premium = listings.filter((l) => l.sponsorTier === "premium");
  const lead = stories.find((s) => s.featured && s.hero) ?? stories[0];
  const moreStories = stories.filter((s) => s.slug !== lead?.slug).slice(0, 4);
  const navigate = useNavigate();
  const ticker = useMemo(() => [...tickerSrc, ...tickerSrc], [tickerSrc]);

  return (
    <div>
      <section className="border-b border-border bg-surface">
        <Page className="py-10 sm:py-14">
          <Eyebrow>Updated {site.updated}</Eyebrow>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-6xl">
            Singapore, lived in.
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            A magazine and a search box for people who already live here — and the ones on the plane. Hawker orders,
            F1 closures, visas, tax. Dated 2026.
          </p>
          <div className="mt-8 max-w-xl">
            <SearchTrigger onClick={() => setOpen(true)} />
            <p className="mt-2 text-xs text-subtle">Press / or ⌘K. Try hawker, F1, PayNow, Tiong Bahru.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <AppLink
              to="/live"
              className="rounded-xl border border-border bg-bg p-5 hover:border-fg/30"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Already here</p>
              <p className="mt-1 font-display text-xl font-medium">Live the week</p>
              <p className="mt-1 text-sm text-muted">Food, weekends, festivals, the repeating rooms where friends happen.</p>
            </AppLink>
            <AppLink
              to="/guides"
              className="rounded-xl border border-border bg-bg p-5 hover:border-fg/30"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">Moving here</p>
              <p className="mt-1 font-display text-xl font-medium">Guides & numbers</p>
              <p className="mt-1 text-sm text-muted">EP, COMPASS, rent, schools, tax — the paperwork, in English.</p>
            </AppLink>
          </div>
        </Page>
        <div className="overflow-hidden border-t border-border bg-sunken py-2">
          <div className="ticker-track flex w-max gap-8 px-4 text-xs uppercase tracking-[0.14em] text-muted">
            {ticker.map((t, i) => (
              <span key={i} className="shrink-0">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Page>
        {lead ? (
          <section>
            <div className="mb-6 flex items-end justify-between">
              <div>
                <Eyebrow>Live</Eyebrow>
                <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">This week’s magazine</h2>
              </div>
              <AppLink to="/live" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                All stories <ArrowRight className="size-4" />
              </AppLink>
            </div>
            <FeaturedStory story={lead} />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {moreStories.map((s) => (
                <StoryCard key={s.slug} story={s} />
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-16">
          <div className="flex items-end justify-between">
            <div>
              <Eyebrow>What’s on</Eyebrow>
              <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">Plan around the island</h2>
            </div>
            <AppLink to="/events" className="text-sm font-medium text-primary">
              Calendar
            </AppLink>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {events.slice(0, 4).map((e) => (
              <AppLink
                key={e.id}
                to={e.href}
                className="rounded-xl border border-border bg-surface p-5 hover:border-fg/25"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">{e.dates}</p>
                <p className="mt-2 font-display text-lg font-medium">{e.title}</p>
                <p className="mt-1 text-sm text-muted">{e.venue}</p>
              </AppLink>
            ))}
          </div>
        </section>

        <div className="mt-16 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-3 lg:grid-cols-6">
          {stats.map((s) => (
            <div key={s.label} className="bg-surface px-4 py-5">
              <p className="font-display text-2xl font-medium tabular-nums tracking-tight">{s.value}</p>
              <p className="mt-1 text-xs font-medium">{s.label}</p>
              <p className="mt-1 text-xs text-muted">{s.hint}</p>
            </div>
          ))}
        </div>

        {premium.length > 0 ? (
          <section className="mt-14">
            <div className="flex items-end justify-between gap-4">
              <div>
                <Eyebrow>Featured partners</Eyebrow>
                <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">On the island, on purpose</h2>
              </div>
              <AppLink to="/advertise" className="hidden text-sm font-medium text-primary sm:inline">
                Advertise
              </AppLink>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {premium.map((l) => (
                <a
                  key={l.id}
                  href={l.url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl border border-border bg-surface p-5 shadow-card hover:border-fg/25"
                >
                  <div className="flex items-center justify-between">
                    <SponsoredBadge />
                    <span className="text-[10px] uppercase tracking-[0.14em] text-subtle">{l.category}</span>
                  </div>
                  <p className="mt-3 font-display text-lg font-medium">{l.name}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{l.blurb}</p>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-16 grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="flex items-end justify-between">
              <div>
                <Eyebrow>Guides</Eyebrow>
                <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">Read before you sign</h2>
              </div>
              <AppLink to="/guides" className="inline-flex items-center gap-1 text-sm font-medium text-primary">
                All guides <ArrowRight className="size-4" />
              </AppLink>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {featuredGuides.map((g) => (
                <AppLink
                  key={g.slug}
                  to={`/guides/${g.slug}`}
                  className="group rounded-xl border border-border bg-surface p-5 hover:border-fg/25"
                >
                  <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                    <Newspaper className="size-3.5" />
                    {g.category}
                    {g.sponsored ? <SponsoredBadge /> : null}
                  </div>
                  <h3 className="mt-2 font-display text-xl font-medium tracking-tight group-hover:text-primary">
                    {g.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">{g.excerpt}</p>
                </AppLink>
              ))}
            </div>
            <div className="mt-12">
            <Eyebrow>Neighbourhoods</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">Where people actually live</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {neighbourhoods.slice(0, 4).map((n) => (
                <AppLink
                  key={n.slug}
                  to={`/neighbourhoods/${n.slug}`}
                  className="rounded-xl border border-border bg-surface p-4 hover:border-fg/25"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-1.5 font-display text-lg font-medium">
                        <MapPin className="size-4 text-primary" />
                        {n.name}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {n.district} · {n.region} · CBD {n.commuteCbd}
                      </p>
                    </div>
                    <p className="text-right text-xs tabular-nums text-muted">
                      2-bed
                      <br />
                      <span className="text-fg">
                        {sgd(n.rent2br[0])}–{sgd(n.rent2br[1])}
                      </span>
                    </p>
                  </div>
                </AppLink>
              ))}
            </div>
            </div>
          </div>
          <div>
            <Eyebrow>Tools</Eyebrow>
            <h2 className="mt-2 font-display text-2xl font-medium tracking-tight">Run the numbers</h2>
            <ul className="mt-6 flex flex-col gap-3">
              {tools.map((t) => (
                <li key={t.slug}>
                  <AppLink
                    to={t.href}
                    className="flex gap-3 rounded-xl border border-border bg-surface p-4 hover:border-fg/25"
                  >
                    <Calculator className="mt-0.5 size-4 shrink-0 text-primary" />
                    <span>
                      <span className="block font-medium">{t.title}</span>
                      <span className="mt-1 block text-sm text-muted">{t.excerpt}</span>
                    </span>
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-16 rounded-xl border border-border bg-primary px-6 py-10 text-primary-fg sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] opacity-80">Hyper-local inventory</p>
          <h2 className="mt-2 max-w-xl font-display text-3xl font-medium tracking-tight">
            Advertisers buy the people who already spend here.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed opacity-90">
            Residents grocery-shop, school, insure, dine, hire helpers. Inbound offer-letter week is on top. Search slots,
            Live stories, directory — labelled.
          </p>
          <button
            type="button"
            className="mt-6 inline-flex h-11 items-center rounded-md bg-surface px-4 text-sm font-medium text-fg"
            onClick={() => void navigate({ to: "/advertise" })}
          >
            See packages
          </button>
        </section>
      </Page>
      <CommandSearch open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
