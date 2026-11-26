import Link from "next/link";
import { getRelatedBlogPosts } from "@/lib/blog";

export default function RelatedGuides({
  locale,
  sitePath,
}: {
  locale: string;
  sitePath: string;
}) {
  if (locale !== "en") return null;

  const posts = getRelatedBlogPosts(sitePath);
  if (posts.length === 0) return null;

  return (
    <section className="py-10">
      <nav aria-labelledby="related-guides-heading" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-stone-300/60 pt-6">
          <h2 id="related-guides-heading" className="text-base font-semibold">Related guides</h2>
          <ul className="mt-4 space-y-4 text-sm break-words">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="underline underline-offset-4 hover:text-amber-700">
                  {post.title}
                </Link>
                <p className="mt-2 leading-relaxed text-gray-600">{post.meta_description}</p>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </section>
  );
}
