import type { Metadata } from "next";
import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import ProductsClient from "./ProductsClient";
import CategoryDiscovery from "@/components/CategoryDiscovery";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });
  return pageMetadata({
    locale,
    path: "/products",
    title: t("productsTitle"),
    description: t("productsDescription"),
  });
}

export default function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  setRequestLocale(locale);
  return (
    <>
      <ProductsClient />
      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <CategoryDiscovery />
      </section>
    </>
  );
}
