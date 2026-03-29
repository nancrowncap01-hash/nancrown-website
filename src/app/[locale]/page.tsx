import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { sampleProducts } from "@/lib/sample-data";
import ProductCard from "@/components/products/ProductCard";

export default function HomePage() {
  const t = useTranslations("Hero");
  const hs = useTranslations("HatStyles");
  const feat = useTranslations("Features");
  const vid = useTranslations("FactoryVideo");
  const fp = useTranslations("FeaturedProducts");
  const cta = useTranslations("CTA");

  const features = [
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
        </svg>
      ),
      title: feat("factory"),
      desc: feat("factoryDesc"),
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
        </svg>
      ),
      title: feat("quality"),
      desc: feat("qualityDesc"),
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
        </svg>
      ),
      title: feat("custom"),
      desc: feat("customDesc"),
    },
    {
      icon: (
        <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      ),
      title: feat("moq"),
      desc: feat("moqDesc"),
    },
  ];

  const featured = sampleProducts.slice(0, 4);

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900 text-white">
        <div className="absolute inset-0 bg-[url('/images/hero-pattern.svg')] opacity-10" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
              {t("title")}
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
              {t("subtitle")}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-500 transition-colors"
              >
                {t("cta")}
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold border-2 border-white/30 text-white rounded-lg hover:bg-white/10 transition-colors"
              >
                {t("ctaSecondary")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Hat Styles Section */}
      <section className="py-16 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-10">
            {hs("title")}
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-6 sm:gap-8">
            {[
              { key: "baseballCap", category: "Baseball Caps", icon: (
                <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 50 C15 30, 65 30, 65 50" strokeLinecap="round" />
                  <path d="M15 50 C15 55, 65 55, 65 50" strokeLinecap="round" />
                  <path d="M65 50 C72 52, 78 55, 78 58" strokeLinecap="round" />
                  <circle cx="40" cy="28" r="3" fill="currentColor" stroke="none" />
                </svg>
              )},
              { key: "bucketHat", category: "Bucket Hats", icon: (
                <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 55 C10 55, 25 50, 40 50 C55 50, 70 55, 70 55" strokeLinecap="round" />
                  <path d="M20 50 C20 35, 60 35, 60 50" strokeLinecap="round" />
                  <path d="M10 55 C10 58, 70 58, 70 55" strokeLinecap="round" />
                </svg>
              )},
              { key: "snapback", category: "Snapbacks", icon: (
                <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 48 C15 30, 65 30, 65 48" strokeLinecap="round" />
                  <path d="M15 48 L10 52 L70 52 L65 48" strokeLinecap="round" />
                  <line x1="40" y1="48" x2="40" y2="52" />
                  <circle cx="40" cy="27" r="3" fill="currentColor" stroke="none" />
                </svg>
              )},
              { key: "truckerHat", category: "Trucker Hats", icon: (
                <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 50 C15 30, 65 30, 65 50" strokeLinecap="round" />
                  <path d="M15 50 C15 55, 65 55, 65 50" strokeLinecap="round" />
                  <path d="M65 50 C72 52, 78 55, 78 58" strokeLinecap="round" />
                  <path d="M35 32 L35 48 M45 32 L45 48 M35 40 L45 40" strokeLinecap="round" strokeDasharray="2 3" opacity="0.5" />
                </svg>
              )},
              { key: "beanie", category: "Beanies", icon: (
                <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 55 C20 35, 60 35, 60 55" strokeLinecap="round" />
                  <path d="M18 55 C18 60, 62 60, 62 55" strokeLinecap="round" />
                  <path d="M18 55 C18 52, 62 52, 62 55" strokeLinecap="round" />
                  <circle cx="40" cy="33" r="2" fill="currentColor" stroke="none" />
                </svg>
              )},
              { key: "visor", category: "Visors", icon: (
                <svg viewBox="0 0 80 80" className="w-16 h-16 sm:w-20 sm:h-20" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 50 C25 45, 55 45, 60 50" strokeLinecap="round" />
                  <path d="M60 50 C68 52, 75 56, 76 59" strokeLinecap="round" />
                  <path d="M20 50 C20 52, 60 52, 60 50" strokeLinecap="round" />
                </svg>
              )},
            ].map((style) => (
              <Link
                key={style.key}
                href={`/products?category=${encodeURIComponent(style.category)}`}
                className="flex flex-col items-center text-center group"
              >
                <div className="text-gray-400 group-hover:text-amber-600 transition-colors mb-3">
                  {style.icon}
                </div>
                <span className="text-sm font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
                  {hs(style.key)}
                </span>
                <span className="text-xs text-gray-500 mt-0.5 hidden sm:block">
                  {hs(`${style.key}Desc`)}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            {feat("title")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-amber-50 text-amber-600 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {f.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Video Section */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">
              {vid("title")}
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {vid("subtitle")}
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/jfbFFLF1nx8"
                title="NanCrown Headwear Factory - Custom Hat Manufacturing Process"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="flex items-center gap-3 bg-amber-50 rounded-xl px-5 py-4">
                <svg className="h-6 w-6 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
                <span className="text-sm font-semibold text-gray-800">{vid("highlight1")}</span>
              </div>
              <div className="flex items-center gap-3 bg-amber-50 rounded-xl px-5 py-4">
                <svg className="h-6 w-6 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.1-5.1m0 0L11.42 4.97m-5.1 5.1H21M3 21h18" />
                </svg>
                <span className="text-sm font-semibold text-gray-800">{vid("highlight2")}</span>
              </div>
              <div className="flex items-center gap-3 bg-amber-50 rounded-xl px-5 py-4">
                <svg className="h-6 w-6 text-amber-600 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                <span className="text-sm font-semibold text-gray-800">{vid("highlight3")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-3xl font-bold text-gray-900">
              {fp("title")}
            </h2>
            <Link
              href="/products"
              className="text-amber-600 hover:text-amber-700 font-medium flex items-center gap-1"
            >
              {fp("viewAll")}
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-600 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            {cta("title")}
          </h2>
          <p className="text-amber-100 text-lg mb-8">{cta("subtitle")}</p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 text-base font-semibold bg-white text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
          >
            {cta("button")}
          </Link>
        </div>
      </section>
    </>
  );
}
