import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${SITE.name} — Custom Cartoon Portraits`,
    short_name: SITE.name,
    description: SITE.description,
    start_url: "/",
    display: "standalone",
    background_color: "#fff7e8",
    theme_color: "#ffd23f",
    icons: [{ src: "/icon.png", sizes: "192x192", type: "image/png" }, { src: "/logo.png", sizes: "512x512", type: "image/png" }],
  };
}
