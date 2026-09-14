import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { SITE, NAV, CATEGORIES } from "../src/data/site.ts";
import { STATS, TICKER } from "../src/data/stats.ts";
import { guides } from "../src/data/guides.ts";
import { neighbourhoods } from "../src/data/neighbourhoods.ts";
import { listings, DIRECTORY_CATEGORIES } from "../src/data/directory.ts";
import { schools } from "../src/data/schools.ts";
import { apps } from "../src/data/apps.ts";
import { AD_PACKAGES, AD_WHY } from "../src/data/advertise.ts";
import { tools } from "../src/data/tools.ts";
import {
  COMPASS,
  CPF,
  EP_ANCHORS,
  EP_SALARY,
  GST,
  LIVING,
  NON_RESIDENT_EMPLOYMENT_RATE,
  NON_RESIDENT_OTHER_RATE,
  RENT,
  SPASS_SALARY,
  STAMP_DUTY_LEASE,
  TAX_BRACKETS,
  TRANSPORT,
} from "../src/data/numbers.ts";

const CATEGORY_LABEL: Record<string, string> = {
  visas: "Visas & PR",
  housing: "Housing",
  money: "Tax & money",
  work: "Work",
  family: "Family",
  health: "Healthcare",
  daily: "Daily life",
  schools: "Schools",
};

const dir = join(process.cwd(), "data");
mkdirSync(dir, { recursive: true });

function write(name: string, value: unknown) {
  writeFileSync(join(dir, `${name}.json`), `${JSON.stringify(value, null, 2)}\n`);
}

write("site", {
  ...SITE,
  githubData: "https://github.com/abhishekcheriangeorge-ops/expat-sg/tree/main/data",
  githubRaw: "https://raw.githubusercontent.com/abhishekcheriangeorge-ops/expat-sg/main/data",
  nav: NAV,
  categories: CATEGORIES,
  categoryLabel: CATEGORY_LABEL,
});
write("stats", { stats: STATS, ticker: TICKER });
write("guides", guides);
write("neighbourhoods", neighbourhoods);
write("directory", { categories: DIRECTORY_CATEGORIES, listings });
write("schools", schools);
write("apps", apps);
write("advertise", { packages: AD_PACKAGES, why: AD_WHY });
write("tools", tools);
write("numbers", {
  epSalary: EP_SALARY,
  sPassSalary: SPASS_SALARY,
  epAnchors: EP_ANCHORS,
  taxBrackets: TAX_BRACKETS.map((b) => ({
    upTo: Number.isFinite(b.upTo) ? b.upTo : null,
    rate: b.rate,
  })),
  gst: GST,
  nonResidentEmploymentRate: NON_RESIDENT_EMPLOYMENT_RATE,
  nonResidentOtherRate: NON_RESIDENT_OTHER_RATE,
  cpf: CPF,
  transport: TRANSPORT,
  living: LIVING,
  rent: RENT,
  stampDutyLease: STAMP_DUTY_LEASE,
  compass: COMPASS,
});

console.log("wrote data/*.json");
