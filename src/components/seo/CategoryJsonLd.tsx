import type { Product } from "@/lib/sample-data";
import { localizedUrl } from "@/lib/seo";

// 分类落地页的结构化数据:面包屑(BreadcrumbList) + 该分类下的产品列表(ItemList) + 页面上的常见问题(FAQPage,0930 加)
// 面包屑文案用调用方传进来的本地化文字(home/custom/categoryName),不在这里写死英文
interface CategoryJsonLdProps {
  locale: string;
  slug: string;
  categoryName: string;
  homeLabel: string;
  customLabel: string;
  products: Product[];
  // 页面上显示的那几条问答,原样标给搜索引擎/AI(没有就不输出 FAQPage)
  faq?: { q: string; a: string }[];
}

export function CategoryJsonLd({
  locale,
  slug,
  categoryName,
  homeLabel,
  customLabel,
  products,
  faq = [],
}: CategoryJsonLdProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: homeLabel,
        item: localizedUrl(locale, ""),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: customLabel,
        item: localizedUrl(locale, "/custom"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: categoryName,
        item: localizedUrl(locale, `/custom/${slug}`),
      },
    ],
  };

  const itemListData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: categoryName,
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: localizedUrl(locale, `/products/${product.slug}`),
      name: product.name,
    })),
  };

  const faqData =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((item) => ({
            "@type": "Question",
            name: item.q,
            acceptedAnswer: { "@type": "Answer", text: item.a },
          })),
        }
      : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListData) }}
      />
      {faqData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
        />
      )}
    </>
  );
}
