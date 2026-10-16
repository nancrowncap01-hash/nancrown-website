import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { localizeProduct } from "@/lib/product-i18n";
import type { Product } from "@/lib/sample-data";
import evidenceCopy from "@/lib/category-evidence.json";
import type { Locale } from "@/i18n/routing";

type EvidenceLocale = (typeof evidenceCopy)[keyof typeof evidenceCopy];

export default function CategoryEvidence({
  locale,
  kind,
  products,
}: {
  locale: Locale;
  kind: "snapback" | "embroidery";
  products: Product[];
}) {
  const copy: EvidenceLocale = evidenceCopy[locale] ?? evidenceCopy.en;
  const choiceList = kind === "snapback" ? copy.snapChoices : copy.embroideryChoices;
  const plans = kind === "snapback" ? copy.snapPlans : copy.embroideryPlans;
  const sampleSlugs = kind === "snapback"
    ? ["souvenir-patch-snapback", "tire-stripe-mesh-trucker"]
    : ["tonal-embroidery-ripstop-camp-cap", "chenille-letter-tile-cap", "chain-stitch-pillbox-cap", "serif-wordmark-washed-cap"];
  const sampleProducts = products.filter((product) => sampleSlugs.includes(product.slug));

  return (
    <section className="bg-white py-14 sm:py-16" aria-labelledby="category-evidence-heading">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="category-evidence-heading" className="scroll-mt-28 text-2xl font-bold text-gray-900 sm:text-3xl">
            {copy.samplesHeading}
          </h2>
          <p className="mt-3 text-gray-600 leading-relaxed">{copy.samplesIntro}</p>
          {kind === "embroidery" && <p className="mt-3 text-sm text-gray-600 leading-relaxed">{copy.outsourcingNote}</p>}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {sampleProducts.map((product) => {
            const localized = localizeProduct(product, locale);
            return (
              <article key={product.slug} className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <Link href={`/products/${product.slug}`} className="group block">
                  <div className="relative aspect-[4/3] bg-gray-100">
                    <Image
                      src={product.image}
                      alt={localized.name}
                      fill
                      sizes="(max-width: 640px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">{copy.sampleLabel}</p>
                    <h3 className="mt-1 text-lg font-semibold text-gray-900 group-hover:text-amber-700">{localized.name}</h3>
                    <p className="mt-1 text-sm text-gray-500">{copy.codeLabel}: {product.code}</p>
                    <p className="mt-3 text-sm leading-relaxed text-gray-700">{localized.description}</p>
                    <ul className="mt-3 list-disc space-y-1 pl-5 text-sm leading-relaxed text-gray-600">
                      {localized.features.slice(0, 4).map((feature) => <li key={feature}>{feature}</li>)}
                    </ul>
                    <div className="mt-4 border-t border-gray-100 pt-3 text-sm text-gray-600">
                      <span className="font-medium">{copy.moqLabel}:</span> {product.moq} {locale === "en" ? "pieces" : locale === "es" ? "piezas" : locale === "fr" ? "pièces" : "Stück"} {copy.moqScope}
                    </div>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl bg-gray-50 p-6 sm:p-7">
            <h3 className="text-xl font-bold text-gray-900">{copy.choiceHeading}</h3>
            <ul className="mt-4 list-disc space-y-3 pl-5 leading-relaxed text-gray-700">
              {choiceList.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row">
              <Link href="/solutions/embroidery-artwork" className="font-medium text-amber-700 underline underline-offset-4">{copy.artworkLink}</Link>
              <Link href="/solutions/sample-approval" className="font-medium text-amber-700 underline underline-offset-4">{copy.sampleLink}</Link>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 sm:p-7">
            {plans.length > 0 && <>
              <h3 className="text-xl font-bold text-gray-900">{copy.planHeading}</h3>
              <p className="mt-2 leading-relaxed text-gray-600">{copy.planIntro}</p>
              <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
                {plans.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </>}
            <h3 className={`${plans.length ? "mt-7" : ""} text-xl font-bold text-gray-900`}>{copy.termsHeading}</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 leading-relaxed text-gray-700">
              {copy.terms.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
