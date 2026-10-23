import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { sampleProducts } from "@/lib/sample-data";
import { categorySlugs } from "@/lib/category-content";
import { factoryContent } from "@/lib/factory-content";
import { solutionSlugs } from "@/lib/solutions-content";
import { localizedUrl, SITE_URL } from "@/lib/seo";

// 固定真实内容更新时间，避免每次构建都标成当前时间。
const LAST_MODIFIED = new Date("2026-10-07");
const DISCOVERY_UPDATED = new Date("2026-10-08");
const CONTENT_UPDATED_2026_10_11 = new Date("2026-10-11");
const CONTENT_UPDATED_2026_10_13 = new Date("2026-10-13");
const CONTENT_UPDATED_2026_10_17 = new Date("2026-10-17");
const CONTENT_UPDATED_2026_10_20 = new Date("2026-10-20");
const CONTENT_UPDATED_2026_10_22 = new Date("2026-10-22");
const UPDATED_2026_10_22_PATHS = new Set([
  "/custom/dad-hats",
  "/custom/baseball-caps",
  "/custom/running-caps",
  "/solutions/bulk-orders",
  "/solutions/corporate-events",
]);
const CONTENT_UPDATED_2026_10_23 = new Date("2026-10-23");
// About lead-time start conditions corrected across all four locales.
// Actual packing-copy updates only; do not refresh unchanged pages.
const UPDATED_2026_10_20_PATHS = new Set([
  "/pricing",
  "/choose-a-hat-factory",
  "/solutions/bulk-orders",
  "/solutions/sample-approval",
]);
const UPDATED_2026_10_17_PATHS = new Set([
  "/pricing",
  "/custom/embroidered-caps",
  "/custom/snapback-hats",
]);
// 10/11 实际改正文的主力页面；首页 FAQ 也在该轮更新。
const UPDATED_2026_10_11_PATHS = new Set([
  "",
  "/pricing",
  "/start-a-hat-brand",
  "/choose-a-hat-factory",
  "/custom/trucker-hats",
  "/custom/private-label-hats",
  "/solutions/run-clubs",
  "/solutions/festival-merch",
]);
// 本轮新建的两页及有正文上下文链接更新的既有方案页。
const UPDATED_2026_10_13_PATHS = new Set([
  "/solutions/embroidery-artwork",
  "/solutions/sample-approval",
  "/solutions/corporate-events",
  "/solutions/festival-merch",
  "/solutions/bulk-orders",
]);

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
      lastModified: path === "/about"
        ? CONTENT_UPDATED_2026_10_23
        : UPDATED_2026_10_22_PATHS.has(path)
        ? CONTENT_UPDATED_2026_10_22
        : UPDATED_2026_10_20_PATHS.has(path)
        ? CONTENT_UPDATED_2026_10_20
        : UPDATED_2026_10_17_PATHS.has(path)
          ? CONTENT_UPDATED_2026_10_17
        : UPDATED_2026_10_13_PATHS.has(path)
          ? CONTENT_UPDATED_2026_10_13
        : UPDATED_2026_10_11_PATHS.has(path)
          ? CONTENT_UPDATED_2026_10_11
          : path === "" || path === "/products" || path.startsWith("/products/")
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
