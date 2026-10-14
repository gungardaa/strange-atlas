import Link from "next/link";
import { categoryColor, categoryLabel, type Exhibit, type TimelineEvent } from "@/data/exhibits";
import { glyphFor } from "./icons";
import { btnClasses, Card, Chip, Eyebrow } from "./primitives";

export function CategoryChip({ category }: { category: Exhibit["category"] }) {
  return (
    <Chip glyph={glyphFor(category, categoryColor(category))}>{categoryLabel(category)}</Chip>
  );
}

export function ExhibitId({ n }: { n: number }) {
  return <Eyebrow>Location {String(n).padStart(3, "0")}</Eyebrow>;
}

export function ExhibitCard({ e, className = "" }: { e: Exhibit; className?: string }) {

  return (
    <Card as="article" className={`flex flex-col ${className}`}>
      <ExhibitId n={e.number} />
      <h3 className="mt-1 font-display text-lg font-bold text-text-primary">
        <Link href={`/places/${e.slug}`} className="hover:underline">
          {e.title}
        </Link>
      </h3>
      <p className="mt-0.5 text-sm text-text-secondary">{e.countries.join(" · ")}</p>
      <p className="mt-2 line-clamp-3 min-h-[3.75rem] text-sm text-text-primary">{e.teaser}</p>
      <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
        <CategoryChip category={e.category} />
        <Link
          href={`/places/${e.slug}`}
          aria-label={`Read the story: ${e.title}`}
          className={btnClasses("secondary", "sm")}
        >
          Read the story
        </Link>
      </div>
    </Card>
  );
}

function TimelineEventItem({ t }: { t: TimelineEvent }) {
  return (
    <li className="border-l-2 border-accent pl-3">
      <p className="font-mono text-xs text-text-muted">{t.dateLabel}</p>
      <p className="font-semibold text-text-primary">{t.title}</p>
      <p className="text-sm text-text-secondary">{t.description}</p>
    </li>
  );
}

// ponytail: last event is the present state by convention. Toggle view only if asked.
// Then and Now as a labeled spine. Nothing hides, so mobile needs no extra interaction.
export function Timeline({ events }: { events: TimelineEvent[] }) {
  const before = events.slice(0, -1);
  const today = events.slice(-1);
  return (
    <Card as="section" aria-labelledby="then-now">
      <h2 id="then-now" className="font-display text-xl font-bold text-text-primary">
        Then and Now
      </h2>
      {before.length > 0 && (
        <>
          <div className="mt-3">
            <Eyebrow>Before</Eyebrow>
          </div>
          <ol className="mt-2 flex flex-col gap-3">
            {before.map((t) => (
              <TimelineEventItem key={t.dateLabel} t={t} />
            ))}
          </ol>
        </>
      )}
      <div className="mt-4">
        <Eyebrow>Today</Eyebrow>
      </div>
      <ol className="mt-2 flex flex-col gap-3">
        {today.map((t) => (
          <TimelineEventItem key={t.dateLabel} t={t} />
        ))}
      </ol>
    </Card>
  );
}
