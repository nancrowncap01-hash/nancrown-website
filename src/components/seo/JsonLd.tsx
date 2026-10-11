import type { Product } from "@/lib/sample-data";
import { localizeProduct } from "@/lib/product-i18n";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NanCrown",
    legalName: "Guangzhou Nancrown Cap Co., Ltd.",
    url: "https://nancrown.com",
    logo: "https://nancrown.com/images/brand/nancrown-logo-20261009.png",
    description:
      "Professional headwear manufacturer specializing in custom baseball caps, bucket hats, snapbacks, and more.",
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function ProductJsonLd({
  product,
  locale,
}: {
  product: Product;
  locale: string;
}) {
  // 结构化数据里只本地化 name / description 给谷歌看;
  // sku(款号)、category、material、colors 等其他字段一律沿用英文原值,不跟着变
  const { name, description } = localizeProduct(product, locale);
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
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
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
