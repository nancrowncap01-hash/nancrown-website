import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { sampleProducts } from "@/lib/sample-data";
import { categorySlugs } from "@/lib/category-content";
import { localizedUrl } from "@/lib/seo";

// 固定的"最后更新日期",避免每次构建都标成当前时间(Google 会不信任假时间戳)
const LAST_MODIFIED = new Date("2026-09-27");

// 0927 新增的两个「指南类」独立页面,跟 /custom/<分类> 一样是主力获客落地页,优先级 0.9
const guidePaths = ["/pricing", "/start-a-hat-brand"];

export default function sitemap(): MetadataRoute.Sitemap {
  // 所有"逻辑页面"的路径(不带语言前缀)
  const paths = [
    "",
    "/products",
    "/about",
    "/custom",
    "/contact",
    ...guidePaths,
    ...categorySlugs.map((slug) => `/custom/${slug}`),
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
      priority: path === ""
        ? 1
        // /custom/<分类> 和 /pricing、/start-a-hat-brand 都是主力获客落地页,优先级给高一档
        : (path.startsWith("/custom/") && path !== "/custom") || guidePaths.includes(path)
          ? 0.9
          : path.startsWith("/products/")
            ? 0.6
            : 0.8,
      alternates: { languages },
    };
  });
}
