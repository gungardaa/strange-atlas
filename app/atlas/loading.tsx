// Static placeholder while the code-split map chunk loads. No shimmer.
export default function AtlasLoading() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-6" aria-label="Loading atlas">
      <div className="h-9 rounded-sm bg-surface-secondary" />
      <div className="flex flex-wrap gap-2">
        {["All discoveries", "Border puzzles", "Enclaves and exclaves", "Access oddities"].map((t) => (
          <span key={t} className="rounded-sm border border-border px-3 py-1.5 text-sm text-text-muted">
            {t}
          </span>
        ))}
      </div>
      <div className="graticule h-[52vh] rounded-md border border-border bg-surface-secondary md:h-[68vh]" />
    </div>
  );
}
