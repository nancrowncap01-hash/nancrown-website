import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { guides } from "@/lib/guide-content";
import { pageMetadata } from "@/lib/seo";
import GuidePage from "@/components/guide/GuidePage";
import { GuideJsonLd } from "@/components/seo/GuideJsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = guides["start-a-hat-brand"][locale as Locale] ?? guides["start-a-hat-brand"].en;

  return pageMetadata({
    locale,
    path: "/start-a-hat-brand",
    title: content.metaTitle,
    description: content.metaDescription,
  });
}

export default async function StartAHatBrandPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = guides["start-a-hat-brand"][locale as Locale] ?? guides["start-a-hat-brand"].en;

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tFooter = await getTranslations({ locale, namespace: "Footer" });
  const tGuides = await getTranslations({ locale, namespace: "Guides" });

  return (
    <>
      <GuideJsonLd
        locale={locale}
        path="/start-a-hat-brand"
        pageName={tFooter("forNewBrands")}
        homeLabel={tNav("home")}
        faq={content.faq}
      />
      <GuidePage
        content={content}
        homeLabel={tNav("home")}
        breadcrumbLabel={tFooter("forNewBrands")}
        crossLink={{ href: "/pricing", label: tGuides("brandToPricing") }}
      />
    </>
  );
}
