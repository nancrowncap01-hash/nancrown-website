import type { Product } from "@/lib/sample-data";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NanCrown",
    legalName: "Dongguan NanCrown Headwear Co., Ltd.",
    url: "https://nancrown.com",
    logo: "https://nancrown.com/images/logo.png",
    description:
      "Professional headwear manufacturer specializing in custom baseball caps, bucket hats, snapbacks, and more.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "No.64 Liheng Road, Shipai Town",
      addressLocality: "Dongguan",
      addressRegion: "Guangdong",
      postalCode: "523000",
      addressCountry: "CN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "sales",
      email: "info@nancrown.com",
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

export function ProductJsonLd({ product }: { product: Product }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `https://nancrown.com${product.image}`,
    category: product.category,
    material: product.material,
    brand: {
      "@type": "Brand",
      name: "NanCrown",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Dongguan NanCrown Headwear Co., Ltd.",
      url: "https://nancrown.com",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: product.moq,
        unitCode: "C62",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
