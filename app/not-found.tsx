import Link from "next/link";
import { btnClasses, Container, Eyebrow } from "@/components/primitives";

export default function NotFound() {
  return (
    <Container width="prose" as="main" id="content" className="graticule graticule-faint flex flex-1 flex-col justify-center py-16 text-center">
      <Eyebrow>Fig. 00 · No fix</Eyebrow>
      <p className="mt-2 font-display text-4xl font-bold tracking-tight text-text-primary">Off the map</p>
      <p className="mt-2 font-mono text-xs tracking-widest text-text-muted">--.--, --.--</p>
      <p className="mx-auto mt-3 max-w-sm text-sm text-text-secondary">
        No exhibit lives at this address. The atlas and the full list still work.
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-3">
        <Link href="/atlas" className={btnClasses("primary", "md")}>
          Back to the atlas
        </Link>
        <Link href="/field-notes" className={btnClasses("secondary", "md")}>
          Browse all entries
        </Link>
      </div>
    </Container>
  );
}
