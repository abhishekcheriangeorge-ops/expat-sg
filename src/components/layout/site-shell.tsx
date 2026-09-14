import { Menu, X } from "lucide-react";
import { useCallback, useState } from "react";
import { AppLink } from "@/components/app-link";
import { CommandSearch, SearchTrigger, useSearchHotkey } from "@/components/search/command-search";
import { useCorpus } from "@/lib/corpus";
import { cn } from "@/lib/utils";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const { site, source } = useCorpus();
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const openSearch = useCallback(() => setSearchOpen(true), []);
  useSearchHotkey(openSearch);
  const nav = site.nav;

  return (
    <div className="flex min-h-dvh flex-col bg-bg text-fg">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-surface focus:px-3 focus:py-2"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-3 px-4 sm:h-16 sm:gap-6">
          <AppLink to="/" className="shrink-0 font-display text-lg font-semibold tracking-tight sm:text-xl">
            expat<span className="text-primary">.sg</span>
          </AppLink>
          <nav className="hidden items-center gap-4 xl:flex">
            {nav.map((n) => (
              <AppLink
                key={n.href}
                to={n.href}
                className="text-sm font-medium text-muted hover:text-fg"
              >
                {n.label}
              </AppLink>
            ))}
          </nav>
          <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 sm:max-w-sm">
            <div className="hidden min-w-0 flex-1 sm:block">
              <SearchTrigger onClick={openSearch} />
            </div>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-md border border-border bg-surface sm:hidden"
              onClick={openSearch}
              aria-label="Search"
            >
              <span className="text-sm font-medium">/</span>
            </button>
            <button
              type="button"
              className="flex size-11 items-center justify-center rounded-md border border-border xl:hidden"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="border-t border-border bg-surface xl:hidden">
            <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2">
              {nav.map((n) => (
                <AppLink
                  key={n.href}
                  to={n.href}
                  onClick={() => setMenuOpen(false)}
                  className="flex h-12 items-center text-base font-medium"
                >
                  {n.label}
                </AppLink>
              ))}
            </nav>
          </div>
        ) : null}
      </header>
      <CommandSearch open={searchOpen} onClose={() => setSearchOpen(false)} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <footer className="border-t border-border bg-sunken">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 sm:grid-cols-4">
          <div className="sm:col-span-2">
            <p className="font-display text-xl font-semibold tracking-tight">
              expat<span className="text-primary">.sg</span>
            </p>
            <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
              {site.tagline} A search-first index of living here — numbers from MOM, ICA, IRAS and the ground, not a magazine.
            </p>
            <p className="mt-3 text-xs text-subtle">
              Updated {site.updated}. Corpus from {source === "github" ? "GitHub" : "bundled snapshot"} — no database, no cookies.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Index</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              {nav.map((n) => (
                <li key={n.href}>
                  <AppLink to={n.href} className="hover:text-primary">
                    {n.label}
                  </AppLink>
                </li>
              ))}
              <li>
                <AppLink to="/about" className="hover:text-primary">
                  About
                </AppLink>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">Source</p>
            <ul className="mt-3 flex flex-col gap-2 text-sm">
              <li>
                <a href={site.github} className="hover:text-primary" target="_blank" rel="noreferrer">
                  GitHub repo
                </a>
              </li>
              <li>
                <a href={site.githubData} className="hover:text-primary" target="_blank" rel="noreferrer">
                  Edit the data
                </a>
              </li>
              <li>
                <a href={`mailto:${site.advertiseEmail}`} className="hover:text-primary">
                  {site.advertiseEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className={cn("mx-auto max-w-6xl border-t border-border px-4 py-4 text-xs text-subtle")}>
          Independent guide. Verify figures with MOM, ICA, IRAS and the school or landlord before you act.
        </div>
      </footer>
    </div>
  );
}
