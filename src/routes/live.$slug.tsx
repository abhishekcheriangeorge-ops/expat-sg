import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Blocks } from "@/components/blocks";
import { Page } from "@/components/page";
import { SponsoredBadge } from "@/components/sponsored";
import { useCorpus } from "@/lib/corpus";

export const Route = createFileRoute("/live/$slug")({
  component: StoryPage,
});

function StoryPage() {
  const { slug } = Route.useParams();
  const { stories } = useCorpus();
  const story = stories.find((s) => s.slug === slug);
  if (!story) throw notFound();
  const related = stories.filter((s) => s.category === story.category && s.slug !== slug).slice(0, 3);

  return (
    <div>
      {story.hero ? (
        <div className="border-b border-border bg-sunken">
          <img
            src={story.hero}
            alt=""
            className="mx-auto h-[42vw] max-h-[420px] min-h-56 w-full max-w-6xl object-cover"
          />
        </div>
      ) : null}
      <Page className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
          <AppLink to="/live" className="hover:text-primary">
            Live
          </AppLink>
          <span className="mx-2">/</span>
          {story.kicker}
        </p>
        <div className="mt-3 flex items-center gap-2">
          {story.sponsored ? <SponsoredBadge /> : null}
          <span className="text-sm text-subtle">
            {story.updated} · {story.readMinutes} min read
          </span>
        </div>
        <h1 className="mt-3 font-display text-4xl font-medium leading-[1.1] tracking-tight">{story.title}</h1>
        <p className="mt-4 text-lg leading-relaxed text-muted">{story.excerpt}</p>
        <article className="mt-10">
          <Blocks body={story.body} />
        </article>
        {related.length > 0 ? (
          <aside className="mt-16 border-t border-border pt-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">More in {story.kicker}</p>
            <ul className="mt-4 flex flex-col gap-3">
              {related.map((r) => (
                <li key={r.slug}>
                  <AppLink to={`/live/${r.slug}`} className="font-display text-xl font-medium hover:text-primary">
                    {r.title}
                  </AppLink>
                  <p className="mt-1 text-sm text-muted">{r.excerpt}</p>
                </li>
              ))}
            </ul>
          </aside>
        ) : null}
      </Page>
    </div>
  );
}
