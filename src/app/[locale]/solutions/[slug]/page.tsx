import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { solutions, isSolutionSlug } from "@/lib/solutions-content";
import { pageMetadata } from "@/lib/seo";
import GuidePage from "@/components/guide/GuidePage";
import { GuideJsonLd } from "@/components/seo/GuideJsonLd";

// 和 /custom/[category]、/products/[slug] 一样:next-intl + 动态路由在这个 Next 版本下
// 用静态生成会踩坑,统一改成请求时渲染
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  if (!isSolutionSlug(slug)) return {};

  const content = solutions[slug][locale as Locale] ?? solutions[slug].en;

  return pageMetadata({
    locale,
    path: `/solutions/${slug}`,
    title: content.metaTitle,
    description: content.metaDescription,
  });
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;

  if (!isSolutionSlug(slug)) {
    notFound();
  }

  const content = solutions[slug][locale as Locale] ?? solutions[slug].en;

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tGuides = await getTranslations({ locale, namespace: "Guides" });
  const tSolutions = await getTranslations({ locale, namespace: "Solutions" });

  // messages 的 Solutions namespace 里,4 个短名的 key 跟 slug 完全同名(run-clubs / surf-shops / corporate-events / festival-merch)
  const shortName = tSolutions(slug);

  return (
    <>
      <GuideJsonLd
        locale={locale}
        path={`/solutions/${slug}`}
        pageName={shortName}
        homeLabel={tNav("home")}
        faq={content.faq}
      />
      <GuidePage
        content={content}
        homeLabel={tNav("home")}
        breadcrumbLabel={shortName}
        crossLink={{ href: "/pricing", label: tGuides("customToPricing") }}
      />
    </>
  );
}
