"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { verifiedExhibits } from "@/data/exhibits";
import { getDiscovered, populatedCategories, surprisePick } from "@/lib/utils";
import { ExhibitCard } from "@/components/exhibit";
import { DiceIcon, glyphFor } from "@/components/icons";
import { btnClasses, Button, Card, Container, Eyebrow, SectionHead } from "@/components/primitives";

export default function Home() {
  const router = useRouter();
  const featured = verifiedExhibits.filter((e) => e.featured).slice(0, 3);
  const goRandom = () => {
    const e = surprisePick(getDiscovered());
    router.push(`/places/${e.slug}`);
  };

  return (
    <Container width="page" as="main" id="content" className="flex flex-1 flex-col gap-10 py-6 md:py-10">
      <section className="grid items-center gap-6 lg:grid-cols-2 lg:gap-8">
        <div>
          <Eyebrow>A curious atlas · {verifiedExhibits.length} exhibits</Eyebrow>
          <h1 className="mt-2 font-display text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-none tracking-tight text-text-primary">
            The Strange Atlas
          </h1>
          <p className="mt-3 text-lg text-text-secondary">
            An atlas of places that make you look twice at a map.
          </p>
          <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/atlas" className={btnClasses("primary", "md")}>
              Explore the atlas
            </Link>
            <Button variant="secondary" size="md" onClick={goRandom}>
              <DiceIcon /> Find me something strange
            </Button>
          </div>
        </div>
        <div aria-hidden className="graticule crosshair relative overflow-hidden rounded-md border border-border bg-surface-secondary p-6 lg:block">
          <div className="flex h-32 items-center justify-center gap-6 lg:h-44 lg:gap-8">
            {populatedCategories.slice(0, 3).map((c) => (
              <span key={c.id}>{glyphFor(c.id, c.color, "h-6 w-6")}</span>
            ))}
          </div>
          <p className="text-center font-mono text-[11px] tracking-widest text-text-muted">
            FIG. 01 · MARKER SURVEY
          </p>
        </div>
      </section>

      <section aria-labelledby="featured">
        <SectionHead id="featured" eyebrow="Field selection · three oddities" title="Featured discoveries" />
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((e) => (
            <ExhibitCard key={e.id} e={e} />
          ))}
        </div>
      </section>

      <section aria-labelledby="rabbithole">
        <SectionHead id="rabbithole" eyebrow={`${populatedCategories.length} threads`} title="Choose a rabbit hole" />
        <div className="mt-4 flex flex-wrap gap-2">
          {populatedCategories.map((c) => (
            <Link key={c.id} href={`/atlas#${c.id}`} className={btnClasses("secondary", "sm")}>
              {glyphFor(c.id, c.color)}
              {c.label}
            </Link>
          ))}
        </div>
      </section>

      <Card as="section" crosshair className="text-center" aria-labelledby="prompt">
        <h2 id="prompt" className="font-display text-xl font-bold text-text-primary">
          You have landed somewhere unusual.
        </h2>
        <p className="mt-1 text-text-secondary">Open a random exhibit or test yourself in the Hunt.</p>
        <div className="mt-4 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <Button variant="primary" size="md" onClick={goRandom}>
            Show me
          </Button>
          <Link href="/hunt" className={btnClasses("secondary", "md")}>
            Start the Hunt
          </Link>
        </div>
      </Card>

      <section className="text-sm text-text-muted">
        <hr className="border-border mb-4" />
        <p>
          Every exhibit links to its sources. Read how facts are checked in{" "}
          <Link href="/about" className="underline">
            About
          </Link>
          .
        </p>
      </section>
    </Container>
  );
}
