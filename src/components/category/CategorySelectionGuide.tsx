import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import copy from "@/lib/category-selection-content.json";

const links = ["/solutions/cap-size-fit-guide", "/solutions/sample-approval", "/pricing", "/contact"];

function FrontDiagram({ labels }: { labels: string[] }) {
  return (
    <figure className="my-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
      <div className="grid grid-cols-2 gap-4 sm:gap-8">
        {labels.slice(0, 2).map((label, i) => (
          <div key={label} className="min-w-0 text-center">
            <svg viewBox="0 0 220 165" className="mx-auto w-full max-w-64" role="img" aria-label={label}>
              <path d="M30 116 C30 20 190 20 190 116 Q110 138 30 116Z" fill="#f3f4f6" stroke="#374151" strokeWidth="3" />
              <path d="M30 116 Q110 148 190 116 Q202 157 110 156 Q18 157 30 116Z" fill="#fef3c7" stroke="#374151" strokeWidth="3" />
              {i === 1 && <path d="M110 44 L110 130" fill="none" stroke="#b45309" strokeWidth="3" strokeDasharray="5 4" />}
              <rect x="67" y="77" width="86" height="31" rx="5" fill="none" stroke="#0f766e" strokeWidth="2" />
              <path d="M80 92 H140" stroke="#0f766e" strokeWidth="3" />
            </svg>
            <p className="mt-3 font-semibold text-gray-900">{label}</p>
          </div>
        ))}
      </div>
      <figcaption className="mt-5 text-sm leading-relaxed text-gray-500">{labels[2]}</figcaption>
    </figure>
  );
}

export default function CategorySelectionGuide({ locale, kind }: { locale: Locale; kind: "five" | "patch" }) {
  const content = copy[locale] ?? copy.en;
  const section = content[kind];
  return (
    <section id="selection-guide" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{section.heading}</h2>
        <p className="mt-4 text-gray-600 leading-relaxed">{section.lead}</p>
        {kind === "five" ? (
          <>
            <FrontDiagram labels={content.five.diagram} />
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
              {content.five.cards.map(([title, text]) => (
                <article key={title} className="min-w-0 rounded-xl border border-gray-200 p-5">
                  <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
                  <p className="mt-3 leading-relaxed text-gray-600">{text}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="mt-8">
            <p className="mb-3 text-sm text-gray-500 sm:hidden">{content.patch.scrollHint}</p>
            <div className="overflow-x-auto rounded-xl border border-gray-200" tabIndex={0} role="region" aria-label={section.heading}>
            <table className="w-full min-w-[640px] text-left text-sm leading-relaxed">
              <thead className="bg-gray-900 text-white">
                <tr>{content.patch.columns.map((label) => <th key={label} scope="col" className="p-4 align-top font-semibold">{label}</th>)}</tr>
              </thead>
              <tbody>
                {content.patch.rows.map(([type, visual, check]) => (
                  <tr key={type} className="border-t border-gray-200 even:bg-gray-50">
                    <th scope="row" className="p-4 align-top font-semibold text-gray-900">{type}</th>
                    <td className="p-4 align-top text-gray-600">{visual}</td>
                    <td className="p-4 align-top text-gray-600">{check}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          </div>
        )}
        <div className="mt-8 rounded-xl bg-gray-50 p-5 sm:p-6">
          <h3 className="text-xl font-semibold text-gray-900">{section.checkHeading}</h3>
          <ol className="mt-5 list-decimal pl-5 space-y-4 leading-relaxed text-gray-600">
            {section.checks.map((item) => <li key={item} className="pl-1">{item}</li>)}
          </ol>
        </div>
        <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm leading-relaxed text-amber-900">{section.notice}</p>
        <nav className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
          {content.links.map((label, i) => (
            <Link key={label} href={links[i]} className="font-medium text-amber-700 underline underline-offset-4 hover:text-amber-800">{label}</Link>
          ))}
        </nav>
      </div>
    </section>
  );
}
