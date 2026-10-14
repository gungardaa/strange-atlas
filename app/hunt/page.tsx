"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useState } from "react";
import { exhibitBySlug } from "@/data/exhibits";
import { huntFindRounds, huntQuestions, type FindRound, type HuntQuestion } from "@/lib/utils";
import { DiscoverButton } from "@/components/ui";
import { ArrowRightIcon, CheckIcon, CloseIcon } from "@/components/icons";
import { btnClasses, Button, Card, EmptyState, Eyebrow } from "@/components/primitives";

const AtlasMap = dynamic(() => import("@/components/atlas-map"), { ssr: false });

export default function HuntPage() {
  const [mode, setMode] = useState<"name" | "find">("name");
  // Generated after mount so server and client render the same loading state.
  const [nameRounds, setNameRounds] = useState<HuntQuestion[]>([]);
  const [findRounds, setFindRounds] = useState<FindRound[]>([]);
  const [seed, setSeed] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-once shuffle, keeps SSR HTML stable
    setNameRounds(huntQuestions(10));
    setFindRounds(huntFindRounds(5));
  }, [seed]);

  if (nameRounds.length === 0) {
    return (
      <main id="content" className="mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-2xl flex-1 flex-col items-center justify-start gap-4 px-4 py-10 text-center">
        <h1 className="font-display text-3xl font-bold text-text-primary">Can you name it</h1>
        <p className="text-text-secondary">Shuffling clues from the atlas…</p>
      </main>
    );
  }

  return (
      <main id="content" className="mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-2xl flex-1 flex-col justify-start gap-5 px-4 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h1 className="font-display text-2xl font-bold tracking-tight text-text-primary">{mode === "name" ? "Can you name it?" : "Can you find it?"}</h1>
        <div className="flex gap-1 rounded-md border border-border bg-surface p-1" role="group" aria-label="Hunt mode">
          {(["name", "find"] as const).map((m) => (
            <button
              key={m}
              type="button"
              aria-pressed={mode === m}
              onClick={() => setMode(m)}
              className={`rounded-sm px-3 py-1.5 text-sm transition-colors ${
                mode === m ? "bg-surface-secondary font-semibold text-text-primary" : "text-text-secondary hover:text-text-primary"
              }`}
            >
              {m === "name" ? "Name it" : "Find it"}
            </button>
          ))}
        </div>
      </div>
      {mode === "name" ? (
        <NameRun key={`name-${seed}`} rounds={nameRounds} onNew={() => setSeed((s) => s + 1)} />
      ) : (
        <FindRun key={`find-${seed}`} rounds={findRounds} onNew={() => setSeed((s) => s + 1)} />
      )}
    </main>
  );
}

function AnswerSources({ slug }: { slug: string }) {
  // Sources live on the exhibit; the hunt shows rather than duplicates them.
  const e = exhibitBySlug(slug);
  if (!e) return null;
  return (
    <ul className="mt-2 flex flex-col gap-1 text-xs text-text-muted">
      {e.sources.map((s) => (
        <li key={s.url}>
          Source.{" "}
          <a
            href={s.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-accent decoration-2 underline-offset-2"
          >
            {s.publisher} — {s.title}
          </a>
        </li>
      ))}
    </ul>
  );
}

function NameRun({ rounds, onNew }: { rounds: HuntQuestion[]; onNew: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const q = rounds[i];

  if (!q || done) {
    return <DoneState score={score} total={rounds.length} onNew={onNew} />;
  }

  const correct = picked === q.answer.id;
  return (
    <>
      <Eyebrow>
        Question {i + 1} of {rounds.length} · score {score}
      </Eyebrow>
      <Card as="section" crosshair>
        <div className="text-lg text-text-primary">
          {q.clue}
          <span className="mt-2 block text-sm text-text-secondary">Where are you looking for?</span>
        </div>
      </Card>

      <div className="grid gap-2" role="group" aria-label="Answer choices">
        {q.choices.map((c, idx) => (
          <button
            key={c.id}
            type="button"
            disabled={picked !== null}
            onClick={() => {
              setPicked(c.id);
              if (c.id === q.answer.id) setScore((s) => s + 1);
            }}
            className={`flex items-center gap-3 rounded-md border p-3 text-left text-sm font-medium transition-colors ${
              picked === null
                ? "border-border bg-surface text-text-primary hover:border-accent"
                : c.id === q.answer.id
                  ? "border-accent bg-surface font-bold text-text-primary"
                  : c.id === picked
                    ? "border-border bg-surface-secondary text-text-muted"
                    : "border-border bg-surface text-text-muted"
            }`}
          >
            <span
              aria-hidden
              className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-sm border font-mono text-xs ${
                picked !== null && c.id === q.answer.id
                  ? "border-accent text-accent"
                  : "border-border text-text-muted"
              }`}
            >
              {String.fromCharCode(65 + idx)}
            </span>
            <span>{c.title}</span>
            {picked !== null && c.id === q.answer.id && (
              <CheckIcon className="h-5 w-5 shrink-0 text-accent" />
            )}
            {picked !== null && c.id === picked && c.id !== q.answer.id && (
              <CloseIcon className="h-5 w-5 shrink-0 text-danger" />
            )}
          </button>
        ))}
      </div>

      {picked !== null && (
        <RevealCard
          correct={correct}
          headline={correct ? "Found it." : `Not quite. It was ${q.answer.title}.`}
          answerSlug={q.answer.slug}
          answerId={q.answer.id}
          leadFact={q.answer.leadFact}
          onNext={() => {
            if (i + 1 >= rounds.length) setDone(true);
            else {
              setI(i + 1);
              setPicked(null);
            }
          }}
          last={i + 1 >= rounds.length}
        />
      )}
    </>
  );
}

function FindRun({ rounds, onNew }: { rounds: FindRound[]; onNew: () => void }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [sel, setSel] = useState<string | null>(null);
  const [mapFocus, setMapFocus] = useState<{ id: string; lon: number; lat: number; zoom: number } | null>(null);
  const r = rounds[i];

  // After a marker tap, bring the result into view. Delayed so the map
  // flight finishes first; the two motions fight on mobile otherwise.
  useEffect(() => {
    if (picked === null) return;
    const reveal = () => document.getElementById("hunt-reveal")?.focus({ preventScroll: true });
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      document.getElementById("hunt-reveal")?.scrollIntoView({ block: "start" });
      reveal();
      return;
    }
    const t = window.setTimeout(() => {
      document
        .getElementById("hunt-reveal")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
      reveal();
    }, 350);
    return () => window.clearTimeout(t);
  }, [picked]);

  if (!r || done) {
    return <DoneState score={score} total={rounds.length} onNew={onNew} />;
  }

  const tapped = picked ? r.candidates.find((c) => c.id === picked) : null;
  const correct = picked === r.answer.id;

  const tap = (id: string) => {
    if (picked !== null) return;
    setPicked(id);
    if (id === r.answer.id) setScore((s) => s + 1);
    setSel(r.answer.id);
    setMapFocus({
      id: r.answer.id,
      lon: r.answer.coordinates[0],
      lat: r.answer.coordinates[1],
      zoom: r.answer.mapZoom ?? 6,
    });
  };

  const next = () => {
    if (i + 1 >= rounds.length) {
      setDone(true);
    } else {
      setI(i + 1);
      setPicked(null);
      setSel(null);
      setMapFocus({ id: `world-${i + 1}`, lon: 10, lat: 25, zoom: 2 });
    }
  };

  return (
    <>
      <Eyebrow>
        Find {i + 1} of {rounds.length} · score {score}
      </Eyebrow>
      <Card as="section" crosshair>
        <div className="text-lg text-text-primary">
          {r.clue}
          <span className="mt-2 block text-sm text-text-secondary">Tap the marker on the map</span>
        </div>
      </Card>

      <div className="relative h-[46vh] overflow-hidden rounded-md border border-border md:h-[54vh]">
        <AtlasMap items={r.candidates} selectedId={sel} anonymous onSelect={tap} focus={mapFocus} />
      </div>

      {picked !== null && (
        <RevealCard
          id="hunt-reveal"
          correct={correct}
          headline={correct ? "Found it." : `Not quite. That was ${tapped?.title ?? "another marker"}.`}
          answerSlug={r.answer.slug}
          answerId={r.answer.id}
          leadFact={r.answer.leadFact}
          onNext={next}
          last={i + 1 >= rounds.length}
        />
      )}
    </>
  );
}

function RevealCard({
  id,
  correct,
  headline,
  answerSlug,
  answerId,
  leadFact,
  onNext,
  last,
}: {
  id?: string;
  correct: boolean;
  headline: string;
  answerSlug: string;
  answerId: string;
  leadFact: string;
  onNext: () => void;
  last: boolean;
}) {
  return (
    <Card id={id} tabIndex={id ? -1 : undefined} className="border-accent scroll-mt-24" aria-live="polite">
      <p className="flex items-center gap-2 font-display font-bold text-text-primary">
        {correct ? <CheckIcon className="h-3.5 w-3.5 shrink-0 text-accent" /> : <CloseIcon className="h-3.5 w-3.5 shrink-0 text-text-secondary" />}
        {headline}
      </p>
      <p className="mt-1 text-sm text-text-primary">{leadFact}</p>
      <AnswerSources slug={answerSlug} />
      <div className="mt-3 flex flex-wrap gap-2">
        <Link href={`/places/${answerSlug}`} className={btnClasses("primary", "sm")}>
          Read the story <ArrowRightIcon />
        </Link>
        <DiscoverButton id={answerId} />
        <Button variant="ghost" size="sm" onClick={onNext}>
          {last ? "See results" : "Next challenge"}
        </Button>
      </div>
    </Card>
  );
}

function DoneState({ score, total, onNew }: { score: number; total: number; onNew: () => void }) {
  return (
    <div className="mx-auto flex min-h-[calc(100svh-3rem)] w-full max-w-2xl flex-1 flex-col justify-start px-4 py-10">
      <EmptyState
      title="Hunt complete"
      hint={`You placed ${score} of ${total} correctly.`}
      action={
        <>
          <Button variant="primary" size="md" onClick={onNew}>
            New hunt
          </Button>
          <Link href="/atlas" className={btnClasses("secondary", "md")}>
            Back to the atlas
          </Link>
        </>
      }
    />
    </div>
  );
}
