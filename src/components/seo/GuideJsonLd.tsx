import { localizedUrl } from "@/lib/seo";

// 「指南类」页面(/pricing、/start-a-hat-brand)的结构化数据:
// 面包屑(BreadcrumbList,只有 首页→本页 两级)+ 常见问题(FAQPage)
interface GuideJsonLdProps {
  locale: string;
  // 不带 locale 前缀的路径,如 "/pricing"
  path: string;
  // 面包屑里本页的短名
  pageName: string;
  homeLabel: string;
  faq: { q: string; a: string }[];
}

export function GuideJsonLd({
  locale,
  path,
  pageName,
  homeLabel,
  faq,
}: GuideJsonLdProps) {
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
        name: pageName,
        item: localizedUrl(locale, path),
      },
    ],
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
