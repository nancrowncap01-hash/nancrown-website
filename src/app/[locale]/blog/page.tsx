import { notFound } from "next/navigation";
import Link from "next/link";
import { setRequestLocale } from "next-intl/server";
import { formatBlogDate, getBlogPosts } from "@/lib/blog";
import { BLOG_DESCRIPTION, BLOG_TITLE, blogMetadata } from "@/lib/blog-seo";
import { BlogJsonLd } from "@/components/seo/BlogJsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  // Explicitly override the locale inherited from the four-language layout.
  // In Next 16.2.1 an empty child result preserves its parent parameters.
  return [{ locale: "en" }];
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  return blogMetadata();
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (locale !== "en") notFound();
  setRequestLocale("en");
  const posts = getBlogPosts();

  return (
    <>
      <BlogJsonLd />
      <section className="bg-gray-900 py-16 text-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-400">
            <Link href="/" className="transition-colors hover:text-amber-400">Home</Link>
            <span className="mx-2" aria-hidden="true">›</span>
            <span aria-current="page" className="text-white">Blog</span>
          </nav>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{BLOG_TITLE}</h1>
          <p className="mt-4 text-lg leading-relaxed text-gray-300">{BLOG_DESCRIPTION}</p>
        </div>
      </section>
      <section aria-label="Blog articles" className="mx-auto max-w-3xl space-y-6 px-4 py-12 sm:px-6 lg:px-8">
        {posts.map((post) => (
          <article key={post.slug} className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <time dateTime={post.date_published} className="text-sm text-gray-500">{formatBlogDate(post.date_published)}</time>
            <h2 className="mt-2 text-2xl font-bold text-gray-900">
              <Link href={`/blog/${post.slug}`} className="hover:text-amber-700">{post.title}</Link>
            </h2>
            <p className="mt-3 leading-relaxed text-gray-600">{post.meta_description}</p>
            <Link href={`/blog/${post.slug}`} aria-label={`Read more: ${post.title}`} className="mt-4 inline-block font-medium text-amber-700 hover:underline">Read more →</Link>
          </article>
        ))}
      </section>
    </>
  );
}
