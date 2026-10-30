import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { categoryDefinitions, type CategorySlug } from "@/lib/category-content";

export default function RelatedLinks({
  slugs = [],
  includeFitGuide = false,
}: {
  slugs?: CategorySlug[];
  includeFitGuide?: boolean;
}) {
  const locale = useLocale() as Locale;
  const t = useTranslations("Discovery");
  const solutionsT = useTranslations("Solutions");
  const entries = categoryDefinitions.filter((category) => slugs.includes(category.slug));

  return (
    <nav aria-label={t("relatedTitle")} className="mt-8 border-t border-stone-300/60 pt-6">
      <h2 className="text-base font-semibold">{t("relatedTitle")}</h2>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-3 text-sm">
        {entries.map((category) => (
          <li key={category.slug}>
            <Link href={`/custom/${category.slug}`} className="underline underline-offset-4 hover:text-amber-700">
              {category.content[locale].name}
            </Link>
          </li>
        ))}
        {includeFitGuide && (
          <li>
            <Link href="/solutions/cap-size-fit-guide" className="underline underline-offset-4 hover:text-amber-700">
              {solutionsT("cap-size-fit-guide")}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
