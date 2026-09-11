import { notFound } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { sampleProducts } from "@/lib/sample-data";
import { localizeProduct } from "@/lib/product-i18n";
import ProductCard from "@/components/products/ProductCard";
import ProductGallery from "@/components/products/ProductGallery";
import { ProductJsonLd } from "@/components/seo/JsonLd";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const product = sampleProducts.find((p) => p.slug === slug);
  if (!product) return {};
  const localized = localizeProduct(product, locale);
  const catT = await getTranslations({ locale, namespace: "Categories" });
  const metaT = await getTranslations({ locale, namespace: "Products" });
  // 德语名词任何位置都要大写,不能转小写;西语/法语句中普通名词按原文风格转小写
  const categoryForMeta =
    locale === "de" ? catT(product.category) : catT(product.category).toLowerCase();
  return pageMetadata({
    locale,
    path: `/products/${slug}`,
    title: localized.name,
    description: `${localized.description} ${metaT("metaSuffix", {
      category: categoryForMeta,
      moq: product.moq,
    })}`.slice(0, 200),
    image: product.image,
  });
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const product = sampleProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const related = sampleProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <ProductJsonLd product={product} locale={locale} />
      <ProductDetail product={product} related={related} />
    </>
  );
}

function ProductDetail({
  product,
  related,
}: {
  product: (typeof sampleProducts)[0];
  related: typeof sampleProducts;
}) {
  const t = useTranslations("Products");
  const cta = useTranslations("CTA");
  const catT = useTranslations("Categories");
  const locale = useLocale();
  const localized = localizeProduct(product, locale);

  return (
    <>
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav className="mb-8 text-sm text-gray-500">
            <Link href="/" className="hover:text-amber-600">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="hover:text-amber-600">
              Products
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900">{localized.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <ProductGallery
              images={[product.image, ...(product.gallery ?? [])]}
              alt={localized.name}
            />

            {/* Info */}
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-full">
                  {catT(product.category)}
                </span>
                {product.code && (
                  <span className="text-sm text-gray-400 font-medium">
                    {t("styleNo", { code: product.code })}
                  </span>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900">
                {localized.name}
              </h1>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {localized.description}
              </p>

              {/* Specs */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-gray-700 w-32">
                    {t("material")}:
                  </span>
                  <span className="text-gray-600">{localized.material}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-gray-700 w-32">
                    {t("minOrder")}:
                  </span>
                  <span className="text-gray-600">
                    {product.moq} {t("pieces")}
                  </span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="font-medium text-gray-700 w-32 shrink-0">
                    {t("colors")}:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {localized.colors.map((color) => (
                      <span
                        key={color}
                        className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs"
                      >
                        {color}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-8">
                <ul className="space-y-2">
                  {localized.features.map((feat, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-600">
                      <svg
                        className="h-4 w-4 text-amber-500 shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 12.75l6 6 9-13.5"
                        />
                      </svg>
                      {feat}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Rendering disclaimer */}
              <p className="mt-4 text-xs text-gray-400 leading-relaxed">
                {t("renderingNote")}
              </p>

              {/* CTA */}
              <div className="mt-10">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-3.5 text-base font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
                >
                  {t("requestQuote")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              {t("relatedProducts")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
