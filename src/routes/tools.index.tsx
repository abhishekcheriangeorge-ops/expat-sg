import { createFileRoute } from "@tanstack/react-router";
import { AppLink } from "@/components/app-link";
import { Page, Eyebrow } from "@/components/page";
import { tools } from "@/data";

export const Route = createFileRoute("/tools/")({
  component: ToolsIndex,
});

function ToolsIndex() {
  return (
    <Page>
      <Eyebrow>Tools</Eyebrow>
      <h1 className="mt-2 font-display text-4xl font-medium tracking-tight">Calculators, not vibes</h1>
      <p className="mt-3 max-w-2xl text-muted">
        Built on MOM and IRAS thresholds sitting in the GitHub data files. Confirm with the official SAT before you
        sign.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {tools.map((t) => (
          <AppLink
            key={t.slug}
            to={t.href}
            className="rounded-xl border border-border bg-surface p-6 hover:border-fg/25"
          >
            <h2 className="font-display text-2xl font-medium tracking-tight">{t.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{t.excerpt}</p>
          </AppLink>
        ))}
      </div>
    </Page>
  );
}
