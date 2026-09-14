import { createFileRoute } from "@tanstack/react-router";
import { Page, Eyebrow } from "@/components/page";
import { useCorpus } from "@/lib/corpus";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  const { site, apps } = useCorpus();
  return (
    <Page className="max-w-3xl">
      <Eyebrow>About</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">A search engine for one city.</h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">{site.description}</p>
      <h2 className="mt-10 font-display text-2xl font-medium">Why this exists</h2>
      <p className="mt-3 leading-relaxed">
        Singapore already has magazines, forums, Facebook groups and government PDFs. None of them are a fast, dated
        index. Magazines are slow. Forums are 2009. Official sites are accurate and unreadable if you landed yesterday.
        expat.sg sits in the gap: search-first, number-first, honest about what is paid.
      </p>
      <h2 className="mt-10 font-display text-2xl font-medium">Stateless, GitHub-backed</h2>
      <p className="mt-3 leading-relaxed">
        There is no database and no cookies. Every page load fetches the corpus as JSON from GitHub. Edit a file on
        main, the next visitor sees it. This site is a renderer, not a store.
      </p>
      <ul className="mt-4 list-disc pl-5 leading-relaxed">
        <li>
          Repo:{" "}
          <a className="text-primary" href={site.github} target="_blank" rel="noreferrer">
            {site.github}
          </a>
        </li>
        <li>
          Data folder:{" "}
          <a className="text-primary" href={site.githubData} target="_blank" rel="noreferrer">
            data/
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
        act. Write {site.helloEmail}.
      </p>
    </Page>
  );
}
