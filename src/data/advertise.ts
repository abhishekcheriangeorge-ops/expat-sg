import type { AdPackage } from "./types";

export const AD_PACKAGES: AdPackage[] = [
  {
    id: "search-position",
    name: "Sponsored search position",
    price: "S$1,200–2,800",
    period: "per month",
    blurb:
      "Own the first or second slot when someone searches a commercial intent keyword — insurance, movers, schools, agents.",
    items: [
      "Pinned result on matching queries",
      "Clearly labelled Sponsored",
      "Category + keyword targeting",
      "Monthly impression report",
    ],
    featured: true,
  },
  {
    id: "directory-featured",
    name: "Featured directory listing",
    price: "S$480–1,400",
    period: "per month",
    blurb: "Sit above organic listings in your category. Premium tier also lands on the homepage rail.",
    items: [
      "Top-of-category placement",
      "Homepage + search inclusion",
      "Logo and short pitch",
      "Swap copy anytime via GitHub data or our desk",
    ],
  },
  {
    id: "sponsored-post",
    name: "Sponsored guide",
    price: "S$1,800–4,200",
    period: "per piece",
    blurb:
      "A labelled sponsored guide in the corpus — it ranks in search like any other article, with disclosure.",
    items: [
      "Full guide in the search index",
      "30-day homepage feature",
      "Distributed in the weekly brief",
      "You can supply facts; we keep the voice",
    ],
  },
  {
    id: "homepage",
    name: "Homepage takeover slot",
    price: "S$3,200",
    period: "per week",
    blurb: "One brand, one week, above the fold on the most-read page in this market.",
    items: [
      "Hero-adjacent unit",
      "Mobile + desktop",
      "Category takeover optional",
      "Hyper-local: only people looking at Singapore",
    ],
  },
];

export const AD_WHY = [
  {
    title: "Intent, not reach",
    text: "People land here the week they have an offer letter, a lease to sign, or a school to pick. That is a buying moment.",
  },
  {
    title: "Hyper-local monopoly of attention",
    text: "This is not a lifestyle magazine competing with Instagram. It is a search box for one city.",
  },
  {
    title: "Honest labels",
    text: "Sponsored is marked. That is the deal with readers, and it is why the inventory stays valuable.",
  },
];
