import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
  const content = guides.pricing[locale as Locale] ?? guides.pricing.en;

  return pageMetadata({
    locale,
    path: "/pricing",
    title: content.metaTitle,
    description: content.metaDescription,
  });
}

export default async function PricingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content = guides.pricing[locale as Locale] ?? guides.pricing.en;

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tGuides = await getTranslations({ locale, namespace: "Guides" });

  return (
    <>
      <GuideJsonLd
        locale={locale}
        path="/pricing"
        pageName={tNav("pricing")}
        homeLabel={tNav("home")}
        faq={content.faq}
      />
      <GuidePage
        content={content}
        homeLabel={tNav("home")}
        breadcrumbLabel={tNav("pricing")}
        crossLink={{ href: "/start-a-hat-brand", label: tGuides("pricingToBrand") }}
      />
    </>
  );
}
