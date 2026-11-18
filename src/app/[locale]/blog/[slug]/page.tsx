import { notFound } from "next/navigation";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { formatBlogDate, getBlogPost, getBlogPosts } from "@/lib/blog";
import { blogMetadata } from "@/lib/blog-seo";
import { BlogJsonLd } from "@/components/seo/BlogJsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ locale: "en", slug: post.slug }));
}

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== "en") notFound();
  const post = getBlogPost(slug);
  if (!post) notFound();
  return blogMetadata(post);
}

export default async function BlogPostPage({ params }: Props) {
  const { locale, slug } = await params;
  if (locale !== "en") notFound();
  const post = getBlogPost(slug);
  if (!post) notFound();
  setRequestLocale("en");
  const cta = await getTranslations({ locale: "en", namespace: "CTA" });
  const nav = await getTranslations({ locale: "en", namespace: "Nav" });

  return (
    <>
      <BlogJsonLd post={post} />
      <article>
        <header className="bg-gray-900 py-16 text-white">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="mb-4 text-sm text-gray-400">
              <Link href="/" className="hover:text-amber-400">{nav("home")}</Link>
              <span className="mx-2" aria-hidden="true">›</span>
              <Link href="/blog" className="hover:text-amber-400">Blog</Link>
              <span className="mx-2" aria-hidden="true">›</span>
              <span aria-current="page" className="text-white">{post.title}</span>
            </nav>
            <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{post.title}</h1>
            <p className="mt-5 text-sm leading-relaxed text-gray-300">
              Published: <time dateTime={post.date_published}>{formatBlogDate(post.date_published)}</time>
              <span className="mx-2" aria-hidden="true">·</span>
              Updated: <time dateTime={post.date_modified}>{formatBlogDate(post.date_modified)}</time>
            </p>
          </div>
        </header>
        <div
          className="mx-auto max-w-3xl space-y-6 px-4 py-10 text-gray-700 sm:px-6 lg:px-8 [&_h2]:pt-4 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900 sm:[&_h2]:text-3xl [&_h3]:pt-2 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-gray-900 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_li]:leading-relaxed [&_a]:text-amber-700 [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-amber-800 [&_strong]:font-semibold [&_strong]:text-gray-900 [&_table]:w-full [&_table]:text-left [&_table]:text-sm [&_thead]:bg-gray-50 [&_th]:px-4 [&_th]:py-3 [&_td]:border-t [&_td]:border-gray-100 [&_td]:px-4 [&_td]:py-3 [&_td]:align-top [&_blockquote]:border-l-4 [&_blockquote]:border-amber-300 [&_blockquote]:pl-5 [&_pre]:overflow-x-auto [&_pre]:rounded-lg [&_pre]:bg-gray-50 [&_pre]:p-4 [&_img]:max-w-full"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </article>
      <section className="bg-amber-600 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="mb-3 text-3xl font-bold text-white">{cta("title")}</h2>
          <p className="mb-6 text-amber-50">{cta("subtitle")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="inline-flex rounded-lg bg-white px-8 py-3.5 font-semibold text-amber-700 transition-colors hover:bg-amber-50">{cta("button")}</Link>
            <Link href="/pricing" className="inline-flex rounded-lg border border-white px-8 py-3.5 font-semibold text-white transition-colors hover:bg-amber-700">{nav("pricing")}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
