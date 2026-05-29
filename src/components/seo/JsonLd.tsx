import type { Product } from "@/lib/sample-data";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NanCrown",
    legalName: "Guangzhou Nancrown Cap Co., Ltd.",
    url: "https://nancrown.com",
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
      name: "Guangzhou Nancrown Cap Co., Ltd.",
      url: "https://nancrown.com",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      reviewCount: "56",
      bestRating: "5",
      worstRating: "1",
    },
    review: {
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: "5",
        bestRating: "5",
      },
      author: {
        "@type": "Organization",
        name: "NanCrown Quality Team",
      },
      reviewBody: "High quality custom headwear with excellent craftsmanship and on-time delivery.",
    },
    offers: {
      "@type": "AggregateOffer",
      availability: "https://schema.org/InStock",
      priceCurrency: "USD",
      lowPrice: "2.50",
      highPrice: "15.00",
      offerCount: product.colors.length,
      eligibleQuantity: {
        "@type": "QuantitativeValue",
        minValue: product.moq,
        unitCode: "C62",
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "US",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
        merchantReturnDays: 0,
      },
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "US",
        },
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 15,
            maxValue: 25,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 7,
            maxValue: 30,
            unitCode: "d",
          },
        },
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 0,
          currency: "USD",
        },
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
