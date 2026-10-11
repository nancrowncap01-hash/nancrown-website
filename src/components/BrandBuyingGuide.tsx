import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import copy from "@/lib/brand-buying-content.json";

const destinations = {
  pricing: "/pricing",
  baseball: "/custom/baseball-caps",
  trucker: "/custom/trucker-hats",
  running: "/custom/running-caps",
  products: "/products",
  factory: "/factory",
  contact: "/contact",
} as const;

export default function BrandBuyingGuide({ locale }: { locale: Locale }) {
  const content = copy[locale] ?? copy.en;

  return (
    <section className="bg-gray-50 py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{content.heading}</h2>
        <p className="mt-4 max-w-3xl text-gray-600 leading-relaxed">{content.lead}</p>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-5">
          <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <h3 className="font-semibold text-gray-900">{content.exampleTitle}</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">{content.example}</p>
          </article>
          <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <h3 className="font-semibold text-gray-900">{content.minimumTitle}</h3>
            <p className="mt-3 text-gray-600 leading-relaxed">{content.minimum}</p>
          </article>
        </div>

        <article className="mt-5 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <h3 className="font-semibold text-gray-900">{content.scopeTitle}</h3>
          <p className="mt-3 text-gray-700 leading-relaxed">{content.scope}</p>
        </article>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <article className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <h3 className="font-semibold text-gray-900">{content.checklistTitle}</h3>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-gray-600 leading-relaxed">
              {content.checklist.map((item) => <li key={item}>{item}</li>)}
            </ul>
            <p className="mt-5 text-sm text-gray-500 leading-relaxed">{content.sampleNote}</p>
          </article>
          <nav aria-label={content.linksTitle} className="min-w-0 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
            <h3 className="font-semibold text-gray-900">{content.linksTitle}</h3>
            <ul className="mt-4 space-y-3">
              {(Object.keys(destinations) as Array<keyof typeof destinations>).map((key) => (
                <li key={key}>
                  <Link href={destinations[key]} className="text-amber-700 underline underline-offset-4 hover:text-amber-900">
                    {content.links[key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </section>
  );
}
