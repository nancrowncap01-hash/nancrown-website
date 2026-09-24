// 首页 A/B 测试配置(共享给 middleware 和首页 Server Component)
//
// 老板已经点头的两版效果图:
//   A = "工厂档案"风格(HomeA)
//   B = "品牌画册"风格(HomeB)
// 默认 50/50 随机分流,访客第一次访问后用 cookie 固定住,后续一直看同一版。

// 🔴 总开关:以后不想再测、要全站只留一版,改这一行就行,不用动 middleware 或页面代码。
// "split" = 正常 A/B 分流(默认)。"a" / "b" = 全站只渲染这一版,忽略随机和已有 cookie。
export const HOME_AB_MODE: "split" | "a" | "b" = "split";

// 记录分流结果的 cookie 名(询盘表单会读它,标注客户看的是哪一版)
export const HOME_AB_COOKIE = "nc_home";
// middleware 传给页面的请求头名(保证第一次访问、cookie 还没写入浏览器时也能渲染对的版本)
export const HOME_AB_HEADER = "x-home-variant";
// cookie 有效期:90 天
export const HOME_AB_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90;

export type HomeVariant = "a" | "b";

export function isHomeVariant(value: string | undefined | null): value is HomeVariant {
  return value === "a" || value === "b";
}
