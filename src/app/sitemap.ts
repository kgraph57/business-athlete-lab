import type { MetadataRoute } from "next";
import { getCuratedArticles } from "@/lib/articles";

export const dynamic = "force-static";

const BASE_URL = "https://kgraph57.github.io/business-athlete-lab";

export default function sitemap(): MetadataRoute.Sitemap {
  const curated = getCuratedArticles();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/articles`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const articlePages: MetadataRoute.Sitemap = curated.map((article) => ({
    url: `${BASE_URL}/articles/${article.slug}`,
    lastModified: article.publishedAt
      ? new Date(article.publishedAt)
      : new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [...staticPages, ...articlePages];
}
