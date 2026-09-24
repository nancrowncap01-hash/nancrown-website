import { Inter } from "next/font/google";

// Inter 全站只声明这一次:根布局和首页 B 版都从这里取。
// 两处各自声明、配置又不一样时,Vercel 上 Turbopack 打包会报
// "next/font/google queries have exactly one entry"(本机打包反而能过)。
// 配置沿用正式站一直在用、Vercel 上验证过的这份(不写 weight = 可变字重,300~600 都有)。
export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});
