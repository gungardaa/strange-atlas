import { CATEGORIES, verifiedExhibits, type Exhibit } from "@/data/exhibits";

// ponytail: precomputed once for 31 entries. Sort at render past ~200.
export const orderedExhibits = [...verifiedExhibits].sort(
  (a, b) =>
    CATEGORIES.findIndex((c) => c.id === a.category) - CATEGORIES.findIndex((c) => c.id === b.category) ||
    a.number - b.number,
);

// ponytail: one world view for map resets. Per-marker zoom stays on the exhibit.
export const WORLD_VIEW = { id: "__world__", lon: 10, lat: 25, zoom: 2 };

export function haversineKm(
  lon1: number,
  lat1: number,
  lon2: number,
  lat2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(a));
}

export function nearbyExhibits(current: Exhibit, n = 3): { exhibit: Exhibit; km: number }[] {
  return verifiedExhibits
    .filter((e) => e.id !== current.id)
    .map((e) => ({
      exhibit: e,
      km: haversineKm(current.coordinates[0], current.coordinates[1], e.coordinates[0], e.coordinates[1]),
    }))
    .sort((a, b) => a.km - b.km)
    .slice(0, n);
}

const DISCOVERED_KEY = "baw-discovered";

export function getDiscovered(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(DISCOVERED_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function toggleDiscovered(id: string): string[] {
  const cur = getDiscovered();
  const next = cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id];
  try {
    localStorage.setItem(DISCOVERED_KEY, JSON.stringify(next));
  } catch {
    /* ponytail: private-mode writes fail silently, progress just lasts the session */
  }
  return next;
}

export function searchExhibits(q: string, category: string | Set<string> | null, tag?: string | null): Exhibit[] {
  const needle = q.trim().toLowerCase();
  return orderedExhibits.filter((e) => {
    if (category instanceof Set ? category.size > 0 && !category.has(e.category) : category && e.category !== category)
      return false;
    if (tag && !e.tags.includes(tag)) return false;
    if (!needle) return true;
    return [e.title, e.subtitle, e.teaser, e.leadFact, e.category, ...e.countries, ...e.tags]
      .join(" ")
      .toLowerCase()
      .includes(needle);
  });
}

// ponytail: Math.random pick, no seed. Deterministic quiz order can come later if asked.
export function surprisePick(discovered: string[]): Exhibit {
  const fresh = verifiedExhibits.filter((e) => !discovered.includes(e.id));
  const pool = fresh.length > 0 ? fresh : verifiedExhibits;
  return pool[Math.floor(Math.random() * pool.length)];
}

export type HuntQuestion = {
  clue: string;
  choices: Exhibit[];
  answer: Exhibit;
};

export type FindRound = {
  clue: string;
  answer: Exhibit;
  candidates: Exhibit[];
};

// ponytail: same shuffle approach as huntQuestions. Unify the two if a third game mode arrives.
export function huntFindRounds(count = 5): FindRound[] {
  const pool = [...verifiedExhibits].sort(() => Math.random() - 0.5).slice(0, count);
  return pool.map((answer) => {
    const distractors = verifiedExhibits
      .filter((e) => e.id !== answer.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const candidates = [...distractors, answer].sort(() => Math.random() - 0.5);
    return { clue: answer.teaser, answer, candidates };
  });
}

export function huntQuestions(count = 10): HuntQuestion[] {
  const pool = [...verifiedExhibits].sort(() => Math.random() - 0.5).slice(0, count);
  return pool.map((answer) => {
    const distractors = verifiedExhibits
      .filter((e) => e.id !== answer.id)
      .sort(() => Math.random() - 0.5)
      .slice(0, 3);
    const choices = [...distractors, answer].sort(() => Math.random() - 0.5);
    return { clue: answer.teaser, choices, answer };
  });
}

export function formatKm(km: number): string {
  if (km < 10) return `${Math.round(km)} km`;
  if (km < 1000) {
    const r = Math.round(km / 10) * 10;
    return r >= 1000 ? "1.0k km" : `${r} km`;
  }
  return `${(km / 1000).toFixed(1)}k km`;
}

// ponytail: computed per render over 31 entries. Memoize or precompute past ~200.
export function categoryProgress(discovered: string[]): Map<string, { done: number; total: number }> {
  const out = new Map<string, { done: number; total: number }>();
  for (const c of CATEGORIES) {
    const inCat = verifiedExhibits.filter((e) => e.category === c.id);
    out.set(c.id, {
      done: inCat.filter((e) => discovered.includes(e.id)).length,
      total: inCat.length,
    });
  }
  return out;
}

// ponytail: computed once for 31 entries. Filter per render past ~200.
export const populatedCategories = CATEGORIES.filter((c) =>
  verifiedExhibits.some((e) => e.category === c.id),
);
