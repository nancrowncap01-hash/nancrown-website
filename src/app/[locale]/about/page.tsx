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
            <div className="rounded-2xl overflow-hidden aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/jfbFFLF1nx8"
                title="NanCrown Headwear Factory - Custom Hat Manufacturing Process"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
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
