import type { Metadata } from "next";
import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import ContactForm from "./ContactForm";
import { sampleProducts } from "@/lib/sample-data";
import { localizeProduct } from "@/lib/product-i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("contactTitle"),
    description: t("contactDescription"),
  });
}

export default function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const quoteProducts = sampleProducts.map((p) => ({
    slug: p.slug, code: p.code, category: p.category, name: localizeProduct(p, locale).name,
  }));
  return <ContactForm quoteProducts={quoteProducts} />;
}
