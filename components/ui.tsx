"use client";

import { useEffect, useState } from "react";
import { getDiscovered, toggleDiscovered } from "@/lib/utils";
import { CheckIcon } from "./icons";
import { Button } from "./primitives";

export function DiscoverButton({ id, onChange }: { id: string; onChange?: (ids: string[]) => void }) {
  // Fixed init avoids a hydration mismatch; stored progress syncs after mount.
  const [done, setDone] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-once sync from localStorage
    setDone(getDiscovered().includes(id));
  }, [id]);
  return (
    <Button
      variant={done ? "ghost" : "secondary"}
      size="sm"
      aria-pressed={done}
      onClick={() => {
        const next = toggleDiscovered(id);
        setDone(next.includes(id));
        onChange?.(next);
      }}
    >
      {done ? (
        <>
          <CheckIcon /> Discovered
        </>
      ) : (
        "Mark as discovered"
      )}
    </Button>
  );
}
