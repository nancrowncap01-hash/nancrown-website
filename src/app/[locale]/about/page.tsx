import { useTranslations } from "next-intl";

export default function AboutPage() {
  const t = useTranslations("About");

  const stats = [
    { value: "15+", label: t("years") },
    { value: "200+", label: t("workers") },
    { value: "500K+", label: t("monthlyCapacity") },
    { value: "50+", label: t("countries") },
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-400 text-lg">{t("subtitle")}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-amber-600 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-amber-100 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                {t("story")}
              </h2>
              <p className="text-gray-600 leading-relaxed">{t("storyText")}</p>
            </div>
            <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center text-gray-400">
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
          </div>
        </div>
      </section>

      {/* Production & Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("capacity")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("capacityText")}
              </p>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t("certifications")}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {t("certificationsText")}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
