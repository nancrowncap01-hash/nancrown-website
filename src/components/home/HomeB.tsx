import { Fragment } from "react";
import Image from "next/image";
import { Cormorant_Garamond } from "next/font/google";
import { inter } from "@/lib/fonts";
import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { sampleProducts, categories } from "@/lib/sample-data";
import { localizeProduct } from "@/lib/product-i18n";
import FAQ from "@/components/FAQ";
import styles from "./HomeB.module.css";

// B 版「品牌画册」用到的两款字体,只在这个组件里生效(不影响全站)
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});


// 精选系列展示前 9 款(另一个助手往 sampleProducts 加新款时这里会自动跟着显示)
const PRODUCT_COUNT = 9;

type Step = { numeral: string; title: string; body: string };

export default function HomeB() {
  const t = useTranslations("HomeB");
  const catT = useTranslations("Categories");
  const faqT = useTranslations("FAQ");
  const locale = useLocale();

  const creds = t.raw("creds") as string[];
  const steps = t.raw("steps") as Step[];
  const stylesList = categories.map((c) => catT(c));

  const faqItems = [1, 2, 3, 4, 5, 6].map((n) => ({
    question: faqT(`q${n}`),
    answer: faqT(`a${n}`),
  }));

  const featured = sampleProducts.slice(0, PRODUCT_COUNT);
  const heroProduct = localizeProduct(sampleProducts[0], locale);

  return (
    <div className={`${styles.root} ${cormorant.variable} ${inter.variable}`}>
      {/* 首屏 */}
      <section className={styles.hero}>
        <div className={`${styles.wrap} ${styles.heroGrid}`}>
          <div>
            <div className={`${styles.heroEyebrow} ${styles.sc}`}>{t("eyebrow")}</div>
            <h1 className={`${styles.heroTitle} ${styles.serif}`}>
              {t("titlePrefix")}
              <br />
              {t("titleMid")}
              <em>{t("titleEmphasis")}</em>
              {t("titleSuffix")}
            </h1>
            <p className={styles.heroLead}>{t("lead")}</p>
            <a href="#contact" className={styles.inquire}>
              {t("inquireCta")} <span>→</span>
            </a>
          </div>
          <div className={styles.heroPhoto}>
            <Image
              src={sampleProducts[0].image}
              alt={heroProduct.name}
              fill
              priority
              sizes="(max-width: 860px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* 资质一行 */}
      <div className={styles.creds}>
        <div className={styles.credsLine}>
          {creds.map((c, i) => (
            <Fragment key={c}>
              <span>{c}</span>
              {i < creds.length - 1 && <span className={styles.credsSep}>·</span>}
            </Fragment>
          ))}
        </div>
      </div>

      {/* 产能介绍 */}
      <section id="capability" className={styles.block}>
        <div className={styles.wrap}>
          <div className={styles.capGrid}>
            <div className={styles.capPhoto}>
              <Image
                src="/images/factory-video-cover.jpg"
                alt=""
                fill
                sizes="(max-width: 860px) 100vw, 45vw"
              />
            </div>
            <div className={styles.capText}>
              <div className={`${styles.numLabel} ${styles.serif}`}>{t("capabilityLabel")}</div>
              <h2 className={`${styles.blockTitle} ${styles.serif}`}>{t("capabilityHeading")}</h2>
              <p>{t.rich("capabilityP1", { b: (chunks) => <b>{chunks}</b> })}</p>
              <p>{t.rich("capabilityP2", { b: (chunks) => <b>{chunks}</b> })}</p>
              <div className={styles.styleTags}>
                <span className={styles.sc}>{t("stylesLabel")}</span>
                <div className={`${styles.styleTagsList} ${styles.serif}`}>
                  {stylesList.map((name, i) => (
                    <Fragment key={name}>
                      {name}
                      {i < stylesList.length - 1 && <span className={styles.styleTagsDot}>·</span>}
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 精选系列 */}
      <section id="collection" className={styles.block} style={{ paddingTop: 0 }}>
        <div className={styles.wrap}>
          <div className={styles.collHead}>
            <div>
              <div className={`${styles.numLabel} ${styles.serif}`}>{t("collectionLabel")}</div>
              <h2 className={`${styles.blockTitle} ${styles.serif}`} style={{ marginBottom: 0 }}>
                {t("collectionHeadingLine1")}
                <br />
                {t("collectionHeadingLine2")}
              </h2>
            </div>
            <div className={`${styles.sc} ${styles.collNote}`}>{t("collectionNote")}</div>
          </div>
          <div className={styles.collGrid}>
            {featured.map((product, i) => {
              const localized = localizeProduct(product, locale);
              return (
                <Link key={product.slug} href={`/products/${product.slug}`} className={styles.collItem}>
                  <div className={styles.collPhoto}>
                    <Image
                      src={product.image}
                      alt={localized.name}
                      fill
                      sizes="(max-width: 860px) 50vw, 33vw"
                    />
                  </div>
                  <div className={styles.collCap}>
                    <div className={`${styles.collNo} ${styles.serif}`}>
                      No. {String(i + 1).padStart(2, "0")}
                    </div>
                    <div className={styles.collName}>{localized.name}</div>
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
          <div className={`${styles.numLabel} ${styles.serif}`}>{t("processLabel")}</div>
          <h2 className={`${styles.blockTitle} ${styles.serif}`}>{t("processHeading")}</h2>
          <div className={styles.procGrid}>
            {steps.map((step) => (
              <div key={step.numeral} className={styles.procStep}>
                <div className={`${styles.procNum} ${styles.serif}`}>{step.numeral}</div>
                <h4>{step.title}</h4>
                <p>{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 询盘(照稿子放链接,不嵌表单) */}
      <section id="contact" className={styles.contact}>
        <div className={styles.wrap}>
          <h2 className={styles.serif}>
            {t("contactHeadingLine1")}
            <br />
            {t("contactHeadingLine2")}
          </h2>
          <Link href="/contact" className={`${styles.inquire} ${styles.contactInquire}`}>
            {t("contactCta")} <span>→</span>
          </Link>
          <div className={styles.contactMeta}>
            <div>{t("contactEmail")}</div>
            <div>{t("contactPhone")}</div>
            <div>{t("contactLocation")}</div>
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
