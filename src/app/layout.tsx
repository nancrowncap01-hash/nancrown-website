import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  // 让所有相对 URL(og 图/canonical/hreflang)能自动补全成完整地址
  metadataBase: new URL("https://nancrown.com"),
  title: {
    default: "Premium Custom Headwear Manufacturer | NanCrown",
    template: "%s | NanCrown",
  },
  description:
    "Custom caps and hats from our own factories in Guangzhou and Dongguan, China. From 50 pieces per style, colour and size. Samples in 7–15 days.",
  keywords: [
    "custom hats",
    "hat manufacturer",
    "baseball caps",
    "bucket hats",
    "snapbacks",
    "custom headwear",
    "hat factory",
    "OEM hats",
    "custom hat manufacturer china",
    "wholesale caps supplier",
    "low MOQ custom caps",
    "embroidered baseball cap factory",
  ],
  // 社交分享卡片底子(各页面会覆盖标题/描述/图)
  openGraph: {
    siteName: "NanCrown",
    type: "website",
    locale: "en_US",
    images: [{ url: "/images/factory-video-cover.jpg" }],
  },
  twitter: {
    card: "summary_large_image",
  },
  // 明确允许搜索引擎收录,并放开图片大图预览(提升搜索结果展示)
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
