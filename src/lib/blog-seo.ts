import type { Metadata } from "next";
import type { BlogPost } from "@/lib/blog";
import { localizedUrl, pageMetadata } from "@/lib/seo";

export const BLOG_TITLE = "NanCrown Blog";
export const BLOG_DESCRIPTION = "Practical advice on custom hats, samples and ordering from NanCrown.";

export function blogAlternates(path: string) {
  const url = localizedUrl("en", path);
  return { canonical: url, languages: { en: url, "x-default": url } };
}

export function blogMetadata(post?: BlogPost): Metadata {
  const path = post ? `/blog/${post.slug}` : "/blog";
  const metadata = pageMetadata({
    locale: "en",
    path,
    title: post?.title ?? BLOG_TITLE,
    description: post?.meta_description ?? BLOG_DESCRIPTION,
    absolute: !post,
  });
  return {
    ...metadata,
    alternates: blogAlternates(path),
    openGraph: {
      ...metadata.openGraph,
      alternateLocale: [],
      ...(post ? {
        type: "article",
        publishedTime: post.date_published,
        modifiedTime: post.date_modified,
        authors: ["NanCrown"],
      } : { type: "website" }),
    },
  };
}
