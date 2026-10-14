# The Strange Atlas

Live at https://ardanareswara-strange-atlas.vercel.app.

An interactive atlas of 40 places where borders, politics, history, and time produce surprising results. The map is the main experience. Every marker opens a short, sourced story. Visitors can filter by category, follow threads across entries, test themselves in the Hunt, and keep local discovery progress. No account, no database, no tracking.

## Stack

Next.js 16 App Router, TypeScript, Tailwind CSS v4, vanilla Leaflet. No map wrapper library, no CMS, no UI kit. Deployed on Vercel Hobby.

## Scripts

```bash
npm run dev     # local development
npm run lint    # eslint
npm run build   # production build (also type-checks)
npm start       # serve the production build
```

## Content model

All 40 exhibits live in `data/exhibits.ts` as typed records. Coordinates are approximate map anchors in `[longitude, latitude]` order, never legal boundaries. Only `verificationStatus: "verified"` entries render publicly. Every factual claim maps to a source through `sources[].supports`, and `lastVerified` is re-stamped on each evidence pass. The atlas, detail pages, Hunt, Surprise Me, nearby recommendations, and sitemap all read the same dataset, so adding an exhibit updates everything at once. Discovery progress and theme choice persist in `localStorage`.

## Map

Vanilla Leaflet, loaded client-side only. OpenStreetMap standard tiles are the keyless primary because keyless CARTO endpoints return error images in enforcing regions. Set `NEXT_PUBLIC_CARTO_KEY` (free key from carto.com/basemaps) to restore styled light and dark CARTO basemaps that switch with the site theme. Never a CSS filter on tiles. If styled tiles fail, the map falls back to OSM automatically with matching attribution. Optional full overrides through `NEXT_PUBLIC_MAP_TILES_LIGHT` and `NEXT_PUBLIC_MAP_TILES_DARK`. Map data © OpenStreetMap contributors, basemap © CARTO. Attribution stays visible on the map and in the footer. Review CARTO's current basemap terms and fair-use limits before launch.

## Routes

| Route | Purpose |
|---|---|
| `/` | Landing page with featured discoveries |
| `/atlas` | Interactive map with search, filters, and discovery panel |
| `/places/[slug]` | Shareable detail page for one exhibit |
| `/hunt` | Guess-the-location challenge in two modes |
| `/field-notes` | Filterable list of all exhibits |
| `/about` | Editorial standards, glossary, and method |

## Conventions

- Editorial copy avoids filler and decorative punctuation. Check `design.md` for the voice rules before writing exhibit text.
- Every factual claim needs a supporting source beside it. Prefer government, treaty, institutional, and academic sources. Never Wikipedia as the sole source for disputed claims.
- Coordinates use longitude first. Convert to latitude-first only at the Leaflet call site.
- Keep changes minimal. One shared dataset, one map component, no new dependencies without a clear reason.
