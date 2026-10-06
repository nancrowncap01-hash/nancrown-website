// 首页 A/B 测试配置(共享给 proxy、首页和询盘表单)
//
// 老板已经点头的两版效果图:
//   A = "工厂档案"风格(HomeA)
//   B = "品牌画册"风格(HomeB)
// 默认 50/50 随机分流,访客第一次访问后用 cookie 固定住,后续一直看同一版。
//
// 实现方式:两版各是一张构建时预渲染的静态页(A = [locale]/page.tsx,B = [locale]/home-b/page.tsx),
// 分流只发生在 src/proxy.ts——分到 B 的首页请求被内部改写到 /<语言>/home-b,地址栏不变
// (总开关锁定为 "b" 时也是靠这条改写,所有首页请求都改写过去)。

// 🔴 总开关:以后不想再测、要全站只留一版,改这一行就行,不用动 proxy 或页面代码。
// "split" = 正常 A/B 分流(默认)。"a" / "b" = 全站只渲染这一版,忽略随机和已有 cookie。
export const HOME_AB_MODE: "split" | "a" | "b" = "split";

// 记录分流结果的 cookie 名(询盘表单会读它,标注客户看的是哪一版)
export const HOME_AB_COOKIE = "nc_home";
// cookie 有效期:90 天
export const HOME_AB_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;
// B 版静态页的内部路径(proxy 改写到它;usePathname 也要把它当成首页,见 src/i18n/navigation.ts)
export const HOME_B_PATH = "/home-b";

export type HomeVariant = "a" | "b";

export function isHomeVariant(value: string | undefined | null): value is HomeVariant {
  return value === "a" || value === "b";
}
