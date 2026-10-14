import type { MetadataRoute } from "next";
import { verifiedExhibits } from "@/data/exhibits";

// ponytail: static route list, no CMS. Generate from data if routes grow dynamic segments.
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ardanareswara-strange-atlas.vercel.app";
  return [
    "",
    "/atlas",
    "/field-notes",
    "/hunt",
    "/about",
    ...verifiedExhibits.map((e) => `/places/${e.slug}`),
  ].map((path) => ({ url: base + path }));
}
