import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import ProductsClient from "./ProductsClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/products",
    title: "Custom Hats & Caps — Wholesale Catalog",
    description:
      "Browse NanCrown's custom hat catalog: baseball caps, bucket hats, snapbacks, trucker hats, beanies & visors. Factory-direct, low MOQ, OEM/ODM.",
  });
}

export default function ProductsPage() {
  return <ProductsClient />;
}
