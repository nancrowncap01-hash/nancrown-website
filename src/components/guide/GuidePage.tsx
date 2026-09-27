import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { GuideBlock, GuideLocaleContent } from "@/lib/guide-content";

// 「指南类」页面(/pricing、/start-a-hat-brand)的共用渲染组件。
// 文案全部来自 src/lib/guide-content.ts,这里只管排版,不新增/修改/润色任何一个字。
//
// guide-content.ts 里 p / list / 表格单元格允许出现 <b>…</b> 加粗,别的尖括号一律当纯文字。
// 用 parseBold() 把 <b>…</b> 拆成 React 节点(<strong>),不用 dangerouslySetInnerHTML。
function parseBold(text: string): ReactNode[] {
  const parts = text.split(/(<b>.*?<\/b>)/g).filter((part) => part.length > 0);
  return parts.map((part, i) => {
    const match = part.match(/^<b>(.*)<\/b>$/);
    if (match) {
      return (
        <strong key={i} className="font-semibold text-gray-900">
          {match[1]}
        </strong>
      );
    }
    return part;
  });
}

// list 项前面的小对勾(跟 /custom/[category] 定制选项列表同一个图标)
function CheckIcon() {
  return (
    <svg
      className="h-5 w-5 text-amber-500 shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  );
}

function renderBlock(block: GuideBlock, i: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={i} className="text-2xl sm:text-3xl font-bold text-gray-900 pt-2">
          {block.text}
        </h2>
      );

    case "p":
      return (
        <p key={i} className="text-gray-600 leading-relaxed">
          {parseBold(block.text)}
        </p>
      );

    case "list":
      return (
        <ul key={i} className="space-y-3">
          {block.items.map((item, ii) => (
            <li key={ii} className="flex items-start gap-3">
              <CheckIcon />
              <span className="text-gray-700 leading-relaxed">{parseBold(item)}</span>
            </li>
          ))}
        </ul>
      );

    case "table":
      return (
        <div key={i}>
          {/* 手机上表格在自己的容器里左右滑,不撑破整页 */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full min-w-[560px] text-sm text-left">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  {block.head.map((h, hi) => (
                    <th key={hi} className="px-4 py-3 font-semibold whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {block.rows.map((row, ri) => (
                  <tr key={ri}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="px-4 py-3 text-gray-700 align-top">
                        {parseBold(cell)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.caption && (
            <p className="mt-2 text-sm text-gray-500">{parseBold(block.caption)}</p>
          )}
        </div>
      );

    case "steps":
      return (
        <div key={i} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {block.items.map((step, si) => (
            <div
              key={si}
              className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-amber-700 font-semibold text-sm mb-3">
                {si + 1}
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>
      );

    default:
      return null;
  }
}

export interface GuidePageProps {
  content: GuideLocaleContent;
  // 面包屑:首页文字 + 当前页短名(不是完整 h1,面包屑放不下)
  homeLabel: string;
  breadcrumbLabel: string;
  // CTA 上方的跳转链接(pricing↔start-a-hat-brand 互链),两页都传,可选
  crossLink?: { href: string; label: string };
}

export default function GuidePage({
  content,
  homeLabel,
  breadcrumbLabel,
  crossLink,
}: GuidePageProps) {
  return (
    <>
      {/* 深色标题区 + 面包屑(风格照 /custom/[category]) */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <nav className="mb-4 text-sm text-gray-400">
            <Link href="/" className="hover:text-amber-400 transition-colors">
              {homeLabel}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{breadcrumbLabel}</span>
          </nav>
          <h1 className="text-3xl sm:text-4xl font-bold leading-tight">{content.h1}</h1>
        </div>
      </section>

      {/* lead */}
      <section className="pt-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <p className="text-lg text-gray-600 leading-relaxed">{content.lead}</p>
        </div>
      </section>

      {/* 正文 blocks */}
      <section className="py-10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
          {content.blocks.map((block, i) => renderBlock(block, i))}
        </div>
      </section>

      {/* FAQ:用原生 <details>/<summary>,答案文字始终在 HTML 里,方便搜索引擎直接读到 */}
      <section className="py-16 bg-gray-50">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-8">
            {content.faqHeading}
          </h2>
          <div className="space-y-3">
            {content.faq.map((item, i) => (
              <details
                key={i}
                className="group border border-gray-200 rounded-xl px-5 py-4 bg-white open:shadow-sm"
              >
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none font-semibold text-gray-900 [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="shrink-0 text-2xl leading-none text-gray-400 group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-gray-600 leading-relaxed">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 互链(CTA 上方):pricing↔start-a-hat-brand */}
      {crossLink && (
        <section className="pt-10 pb-2 text-center">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <Link
              href={crossLink.href}
              className="text-amber-700 font-medium hover:text-amber-800 hover:underline"
            >
              {crossLink.label}
            </Link>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-amber-600 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-3">{content.cta.title}</h2>
          <p className="text-amber-50 mb-6">{content.cta.text}</p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-3.5 text-base font-semibold bg-white text-amber-700 rounded-lg hover:bg-amber-50 transition-colors"
          >
            {content.cta.button}
          </Link>
        </div>
      </section>
    </>
  );
}
