"use client";

import { useEffect } from "react";
import { btnClasses, Container, EmptyState } from "@/components/primitives";

// ponytail: single global boundary. Per-route error.tsx only if a route needs custom recovery.
export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <Container width="prose" as="main" id="content" className="flex flex-1 flex-col justify-center py-16">
      <EmptyState
        title="Something broke"
        hint="Try again, or go back to a page that works."
        action={
          <>
            <button type="button" onClick={reset} className={btnClasses("primary", "md")}>
              Try again
            </button>
            <a href="/atlas" className={btnClasses("secondary", "md")}>
              Back to the atlas
            </a>
          </>
        }
      />
    </Container>
  );
}
