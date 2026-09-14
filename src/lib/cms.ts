import type {
  AdPackage,
  AppRec,
  DirectoryCategory,
  Guide,
  Listing,
  Neighbourhood,
  School,
  SearchDoc,
  ToolMeta,
} from "@/data/types";
import { buildSearchIndex } from "@/lib/search-index";
import siteFallback from "../../data/site.json";
import statsFallback from "../../data/stats.json";
import guidesFallback from "../../data/guides.json";
import neighbourhoodsFallback from "../../data/neighbourhoods.json";
import directoryFallback from "../../data/directory.json";
import schoolsFallback from "../../data/schools.json";
import appsFallback from "../../data/apps.json";
import advertiseFallback from "../../data/advertise.json";
import toolsFallback from "../../data/tools.json";
import numbersFallback from "../../data/numbers.json";

export const GITHUB_DATA =
  "https://raw.githubusercontent.com/abhishekcheriangeorge-ops/expat-sg/main/data";

export type Site = {
  name: string;
  domain: string;
  tagline: string;
  description: string;
  updated: string;
  github: string;
  githubData: string;
  githubRaw: string;
  advertiseEmail: string;
  helloEmail: string;
  nav: { href: string; label: string }[];
  categories: { id: string; label: string; href: string }[];
  categoryLabel: Record<string, string>;
};

export type NumbersData = {
  epSalary: {
    general: { age23: number; age45: number };
    finance: { age23: number; age45: number };
    compassExempt: number;
    nextYearGeneral: number;
    nextYearFinance: number;
    nextYearFrom: string;
  };
  sPassSalary: {
    general: { age23: number; age45: number };
    finance: { age23: number; age45: number };
    nextYearGeneral: number;
    nextYearFinance: number;
  };
  epAnchors: { age: number; general: number; finance: number }[];
  taxBrackets: { upTo: number | null; rate: number }[];
  gst: number;
  nonResidentEmploymentRate: number;
  nonResidentOtherRate: number;
  cpf: { ordinaryWageCeiling: number; employeeRate: number; employerRate: number; note: string };
  transport: { mrtMin: number; mrtMax: number; adultMonthly: number; simplyGo: boolean; earlyBirdDiscount: number };
  living: Record<string, unknown>;
  rent: Record<string, { br1: number[]; br2: number[]; br3: number[] }>;
  stampDutyLease: number;
  compass: {
    passMark: number;
    exemptSalary: number;
    c1: { label: string; points: number }[];
    c2: { label: string; points: number }[];
    c3: { label: string; points: number }[];
    c4: { label: string; points: number }[];
    c5: { sol: number; solReduced: number };
    c6: number;
    smallFirmDefault: number;
  };
};

export type Corpus = {
  site: Site;
  stats: { label: string; value: string; hint: string }[];
  ticker: string[];
  numbers: NumbersData;
  guides: Guide[];
  neighbourhoods: Neighbourhood[];
  listings: Listing[];
  directoryCategories: { id: DirectoryCategory; label: string; blurb: string }[];
  schools: School[];
  apps: AppRec[];
  adPackages: AdPackage[];
  adWhy: { title: string; text: string }[];
  tools: ToolMeta[];
  searchIndex: SearchDoc[];
  source: "github" | "bundle";
};

async function loadFile<T>(name: string, fallback: T): Promise<{ value: T; github: boolean }> {
  try {
    const res = await fetch(`${GITHUB_DATA}/${name}.json`, {
      cache: "no-store",
      signal: AbortSignal.timeout(4000),
    });
    if (!res.ok) throw new Error(String(res.status));
    return { value: (await res.json()) as T, github: true };
  } catch {
    return { value: fallback, github: false };
  }
}

export async function loadCorpus(): Promise<Corpus> {
  const [
    site,
    stats,
    guides,
    neighbourhoods,
    directory,
    schools,
    apps,
    advertise,
    tools,
    numbers,
  ] = await Promise.all([
    loadFile<Site>("site", siteFallback as Site),
    loadFile<{ stats: Corpus["stats"]; ticker: string[] }>("stats", statsFallback as { stats: Corpus["stats"]; ticker: string[] }),
    loadFile<Guide[]>("guides", guidesFallback as Guide[]),
    loadFile<Neighbourhood[]>("neighbourhoods", neighbourhoodsFallback as Neighbourhood[]),
    loadFile<{
      categories: Corpus["directoryCategories"];
      listings: Listing[];
    }>("directory", directoryFallback as { categories: Corpus["directoryCategories"]; listings: Listing[] }),
    loadFile<School[]>("schools", schoolsFallback as School[]),
    loadFile<AppRec[]>("apps", appsFallback as AppRec[]),
    loadFile<{ packages: AdPackage[]; why: Corpus["adWhy"] }>(
      "advertise",
      advertiseFallback as { packages: AdPackage[]; why: Corpus["adWhy"] },
    ),
    loadFile<ToolMeta[]>("tools", toolsFallback as ToolMeta[]),
    loadFile<NumbersData>("numbers", numbersFallback as NumbersData),
  ]);

  const github = [
    site,
    stats,
    guides,
    neighbourhoods,
    directory,
    schools,
    apps,
    advertise,
    tools,
    numbers,
  ].filter((f) => f.github).length;

  const corpus: Omit<Corpus, "searchIndex"> = {
    site: site.value,
    stats: stats.value.stats,
    ticker: stats.value.ticker,
    numbers: numbers.value,
    guides: guides.value,
    neighbourhoods: neighbourhoods.value,
    listings: directory.value.listings,
    directoryCategories: directory.value.categories,
    schools: schools.value,
    apps: apps.value,
    adPackages: advertise.value.packages,
    adWhy: advertise.value.why,
    tools: tools.value,
    source: github >= 5 ? "github" : "bundle",
  };

  return {
    ...corpus,
    searchIndex: buildSearchIndex(corpus),
  };
}
