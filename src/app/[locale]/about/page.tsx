import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import VideoPlayer from "@/components/VideoPlayer";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });
  return pageMetadata({
    locale,
    path: "/about",
    title: t("aboutTitle"),
    description: t("aboutDescription"),
  });
}

// 小对勾图标(跟 /custom/[category]、/pricing 等页的定制选项/list block 同一个图标)
function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-amber-500 shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

export default function AboutPage() {
  const t = useTranslations("About");

  const stats = [
    { value: "10+", label: t("years") },
    { value: "30+", label: t("workers") },
    { value: "100K+", label: t("monthlyCapacity") },
    { value: "50+", label: t("countries") },
  ];

  // 数组/对象类的 key 用 t.raw(...) 原样取出,不经过 next-intl 的字符串插值
  const glanceRows = t.raw("glanceRows") as string[][];
  const ownItems = t.raw("ownItems") as string[];
  const partnerItems = t.raw("partnerItems") as string[];
  const whoItems = t.raw("whoItems") as { title: string; text: string; href: string }[];
  const faq = t.raw("faq") as { q: string; a: string }[];

  // FAQPage 结构化数据(写法参照 CategoryJsonLd.tsx 里的 faqData):把页面上可见的问答原样标给搜索引擎/AI
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-400 text-lg">{t("subtitle")}</p>
        </div>
      </section>

      {/* Stats(已有,不动) */}
      <section className="bg-amber-600 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-amber-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("story")}
              </h2>
              <p className="text-gray-600 leading-relaxed">{t("storyText")}</p>
              <p className="mt-4 text-gray-600 leading-relaxed">{t("storyText2")}</p>
            </div>
            <div className="rounded-2xl overflow-hidden aspect-video">
              <VideoPlayer
                videoId="jfbFFLF1nx8"
                coverImage="/images/factory-video-cover.jpg"
                title="NanCrown Headwear Factory - Custom Hat Manufacturing Process"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 一览表:NanCrown at a glance */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            {t("glanceHeading")}
          </h2>
          <dl className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
            {glanceRows.map(([label, value], i) => (
              <div
                key={i}
                className="grid grid-cols-[110px_1fr] sm:grid-cols-[180px_1fr] gap-x-4 sm:gap-x-6 px-5 py-3.5"
              >
                <dt className="text-sm font-medium text-gray-500 min-w-0">{label}</dt>
                <dd className="min-w-0 text-sm sm:text-base text-gray-900 leading-relaxed break-words">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 自己做 / 合作伙伴做 */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
            {t("splitHeading")}
          </h2>
          <p className="text-gray-600 leading-relaxed max-w-3xl mb-10">
            {t("splitIntro")}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {t("ownHeading")}
              </h3>
              <ul className="space-y-3">
                {ownItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-gray-100 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {t("partnerHeading")}
              </h3>
              <ul className="space-y-3">
                {partnerItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-gray-500 leading-relaxed max-w-3xl">
            {t("splitNote")}
          </p>
        </div>
      </section>

      {/* Production & Quality(已有,结构不动,文字第 2 步已更新) */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("capacity")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("capacityText")}
              </p>
              <Link
                href="/factory"
                className="mt-4 inline-flex items-center text-amber-700 font-medium hover:text-amber-800 hover:underline"
              >
                {t("workshopLink")}
              </Link>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("certifications")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("certificationsText")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who we make caps for:5 张卡,整卡可点 */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
            {t("whoHeading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whoItems.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-lg hover:border-amber-200 transition-all"
              >
                <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                  {item.text}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-amber-600">
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* See us before you order */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {t("seeHeading")}
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">{t("seeText")}</p>
          <Link
            href="/factory"
            className="inline-flex items-center text-amber-700 font-medium hover:text-amber-800 hover:underline"
          >
            {t("seeVideoLink")}
          </Link>
        </div>
      </section>

      {/* FAQ:用原生 <details>/<summary>,答案文字始终在 HTML 里,方便搜索引擎直接读到 */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8">
            {t("faqHeading")}
          </h2>
          <div className="space-y-3">
            {faq.map((item, i) => (
              <details
                key={i}
                className="group border border-gray-200 rounded-xl px-5 py-4 bg-white open:shadow-sm"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 text-2xl leading-none text-gray-400 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-600 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">{t("ctaTitle")}</h2>
          <p className="text-amber-50 mb-6">{t("ctaText")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 text-base font-semibold bg-white text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
          >
            {t("ctaButton")}
          </Link>
        </div>
      </section>
    </>
  );
}
