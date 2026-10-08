import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { sampleProducts } from "@/lib/sample-data";
import { categorySlugs } from "@/lib/category-content";
import { factoryContent } from "@/lib/factory-content";
import { solutionSlugs } from "@/lib/solutions-content";
import { localizedUrl, SITE_URL } from "@/lib/seo";

// 固定的"最后更新日期",避免每次构建都标成当前时间(Google 会不信任假时间戳)
const LAST_MODIFIED = new Date("2026-10-07");
// 仅本轮实际增加导航内容的页面更新时间;其余页面保留原日期。
const DISCOVERY_UPDATED = new Date("2026-10-08");

// 0927 新增的两个「指南类」独立页面,跟 /custom/<分类> 一样是主力获客落地页,优先级 0.9
// 1001 新增 /choose-a-hat-factory,同一批对待
const guidePaths = ["/pricing", "/start-a-hat-brand", "/choose-a-hat-factory"];

// 0930 新增的 4 个「按买家身份」独立页面,优先级跟 guidePaths 一样
const solutionPaths = solutionSlugs.map((slug) => `/solutions/${slug}`);

export default function sitemap(): MetadataRoute.Sitemap {
  // 所有"逻辑页面"的路径(不带语言前缀)
  const paths = [
    "",
    "/products",
    "/about",
    "/custom",
    "/contact",
    "/factory",
    ...guidePaths,
    ...solutionPaths,
    ...categorySlugs.map((slug) => `/custom/${slug}`),
    ...sampleProducts.map((p) => `/products/${p.slug}`),
  ];

  return paths.flatMap((path) => {
    // 每个页面把四语言版本用 hreflang 关联起来(多语言互链)
    const languages: Record<string, string> = {};
    for (const l of routing.locales) {
      languages[l] = localizedUrl(l, path);
    }

    languages["x-default"] = localizedUrl(routing.defaultLocale, path);

    // 每种语言都需要独立的 url/loc,不能只出现在英文条目的 alternate 中。
    return routing.locales.map((locale) => ({
      url: localizedUrl(locale, path),
      lastModified: path === "" || path === "/products" || path.startsWith("/products/")
        ? DISCOVERY_UPDATED
        : LAST_MODIFIED,
      changeFrequency: path === "" ? ("weekly" as const) : ("monthly" as const),
      priority: path === ""
        ? 1
        // /custom/<分类> 和 /pricing、/start-a-hat-brand 都是主力获客落地页,优先级给高一档
        : (path.startsWith("/custom/") && path !== "/custom") ||
            guidePaths.includes(path) ||
            solutionPaths.includes(path)
          ? 0.9
          : path.startsWith("/products/")
            ? 0.6
            : 0.8,
      alternates: { languages },
      // 各语言车间页保留视频记录,文案与对应页面语言一致
      ...(path === "/factory"
        ? {
            videos: [
              {
                title: factoryContent[locale].videoName,
                thumbnail_loc: `${SITE_URL}/images/factory/workshop-poster-2023.jpg`,
                content_loc: `${SITE_URL}/videos/nancrown-workshop-2023.mp4`,
                description: factoryContent[locale].videoDescription,
              },
            ],
          }
        : {}),
    }));
  });
}
