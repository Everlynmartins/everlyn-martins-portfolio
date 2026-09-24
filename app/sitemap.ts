import type { MetadataRoute } from "next";
import { projects } from "./data/portfolio";

const baseUrl = "https://everlynmartins.github.io/everlyn-martins-portfolio";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: baseUrl,
      lastModified: new Date("2026-09-02"),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...projects.map((project) => ({
      url: `${baseUrl}/projetos/${project.slug}`,
      lastModified: new Date("2026-09-02"),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
