import type { BlogPost } from "@/lib/blog";
import { BLOG_DESCRIPTION, BLOG_TITLE } from "@/lib/blog-seo";
import { DEFAULT_OG_IMAGE, localizedUrl, SITE_URL } from "@/lib/seo";

export function BlogJsonLd({ post }: { post?: BlogPost }) {
  const url = localizedUrl("en", post ? `/blog/${post.slug}` : "/blog");
  const organization = { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "NanCrown" };
  const data = {
    "@context": "https://schema.org",
    "@type": post ? "BlogPosting" : "Blog",
    ...(post ? {
      headline: post.title,
      image: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
      datePublished: post.date_published,
      dateModified: post.date_modified,
    } : { name: BLOG_TITLE }),
    description: post?.meta_description ?? BLOG_DESCRIPTION,
    inLanguage: "en",
    author: organization,
    publisher: organization,
    mainEntityOfPage: url,
    url,
  };
  const crumbs = [
    { name: "Home", item: localizedUrl("en", "") },
    { name: "Blog", item: localizedUrl("en", "/blog") },
    ...(post ? [{ name: post.title, item: url }] : []),
  ];
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, i) => ({ "@type": "ListItem", position: i + 1, ...crumb })),
  };
  const faq = post?.faq.length ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  } : undefined;
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      {faq && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq).replace(/</g, "\\u003c") }} />}
    </>
  );
}
