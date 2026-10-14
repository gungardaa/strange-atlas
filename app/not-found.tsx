import Link from "next/link";
import { btnClasses, Container, EmptyState } from "@/components/primitives";

export default function NotFound() {
  return (
    <Container width="prose" as="main" id="content" className="flex flex-1 flex-col justify-center py-16">
      <EmptyState
        title="Off the map"
        hint="No exhibit lives at this address. The atlas and the full list below still work."
        action={
          <>
            <Link href="/atlas" className={btnClasses("primary", "md")}>
              Back to the atlas
            </Link>
            <Link href="/field-notes" className={btnClasses("secondary", "md")}>
              Browse all entries
            </Link>
          </>
        }
      />
    </Container>
  );
}
