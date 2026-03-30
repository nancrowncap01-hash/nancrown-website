import Image from "next/image";
import { notFound } from "next/navigation";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { sampleProducts } from "@/lib/sample-data";
import ProductCard from "@/components/products/ProductCard";
import { ProductJsonLd } from "@/components/seo/JsonLd";

export const dynamicParams = true;

export function generateStaticParams() {
  return sampleProducts.map((p) => ({ slug: p.slug }));
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;
  const product = sampleProducts.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const related = sampleProducts
    .filter((p) => p.category === product.category && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      <ProductJsonLd product={product} />
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
            <span className="text-gray-900">{product.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Image */}
            <div className="aspect-square bg-gray-100 rounded-2xl relative overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-2xl"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>

            {/* Info */}
            <div>
              <span className="inline-block px-3 py-1 bg-amber-50 text-amber-700 text-sm font-medium rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="mt-4 text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Specs */}
              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm">
                  <span className="font-medium text-gray-700 w-32">
                    {t("material")}:
                  </span>
                  <span className="text-gray-600">{product.material}</span>
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
                    {product.colors.map((color) => (
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
                  {product.features.map((feat, i) => (
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
