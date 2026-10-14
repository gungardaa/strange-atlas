import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import "./globals.css";
import SiteHeader from "@/components/site-header";

const display = Space_Grotesk({ variable: "--font-display", subsets: ["latin"] });
const sans = Inter({ variable: "--font-sans", subsets: ["latin"] });
const mono = IBM_Plex_Mono({ variable: "--font-mono", subsets: ["latin"], weight: ["400", "500"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ardanareswara-strange-atlas.vercel.app"),
  title: { default: "The Strange Atlas", template: "%s - The Strange Atlas" },
  description: "An atlas of places that make you look twice at a map.",
  openGraph: {
    title: "The Strange Atlas",
    description: "An atlas of places that make you look twice at a map.",
    siteName: "The Strange Atlas",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("baw-theme")||"dark";document.documentElement.setAttribute("data-theme",t)}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${display.variable} ${sans.variable} ${mono.variable} flex min-h-screen flex-col font-sans antialiased`}
      >
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:border focus:border-accent focus:bg-surface focus:px-4 focus:py-2 focus:text-text-primary"
        >
          Skip to content
        </a>
        <SiteHeader />
        <div className="flex flex-1 flex-col">{children}</div>
        <footer className="border-t border-border">
          <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-[1.2fr_1fr_1fr]">
            <div>
              <p className="font-display text-xl font-bold uppercase tracking-[0.2em] text-text-primary">
                The Strange Atlas
              </p>
              <p className="mt-3 max-w-xs text-sm text-text-secondary">
                An atlas of places that make you look twice at a map.
              </p>
            </div>
            <nav aria-label="Explore">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">Explore</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/atlas" className="transition-colors hover:text-accent">
                    Atlas
                  </Link>
                </li>
                <li>
                  <Link href="/field-notes" className="transition-colors hover:text-accent">
                    Field Notes
                  </Link>
                </li>
                <li>
                  <Link href="/hunt" className="transition-colors hover:text-accent">
                    The Hunt
                  </Link>
                </li>
              </ul>
            </nav>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-text-muted">About</p>
              <ul className="mt-3 space-y-2 text-sm">
                <li>
                  <Link href="/about" className="transition-colors hover:text-accent">
                    About the atlas
                  </Link>
                </li>
                <li>
                  <Link href="/about#facts" className="transition-colors hover:text-accent">
                    How facts are checked
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-4 py-5 font-mono text-xs text-text-muted sm:flex-row sm:items-center sm:justify-between">
              <p>© 2026 The Strange Atlas</p>
              <p>
                Map data ©{" "}
                <a className="underline" href="https://www.openstreetmap.org/copyright">
                  OpenStreetMap
                </a>{" "}
                ©{" "}
                <a className="underline" href="https://carto.com/attributions">
                  CARTO
                </a>
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
