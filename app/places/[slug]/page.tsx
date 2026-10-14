import Link from "next/link";
import { notFound } from "next/navigation";
import { exhibitBySlug, verifiedExhibits } from "@/data/exhibits";
import { formatKm, nearbyExhibits, orderedExhibits } from "@/lib/utils";
import { CategoryChip, ExhibitCard, ExhibitId, Timeline } from "@/components/exhibit";
import { DiscoverButton } from "@/components/ui";
import { ArrowRightIcon } from "@/components/icons";
import { btnClasses, Chip, Container, Eyebrow } from "@/components/primitives";
import DetailMap from "@/components/detail-map";

export async function generateStaticParams() {
  return verifiedExhibits.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata(props: PageProps<"/places/[slug]">) {
  const { slug } = await props.params;
  const e = exhibitBySlug(slug);
  if (!e) return { title: "Off the map" };
  return {
    title: e.title,
    description: e.teaser,
    alternates: { canonical: `/places/${e.slug}` },
  };
}

export default async function PlacePage(props: PageProps<"/places/[slug]">) {
  const { slug } = await props.params;
  const e = exhibitBySlug(slug);
  if (!e) notFound();

  const nearby = nearbyExhibits(e, 3);
  const next = orderedExhibits[(orderedExhibits.indexOf(e) + 1) % orderedExhibits.length];

  return (
    <Container width="prose" as="main" id="content" className="flex flex-1 flex-col gap-8 py-8">
      <header>
        <ExhibitId n={e.number} />
        <h1 className="mt-1 font-display text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">{e.title}</h1>
        <p className="mt-1 text-text-secondary">{e.subtitle}</p>
        <Eyebrow>
          {e.locationPrecision === "point-of-interest"
            ? "Point of interest"
            : e.locationPrecision === "historical-area"
              ? "Historical area"
              : "Approximate area"}{" "}
          · {e.coordinates[1].toFixed(2)}, {e.coordinates[0].toFixed(2)}
        </Eyebrow>
        <div className="mt-2 flex flex-wrap gap-2">
          <CategoryChip category={e.category} />
          {e.tags.map((t) => (
            <Link
              key={t}
              href={`/atlas#tag=${encodeURIComponent(t)}`}
              aria-label={`Follow the ${t} thread on the map`}
              className="tappable inline-flex items-center rounded-sm transition-colors"
            >
              <Chip>{t}</Chip>
            </Link>
          ))}
        </div>
      </header>

      <p className="border-l-4 border-accent pl-4 text-lg font-medium text-text-primary">{e.leadFact}</p>

      <div>
        <div className="crosshair h-56 overflow-hidden rounded-md border border-border sm:h-64 lg:h-80">
          <DetailMap exhibit={e} />
        </div>
        <Eyebrow>Pin is approximate and marks a point of interest, not a legal boundary.</Eyebrow>
      </div>

      <section aria-labelledby="what">
        <h2 id="what" className="font-display text-xl font-bold text-text-primary">
          What is actually happening
        </h2>
        {e.explanation.map((p, i) => (
          <p key={i} className="mt-2 text-text-primary">
            {p}
          </p>
        ))}
      </section>

      {e.historicalContext && (
        <section aria-labelledby="hist">
          <h2 id="hist" className="font-display text-xl font-bold text-text-primary">
            How did we get here?
          </h2>
          <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-text-muted">Historical context</p>
          {e.historicalContext.map((p, i) => (
            <p key={i} className="mt-2 text-text-primary">
              {p}
            </p>
          ))}
        </section>
      )}

      {e.whyItMatters && (
        <section aria-labelledby="why">
          <h2 id="why" className="font-display text-xl font-bold text-text-primary">
            Why it matters
          </h2>
          {e.whyItMatters.map((p, i) => (
            <p key={i} className="mt-2 text-text-primary">
              {p}
            </p>
          ))}
        </section>
      )}

      {e.timeline && <Timeline events={e.timeline} />}

      {e.fieldNote && (
        <p className="rounded-md bg-surface-secondary p-4 text-sm text-text-secondary">
          <strong className="text-text-primary">Field note.</strong> {e.fieldNote}
        </p>
      )}

      <section aria-labelledby="sources">
        <Eyebrow>Selected references</Eyebrow>
        <h2 id="sources" className="mt-1 font-display text-xl font-bold text-text-primary">
          Find out more
        </h2>
        <ul className="mt-2 divide-y divide-border border-y border-border">
          {e.sources.map((s) => (
            <li key={s.url}>
              <a
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group grid grid-cols-[1.5rem_1fr] gap-2 py-3"
              >
                <ArrowRightIcon className="mt-1 transition-transform group-hover:translate-x-0.5" />
                <span>
                  <span className="block font-mono text-xs uppercase tracking-[0.2em] text-accent">
                    {s.publisher}
                  </span>
                  <span className="mt-0.5 block font-display text-lg font-bold leading-snug text-text-primary transition-colors group-hover:text-accent">
                    {s.title}
                  </span>
                  <span className="mt-0.5 block truncate font-mono text-xs text-text-muted">
                    {new URL(s.url).hostname.replace(/^www\./, "")} ↗
                    {s.language && s.language !== "English" ? ` · in ${s.language}` : ""}
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="nearby">
        <h2 id="nearby" className="font-display text-xl font-bold text-text-primary">
          Nearby discoveries
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {nearby.map(({ exhibit, km }) => (
            <div key={exhibit.id} className="flex flex-col">
              <div className="flex-1">
                <ExhibitCard e={exhibit} className="h-full" />
              </div>
              <p className="mt-1 font-mono text-xs text-text-muted">
                APPROX. STRAIGHT-LINE DISTANCE. {formatKm(km)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <div className="flex flex-col gap-2">
        <Eyebrow>Up next. {next.title}</Eyebrow>
        <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap">
          <Link href={`/places/${next.slug}`} className={btnClasses("primary", "md")}>
            Next discovery <ArrowRightIcon />
          </Link>
          <DiscoverButton id={e.id} />
          <Link href={`/atlas#place=${e.slug}`} className={btnClasses("ghost", "md")}>
            Explore on the map
          </Link>
        </div>
      </div>
    </Container>
  );
}
