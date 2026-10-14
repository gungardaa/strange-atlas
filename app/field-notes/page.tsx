"use client";

import { useEffect, useState } from "react";
import { verifiedExhibits } from "@/data/exhibits";
import { getDiscovered, populatedCategories, searchExhibits } from "@/lib/utils";
import { ExhibitCard } from "@/components/exhibit";
import { glyphFor } from "@/components/icons";
import { Container, EmptyState, Eyebrow, FilterChip, SearchField, SectionHead } from "@/components/primitives";

export default function FieldNotesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [discovered, setDiscovered] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-once sync from localStorage
    setDiscovered(getDiscovered().length);
  }, []);
  const items = searchExhibits(query, category);

  return (
    <Container width="page" as="main" id="content" className="flex flex-1 flex-col gap-4 py-8">
      <SectionHead
        as="h1"
        eyebrow={`${discovered} of ${verifiedExhibits.length} surveyed`}
        title="Field Notes"
        lede="Every entry below opens a sourced story."
      />
      <div className="flex flex-wrap items-center gap-2" role="search">
        <SearchField
          id="notes-search"
          label="Search entries"
          value={query}
          onChange={setQuery}
          placeholder="Search name, country, tag…"
        />
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter by category">
        <FilterChip pressed={category === null} onClick={() => setCategory(null)}>
          All
        </FilterChip>
        {populatedCategories.map((c) => (
          <FilterChip
            key={c.id}
            pressed={category === c.id}
            glyph={glyphFor(c.id, c.color)}
            onClick={() => setCategory(category === c.id ? null : c.id)}
          >
            {c.label}
          </FilterChip>
        ))}
      </div>
      <Eyebrow>
        <span aria-live="polite">{items.length} entries</span>
      </Eyebrow>
      <div className="grid gap-4 md:grid-cols-3">
        {items.map((e) => (
          <ExhibitCard key={e.id} e={e} />
        ))}
      </div>
      {items.length === 0 && (
        <EmptyState title="No matches on this survey" hint="Try a shorter search or clear the filters." />
      )}
    </Container>
  );
}
