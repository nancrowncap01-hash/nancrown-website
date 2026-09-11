import type { Metadata } from "next";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { categoryDefinitions, categoryUi } from "@/lib/category-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata({
    locale,
    path: "/custom",
    title: "Custom Hat Manufacturing Process",
    description:
      "Make custom hats in 6 simple steps: design, sampling, production, QC & shipping. Low MOQ, OEM/ODM welcome. Get a free quote from NanCrown.",
  });
}

export default function CustomPage() {
  const t = useTranslations("Custom");
  const locale = useLocale() as Locale;
  const ui = categoryUi[locale] ?? categoryUi.en;

  const steps = [
    { num: "01", title: t("step1"), desc: t("step1Desc") },
    { num: "02", title: t("step2"), desc: t("step2Desc") },
    { num: "03", title: t("step3"), desc: t("step3Desc") },
    { num: "04", title: t("step4"), desc: t("step4Desc") },
    { num: "05", title: t("step5"), desc: t("step5Desc") },
    { num: "06", title: t("step6"), desc: t("step6Desc") },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-400 text-lg">{t("subtitle")}</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-lg text-gray-600 leading-relaxed">{t("intro")}</p>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div
                key={step.num}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl font-bold text-amber-500 mb-3">
                  {step.num}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 我们做的帽型:链到 9 个「帽型分类落地页」(/custom/[category]) */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
            {ui.browseByStyleHeading}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoryDefinitions.map((cat) => {
              const catContent = cat.content[locale] ?? cat.content.en;
              return (
                <Link
                  key={cat.slug}
                  href={`/custom/${cat.slug}`}
                  className="flex items-center justify-center text-center px-4 py-5 bg-gray-50 rounded-xl border border-gray-100 font-medium text-gray-800 hover:bg-amber-50 hover:border-amber-200 hover:text-amber-700 transition-colors"
                >
                  {catContent.name}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-600 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            {t("getStarted")}
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 text-base font-semibold bg-white text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
          >
            {t("getStarted")}
          </Link>
        </div>
      </section>
    </>
  );
}
