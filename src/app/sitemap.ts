import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { sampleProducts } from "@/lib/sample-data";

const BASE_URL = "https://nancrown.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const pages = ["", "/products", "/about", "/custom", "/contact"];

  const staticPages = locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${BASE_URL}${locale === "en" ? "" : `/${locale}`}${page}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  const productPages = locales.flatMap((locale) =>
    sampleProducts.map((product) => ({
      url: `${BASE_URL}${locale === "en" ? "" : `/${locale}`}/products/${product.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  return [...staticPages, ...productPages];
}
