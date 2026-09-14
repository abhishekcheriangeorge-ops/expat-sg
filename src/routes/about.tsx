import { createFileRoute } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/page";
import { SITE } from "@/data";
import { apps } from "@/data/apps";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <Page className="max-w-3xl">
      <Eyebrow>About</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">A search engine for one city.</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{SITE.description}</p>
      <h2 className="mt-10 font-display text-2xl font-medium">Why this exists</h2>
      <p className="mt-3 leading-relaxed">
        Singapore already has magazines, forums, Facebook groups and government PDFs. None of them are a fast, dated
        index. Magazines are slow. Forums are 2009. Official sites are accurate and unreadable if you landed yesterday.
        expat.sg sits in the gap: search-first, number-first, honest about what is paid.
      </p>
      <h2 className="mt-10 font-display text-2xl font-medium">The data lives on GitHub</h2>
      <p className="mt-3 leading-relaxed">
        Guides, neighbourhood rents, school fees, directory listings and calculator constants are static TypeScript
        modules in the repo — not a hidden CMS. Edit a file, commit, the site updates. That is the whole publishing
        model.
      </p>
      <ul className="mt-4 list-disc pl-5 leading-relaxed">
        <li>
          Repo:{" "}
          <a className="text-primary" href={SITE.github} target="_blank" rel="noreferrer">
            {SITE.github}
          </a>
        </li>
        <li>
          Data folder:{" "}
          <a className="text-primary" href={SITE.githubData} target="_blank" rel="noreferrer">
            src/data
          </a>
        </li>
      </ul>
      <h2 className="mt-10 font-display text-2xl font-medium">Must-have apps</h2>
      <ul className="mt-4 flex flex-col divide-y divide-border overflow-hidden rounded-xl border border-border bg-surface">
        {apps.map((a) => (
          <li key={a.name} className="px-4 py-3">
            <p className="font-medium">
              {a.name}{" "}
              <span className="text-xs font-normal uppercase tracking-[0.14em] text-muted">{a.category}</span>
            </p>
            <p className="text-sm text-muted">{a.why}</p>
          </li>
        ))}
      </ul>
      <p className="mt-8 text-sm text-subtle">
        Independent. Not affiliated with MOM, ICA, IRAS or any school. Figures are planning numbers — verify before you
        act. Write {SITE.helloEmail}.
      </p>
    </Page>
  );
}
