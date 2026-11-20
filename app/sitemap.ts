import type { MetadataRoute } from "next";
import { SITE, WORKS } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.url,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      images: WORKS.map((w) => `${SITE.url}/works/${w.toon}.webp`),
    },
  ];
}
