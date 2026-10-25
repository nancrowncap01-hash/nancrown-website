import CapSpecificationDownload from "@/components/CapSpecificationDownload";
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

export default function BrandBuyingGuide({ locale, showFinishing = false }: { locale: Locale; showFinishing?: boolean }) {
  const content = copy[locale] ?? copy.en;

  return (
    <section className="bg-gray-50 py-14 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {showFinishing && <><FinishingGuide locale={locale} /><CapSpecificationDownload locale={locale} /></>}
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

function FinishingGuide({ locale }: { locale: Locale }) {
  const c = (copy[locale] ?? copy.en).finishing;
  return (
    <div id="labels-packing" className="scroll-mt-28 mb-14 border-b border-gray-200 pb-14">
      <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">{c.heading}</h2>
      <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">{c.lead}</p>
      <figure className="mt-7 rounded-2xl border border-gray-200 bg-white p-5 sm:p-8">
        <svg viewBox="0 0 640 260" role="img" aria-label={c.diagramLabel} className="mx-auto w-full max-w-2xl">
          <path d="M90 164C73 76 135 25 231 25c100 0 155 55 138 139" fill="#f1f5f9" stroke="#334155" strokeWidth="3" />
          <ellipse cx="230" cy="165" rx="139" ry="57" fill="#fff" stroke="#334155" strokeWidth="3" />
          <ellipse cx="230" cy="165" rx="120" ry="42" fill="#f8fafc" stroke="#94a3b8" strokeWidth="12" />
          <path d="M230 26v97M142 49l46 77M319 49l-47 77" stroke="#0f766e" strokeWidth="9" fill="none" />
          <rect x="198" y="188" width="65" height="28" rx="3" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
          <rect x="273" y="176" width="26" height="40" rx="2" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
          <path d="M458 68h92l25 25v100H458z" fill="#fef3c7" stroke="#92400e" strokeWidth="2" />
          <circle cx="555" cy="88" r="5" fill="#fff" stroke="#92400e" strokeWidth="2" />
          <path d="M555 82q36-46 56-15" fill="none" stroke="#94a3b8" strokeWidth="2" />
          <g fill="#0f172a" fontSize="20" fontWeight="700" textAnchor="middle">
            <text x="230" y="209">A</text><text x="286" y="202">B</text>
            <text x="262" y="85">C</text><text x="516" y="142">D</text>
          </g>
        </svg>
        <figcaption className="mt-3 text-sm leading-relaxed text-gray-500">{c.diagramLabel}</figcaption>
      </figure>
      <div className="mt-7 overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm leading-relaxed sm:text-base">
          <caption className="sr-only">{c.heading}</caption>
          <thead className="bg-slate-900 text-white"><tr>{c.columns.map((text) => <th key={text} scope="col" className="p-4 font-semibold">{text}</th>)}</tr></thead>
          <tbody>{c.rows.map(([part, detail]) => <tr key={part} className="border-t border-gray-200"><th scope="row" className="w-1/4 min-w-28 p-4 align-top font-semibold text-gray-900">{part}</th><td className="p-4 align-top text-gray-600">{detail}</td></tr>)}</tbody>
        </table>
      </div>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-teal-200 bg-teal-50 p-5"><h3 className="font-semibold text-gray-900">{c.includedTitle}</h3><p className="mt-3 leading-relaxed text-gray-700">{c.included}</p></article>
        <article className="rounded-xl border border-amber-200 bg-amber-50 p-5"><h3 className="font-semibold text-gray-900">{c.packingTitle}</h3><p className="mt-3 leading-relaxed text-gray-700">{c.packing}</p></article>
      </div>
      <p className="mt-6 leading-relaxed text-gray-600">{c.approval}</p>
      <nav className="mt-5 flex flex-wrap gap-x-7 gap-y-3">
        <Link href="/solutions/cap-size-fit-guide" className="text-amber-700 underline underline-offset-4 hover:text-amber-900">{c.fitLink}</Link>
        <Link href="/pricing" className="text-amber-700 underline underline-offset-4 hover:text-amber-900">{c.pricingLink}</Link>
      </nav>
    </div>
  );
}
