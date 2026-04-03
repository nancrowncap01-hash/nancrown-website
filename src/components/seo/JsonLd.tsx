import type { Product } from "@/lib/sample-data";

export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "NanCrown",
    legalName: "Guangzhou Nancrown Cap Co., Ltd.",
    url: "https://nancrown.com",
    logo: "https://nancrown.com/images/logo.png",
    description:
      "Professional headwear manufacturer specializing in custom baseball caps, bucket hats, snapbacks, and more.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Guangzhou",
      addressLocality: "Guangzhou",
      addressRegion: "Guangdong",
      postalCode: "510000",
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
      name: "Guangzhou Nancrown Cap Co., Ltd.",
      url: "https://nancrown.com",
    },
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: 0,
      priceCurrency: "USD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        priceCurrency: "USD",
        price: 0,
        priceType: "https://schema.org/ListPrice",
        description: "Contact us for pricing. Price varies by quantity and customization.",
      },
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
        description: "Custom manufactured products. Contact us for quality issues.",
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
          description: "Shipping cost varies by order size. Contact for quote.",
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
