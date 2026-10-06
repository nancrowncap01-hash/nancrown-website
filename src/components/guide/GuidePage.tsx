import type { ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import type { GuideBlock, GuideLocaleContent } from "@/lib/guide-content";
import { sampleProducts } from "@/lib/sample-data";
import ProductCard from "@/components/products/ProductCard";

// 「指南类」页面(/pricing、/start-a-hat-brand、/solutions/<slug>)的共用渲染组件。
// 文案全部来自 src/lib/guide-content.ts / src/lib/solutions-content.ts,这里只管排版,不新增/修改/润色任何一个字。
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
            {/* 三列及以上才强制最小宽度+表头不换行(窄屏左右滑);两列表格手机上直接收进屏宽,表头和第二列长句自动换行 */}
            <table
              className={`w-full ${block.head.length > 2 ? "min-w-[560px]" : ""} text-sm text-left`}
            >
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  {block.head.map((h, hi) => (
                    <th
                      key={hi}
                      className={`px-4 py-3 font-semibold ${block.head.length > 2 ? "whitespace-nowrap" : ""}`}
                    >
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

// 产品卡片网格(products block):按 slug 从 sample-data 里找产品,找不到的 slug 跳过不报错。
// 内容比其它 block 宽,单独用 max-w-7xl 撑开,不挤在正文的 max-w-3xl 容器里。
function ProductsBlock({ slugs }: { slugs: string[] }) {
  const products = slugs
    .map((slug) => sampleProducts.find((p) => p.slug === slug))
    .filter((p): p is (typeof sampleProducts)[number] => Boolean(p));

  if (products.length === 0) return null;

  return (
    <section className="py-10 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

// 正文 blocks 按 products 类型切段:普通 block 连续段落放进 max-w-3xl 容器(跟以前一样),
// products 段单独渲染成 max-w-7xl 的整宽 section。pricing/start-a-hat-brand 没有 products
// block,永远只有一段,渲染结果跟改动前完全一样。
type BlockSegment =
  | { kind: "normal"; blocks: GuideBlock[]; startIndex: number }
  | { kind: "products"; slugs: string[]; key: number };

function segmentBlocks(blocks: GuideBlock[]): BlockSegment[] {
  const segments: BlockSegment[] = [];
  let current: GuideBlock[] = [];
  let currentStart = 0;

  blocks.forEach((block, i) => {
    if (block.type === "products") {
      if (current.length > 0) {
        segments.push({ kind: "normal", blocks: current, startIndex: currentStart });
        current = [];
      }
      segments.push({ kind: "products", slugs: block.slugs, key: i });
      currentStart = i + 1;
    } else {
      if (current.length === 0) currentStart = i;
      current.push(block);
    }
  });
  if (current.length > 0) {
    segments.push({ kind: "normal", blocks: current, startIndex: currentStart });
  }
  return segments;
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

      {/* 正文 blocks(遇到 products block 单独切成整宽段,其余照旧放进 max-w-3xl 容器) */}
      {segmentBlocks(content.blocks).map((segment) =>
        segment.kind === "products" ? (
          <ProductsBlock key={`products-${segment.key}`} slugs={segment.slugs} />
        ) : (
          <section key={`normal-${segment.startIndex}`} className="py-10">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">
              {segment.blocks.map((block, i) => renderBlock(block, segment.startIndex + i))}
            </div>
          </section>
        )
      )}

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
