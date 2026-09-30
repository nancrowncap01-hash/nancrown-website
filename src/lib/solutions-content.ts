// 「按买家身份」独立页面(/solutions/<slug>)的四语言文案。
// 文字来自 src/lib/solutions-content.json(主脑亲写,0930 批次6),原样照抄,不润色不改写。
// 格式复用 src/lib/guide-content.ts 的 GuideLocaleContent,额外多一种 block:
//   { type: "products", slugs: string[] } —— 按 slug 从 sample-data 找产品渲染成卡片网格。

import type { Locale } from "@/i18n/routing";
import type { GuideLocaleContent } from "@/lib/guide-content";
import rawData from "@/lib/solutions-content.json";

export type SolutionSlug =
  | "run-clubs"
  | "surf-shops"
  | "corporate-events"
  | "festival-merch";

export const solutionSlugs: SolutionSlug[] = [
  "run-clubs",
  "surf-shops",
  "corporate-events",
  "festival-merch",
];

interface SolutionsJsonPage {
  slug: string;
  products: string[];
  en: GuideLocaleContent;
  es: GuideLocaleContent;
  fr: GuideLocaleContent;
  de: GuideLocaleContent;
}

interface SolutionsJson {
  pages: SolutionsJsonPage[];
}

const data = rawData as unknown as SolutionsJson;

// 每个 slug 对应的产品列表(GuidePage 渲染 products block 时用这份顺序兜底/校验)
export const solutionProducts: Record<SolutionSlug, string[]> = Object.fromEntries(
  data.pages.map((p) => [p.slug, p.products])
) as Record<SolutionSlug, string[]>;

export const solutions: Record<SolutionSlug, Record<Locale, GuideLocaleContent>> =
  Object.fromEntries(
    data.pages.map((p) => [
      p.slug,
      { en: p.en, es: p.es, fr: p.fr, de: p.de },
    ])
  ) as Record<SolutionSlug, Record<Locale, GuideLocaleContent>>;

export function isSolutionSlug(slug: string): slug is SolutionSlug {
  return (solutionSlugs as string[]).includes(slug);
}
