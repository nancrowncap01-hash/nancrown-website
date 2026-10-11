import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import copy from "@/lib/trucker-buying-content.json";

const references = [
  {
    slug: "tire-stripe-mesh-trucker",
    images: ["tire-stripe-mesh-trucker-5.jpg", "tire-stripe-mesh-trucker-2.jpg"],
  },
  {
    slug: "souvenir-patch-snapback",
    images: ["souvenir-patch-snapback-2.jpg", "souvenir-patch-snapback-3.jpg"],
  },
];

export default function TruckerBuyingGuide({ locale }: { locale: Locale }) {
  const content = copy[locale] ?? copy.en;
  return (
    <>
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{content.heading}</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">{content.lead}</p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {content.structures.map((item) => (
              <article key={item.title} className="min-w-0 rounded-xl border border-gray-200 p-5">
                <h3 className="font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-3 text-gray-600 leading-relaxed">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section id="order-checklists" className="scroll-mt-24 bg-gray-50 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{content.ordersHeading}</h2>
          <p className="mt-4 text-gray-600 leading-relaxed">{content.ordersLead}</p>
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {content.orders.map((order) => (
              <article key={order.title} className="min-w-0 rounded-xl bg-white border border-gray-200 p-5 sm:p-6">
                <h3 className="text-xl font-semibold text-gray-900">{order.title}</h3>
                <ol className="mt-5 list-decimal pl-5 space-y-4 text-gray-600 leading-relaxed">
                  {order.items.map((item) => <li key={item} className="pl-1">{item}</li>)}
                </ol>
              </article>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
            <h3 className="text-xl font-semibold text-gray-900">{content.priceHeading}</h3>
            <p className="mt-3 text-gray-700 leading-relaxed">{content.priceText}</p>
            <Link href="/contact" className="mt-5 inline-flex rounded-lg bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700">{content.quote}</Link>
          </div>
        </div>
      </section>
      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{content.samplesHeading}</h2>
          <p className="mt-4 text-sm text-gray-500 leading-relaxed">{content.samplesNote}</p>
          <div className="mt-8 space-y-8">
            {content.samples.map((sample, i) => (
              <article key={sample.title} className="rounded-xl border border-gray-200 p-5 sm:p-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  <Link href={`/products/${references[i].slug}`} className="hover:text-amber-700 underline underline-offset-4">{sample.title}</Link>
                </h3>
                <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {references[i].images.map((file, j) => (
                    <figure key={file}>
                      <div className="relative aspect-square">
                        <Image src={`/images/products/${file}`} alt={sample.captions[j]} fill sizes="(max-width: 640px) 100vw, 450px" className="object-contain rounded-lg" />
                      </div>
                      <figcaption className="mt-2 text-sm text-gray-500">{sample.captions[j]}</figcaption>
                    </figure>
                  ))}
                </div>
                <p className="mt-5 text-gray-600 leading-relaxed">{sample.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
