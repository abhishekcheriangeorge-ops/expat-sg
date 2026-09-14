import type { Guide, Neighbourhood, Listing, School, ToolMeta, SearchDoc, Story, EventItem } from "@/data/types";

export function buildSearchIndex(input: {
  site: { description: string };
  guides: Guide[];
  neighbourhoods: Neighbourhood[];
  listings: Listing[];
  schools: School[];
  tools: ToolMeta[];
  stories?: Story[];
  events?: EventItem[];
}): SearchDoc[] {
  const docs: SearchDoc[] = [];

  for (const g of input.guides) {
    const bodyText = g.body
      .map((b) => {
        if (b.type === "p" || b.type === "h2" || b.type === "h3") return b.text;
        if (b.type === "callout") return `${b.title ?? ""} ${b.text}`;
        if (b.type === "ul" || b.type === "ol") return b.items.join(" ");
        if (b.type === "table") return `${b.headers.join(" ")} ${b.rows.flat().join(" ")}`;
        if (b.type === "stats") return b.items.map((i) => `${i.label} ${i.value}`).join(" ");
        return "";
      })
      .join(" ");
    docs.push({
      id: `guide:${g.slug}`,
      kind: "guide",
      title: g.title,
      href: `/guides/${g.slug}`,
      excerpt: g.excerpt,
      tags: [...g.tags, g.category, "guide"],
      sponsored: g.sponsored,
      sponsorName: g.sponsorName,
      weight: g.featured ? 8 : 5,
      blob: bodyText,
    });
  }

  for (const n of input.neighbourhoods) {
    docs.push({
      id: `hood:${n.slug}`,
      kind: "neighbourhood",
      title: n.name,
      href: `/neighbourhoods/${n.slug}`,
      excerpt: n.blurb,
      tags: [...n.tags, "neighbourhood", n.region, n.district],
      weight: 6,
      blob: `${n.vibe} ${n.bestFor.join(" ")} ${n.mrt.join(" ")} ${n.eat.join(" ")} ${n.watch}`,
    });
  }

  for (const l of input.listings) {
    docs.push({
      id: `list:${l.id}`,
      kind: "listing",
      title: l.name,
      href: `/directory/${l.category}#${l.id}`,
      excerpt: l.blurb,
      tags: [...l.tags, l.category, "directory"],
      sponsored: l.sponsored,
      sponsorName: l.sponsored ? l.name : undefined,
      weight: l.sponsorTier === "premium" ? 9 : l.sponsored ? 7 : 3,
    });
  }

  for (const s of input.schools) {
    docs.push({
      id: `school:${s.slug}`,
      kind: "school",
      title: s.name,
      href: `/guides/international-schools-2026`,
      excerpt: `${s.curriculum} · ${s.area} · high S$${s.high.toLocaleString("en-SG")} (${s.year}). ${s.notes}`,
      tags: ["school", s.curriculum, s.area, s.name],
      sponsored: s.sponsored,
      weight: 5,
    });
  }

  for (const t of input.tools) {
    docs.push({
      id: `tool:${t.slug}`,
      kind: "tool",
      title: t.title,
      href: t.href,
      excerpt: t.excerpt,
      tags: t.tags,
      weight: 7,
    });
  }


  for (const s of input.stories ?? []) {
    const bodyText = s.body
      .map((b) => {
        if (b.type === "p" || b.type === "h2" || b.type === "h3") return b.text;
        if (b.type === "callout") return `${b.title ?? ""} ${b.text}`;
        if (b.type === "ul" || b.type === "ol") return b.items.join(" ");
        return "";
      })
      .join(" ");
    docs.push({
      id: `story:${s.slug}`,
      kind: "story",
      title: s.title,
      href: `/live/${s.slug}`,
      excerpt: s.excerpt,
      tags: [...s.tags, s.category, "live", "magazine"],
      sponsored: s.sponsored,
      sponsorName: s.sponsorName,
      weight: s.featured ? 9 : 7,
      blob: bodyText,
    });
  }

  for (const e of input.events ?? []) {
    docs.push({
      id: `event:${e.id}`,
      kind: "event",
      title: e.title,
      href: e.href.startsWith("/") ? e.href : "/events",
      excerpt: `${e.dates} · ${e.venue}. ${e.blurb}`,
      tags: [e.kind, "events", "whats on", e.title],
      sponsored: e.sponsored,
      weight: e.featured ? 8 : 6,
    });
  }

  docs.push(
    {
      id: "page:advertise",
      kind: "page",
      title: "Advertise on expat.sg",
      href: "/advertise",
      excerpt: "Sponsored search positions, featured directory listings, sponsored guides.",
      tags: ["advertise", "sponsor", "ads"],
      weight: 2,
    },
    {
      id: "page:about",
      kind: "page",
      title: "About expat.sg",
      href: "/about",
      excerpt: `${input.site.description} Data lives on GitHub.`,
      tags: ["about", "github", "data"],
      weight: 1,
    },
  );

  return docs;
}
