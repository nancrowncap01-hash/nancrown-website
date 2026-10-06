import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { HOME_AB_MODE } from "@/lib/home-ab";

// 首页 A/B 两版共用同一套 SEO 元数据(canonical、标题、描述完全一样,
// 不让搜索引擎因为随机分流看到两份不同内容)
// ⚠️ [locale]/home-b/page.tsx 里有一份一模一样的,改这里要同步改那边
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Seo" });
  return pageMetadata({
    locale,
    path: "",
    title: t("homeTitle"),
    description: t("homeDescription"),
    absolute: true,
  });
}

// 本页是纯静态页(构建时预渲染),不再读请求头/cookie。
// 谁看 A 版谁看 B 版由 src/proxy.ts 分流:分到 B 的请求会被内部改写到 [locale]/home-b(另一张静态页),
// 其余请求(分到 A、或总开关锁定为 "a")都落在这里渲染 A 版。
// 只有总开关 HOME_AB_MODE 锁定为 "b" 时,本页才渲染 B 版(此时代理层不改写)。
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  // 动态 import:只加载要渲染的那版组件(含它自己的字体),
  // 不会把 A、B 两版的字体/代码一起塞进同一个页面里。
  if (HOME_AB_MODE === "b") {
    const { default: HomeB } = await import("@/components/home/HomeB");
    return <HomeB />;
  }
  const { default: HomeA } = await import("@/components/home/HomeA");
  return <HomeA />;
}
