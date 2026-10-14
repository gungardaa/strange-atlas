# The Strange Atlas

Live at https://ardanareswara-strange-atlas.vercel.app.

An interactive atlas of places where borders, politics, history, and time produce surprising results. Built with Next.js App Router, TypeScript, Tailwind CSS v4, and vanilla Leaflet over CARTO basemaps.

## Scripts

```bash
npm run dev     # local development
npm run lint    # eslint
npm run build   # production build (also runs type checking)
npm start       # serve the production build
```

## Content model

All 31 exhibits live in `data/exhibits.ts` as typed records (coordinates are
approximate map anchors in `[longitude, latitude]` order, never legal
boundaries). Only `verificationStatus: "verified"` entries render publicly.
Every factual claim maps to a source via `sources[].supports`, with
`lastVerified` re-stamped on each evidence pass. The atlas, detail pages,
Hunt, Surprise Me, and nearby recommendations all read the same dataset.
Discovery progress and theme choice persist in `localStorage`; there is no
database and no account.

## Map

Vanilla Leaflet (no wrapper), loaded client-side only. OpenStreetMap standard
tiles are the keyless primary because keyless CARTO endpoints return error
images in enforcing regions. Set `NEXT_PUBLIC_CARTO_KEY` (free key from
carto.com/basemaps) to restore styled light/dark CARTO basemaps that switch
with the site theme — never a CSS filter on tiles. If styled tiles fail, the
map falls back to OSM automatically with matching attribution. Optional full
overrides: `NEXT_PUBLIC_MAP_TILES_LIGHT` and `NEXT_PUBLIC_MAP_TILES_DARK`. Map data © OpenStreetMap contributors,
basemap © CARTO; attribution stays visible on the map and in the footer.
Review CARTO's current basemap terms and fair-use limits before launch.
