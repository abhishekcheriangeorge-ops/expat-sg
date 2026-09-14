export const SITE = {
  name: "expat.sg",
  domain: "expat.sg",
  tagline: "Singapore, searched.",
  description:
    "The fastest, most current resource for expats in Singapore — visas, housing, tax, schools, neighbourhoods and daily life, updated for 2026.",
  updated: "14 September 2026",
  github: "https://github.com/abhishekcheriangeorge-ops/expat-sg",
  githubData: "https://github.com/abhishekcheriangeorge-ops/expat-sg/tree/main/src/data",
  githubRaw:
    "https://raw.githubusercontent.com/abhishekcheriangeorge-ops/expat-sg/main/src/data",
  advertiseEmail: "advertise@expat.sg",
  helloEmail: "hello@expat.sg",
};

export const NAV = [
  { href: "/guides", label: "Guides" },
  { href: "/neighbourhoods", label: "Neighbourhoods" },
  { href: "/tools", label: "Tools" },
  { href: "/directory", label: "Directory" },
  { href: "/advertise", label: "Advertise" },
] as const;

export const CATEGORIES: { id: string; label: string; href: string }[] = [
  { id: "visas", label: "Visas & PR", href: "/guides?cat=visas" },
  { id: "housing", label: "Housing", href: "/guides?cat=housing" },
  { id: "money", label: "Tax & money", href: "/guides?cat=money" },
  { id: "work", label: "Work", href: "/guides?cat=work" },
  { id: "schools", label: "Schools", href: "/guides?cat=schools" },
  { id: "health", label: "Healthcare", href: "/guides?cat=health" },
  { id: "daily", label: "Daily life", href: "/guides?cat=daily" },
  { id: "family", label: "Family", href: "/guides?cat=family" },
];
