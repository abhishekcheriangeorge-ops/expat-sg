import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/layout/site-shell";
import { AppLink } from "@/components/app-link";
import { CorpusProvider } from "@/lib/corpus";
import { loadCorpus } from "@/lib/cms";
import siteFallback from "../../data/site.json";
import appCss from "../styles.css?url";

export const Route = createRootRoute({
  loader: () => loadCorpus(),
  pendingComponent: () => (
    <div className="flex min-h-dvh items-center justify-center bg-bg text-muted">
      Loading corpus from GitHub…
    </div>
  ),
  head: ({ loaderData }) => {
    const site = loaderData?.site ?? siteFallback;
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: `${site.name} — ${site.tagline}` },
        { name: "description", content: site.description },
        { name: "theme-color", content: "#F3EFE6" },
      ],
      links: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/__grok/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,500;6..72,600;6..72,700&family=Source+Sans+3:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap",
        },
      ],
    };
  },
  component: RootComponent,
  notFoundComponent: () => (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">404</p>
      <h1 className="mt-2 font-display text-3xl font-medium">Not in the index</h1>
      <p className="mt-3 text-muted">That page is not in the corpus. Search from the header, or go home.</p>
      <AppLink to="/" className="mt-6 inline-flex h-11 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-fg">
        Back to expat.sg
      </AppLink>
    </div>
  ),
});

function RootComponent() {
  const corpus = Route.useLoaderData();
  return (
    <html lang="en" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          <CorpusProvider value={corpus}>
            <SiteShell>
              <Outlet />
            </SiteShell>
          </CorpusProvider>
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
