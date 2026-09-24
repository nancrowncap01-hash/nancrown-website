import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import { getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import {
  HOME_AB_MODE,
  HOME_AB_HEADER,
  HOME_AB_COOKIE,
  isHomeVariant,
  type HomeVariant,
} from "@/lib/home-ab";

// 首页 A/B 两版共用同一套 SEO 元数据(canonical、标题、描述完全一样,
// 不让搜索引擎因为随机分流看到两份不同内容)
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

// 决定这次请求渲染 A 版还是 B 版:
// 1. 总开关锁定单版本(HOME_AB_MODE !== "split")时,不看请求头/cookie,直接用锁定的那版。
// 2. 否则优先看 middleware 写进请求头的结果(保证第一次访问、cookie 还没生效时也对)。
// 3. 请求头缺失时兜底看 cookie(理论上不会走到,matcher 已覆盖所有页面路径)。
async function resolveHomeVariant(): Promise<HomeVariant> {
  if (HOME_AB_MODE !== "split") {
    return HOME_AB_MODE;
  }
  const headerList = await headers();
  const headerVariant = headerList.get(HOME_AB_HEADER);
  if (isHomeVariant(headerVariant)) {
    return headerVariant;
  }
  const cookieStore = await cookies();
  const cookieVariant = cookieStore.get(HOME_AB_COOKIE)?.value;
  if (isHomeVariant(cookieVariant)) {
    return cookieVariant;
  }
  return "a";
}

export default async function HomePage() {
  const variant = await resolveHomeVariant();

  // 动态 import:只加载这次要渲染的那版组件(含它自己的字体),
  // 不会把 A、B 两版的字体/代码一起塞进同一个响应里。
  if (variant === "b") {
    const { default: HomeB } = await import("@/components/home/HomeB");
    return <HomeB />;
  }
  const { default: HomeA } = await import("@/components/home/HomeA");
  return <HomeA />;
}
