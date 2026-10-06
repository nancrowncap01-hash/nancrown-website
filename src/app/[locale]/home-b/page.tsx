import type { Metadata } from "next";
import { use } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import HomeB from "@/components/home/HomeB";

// 首页 B 版的静态页。访客不会直接看到这个地址:
// src/proxy.ts 把分到 B 版的首页请求内部改写到这里(浏览器地址栏仍是 / 、/es 等),
// 直接访问 /home-b、/es/home-b 会被代理层跳回对应语言的首页。不进 sitemap。

// 元数据和首页(../page.tsx)完全一样:canonical 指向首页本身,标题描述相同
// ⚠️ 改首页的元数据要同步改这里
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

export default function HomeBPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // 同步组件里用 use() 取语言,先 setRequestLocale 再渲染用 useTranslations 的 HomeB(静态渲染必需)
  const { locale } = use(params);
  setRequestLocale(locale);
  return <HomeB />;
}
