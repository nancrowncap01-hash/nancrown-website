import type { Metadata } from "next";
import { routing } from "@/i18n/routing";

// 站点基础常量(SEO 公共工具)
export const SITE_URL = "https://nancrown.com";
export const SITE_NAME = "NanCrown";
// 默认社交分享图(暂用工厂封面,后续可换成专门的 1200x630 OG 图)
export const DEFAULT_OG_IMAGE = "/images/factory-video-cover.jpg";

// 按语言生成完整 URL —— 配合 localePrefix "as-needed"(en 不带前缀,其他带 /es /fr /de)
export function localizedUrl(locale: string, path: string): string {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${SITE_URL}${prefix}${path}`;
}

// 生成 canonical + hreflang(告诉 Google 各语言版本是同一页,避免互相抢排名/给错语言)
export function buildAlternates(locale: string, path: string): Metadata["alternates"] {
  const languages: Record<string, string> = {};
  for (const l of routing.locales) {
    languages[l] = localizedUrl(l, path);
  }
  // x-default: 没有匹配语言时的兜底版本(指向默认英文版)
  languages["x-default"] = localizedUrl(routing.defaultLocale, path);
  return {
    canonical: localizedUrl(locale, path),
    languages,
  };
}

type PageMetaInput = {
  locale: string;
  // 不带 locale 前缀的路径,如 "" / "/products" / "/products/xxx"
  path: string;
  title: string;
  description: string;
  image?: string;
  // 首页这类"标题本身已完整"的页面用 true,跳过 "%s | NanCrown" 模板
  absolute?: boolean;
};

// 统一构造页面级 metadata:独立标题 + 描述 + 多语言关联 + 社交分享卡片
export function pageMetadata({
  locale,
  path,
  title,
  description,
  image = DEFAULT_OG_IMAGE,
  absolute = false,
}: PageMetaInput): Metadata {
  const url = localizedUrl(locale, path);
  const fullTitle = absolute ? title : `${title} | ${SITE_NAME}`;
  const socialLocale = { en: "en_US", es: "es_ES", fr: "fr_FR", de: "de_DE" };
  return {
    // Resolve the brand suffix once, including it in the length budget and social cards.
    title: { absolute: fullTitle },
    description,
    alternates: buildAlternates(locale, path),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      locale: socialLocale[locale as keyof typeof socialLocale],
      alternateLocale: Object.entries(socialLocale).filter(([key]) => key !== locale).map(([, value]) => value),
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [{ url: image, alt: title }],
    },
  };
}

// Search copy only: catalogue names, materials, quantities and other product facts stay intact.
// These short labels retain the distinguishing features without cutting a word or sentence.
const shortProductTitles: Record<string, Partial<Record<string, string>>> = {
  "sunglass-slot-long-brim-sport-cap": {
    de: "Sportcap: langer Schirm, Sonnenbrillenfach",
    es: "Gorra sport: visera larga y ranura para gafas",
    fr: "Casquette sport longue visière porte-lunettes",
  },
  "contrast-piping-outline-letter-cap": {
    es: "Gorra: ribete en contraste y letras de contorno",
  },
  "frayed-edge-denim-bucket-hat": {
    es: "Sombrero de pescador denim de borde deshilachado",
  },
  "corduroy-sherpa-earflap-cap": {
    fr: "Casquette en velours côtelé à oreillettes sherpa",
  },
  "double-zip-brim-cap": {
    fr: "Casquette à visière avec double zip",
  },
  "faux-fur-trim-earflap-cap": {
    fr: "Casquette à oreillettes, bord en fausse fourrure",
  },
  "reflective-print-running-cap": {
    fr: "Casquette running : nylon, imprimé réfléchissant",
  },
};

export function productSearchCopy(locale: string, slug: string, name: string, moq: number) {
  const title = shortProductTitles[slug]?.[locale] ?? name;
  const suffix: Record<string, string> = {
    en: `Customise this style from ${moq} pieces per colour and size. Request a factory quote.`,
    es: `Personaliza este modelo desde ${moq} piezas por color y talla. Solicita una cotización.`,
    fr: `Personnalisez ce modèle dès ${moq} pièces par couleur et taille. Demandez un devis.`,
    de: `Dieses Modell ab ${moq} Stück je Farbe und Größe personalisieren. Angebot anfordern.`,
  };
  return { title, description: `${title}. ${suffix[locale] ?? suffix.en}` };
}
