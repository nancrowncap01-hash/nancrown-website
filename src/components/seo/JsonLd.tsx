import type { Product } from "@/lib/sample-data";
import { localizeProduct } from "@/lib/product-i18n";
import { getTranslations } from "next-intl/server";
import { localizedUrl, SITE_URL } from "@/lib/seo";

export function OrganizationJsonLd({ locale }: { locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: "NanCrown",
    legalName: "Guangzhou Nancrown Cap Co., Ltd.",
    url: "https://nancrown.com",
    logo: "https://nancrown.com/images/brand/nancrown-logo-20261009.png",
    description:
      "Custom cap and hat manufacturer with our own factories in Guangzhou and Dongguan, China.",
    foundingDate: "2015",
    telephone: "+862031235916",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Guangzhou",
      addressRegion: "Guangdong",
      postalCode: "510000",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@nancrown.com",
      telephone: "+862031235916",
      availableLanguage: ["en", "es", "fr", "de", "zh"],
    },
    sameAs: [],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${localizedUrl(locale, "")}/#website`,
    name: "NanCrown",
    url: localizedUrl(locale, ""),
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
    </>
  );
}

export async function ProductJsonLd({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  // 结构化数据里只本地化 name / description 给谷歌看;
  // sku(款号)、category、material、colors 等其他字段一律沿用英文原值,不跟着变
  const { name, description } = localizeProduct(product, locale);
  const [nav, products] = await Promise.all([
    getTranslations({ locale, namespace: "Nav" }),
    getTranslations({ locale, namespace: "Products" }),
  ]);
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: nav("home"), item: localizedUrl(locale, "") },
      { "@type": "ListItem", position: 2, name: products("title"), item: localizedUrl(locale, "/products") },
      { "@type": "ListItem", position: 3, name, item: localizedUrl(locale, `/products/${product.slug}`) },
    ],
  };
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    url: localizedUrl(locale, `/products/${product.slug}`),
    name,
    description,
    image: `https://nancrown.com${product.image}`,
    category: product.category,
    material: product.material,
    ...(product.code ? { sku: product.code } : {}),
    brand: {
      "@type": "Brand",
      name: "NanCrown",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Guangzhou Nancrown Cap Co., Ltd.",
      url: "https://nancrown.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
