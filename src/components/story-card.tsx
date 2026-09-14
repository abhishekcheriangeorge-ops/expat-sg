import { AppLink } from "@/components/app-link";
import { SponsoredBadge } from "@/components/sponsored";
import type { Story } from "@/data/types";

export function FeaturedStory({ story }: { story: Story }) {
  return (
    <AppLink
      to={`/live/${story.slug}`}
      className="group grid overflow-hidden rounded-xl border border-border bg-surface shadow-card lg:grid-cols-2"
    >
      {story.hero ? (
        <img src={story.hero} alt="" className="h-56 w-full object-cover sm:h-72 lg:h-full" />
      ) : (
        <div className="min-h-56 bg-sunken" />
      )}
      <div className="flex flex-col justify-end p-6 sm:p-8">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-primary">{story.kicker}</p>
        {story.sponsored ? (
          <span className="mt-2">
            <SponsoredBadge />
          </span>
        ) : null}
        <h2 className="mt-2 font-display text-3xl font-medium tracking-tight group-hover:text-primary sm:text-4xl">
          {story.title}
        </h2>
        <p className="mt-3 text-base leading-relaxed text-muted">{story.excerpt}</p>
        <p className="mt-4 text-xs text-subtle">
          {story.updated} · {story.readMinutes} min
        </p>
      </div>
    </AppLink>
  );
}

export function StoryCard({ story }: { story: Story }) {
  return (
    <AppLink
      to={`/live/${story.slug}`}
      className="group flex flex-col overflow-hidden rounded-xl border border-border bg-surface hover:border-fg/25"
    >
      {story.hero ? <img src={story.hero} alt="" className="h-44 w-full object-cover" /> : null}
      <div className="flex flex-1 flex-col p-5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-primary">{story.kicker}</p>
        <h3 className="mt-2 font-display text-xl font-medium tracking-tight group-hover:text-primary">{story.title}</h3>
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{story.excerpt}</p>
        <p className="mt-3 text-xs text-subtle">
          {story.updated} · {story.readMinutes} min
        </p>
      </div>
    </AppLink>
  );
}
