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
  const content =
    guides["choose-a-hat-factory"][locale as Locale] ??
    guides["choose-a-hat-factory"].en;

  return pageMetadata({
    locale,
    path: "/choose-a-hat-factory",
    title: content.metaTitle,
    description: content.metaDescription,
  });
}

export default async function ChooseAHatFactoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const content =
    guides["choose-a-hat-factory"][locale as Locale] ??
    guides["choose-a-hat-factory"].en;

  const tNav = await getTranslations({ locale, namespace: "Nav" });
  const tGuides = await getTranslations({ locale, namespace: "Guides" });

  return (
    <>
      <GuideJsonLd
        locale={locale}
        path="/choose-a-hat-factory"
        pageName={tGuides("chooseFactoryName")}
        homeLabel={tNav("home")}
        faq={content.faq}
      />
      <GuidePage
        content={content}
        homeLabel={tNav("home")}
        breadcrumbLabel={tGuides("chooseFactoryName")}
        crossLink={{ href: "/pricing", label: tGuides("customToPricing") }}
      />
    </>
  );
}
