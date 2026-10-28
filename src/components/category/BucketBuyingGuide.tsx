import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import guide from "@/lib/bucket-buying-guide.json";

const slugs = ["frayed-edge-denim-bucket-hat", "contrast-brim-bucket-hat", "teddy-earflap-wool-bucket-hat", "gathered-crown-sun-hat"];

export default function BucketBuyingGuide({ locale }: { locale: Locale }) {
  const copy = guide[locale] ?? guide.en;
  return (
    <section id="buying-guide" aria-labelledby="bucket-guide-heading" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 id="bucket-guide-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl">{copy.heading}</h2>
        <p className="mt-4 leading-relaxed text-gray-600">{copy.lead}</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {copy.cards.map(([title, text], index) => (
            <article key={title} className="min-w-0 rounded-xl border border-gray-200 p-5">
              <h3 className="text-lg font-semibold"><Link href={`/products/${slugs[index]}`} className="text-amber-800 underline underline-offset-4">{title}</Link></h3>
              <p className="mt-3 leading-relaxed text-gray-600">{text}</p>
            </article>
          ))}
        </div>
        <div className="mt-8 rounded-xl bg-gray-50 p-5 sm:p-6">
          <h3 className="text-xl font-semibold text-gray-900">{copy.checkHeading}</h3>
          <ol className="mt-5 list-decimal space-y-6 pl-5">
            {copy.checks.map(([title, text]) => <li key={title} className="pl-1"><h4 className="font-semibold text-gray-900">{title}</h4><p className="mt-2 leading-relaxed text-gray-600">{text}</p></li>)}
          </ol>
        </div>
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">{copy.notice}</p>
        <nav aria-label={copy.heading} className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
          <Link href="/solutions/cap-size-fit-guide" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[0]}</Link>
          <Link href="/solutions/sample-approval" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[1]}</Link>
          <Link href="/custom/private-label-hats" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[2]}</Link>
          <a href="/downloads/nancrown-cap-specification-pack-en.pdf" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[3]}</a>
          <Link href="/contact" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[4]}</Link>
        </nav>
        <Link href="/contact?product=frayed-edge-denim-bucket-hat" className="mt-8 inline-flex max-w-full rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700">{copy.start}</Link>
      </div>
    </section>
  );
}
