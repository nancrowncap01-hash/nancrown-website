import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";
import { HOME_B_PATH } from "@/lib/home-ab";

const navigation = createNavigation(routing);

export const { Link, redirect, useRouter, getPathname } = navigation;

// 首页 B 版是 proxy 内部改写到 /<语言>/home-b 的静态页:构建时预渲染的 HTML 里 usePathname 拿到的是
// "/home-b",而浏览器地址栏是 "/"(或 /es 等),两边不一致会让导航高亮错位、水合不一致。
// 所以统一把 "/home-b" 当成 "/"(顺带保证语言切换不会跳到 /es/home-b)。
export function usePathname() {
  const pathname = navigation.usePathname();
  return pathname === HOME_B_PATH ? "/" : pathname;
}
