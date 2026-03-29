import Image from "next/image";
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
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6">
            {[
              { key: "baseballCap", category: "Baseball Caps", img: "/images/styles/baseball-cap.jpg" },
              { key: "bucketHat", category: "Bucket Hats", img: "/images/styles/bucket-hat.jpg" },
              { key: "snapback", category: "Snapbacks", img: "/images/styles/snapback.jpg" },
              { key: "truckerHat", category: "Trucker Hats", img: "/images/styles/trucker-hat.jpg" },
              { key: "beanie", category: "Beanies", img: "/images/styles/beanie.jpg" },
              { key: "visor", category: "Visors", img: "/images/styles/visor.jpg" },
            ].map((style) => (
              <Link
                key={style.key}
                href={`/products?category=${encodeURIComponent(style.category)}`}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 relative mb-3 group-hover:scale-105 transition-transform duration-300 bg-white">
                  <Image
                    src={style.img}
                    alt={style.category}
                    fill
                    className="object-contain"
                    sizes="128px"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-gray-900 uppercase tracking-wide">
                  {hs(style.key)}
                </span>
                <span className="text-xs text-gray-500 mt-1 hidden sm:block">
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
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
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
