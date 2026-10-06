import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { OrganizationJsonLd } from "@/components/seo/JsonLd";
// Vercel 自带的访问统计:不用 cookie、不用弹同意框;要在 Vercel 项目的 Analytics 里点开才开始记数
import { Analytics } from "@vercel/analytics/next";
// 访客来源追踪(第一次进站记一笔来源,询盘表单提交时带上;详见 src/lib/source-tracking.ts)
import SourceTracker from "@/components/analytics/SourceTracker";

// 构建时把四种语言各预渲染一遍:[locale] 下所有页面因此变成静态页(SSG),不再每次请求现场渲染
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // 告诉 next-intl 当前语言(不然它要去读请求头,整个页面就被判成动态渲染)。
  // 必须在 getMessages() 等 next-intl 调用之前;layout 和每个 page 各自都要调一次
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} className="h-full scroll-smooth">
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="min-h-full flex flex-col bg-white text-gray-900 antialiased">
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <SourceTracker />
        <Analytics />
      </body>
    </html>
  );
}
