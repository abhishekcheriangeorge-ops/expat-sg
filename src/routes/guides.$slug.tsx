import { createFileRoute, notFound } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Blocks } from "@/components/blocks";
import { Page } from "@/components/page";
import { SponsoredBadge } from "@/components/sponsored";
import { CATEGORY_LABEL, guides } from "@/data";

export const Route = createFileRoute("/guides/$slug")({
  component: GuidePage,
});

function GuidePage() {
  const { slug } = Route.useParams();
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) throw notFound();
  const related = guides.filter((g) => g.category === guide.category && g.slug !== slug).slice(0, 3);

  return (
    <Page className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
        <AppLink to="/guides" className="hover:text-primary">
          Guides
        </AppLink>
        <span className="mx-2">/</span>
        {CATEGORY_LABEL[guide.category]}
      </p>
      <div className="mt-3 flex items-center gap-2">
        {guide.sponsored ? <SponsoredBadge /> : null}
        <span className="text-sm text-subtle">
          {guide.updated} · {guide.readMinutes} min read
        </span>
      </div>
      <h1 className="mt-3 font-display text-4xl font-medium leading-[1.1] tracking-tight">{guide.title}</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{guide.excerpt}</p>
      {guide.sponsored && guide.sponsorName ? (
        <p className="mt-3 text-sm text-muted">
          Paid placement:{" "}
          {guide.sponsorHref ? (
            <a href={guide.sponsorHref} className="text-primary" target="_blank" rel="noreferrer">
              {guide.sponsorName}
            </a>
          ) : (
            guide.sponsorName
          )}
        </p>
      ) : null}
      <article className="mt-10">
        <Blocks body={guide.body} />
      </article>
      {related.length > 0 ? (
        <aside className="mt-16 border-t border-border pt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Related</p>
          <ul className="mt-4 flex flex-col gap-3">
            {related.map((g) => (
              <li key={g.slug}>
                <AppLink to={`/guides/${g.slug}`} className="font-display text-lg hover:text-primary">
                  {g.title}
                </AppLink>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </Page>
  );
}
