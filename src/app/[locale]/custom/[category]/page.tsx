import type { Metadata } from "next";
import TruckerBuyingGuide from "@/components/TruckerBuyingGuide";
import BrandBuyingGuide from "@/components/BrandBuyingGuide";
import truckerBuyingContent from "@/lib/trucker-buying-content.json";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { sampleProducts } from "@/lib/sample-data";
import ProductCard from "@/components/products/ProductCard";
import { CategoryJsonLd } from "@/components/seo/CategoryJsonLd";
import { pageMetadata } from "@/lib/seo";
import {
  categoryDefinitions,
  categorySolutionLinks,
  categoryUi,
  getCategoryDefinition,
} from "@/lib/category-content";

// 构建时把全部帽型页 × 四种语言预渲染成静态页(语言那一层由 [locale]/layout.tsx 的 generateStaticParams 提供);
// 不在列表里的 category 直接 404
export const dynamicParams = false;

export function generateStaticParams() {
  return categoryDefinitions.map((def) => ({ category: def.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; locale: string }>;
}): Promise<Metadata> {
  const { category, locale } = await params;
  const def = getCategoryDefinition(category);
  if (!def) return {};

  const content = def.content[locale as Locale] ?? def.content.en;
  // OG 图用该分类第一个产品的主图(有 productSlugs 就取列表第一个,没有就照旧按 categoryValue 筛)
  const firstProduct = def.productSlugs
    ? sampleProducts.find((p) => p.slug === def.productSlugs![0])
    : sampleProducts.find((p) => p.category === def.categoryValue);

  return pageMetadata({
    locale,
    path: `/custom/${def.slug}`,
    title: content.h1,
    description: content.metaDescription,
    image: firstProduct?.image,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string; locale: string }>;
}) {
  const { category, locale } = await params;
  setRequestLocale(locale);
  const def = getCategoryDefinition(category);

  if (!def) {
    notFound();
  }

  const content = def.content[locale as Locale] ?? def.content.en;
  const ui = categoryUi[locale as Locale] ?? categoryUi.en;
  const tGuides = await getTranslations({ locale, namespace: "Guides" });
  // 有 productSlugs 就按这个列表(顺序)取产品;没有就照旧按 categoryValue 筛
  // (0927 新增的 7 个帽型/工艺细分页用 productSlugs,categoryValue 是空字符串)
  const products = def.productSlugs
    ? def.productSlugs
        .map((slug) => sampleProducts.find((p) => p.slug === slug))
        .filter((p): p is (typeof sampleProducts)[number] => Boolean(p))
    : sampleProducts.filter((p) => p.category === def.categoryValue);
  // 其它帽型分类,给"看看其他帽型"用
  const otherCategories = categoryDefinitions.filter(
    (c) => c.slug !== def.slug
  );
  // 帽型页 → 身份页(/solutions/<slug>)的小提示框,只有 8 个分类配了才有(1001 新增)
  const solutionLink = categorySolutionLinks[def.slug];

  return (
    <>
      <CategoryJsonLd
        locale={locale}
        slug={def.slug}
        categoryName={content.name}
        homeLabel={ui.home}
        customLabel={ui.custom}
        products={products}
        faq={content.faq}
      />

      {/* 深色标题区 + 面包屑(风格照 /custom、/products 页) */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 text-sm text-gray-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              {ui.home}
            </Link>
            <span className="mx-2">/</span>
            <Link
              href="/custom"
              className="hover:text-amber-400 transition-colors"
            >
              {ui.custom}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{content.name}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold max-w-3xl leading-tight">
            {content.h1}
          </h1>
        </div>
      </section>

      {/* 开头介绍两段 + 询价按钮 */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {content.intro.map((paragraph, i) => (
            <p
              key={i}
              className="text-lg text-gray-600 leading-relaxed mb-4 last:mb-0"
            >
              {paragraph}
            </p>
          ))}
          {solutionLink && (
            <Link
              href={solutionLink.href}
              className="mt-6 block rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm font-medium text-amber-800 leading-relaxed hover:border-amber-300 hover:bg-amber-100 transition-colors"
            >
              {solutionLink.label[locale as Locale] ?? solutionLink.label.en}
            </Link>
          )}
          <div className="mt-8 flex flex-col items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 text-base font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            >
              {ui.requestQuote}
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-amber-700 hover:text-amber-800 hover:underline font-medium"
            >
              {tGuides("customToPricing")}
            </Link>
          </div>
        </div>
      </section>

      {/* 定制选项 */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            {ui.customOptionsHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {content.customOptions.map((option, i) => (
              <div
                key={i}
                className="flex items-start gap-3 bg-white rounded-xl p-5 shadow-sm"
              >
                <svg
                  className="h-5 w-5 text-amber-500 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12.75l6 6 9-13.5"
                  />
                </svg>
                <p className="text-gray-700 leading-relaxed">{option}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {def.slug === "trucker-hats" && <TruckerBuyingGuide locale={locale as Locale} />}
      {def.slug === "private-label-hats" && <BrandBuyingGuide locale={locale as Locale} />}
      {["5-panel-caps", "patch-hats"].includes(def.slug) && (
        <section className="py-8">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <Link href="/custom/trucker-hats#order-checklists" className="block rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-amber-800 font-medium leading-relaxed hover:bg-amber-100">
              {(truckerBuyingContent[locale as Locale] ?? truckerBuyingContent.en).quote}
            </Link>
          </div>
        </section>
      )}

      {/* 该分类下的产品网格,直接用现成的 ProductCard */}
      {products.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                {ui.collectionHeading(content.name)}
              </h2>
              <Link
                href="/products"
                className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1 shrink-0"
              >
                {ui.viewAllProducts}
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 其它帽型:链到另外 8 个分类页 */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
            {ui.otherStylesHeading}
          </h2>
          <div className="flex flex-wrap gap-3">
            {otherCategories.map((cat) => {
              const catContent = cat.content[locale as Locale] ?? cat.content.en;
              return (
                <Link
                  key={cat.slug}
                  href={`/custom/${cat.slug}`}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-700 hover:border-amber-400 hover:text-amber-600 transition-colors"
                >
                  {catContent.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ:用原生 <details>/<summary>,答案文字始终在 HTML 里,方便搜索引擎直接读到 */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl sm:text-5xl font-black text-center text-gray-900">
            {ui.faqHeading}
          </h2>
          <p className="text-center text-gray-500 mt-3 mb-10">
            {ui.faqSubtitle}
          </p>
          <div className="space-y-3">
            {content.faq.map((item, i) => (
              <details
                key={i}
                className="group border border-gray-200 rounded-xl px-5 py-4 open:bg-gray-50"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 text-2xl leading-none text-gray-400 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-600 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {ui.ctaHeading}
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 text-base font-semibold bg-white text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
          >
            {ui.requestQuote}
          </Link>
        </div>
      </section>
    </>
  );
}
