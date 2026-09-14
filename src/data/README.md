# expat.sg static data (GitHub CMS)

All editorial content, calculator constants, neighbourhood rents, school fees and directory listings live in this folder as TypeScript modules. There is no database.

Edit on GitHub, commit to `main`, ship.

| File | What it controls |
| --- | --- |
| `site.ts` | Name, tagline, GitHub URLs, nav |
| `stats.ts` | Homepage numbers + ticker |
| `numbers.ts` | EP/S Pass floors, tax brackets, COMPASS rubric, GST, rent bands |
| `guides.ts` | Long-form guides (body blocks, sponsored flags) |
| `neighbourhoods.ts` | Area pages and rents |
| `schools.ts` | 2026/27 fee table |
| `directory.ts` | Listings + `sponsored` / `sponsorTier` |
| `tools.ts` | Calculator index |
| `apps.ts` | Must-have apps |
| `advertise.ts` | Ad packages and copy |
| `index.ts` | Search index built from the files above |

## Sponsored inventory

- **Search position:** set `sponsored: true` on a guide or listing. Matching queries pin it to the top of results.
- **Directory feature:** `sponsored: true` and `sponsorTier: "featured" \| "premium"` in `directory.ts`. Premium also lands on the homepage.
- **Sponsored guide:** `sponsored: true`, `sponsorName`, `sponsorHref` in `guides.ts`. Always labelled.

## Updating a number

Change `numbers.ts` (or the school/rent tables). Calculators and copy that import those constants move together. Do not hardcode a MOM figure in a guide if it already lives in `numbers.ts`.
