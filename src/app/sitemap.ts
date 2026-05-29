import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { sampleProducts } from "@/lib/sample-data";
import { localizedUrl } from "@/lib/seo";

// 固定的"最后更新日期",避免每次构建都标成当前时间(Google 会不信任假时间戳)
const LAST_MODIFIED = new Date("2026-05-29");

export default function sitemap(): MetadataRoute.Sitemap {
  // 所有"逻辑页面"的路径(不带语言前缀)
  const paths = [
    "",
    "/products",
    "/about",
    "/custom",
    "/contact",
    ...sampleProducts.map((p) => `/products/${p.slug}`),
  ];

  return paths.map((path) => {
    // 每个页面把四语言版本用 hreflang 关联起来(多语言互链)
    const languages: Record<string, string> = {};
    for (const l of routing.locales) {
      languages[l] = localizedUrl(l, path);
    }

    return {
      url: localizedUrl(routing.defaultLocale, path),
      lastModified: LAST_MODIFIED,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === "" ? 1 : path.startsWith("/products/") ? 0.6 : 0.8,
      alternates: { languages },
    };
  });
}
