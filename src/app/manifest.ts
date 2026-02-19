import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ACLCS | Company Formation in Cyprus & Europe",
    short_name: "ACLCS",
    description:
      "Leading Cyprus company formation, corporate services and residency specialist.",
    start_url: "/login",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0f172a",
    orientation: "portrait-primary",
    categories: ["business", "finance"],
    icons: [
      {
        src: "/api/pwa-icon/192",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/api/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/api/pwa-icon/512",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
