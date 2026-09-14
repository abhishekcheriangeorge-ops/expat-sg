# expat.sg corpus (GitHub is the database)

The running site is **stateless**. It fetches these JSON files from `main` on every load (`cache: no-store`). There is no CMS, no database, no `localStorage`.

Edit a file here, commit to `main`. The next page load is the new site.

If GitHub is unreachable, the app falls back to the JSON bundled at last build.

| File | What it controls |
| --- | --- |
| `site.json` | Name, nav, GitHub URLs, category labels |
| `stats.json` | Homepage numbers + ticker |
| `numbers.json` | EP/S Pass floors, tax brackets, COMPASS rubric |
| `guides.json` | Long-form guides (`sponsored` flag) |
| `neighbourhoods.json` | Area pages and rents |
| `schools.json` | 2026/27 fee table |
| `directory.json` | Listings + `sponsored` / `sponsorTier` |
| `tools.json` | Calculator index |
| `apps.json` | Must-have apps |
| `advertise.json` | Ad packages |
| `live.json` | Magazine stories (food, weekends, culture, family) |
| `events.json` | What’s-on calendar |

Raw URL pattern:

`https://raw.githubusercontent.com/abhishekcheriangeorge-ops/expat-sg/main/data/<file>.json`
