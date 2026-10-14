import { Container, Divider, SectionHead } from "@/components/primitives";

export const metadata = {
  title: "About | The Strange Atlas",
  description: "What this atlas is, how facts are checked, and key border terms.",
};

export default function AboutPage() {
  return (
    <Container width="prose" as="main" id="content" className="flex flex-1 flex-col gap-8 py-8">
      <section>
        <h1 className="font-display text-3xl font-bold tracking-tight text-text-primary">About this atlas</h1>
        <p className="mt-3 text-text-primary">
          Borders are lines on maps, but they are also the result of history, geography, and decisions made by
          people. This project collects places where those forces leave an especially surprising mark on the map.
        </p>
        <p className="mt-2 text-text-primary">
          Every exhibit links to its sources. Some entries describe present-day arrangements, while others explain a
          historical situation that changed. The map pins are navigation aids and do not define legal boundaries.
        </p>
      </section>

      <Divider />

      <section aria-labelledby="glossary">
        <SectionHead id="glossary" eyebrow="Five terms" title="Short glossary" />
        <dl className="mt-3 flex flex-col gap-3 text-sm">
          <div>
            <dt className="font-semibold text-text-primary">Enclave</dt>
            <dd className="text-text-secondary">Territory of one state entirely surrounded by another state.</dd>
          </div>
          <div>
            <dt className="font-semibold text-text-primary">Exclave</dt>
            <dd className="text-text-secondary">
              Territory of one state separated from the mainland. The same land can be an exclave of its owner and an
              enclave from the neighbour view.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-text-primary">Counter-enclave</dt>
            <dd className="text-text-secondary">An enclave inside another enclave, such as Nahwa inside Madha.</dd>
          </div>
          <div>
            <dt className="font-semibold text-text-primary">Time zone</dt>
            <dd className="text-text-secondary">
              A region keeping one official clock offset. A few places use 30 or 45 minute steps.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-text-primary">International Date Line</dt>
            <dd className="text-text-secondary">
              The line where the calendar date changes. It bends around islands and states to keep them with their
              mainland date.
            </dd>
          </div>
        </dl>
      </section>

      <section aria-labelledby="facts-title" id="facts" className="scroll-mt-6">
        <SectionHead id="facts-title" eyebrow="Method" title="How facts are checked" />
        <ul className="mt-3 list-disc pl-5 text-sm text-text-primary">
          <li>Government, municipal, treaty, and official local pages come first.</li>
          <li>Scientific and educational institutions come next, then established reference publishers.</li>
          <li>General reference sites are starting points only, never the sole source for disputed claims.</li>
          <li>Every claim sits beside the source that supports it, with the verification date on record.</li>
          <li>Where sources disagree, the entry says so or leaves the claim out.</li>
          <li>Distances are straight-line estimates. Pins are approximate map anchors.</li>
        </ul>
        <p className="mt-2 text-sm text-text-secondary">
          The collection is curated and may be corrected as better evidence becomes available.
        </p>
      </section>

      <section aria-labelledby="privacy">
        <SectionHead id="privacy" eyebrow="Local only" title="Your progress stays in this browser" />
        <p className="mt-3 text-sm text-text-primary">
          Discovery progress and theme choice are saved in this browser only, using local storage. No account is
          needed and nothing is sent to a server. Clearing site data removes them.
        </p>
      </section>
    </Container>
  );
}
