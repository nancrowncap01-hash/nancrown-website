import Image from "next/image";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { sampleProducts, categories } from "@/lib/sample-data";
import { localizeProduct } from "@/lib/product-i18n";
import FAQ from "@/components/FAQ";
import ContactForm from "@/app/[locale]/contact/ContactForm";
import styles from "./HomeA.module.css";

// A 版「工厂档案」用到的两款字体,只在这个组件里生效(不影响全站)
const plexMono = IBM_Plex_Mono({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-sans",
  display: "swap",
});

// 产品记录区展示前 12 款(另一个助手往 sampleProducts 加新款时这里会自动跟着显示)
const PRODUCT_COUNT = 12;

type SubItem = { name: string; sub: string };
type Step = { title: string; body: string };

export default function HomeA() {
  const t = useTranslations("HomeA");
  const catT = useTranslations("Categories");
  const faqT = useTranslations("FAQ");
  const locale = useLocale();

  // 数组内容存在翻译文件里(t.raw 直接拿原始 JSON,不走 ICU 解析)
  const styleSubs = t.raw("styleSubs") as string[];
  const decorItems = t.raw("decor") as SubItem[];
  const steps = t.raw("steps") as Step[];

  const faqItems = [1, 2, 3, 4, 5, 6].map((n) => ({
    question: faqT(`q${n}`),
    answer: faqT(`a${n}`),
  }));

  const featured = sampleProducts.slice(0, PRODUCT_COUNT);

  return (
    <div className={`${styles.root} ${plexMono.variable} ${plexSans.variable}`}>
      {/* 首屏 */}
      <section className={styles.hero}>
        <div className="absolute inset-0">
          <Image
            src="/images/factory-video-cover.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className={styles.heroBg}
          />
        </div>
        <div className={styles.heroScrim} />
        <div className={styles.heroInner}>
          <div className={styles.eyebrow}>{t("eyebrow")}</div>
          <h1 className={styles.heroTitle}>
            {t("titleLine1")}
            <br />
            {t("titleLine2")}
          </h1>
          <p className={styles.heroLead}>{t("lead")}</p>
          <div className={styles.heroCta}>
            <Link href="/contact" className={`${styles.btn} ${styles.btnSolid}`}>
              {t("ctaPrimary")} →
            </Link>
            <a href="#capabilities" className={`${styles.btn} ${styles.btnOutline}`}>
              {t("ctaSecondary")}
            </a>
          </div>
        </div>
      </section>

      {/* 关键数据条 */}
      <div className={styles.stats}>
        <div className={styles.statsGrid}>
          <div className={styles.stat}>
            <div className={`${styles.statNum} ${styles.mono}`}>{t("statFoundedValue")}</div>
            <div className={styles.statLabel}>{t("statFoundedLabel")}</div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.statNum} ${styles.mono}`}>{t("statFloorValue")}</div>
            <div className={styles.statLabel}>{t("statFloorLabel")}</div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.statNum} ${styles.mono}`}>{t("statWorkersValue")}</div>
            <div className={styles.statLabel}>{t("statWorkersLabel")}</div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.statNum} ${styles.mono}`}>{t("statOutputValue")}</div>
            <div className={styles.statLabel}>{t("statOutputLabel")}</div>
          </div>
          <div className={styles.stat}>
            <div className={`${styles.statNum} ${styles.mono}`}>{t("statCountriesValue")}</div>
            <div className={styles.statLabel}>{t("statCountriesLabel")}</div>
          </div>
        </div>
      </div>

      {/* 产能与工序 */}
      <section id="capabilities" className={styles.block}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.kicker}>{t("capKicker")}</div>
            <h2>{t("capHeading")}</h2>
            <p>{t("capDescription")}</p>
          </div>

          <div className={styles.capColumns}>
            <div className={styles.capCol}>
              <h3>{t("stylesHeading")}</h3>
              <ul className={styles.capList}>
                {categories.map((category, i) => (
                  <li key={category}>
                    <span className={styles.capIdx}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.capName}>{catT(category)}</span>
                    <span className={styles.capSub}>{styleSubs[i]}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.capCol}>
              <h3>{t("decorHeading")}</h3>
              <ul className={styles.capList}>
                {decorItems.map((item, i) => (
                  <li key={item.name}>
                    <span className={styles.capIdx}>{String(i + 1).padStart(2, "0")}</span>
                    <span className={styles.capName}>{item.name}</span>
                    <span className={styles.capSub}>{item.sub}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.specBlock}>
            <div className={styles.specRow}>
              <div className={styles.specKey}>{t("specMoqLabel")}</div>
              <div className={styles.specValue}>
                {t.rich("specMoqValue", { b: (chunks) => <b>{chunks}</b> })}
              </div>
            </div>
            <div className={styles.specRow}>
              <div className={styles.specKey}>{t("specSampleLabel")}</div>
              <div className={styles.specValue}>
                {t.rich("specSampleValue", { b: (chunks) => <b>{chunks}</b> })}
              </div>
            </div>
            <div className={styles.specRow}>
              <div className={styles.specKey}>{t("specBulkLabel")}</div>
              <div className={styles.specValue}>
                {t.rich("specBulkValue", { b: (chunks) => <b>{chunks}</b> })}
              </div>
            </div>
            <div className={styles.specRow}>
              <div className={styles.specKey}>{t("specMaterialsLabel")}</div>
              <div className={styles.specValue}>{t("specMaterialsValue")}</div>
            </div>
            <div className={styles.specRow}>
              <div className={styles.specKey}>{t("specShippingLabel")}</div>
              <div className={styles.specValue}>{t("specShippingValue")}</div>
            </div>
            <div className={styles.specRow}>
              <div className={styles.specKey}>{t("specQcLabel")}</div>
              <div className={styles.specValue}>
                {t.rich("specQcValue", { b: (chunks) => <b>{chunks}</b> })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 产品记录 */}
      <section id="products" className={`${styles.block} ${styles.productsSection}`}>
        <div className={styles.wrap}>
          <div className={styles.prodToolbar}>
            <div className={styles.sectionHead} style={{ marginBottom: 0 }}>
              <div className={styles.kicker}>{t("productsKicker")}</div>
              <h2>{t("productsHeading")}</h2>
            </div>
            <div className={`${styles.prodCount} ${styles.mono}`}>
              {t("productsCount", { shown: featured.length, total: sampleProducts.length })}
            </div>
          </div>

          <div className={styles.prodGrid}>
            {featured.map((product, i) => {
              const localized = localizeProduct(product, locale);
              return (
                <Link key={product.slug} href={`/products/${product.slug}`} className={styles.prodCard}>
                  <div className={styles.prodPhoto}>
                    <Image
                      src={product.image}
                      alt={localized.name}
                      fill
                      sizes="(max-width: 860px) 50vw, 25vw"
                      className={styles.prodImg}
                    />
                  </div>
                  <div className={styles.prodMeta}>
                    <div className={`${styles.prodSku} ${styles.mono}`}>
                      {t("skuLabel")} {product.code ?? String(i + 1).padStart(2, "0")}
                    </div>
                    <div className={styles.prodName}>{localized.name}</div>
                    <div className={styles.prodCat}>{catT(product.category)}</div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* 生产流程 */}
      <section id="process" className={styles.block}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <div className={styles.kicker}>{t("processKicker")}</div>
            <h2>{t("processHeading")}</h2>
          </div>
          <div className={styles.process}>
            {steps.map((step, i) => (
              <div key={step.title} className={styles.pStep}>
                <div className={`${styles.pNum} ${styles.mono}`}>{String(i + 1).padStart(2, "0")}</div>
                <div className={styles.pBody}>
                  <h4>{step.title}</h4>
                  <p>{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 询盘 */}
      <section id="contact" className={`${styles.block} ${styles.contact}`}>
        <div className={styles.wrap}>
          <div className={styles.contactGrid}>
            <div>
              <div className={styles.kicker} style={{ color: "var(--sand)" }}>
                {t("contactKicker")}
              </div>
              <h2>{t("contactHeading")}</h2>
              <p>{t("contactBody")}</p>
              <div className={styles.contactLines}>
                <b>{t("contactEmailLabel")}</b> — info@nancrown.com
                <br />
                <b>{t("contactPhoneLabel")}</b> — +86 20-3123 5916
                <br />
                <b>{t("contactFactoryLabel")}</b> — {t("contactFactoryValue")}
              </div>
            </div>
            <div className={styles.contactFormCard}>
              <ContactForm variant="embedded" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ(放在最后,搜索引擎用得到) */}
      <div className={styles.faqWrap}>
        <FAQ title={faqT("title")} subtitle={faqT("subtitle")} items={faqItems} />
      </div>
    </div>
  );
}
