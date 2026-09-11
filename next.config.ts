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
};

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
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
