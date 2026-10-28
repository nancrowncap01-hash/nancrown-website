import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import guide from "@/lib/factory-inspection-guide.json";
import CopyInspectionBrief from "@/components/CopyInspectionBrief";

export default function FactoryInspectionGuide({ locale }: { locale: Locale }) {
  const copy = guide[locale] ?? guide.en;
  const brief = copy.fields.map((field) => `${field}: ____________________`).join("\n");
  return (
    <section id="inspection-guide" aria-labelledby="inspection-guide-heading" className="scroll-mt-24 bg-gray-50 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h2 id="inspection-guide-heading" className="text-2xl font-bold text-gray-900 sm:text-3xl">{copy.heading}</h2>
        <p className="mt-4 leading-relaxed text-gray-600">{copy.lead}</p>
        <h3 className="mt-8 text-xl font-semibold text-gray-900">{copy.checksHeading}</h3>
        <ol className="mt-5 grid gap-5 sm:grid-cols-2">
          {copy.checks.map(([title, text], index) => (
            <li key={title} className="min-w-0 rounded-xl border border-gray-200 bg-white p-5">
              <h4 className="font-semibold text-gray-900"><span className="mr-2 text-amber-700">{index + 1}.</span>{title}</h4>
              <p className="mt-3 leading-relaxed text-gray-600">{text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 sm:p-6">
          <h3 className="text-xl font-semibold text-gray-900">{copy.recordHeading}</h3>
          <p className="mt-3 leading-relaxed text-gray-700">{copy.record}</p>
        </div>
        <div className="mt-8 rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
          <h3 className="text-xl font-semibold text-gray-900">{copy.briefHeading}</h3>
          <p className="mt-3 text-sm leading-relaxed text-gray-600">{copy.briefHelp}</p>
          <CopyInspectionBrief text={brief} label={copy.briefHeading} button={copy.copy} success={copy.success} failure={copy.failure} />
        </div>
        <nav aria-label={copy.heading} className="mt-6 flex flex-wrap gap-x-6 gap-y-4">
          <Link href="/solutions/sample-approval" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[0]}</Link>
          <Link href="/solutions/cap-size-fit-guide" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[1]}</Link>
          <a href="/downloads/nancrown-cap-specification-pack-en.pdf" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[2]}</a>
          <Link href="/contact" className="font-medium text-amber-700 underline underline-offset-4">{copy.links[3]}</Link>
        </nav>
      </div>
    </section>
  );
}
