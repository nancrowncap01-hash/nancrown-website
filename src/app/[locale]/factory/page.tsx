import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { factoryContent, factoryVideo, factoryPhotoFiles } from "@/lib/factory-content";
import { FactoryJsonLd } from "@/components/seo/FactoryJsonLd";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const content = factoryContent[locale as Locale] ?? factoryContent.en;
  return pageMetadata({
    locale,
    path: "/factory",
    title: content.metaTitle,
    description: content.metaDescription,
    image: factoryVideo.poster,
    absolute: true, // metaTitle 已经带 "| NanCrown",不能被 layout 的 "%s | NanCrown" 模板再拼一次
  });
}

export default async function FactoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = factoryContent[locale as Locale] ?? factoryContent.en;
  const tNav = await getTranslations({ locale, namespace: "Nav" });

  return (
    <>
      <FactoryJsonLd
        locale={locale}
        pageName={content.h1}
        homeLabel={tNav("home")}
        videoName={content.videoName}
        videoDescription={content.videoDescription}
      />

      {/* 深色标题区 + 面包屑(风格照 /custom/[category]、/pricing) */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 text-sm text-gray-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              {tNav("home")}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{content.h1}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{content.h1}</h1>
        </div>
      </section>

      {/* lead */}
      <section className="pt-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-600 leading-relaxed">{content.lead}</p>
        </div>
      </section>

      {/* 视频区 */}
      <section className="py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="aspect-video w-full rounded-xl overflow-hidden bg-gray-100">
            <video
              controls
              muted
              playsInline
              preload="metadata"
              poster={factoryVideo.poster}
              className="w-full h-full object-cover"
            >
              <source src={factoryVideo.src} type="video/mp4" />
            </video>
          </div>
          <p className="mt-3 text-sm text-gray-500">{content.videoCaption}</p>
        </div>
      </section>

      {/* 视频里的五个步骤 */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            {content.stepsHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {content.steps.map((step, i) => (
              <div
                key={step.title}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-semibold text-sm mb-3">
                  {i + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 张车间实拍照片 */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            {content.photosHeading}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {factoryPhotoFiles.map((file, i) => (
              <div key={file} className="rounded-xl overflow-hidden border border-gray-100">
                <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                  <Image
                    src={`/images/factory/${file}`}
                    alt={content.photos[i]}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <p className="p-3 text-sm text-gray-600 leading-relaxed">{content.photos[i]}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 自己做什么 / 合作工序做什么 */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {content.inhouseHeading}
          </h2>
          <p className="text-gray-600 leading-relaxed">{content.inhouseText}</p>
        </div>
      </section>

      {/* 看自己订单的直播 */}
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            {content.liveHeading}
          </h2>
          <p className="text-gray-600 leading-relaxed">{content.liveText}</p>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-amber-600 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-3.5 text-base font-semibold bg-white text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
            >
              {content.ctaQuote}
            </Link>
            <Link
              href="/pricing"
              className="text-sm text-white hover:text-amber-100 hover:underline font-medium"
            >
              {content.ctaPricing}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
