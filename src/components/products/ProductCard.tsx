import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import type { Product } from "@/lib/sample-data";

export default function ProductCard({ product }: { product: Product }) {
  const t = useTranslations("Products");

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-block px-2.5 py-1 bg-white/90 backdrop-blur-sm text-xs font-medium text-gray-700 rounded-full">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500">{product.material}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {t("minOrder")}: {product.moq} {t("pieces")}
          </span>
          <span className="text-xs font-medium text-amber-600">
            {product.colors.length} {t("colors")}
          </span>
        </div>
      </div>
    </Link>
  );
}
