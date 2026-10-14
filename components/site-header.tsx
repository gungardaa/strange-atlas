"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { MoonIcon, SunIcon } from "./icons";

const LINKS = [
  { href: "/atlas", label: "Atlas" },
  { href: "/field-notes", label: "Field Notes" },
  { href: "/hunt", label: "The Hunt" },
  { href: "/about", label: "About" },
];

function applyTheme(t: string) {
  document.documentElement.setAttribute("data-theme", t);
  try {
    localStorage.setItem("baw-theme", t);
  } catch {
    /* private mode: theme lasts the session */
  }
}

export function ThemeToggle() {
  // Fixed init avoids a hydration mismatch; the stored value syncs pre-paint below.
  const [theme, setTheme] = useState("dark");
  // Re-apply after hydration. Runs before paint, so no visible flash.
  useLayoutEffect(() => {
    try {
      const t =
        localStorage.getItem("baw-theme") ??
        document.documentElement.getAttribute("data-theme") ??
        "dark";
      document.documentElement.setAttribute("data-theme", t);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- mount-once sync from localStorage/DOM
      setTheme(t);
    } catch {
      /* ignore */
    }
  }, []);
  return (
    <button
      type="button"
      onClick={() => {
        const next = theme === "dark" ? "light" : "dark";
        setTheme(next);
        applyTheme(next);
      }}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
      className="flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-text-primary transition-colors hover:text-accent"
    >
      {theme === "dark" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // Escape closes the mobile menu and returns focus to its button.
  useEffect(() => {
    if (!open) return;
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key !== "Escape") return;
      setOpen(false);
      document.getElementById("menu-button")?.focus();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open ]);
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link
            href="/"
            className="flex min-w-0 items-center gap-2 font-display text-base font-bold tracking-tight text-text-primary sm:text-lg"
          >
            <Image src="/logo.png" alt="The Strange Atlas logo" width={32} height={32} className="h-8 w-8 shrink-0" />
            <span className="truncate">The Strange Atlas</span>
          </Link>
        <div className="flex items-center gap-6">
          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                aria-current={pathname === l.href ? "page" : undefined}
                className="text-sm uppercase tracking-[0.12em] text-text-secondary transition-colors hover:text-accent"
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <button
              type="button"
              id="menu-button"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="min-h-[44px] min-w-[44px] p-2 text-sm uppercase tracking-[0.2em] text-text-primary lg:hidden"
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <div id="mobile-menu" className="max-h-[calc(100dvh-60px)] overflow-y-auto border-t border-border bg-background lg:hidden">
          <nav aria-label="Mobile" className="mx-auto max-w-6xl px-4 py-4">
            <ul>
              {LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={pathname === l.href ? "page" : undefined}
                    className="block py-3 font-display text-2xl uppercase text-text-primary transition-colors hover:text-accent"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}
