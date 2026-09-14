export type GuideCategory =
  | "visas"
  | "housing"
  | "money"
  | "work"
  | "family"
  | "health"
  | "daily"
  | "schools";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "callout"; tone: "info" | "warn" | "ok"; title?: string; text: string }
  | { type: "stats"; items: { label: string; value: string; hint?: string }[] }
  | { type: "cta"; label: string; href: string };

export type Guide = {
  slug: string;
  title: string;
  excerpt: string;
  category: GuideCategory;
  updated: string;
  readMinutes: number;
  tags: string[];
  sponsored?: boolean;
  sponsorName?: string;
  sponsorHref?: string;
  featured?: boolean;
  body: Block[];
};

export type Neighbourhood = {
  slug: string;
  name: string;
  district: string;
  region: "CCR" | "RCR" | "OCR";
  blurb: string;
  bestFor: string[];
  vibe: string;
  mrt: string[];
  commuteCbd: string;
  rent1br: [number, number];
  rent2br: [number, number];
  rent3br: [number, number];
  schools: string[];
  eat: string[];
  watch: string;
  tags: string[];
};

export type DirectoryCategory =
  | "movers"
  | "housing"
  | "schools"
  | "insurance"
  | "health"
  | "banks"
  | "telecom"
  | "legal"
  | "family"
  | "lifestyle";

export type Listing = {
  id: string;
  name: string;
  category: DirectoryCategory;
  blurb: string;
  url: string;
  area?: string;
  tags: string[];
  sponsored?: boolean;
  sponsorTier?: "featured" | "premium";
  phone?: string;
};

export type School = {
  slug: string;
  name: string;
  curriculum: string;
  area: string;
  primary: number;
  middle: number;
  high: number;
  year: string;
  notes: string;
  url: string;
  sponsored?: boolean;
};

export type AppRec = {
  name: string;
  why: string;
  category: string;
};

export type SearchDoc = {
  id: string;
  kind: "guide" | "neighbourhood" | "listing" | "school" | "tool" | "page" | "story" | "event";
  title: string;
  href: string;
  excerpt: string;
  tags: string[];
  sponsored?: boolean;
  sponsorName?: string;
  weight: number;
  blob?: string;
};

export type ToolMeta = {
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  tags: string[];
};

export type AdPackage = {
  id: string;
  name: string;
  price: string;
  period: string;
  blurb: string;
  items: string[];
  featured?: boolean;
};

export type LiveCategory = "food" | "weekend" | "culture" | "family" | "social" | "city" | "money";

export type Story = {
  slug: string;
  title: string;
  kicker: string;
  category: LiveCategory;
  excerpt: string;
  updated: string;
  readMinutes: number;
  tags: string[];
  featured?: boolean;
  hero?: string;
  sponsored?: boolean;
  sponsorName?: string;
  body: Block[];
};

export type EventItem = {
  id: string;
  title: string;
  dates: string;
  when: string;
  venue: string;
  kind: string;
  blurb: string;
  href: string;
  featured?: boolean;
  sponsored?: boolean;
};

