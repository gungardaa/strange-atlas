"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CATEGORIES, categoryColor, exhibitBySlug, verifiedExhibits } from "@/data/exhibits";
import { categoryProgress, getDiscovered, populatedCategories, searchExhibits, surprisePick, WORLD_VIEW } from "@/lib/utils";
import { CategoryChip, ExhibitId } from "@/components/exhibit";
import { DiscoverButton } from "@/components/ui";
import { CheckIcon, DiceIcon, glyphFor } from "@/components/icons";
import {
  btnClasses,
  Button,
  Card,
  Container,
  EmptyState,
  Eyebrow,
  FilterChip,
  SearchField,
} from "@/components/primitives";

const AtlasMap = dynamic(() => import("@/components/atlas-map"), { ssr: false });

export default function AtlasClient() {
  const [query, setQuery] = useState("");
  // Fixed inits avoid hydration mismatches; browser state syncs after mount.
  const [cats, setCats] = useState<Set<string>>(new Set());
  const [tag, setTag] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [surprised, setSurprised] = useState(false);
  const [focus, setFocus] = useState<{ id: string; lon: number; lat: number; zoom: number } | null>(null);
  const [discovered, setDiscovered] = useState<string[]>([]);
  const [tiles, setTiles] = useState<"ok" | "fallback" | "down">("ok");
  const [mapKey, setMapKey] = useState(0);

  const choose = (id: string) => {
    const e = verifiedExhibits.find((x) => x.id === id);
    if (!e) return;
    // Keyboard selections move focus into the card. Mouse users keep theirs.
    const fromMarker = document.activeElement?.classList.contains("leaflet-marker-icon");
    setSelectedId(id);
    setSurprised(false);
    setFocus({ id, lon: e.coordinates[0], lat: e.coordinates[1], zoom: e.mapZoom ?? 6 });
    // ponytail: hash carries selection only. Filters stay session state; shareable filter URLs if asked.
    history.replaceState(null, "", `/atlas#place=${id}`);
    if (fromMarker) requestAnimationFrame(() => document.getElementById("discovery-title")?.focus());
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-once sync from localStorage/URL hash
    setDiscovered(getDiscovered());
    const h = window.location.hash.replace("#", "");
    const known = new Set<string>(CATEGORIES.map((c) => c.id));
    if (h.startsWith("place=")) {
      const e = exhibitBySlug(h.slice("place=".length));
      if (e) choose(e.id);
    } else if (h.startsWith("tag=")) {
      try {
        setTag(decodeURIComponent(h.slice("tag=".length)));
      } catch {
        /* malformed hash: show everything */
      }
    } else if (h.startsWith("cat=")) {
      const seed = h.slice("cat=".length).split(",").filter((x) => known.has(x));
      if (seed.length > 0) setCats(new Set(seed));
    } else if (h && known.has(h)) {
      setCats(new Set([h]));
    }
  }, []);

  // Escape clears the selection and hands focus back to the list entry.
  useEffect(() => {
    if (!selectedId) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key !== "Escape") return;
      setSelectedId(null);
      document.getElementById(`atlas-item-${selectedId}`)?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selectedId]);

  const items = searchExhibits(query, cats, tag);
  const selected = selectedId ? verifiedExhibits.find((e) => e.id === selectedId) ?? null : null;
  const progress = categoryProgress(discovered);

  const toggleCat = (id: string) =>
    setCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const reset = () => {
    setQuery("");
    setCats(new Set());
    setTag(null);
    setSelectedId(null);
    setSurprised(false);
    setFocus(WORLD_VIEW);
    history.replaceState(null, "", "/atlas");
  };

  const surprise = () => {
    const e = surprisePick(discovered);
    setQuery("");
    setCats(new Set());
    setTag(null);
    choose(e.id);
    setSurprised(true);
  };

  return (
    <Container width="page" as="main" id="content" className="flex flex-1 flex-col gap-4 pb-10 pt-6">
      <h1 className="sr-only">Atlas</h1>
      <search className="flex flex-wrap items-center gap-2">
        <SearchField
          id="atlas-search"
          label="Search places"
          value={query}
          onChange={setQuery}
          placeholder="Search name, country, tag…"
        />
        <Button variant="secondary" size="sm" onClick={reset}>
          Reset view
        </Button>
        <Button variant="primary" size="sm" onClick={surprise}>
          <DiceIcon /> Surprise me
        </Button>
      </search>

      <div className="edge-fade snap-strip flex flex-nowrap items-center gap-2 overflow-x-auto pb-1" role="group" aria-label="Filter by category">
        <FilterChip pressed={cats.size === 0} onClick={() => setCats(new Set())}>
          All discoveries
        </FilterChip>
        {populatedCategories.map((c) => {
          const p = progress.get(c.id) ?? { done: 0, total: 0 };
          return (
            <FilterChip
              key={c.id}
              pressed={cats.has(c.id)}
              glyph={glyphFor(c.id, c.color)}
              onClick={() => toggleCat(c.id)}
              aria-label={`${c.label}, ${p.done} of ${p.total} discovered`}
            >
              {c.label}
              <span aria-hidden className="font-mono text-[11px] text-text-muted">
                {p.done}/{p.total}
              </span>
            </FilterChip>
          );
        })}
      </div>
      <p aria-live="polite" className="font-mono text-xs uppercase tracking-wider text-text-muted">
        Showing {items.length} of {verifiedExhibits.length} · {discovered.length} discovered{" "}
        <a href="#atlas-list" className="underline decoration-accent decoration-2 underline-offset-2 lg:hidden">
          Jump to list
        </a>
      </p>
      {tag && (
        <p className="text-sm text-text-secondary">
          Thread: <strong className="text-text-primary">{tag}</strong>{" "}
          <button
            type="button"
            onClick={() => {
              setTag(null);
              history.replaceState(null, "", "/atlas");
            }}
            className="tappable inline-flex items-center underline decoration-accent decoration-2 underline-offset-2 hover:text-text-primary"
          >
            Clear thread
          </button>
        </p>
      )}

      <div className="grid flex-1 gap-4 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="relative h-[38vh] overflow-hidden rounded-md border border-border md:h-[52vh] lg:h-[68vh]">
          <AtlasMap
            key={mapKey}
            items={items}
            selectedId={selectedId}
            onSelect={choose}
            focus={focus}
            onBasemapError={(fallback) => setTiles(fallback ? "fallback" : "down")}
          />
          <p className="absolute bottom-1 left-2 z-10 rounded-sm bg-surface/90 px-1.5 font-mono text-[11px] uppercase tracking-wider text-text-muted">
            Pins are approximate
          </p>
        </div>

        <aside aria-label="Discovery panel" className="flex min-h-0 flex-col gap-3 lg:h-[68vh]">
          {tiles !== "ok" && (
            <Card>
              <p className="text-sm text-text-primary">
                {tiles === "fallback"
                  ? "Styled map unavailable. Showing fallback map."
                  : "Basemap unavailable. The list below reaches every exhibit."}
              </p>
              <div className="mt-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setTiles("ok");
                    setMapKey((k) => k + 1);
                  }}
                >
                  Retry map
                </Button>
              </div>
            </Card>
          )}
          {selected ? (
            <details
              key={selected.id}
              open
              className="baw-reveal crosshair rounded-md border border-accent bg-surface p-4 max-lg:fixed max-lg:inset-x-4 max-lg:bottom-4 max-lg:z-30 max-lg:max-h-[45dvh] max-lg:overflow-y-auto max-lg:shadow-xl"
            >
              {surprised && <Eyebrow>You have landed somewhere unusual.</Eyebrow>}
              <summary id="discovery-title" tabIndex={-1} className="cursor-pointer font-display text-lg font-bold text-text-primary">
                {selected.title}
              </summary>
              <ExhibitId n={selected.number} />
              <p className="mt-1 text-sm text-text-secondary">{selected.countries.join(" · ")}</p>
              <p className="mt-2 text-sm text-text-primary">{selected.leadFact}</p>
              <div className="mt-2">
                <CategoryChip category={selected.category} />
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link href={`/places/${selected.slug}`} className={btnClasses("primary", "sm")}>
                  Read the story
                </Link>
                <DiscoverButton id={selected.id} onChange={setDiscovered} />
              </div>
            </details>
          ) : (
            <Card>
              <p className="font-display font-bold text-text-primary">Your field notes</p>
              <p className="mt-1 text-sm text-text-secondary">
                {discovered.length} of {verifiedExhibits.length} exhibits discovered. Pick a marker to start.
              </p>
            </Card>
          )}

          <div id="atlas-list" className="max-h-[60vh] min-h-0 flex-1 overflow-y-auto scroll-mt-24 lg:max-h-none">
            <ul className="flex flex-col gap-2">
              {items.map((e) => (
                <li key={e.id}>
                  <button
                    type="button"
                    id={`atlas-item-${e.id}`}
                    title={e.title}
                    onClick={() => choose(e.id)}
                    aria-current={selectedId === e.id ? "true" : undefined}
                    className={`flex w-full items-center gap-3 rounded-md border p-3 text-left transition-colors ${
                      selectedId === e.id ? "border-accent bg-surface" : "border-border bg-surface hover:border-accent"
                    }`}
                  >
                    {glyphFor(e.category, categoryColor(e.category), "h-3.5 w-3.5 shrink-0")}
                    <span className="min-w-0">
                      <span className="flex items-center gap-1.5 text-sm font-semibold text-text-primary">
                        <span className="truncate">{e.title}</span>
                        {discovered.includes(e.id) ? <CheckIcon className="h-3.5 w-3.5 shrink-0 text-accent" /> : null}
                      </span>
                      <span className="block truncate text-xs text-text-muted">{e.countries.join(" · ")}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            {items.length === 0 && (
              <EmptyState
                title="No matches on this survey"
                hint="Try a shorter search or clear the filters."
                action={
                  <Button variant="secondary" size="sm" onClick={reset}>
                    Clear filters
                  </Button>
                }
              />
            )}
          </div>
        </aside>
      </div>
    </Container>
  );
}
