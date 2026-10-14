import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://ardanareswara-strange-atlas.vercel.app/sitemap.xml",
  };
}
