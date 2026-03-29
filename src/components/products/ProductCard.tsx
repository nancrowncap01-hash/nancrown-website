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
        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
          <svg
            className="h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
            />
          </svg>
        </div>
        <div className="absolute top-3 left-3">
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
