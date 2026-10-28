import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { sampleProducts } from "@/lib/sample-data";
import { localizeProduct } from "@/lib/product-i18n";
import guide from "@/lib/camp-outdoor-guide.json";

export default function CampOutdoorBuyingGuide({ locale, kind }: { locale: Locale; kind: "camp" | "outdoor" }) {
  const copy = guide[locale] ?? guide.en;
  const slugs = kind === "camp"
    ? ["utility-pocket-camp-cap", "tonal-embroidery-ripstop-camp-cap", "earflap-surf-camp-cap"]
    : ["neck-shade-jet-cap"];
  const cards = kind === "camp" ? copy.campCards : copy.outdoorCards;
  const references = slugs.flatMap((slug) => {
    const product = sampleProducts.find((item) => item.slug === slug);
    return product ? [localizeProduct(product, locale)] : [];
  });
  return (
    <section id="buying-guide" aria-labelledby="camp-outdoor-guide-heading" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 id="camp-outdoor-guide-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl">{copy.heading}</h2>
        <p className="mt-4 leading-relaxed text-gray-600">{kind === "camp" ? copy.campLead : copy.outdoorLead}</p>
        <p className="mt-3 text-sm leading-relaxed text-gray-500">{copy.reference}</p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {references.map((product) => (
            <li key={product.slug} className="min-w-0 max-w-full">
              <Link href={`/products/${product.slug}`} className="block break-words rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 font-medium text-amber-900 underline underline-offset-4 hover:bg-amber-100">
                {product.code} · {product.name}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cards.map(([title, text], index) => (
            <article key={title} className="min-w-0 rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold text-gray-900"><span className="mr-2 text-amber-700">{index + 1}.</span>{title}</h3>
              <p className="mt-3 leading-relaxed text-gray-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-gray-50 p-5 sm:p-6">
          <h3 className="text-xl font-semibold text-gray-900">{copy.checkHeading}</h3>
          <ol className="mt-5 list-decimal space-y-4 pl-5 leading-relaxed text-gray-600">
            {copy.checks.map((item) => <li key={item} className="pl-1">{item}</li>)}
          </ol>
        </div>
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">{copy.notice}</p>
        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-4" aria-label={copy.checkHeading}>
          <Link href="/solutions/cap-size-fit-guide" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[0]}</Link>
          <Link href="/solutions/sample-approval" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[1]}</Link>
          <a href="/downloads/nancrown-cap-specification-pack-en.pdf" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[2]}</a>
          <Link href="/contact" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[3]}</Link>
        </nav>
        <Link href={`/contact?product=${slugs[0]}`} className="mt-8 inline-flex max-w-full rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700">{copy.start} · {kind === "camp" ? "J0029" : "PJ0005"}</Link>
      </div>
    </section>
  );
}
