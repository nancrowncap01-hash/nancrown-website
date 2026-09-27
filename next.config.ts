import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

// 2026-09-11 换上 1688 新款后下架的 6 个旧占位产品:旧链接已被 Google 收录,
// 永久跳到最接近的新款(没有同类的跳产品页),不让它们变成 404
const retiredProducts: Record<string, string> = {
  "trucker-mesh-cap": "/products/tire-stripe-mesh-trucker",
  "cotton-bucket-hat": "/products/contrast-brim-bucket-hat",
  "dad-hat-washed": "/products/serif-wordmark-washed-cap",
  "performance-visor": "/products/sunglass-slot-sport-visor",
  "winter-beanie": "/products",
  "corduroy-baseball-cap": "/products",
  // 同日老板又下架最早的 2 款样品
  "gothic-monogram-baseball-cap": "/products/serif-wordmark-washed-cap",
  "nancrown-logo-baseball-cap": "/products",
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // 省 Vercel 免费档的「图片处理」额度(每月 5000 次,0927 已用一半):
    // 1) 少生成几档宽度:默认 8 档设备宽 + 7 档小图宽,我们产品图最大 1200px,去掉 2048/3840 和用不上的小档
    // 2) 处理好的图缓存 31 天(默认 4 小时,过期要重新处理又扣一次额度)。
    //    ⚠️ 副作用:同一个文件名换了图,最长 31 天才更新 → 换图一律用新文件名
    deviceSizes: [640, 828, 1080, 1200, 1920],
    imageSizes: [128, 256, 384],
    minimumCacheTTL: 2678400,
  },
  async redirects() {
    // 英文默认不带前缀;/en/... 先由 next-intl 去掉前缀再命中第一条
    return Object.entries(retiredProducts).flatMap(([slug, to]) => [
      { source: `/products/${slug}`, destination: to, permanent: true },
      {
        source: `/:locale(es|fr|de)/products/${slug}`,
        destination: `/:locale${to}`,
        permanent: true,
      },
    ]);
  },
};

export default withNextIntl(nextConfig);
