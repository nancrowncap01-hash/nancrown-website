import Link from "next/link";
import { getRelatedBlogPosts, type BlogPost } from "@/lib/blog";

export default function RelatedGuides({
  locale,
  sitePath,
  posts: suppliedPosts,
  heading = "Related guides",
  headingId = "related-guides-heading",
}: {
  locale: string;
  heading?: string;
  headingId?: string;
} & ({ sitePath: string; posts?: never } | { sitePath?: never; posts: BlogPost[] })) {
  if (locale !== "en") return null;

  const posts = suppliedPosts ?? getRelatedBlogPosts(sitePath);
  if (posts.length === 0) return null;

  return (
    <section className="py-10">
      <nav aria-labelledby={headingId} className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-stone-300/60 pt-6">
          <h2 id={headingId} className="text-base font-semibold">{heading}</h2>
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
