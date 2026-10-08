import { useLocale, useTranslations } from "next-intl";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { categoryDefinitions, categoryUi, type CategorySlug } from "@/lib/category-content";

// Server component: these links are present in the initial HTML, without sending
// the full category copy to the product filtering client component.
export default function CategoryDiscovery({
  slugs,
  variant = "catalog",
}: {
  slugs?: CategorySlug[];
  variant?: "catalog" | "product" | "decoration";
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Discovery");
  const entries = categoryDefinitions.filter((category) => !slugs || slugs.includes(category.slug));
  const title = variant === "decoration"
    ? categoryUi[locale].decorationHeading
    : t(variant === "product" ? "productTitle" : "title");

  return (
    <nav aria-label={title} className="mt-8 border-t border-stone-300/60 pt-6">
      <h2 className="text-base font-semibold">{title}</h2>
      {variant === "catalog" && <p className="mt-2 text-sm text-gray-600">{t("description")}</p>}
      <ul className="mt-4 flex flex-wrap gap-2">
        {entries.map((category) => (
          <li key={category.slug}>
            <Link
              href={`/custom/${category.slug}`}
              className="inline-block rounded-md border border-stone-300/70 px-3 py-2 text-sm hover:bg-amber-50 hover:text-amber-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700"
            >
              {category.content[locale].name} <span aria-hidden="true">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
