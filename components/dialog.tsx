"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { CloseIcon } from "./icons";

// Native <dialog> foundation. showModal traps focus without a library.
// ponytail: no focus-trap dep, no portal. Add only for nested dialogs.
export function Dialog({
  open,
  onClose,
  label,
  children,
}: {
  open: boolean;
  onClose: () => void;
  label: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open ]);

  return (
    <dialog
      ref={ref}
      aria-label={label}
      onClose={onClose}
      onClick={(e) => {
        if (e.target === ref.current) ref.current?.close();
      }}
      className="baw-dialog"
    >
      <div className="flex items-start justify-between gap-3 border-b border-border p-4">
        <p className="font-display font-bold text-text-primary">{label}</p>
        <button
          type="button"
          onClick={() => ref.current?.close()}
          aria-label="Close dialog"
          data-tip="Close"
          className="rounded-sm border border-border p-1.5 text-text-secondary transition-colors hover:border-accent hover:text-text-primary"
        >
          <CloseIcon />
        </button>
      </div>
      <div className="p-4">{children}</div>
    </dialog>
  );
}
