"use client";

import { useEffect, useRef, useState } from "react";
import type { Exhibit } from "@/data/exhibits";
import { categoryColor, categoryLabel } from "@/data/exhibits";

// ponytail: vanilla Leaflet, no react-leaflet wrapper. Add it only if map logic outgrows one effect.
// Keyless CARTO serves 2KB error images with HTTP 200, invisible to tileerror detection,
// so OSM is the keyless primary (verified live). Styled CARTO returns when a key is set:
// free at carto.com/basemaps, or point NEXT_PUBLIC_MAP_TILES_* anywhere else.
const CARTO_KEY = process.env.NEXT_PUBLIC_CARTO_KEY;
const STYLED =
  process.env.NEXT_PUBLIC_MAP_TILES_LIGHT || process.env.NEXT_PUBLIC_MAP_TILES_DARK || CARTO_KEY
    ? {
        light:
          process.env.NEXT_PUBLIC_MAP_TILES_LIGHT ??
          `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?api_key=${CARTO_KEY}`,
        dark:
          process.env.NEXT_PUBLIC_MAP_TILES_DARK ??
          `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?api_key=${CARTO_KEY}`,
      }
    : null;
const CARTO_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>';
// ponytail: OSM standard fallback when styled tiles fail. Vector tiles only if OSM falls over.
const OSM_TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
const OSM_ATTRIBUTION =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

function shapeStyle(category: Exhibit["category"], color: string, selected: boolean): string {
  const base = `width:22px;height:22px;background:${color};border:3px solid ${selected ? "#fff" : "rgba(255,255,255,.85)"};box-shadow:0 1px 4px rgba(0,0,0,.45);${selected ? "outline:3px solid #111;" : ""}`;
  switch (category) {
    case "border-puzzles":
      return `${base}border-radius:50%;`; // circle
    case "enclaves-exclaves":
      return `${base}border-radius:4px;`; // square
    case "access-oddities":
      return `${base}border-radius:4px;transform:rotate(45deg) scale(.92);`; // diamond
    case "time-date":
      return `width:22px;height:22px;border:5px solid ${color};border-radius:50%;background:transparent;box-shadow:0 1px 4px rgba(0,0,0,.45);${selected ? "outline:3px solid #111;" : ""}`; // ring
    case "history-shaped-borders":
      return `${base}border-radius:50%;background:transparent;background-image:linear-gradient(${color},${color});background-clip:padding-box;border-style:double;border-width:5px;`; // outlined
    default:
      return `${base}clip-path:polygon(50% 0,100% 100%,0 100%);border:none;`; // triangle
  }
}

export default function AtlasMap({
  items,
  selectedId,
  onSelect,
  focus,
  onBasemapError,
  anonymous,
}: {
  items: Exhibit[];
  selectedId: string | null;
  onSelect?: (id: string) => void;
  focus: { id: string; lon: number; lat: number; zoom: number } | null;
  onBasemapError?: (usingFallback: boolean) => void;
  // Find It mode: markers hide names so the answer cannot leak.
  anonymous?: boolean;
}) {
  const elRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const layerRef = useRef<import("leaflet").TileLayer | null>(null);
  const fallbackRef = useRef(false);
  const markersRef = useRef<Map<string, import("leaflet").Marker>>(new Map());
  const cbRef = useRef(onSelect ?? (() => {}));
  const errRef = useRef(onBasemapError);
  useEffect(() => {
    cbRef.current = onSelect ?? (() => {});
    errRef.current = onBasemapError;
  });
  const [theme, setTheme] = useState(() =>
    typeof window === "undefined"
      ? "light"
      : document.documentElement.getAttribute("data-theme") ?? "light",
  );
  // Map creation is async, so dependent effects wait for this flag.
  const [ready, setReady] = useState(false);

  // Map owns its basemap so server pages get dark tiles too. Never a CSS filter on tiles.
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setTheme(document.documentElement.getAttribute("data-theme") ?? "light"),
    );
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => obs.disconnect();
  }, []);

  function addTiles(L: typeof import("leaflet"), map: import("leaflet").Map, fallback: boolean) {
    if (layerRef.current) map.removeLayer(layerRef.current);
    const styled = !fallback && STYLED !== null && (theme === "dark" ? STYLED.dark : STYLED.light);
    const layer = L.tileLayer(styled || OSM_TILES, {
      attribution: styled ? CARTO_ATTRIBUTION : OSM_ATTRIBUTION,
      maxZoom: 19,
    });
    let fails = 0;
    layer.on("tileerror", () => {
      if (++fails < 4) return;
      if (!fallbackRef.current && STYLED !== null) {
        fallbackRef.current = true;
        addTiles(L, map, true);
        errRef.current?.(true);
      } else {
        errRef.current?.(false);
      }
    });
    layerRef.current = layer.addTo(map);
  }

  useEffect(() => {
    let dead = false;
    (async () => {
      const L = await import("leaflet");
      if (dead || !elRef.current || mapRef.current) return;
      // ponytail: lng fence at ±300, hard wall at 1.0. Every marker sits inside ±180.
      // Lat stays ±90: Web Mercator has no tiles past 85.05°, widening it is meaningless.
      const map = L.map(elRef.current, {
        worldCopyJump: false,
        zoomControl: false,
        minZoom: 2,
        maxBounds: L.latLngBounds(
          L.latLng(-90, -300),
          L.latLng(90, 300),
        ),
        maxBoundsViscosity: 1.0,
      }).setView([25, 10], 2);
      // ponytail: position reads the live pointer, no resize listener. Second control only if a third corner is needed.
      L.control
        .zoom({ position: window.matchMedia("(pointer: coarse)").matches ? "bottomright" : "topright" })
        .addTo(map);
      mapRef.current = map;
      addTiles(L, map, false);
      map.attributionControl.setPrefix(false);
      setReady(true);
    })();
    return () => {
      dead = true;
      mapRef.current?.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- init once; addTiles reads live refs
  }, []);

  // Swap basemap on theme change. Never a CSS filter on tiles.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    import("leaflet").then((L) => addTiles(L, map, fallbackRef.current));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- addTiles reads the current theme from closure
  }, [theme, ready]);

  // Rebuild markers when the filtered set or selection changes.
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    let dead = false;
    import("leaflet").then((L) => {
      if (dead) return;
      for (const m of markersRef.current.values()) m.remove();
      markersRef.current.clear();
      // Answered game markers go inert so keyboard users skip dead tab stops.
      const locked = anonymous && selectedId !== null;
      for (let idx = 0; idx < items.length; idx++) {
        const e = items[idx];
        const selected = e.id === selectedId;
        const icon = L.divIcon({
          className: "",
          html: `<div style="width:44px;height:44px;display:flex;align-items:center;justify-content:center;"><div class="${selected ? "baw-selected-pulse" : ""}" style="${shapeStyle(e.category, categoryColor(e.category), selected)}"></div></div>`,
          iconSize: [44, 44],
          iconAnchor: [22, 22],
        });
        const marker = L.marker([e.coordinates[1], e.coordinates[0]], {
          icon,
          alt: anonymous ? `Candidate ${idx + 1} of ${items.length}` : `${e.title}, ${categoryLabel(e.category)}`,
          keyboard: !locked,
          interactive: !locked,
        });
        if (!anonymous) {
          marker.bindTooltip(`${e.title} · ${categoryLabel(e.category)}`, {
            direction: "top",
            offset: [0, -26],
            className: "baw-tip",
          });
        }
        marker.on("click", () => {
          const map = mapRef.current;
          if (map && !anonymous) {
            const pt = map.latLngToContainerPoint(marker.getLatLng());
            let near = 0;
            for (const m of markersRef.current.values()) {
              const q = map.latLngToContainerPoint(m.getLatLng());
              if (Math.hypot(q.x - pt.x, q.y - pt.y) < 28) near++;
            }
            // ponytail: stack tap zooms instead of guessing. Cluster lib only past ~50 entries.
            if (near > 1 && map.getZoom() < 12) {
              map.zoomIn(1, {
                animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
              });
              return;
            }
          }
          cbRef.current(e.id);
        });
        marker.addTo(map);
        markersRef.current.set(e.id, marker);
      }
    });
    return () => {
      dead = true;
    };
  }, [items, selectedId, anonymous, ready]);

  // Fly to selection. Reduced motion gets an instant jump.
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !focus) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) map.setView([focus.lat, focus.lon], focus.zoom, { animate: false });
    else map.flyTo([focus.lat, focus.lon], focus.zoom, { duration: 1.1 });
  }, [focus, ready]);

  return (
    <div className="relative h-full w-full">
      <div ref={elRef} role="application" aria-label="World map of weird borders" className="absolute inset-0 z-0" />
      <noscript>
        <p className="p-4 text-sm">The map needs JavaScript. Use the list below to reach every exhibit.</p>
      </noscript>
    </div>
  );
}
