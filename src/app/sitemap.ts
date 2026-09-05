import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/services/product-service";

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://callefits.com";

const CATEGORIES = ["leggings", "tops", "sets", "enterizos"] as const;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/catalog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = CATEGORIES.map((cat) => ({
    url: `${BASE_URL}/catalog?category=${cat}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/catalog/${p.slug}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
