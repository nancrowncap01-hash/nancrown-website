"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { sampleProducts, categories } from "@/lib/sample-data";
import ProductCard from "@/components/products/ProductCard";
import { localizeProduct } from "@/lib/product-i18n";

export default function ProductsClient() {
  const t = useTranslations("Products");
  const catT = useTranslations("Categories");
  const locale = useLocale();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const chipsRef = useRef<HTMLDivElement>(null);

  // 首页帽型卡片带 ?category= 跳转过来时,读网址参数自动筛选
  // 不用 useSearchParams,避免 Next 16 要求包 Suspense
  // window 在服务端渲染时不存在,只能挂载后在 effect 里读、再 setState;
  // 故意不挪成 useState 的惰性初始值写法——那样服务端/客户端首次渲染结果会对不上,导致 hydration 报错
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get("category");
    if (cat && categories.includes(cat)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 见上方注释:必须挂载后读 window 才能拿到 category
      setSelectedCategory(cat);
    }
  }, []);

  // 手机上帽型按钮是一条可左右滑的横排:选中的那个(比如带 ?category= 进来、排在最后的冬帽)要滑到看得见的位置
  // 电脑上按钮自动换行、容器不能滑,这段不起作用
  useEffect(() => {
    const box = chipsRef.current;
    const active = box?.querySelector<HTMLElement>('[aria-pressed="true"]');
    if (!box || !active) return;
    box.scrollTo({
      left: active.offsetLeft - (box.clientWidth - active.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [selectedCategory]);

  const filteredProducts = useMemo(() => {
    const query = search.trim().toLowerCase();
    return sampleProducts.filter((p) => {
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      // 同时匹配英文原文和当前语言本地化后的名称/面料,避免翻译后搜不到
      const localized = localizeProduct(p, locale);
      const matchesSearch =
        p.name.toLowerCase().includes(query) ||
        p.material.toLowerCase().includes(query) ||
        localized.name.toLowerCase().includes(query) ||
        localized.material.toLowerCase().includes(query);
      return matchesSearch;
    });
  }, [selectedCategory, search, locale]);

  return (
    <>
      {/* Page Header */}
      <section className="bg-gray-900 text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-bold">{t("title")}</h1>
          <p className="mt-2 text-gray-400 text-lg">{t("subtitle")}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Filters:搜索框单独占一行,帽型按钮排在下面。
              以前两者并排,帽型加到 9 个后按钮把搜索框挤成 58px 的小方块、放大镜也跟着错位。
              手机上按钮排成一行左右滑(原来换成 4–5 行,产品被挤到一屏以外),平板/电脑照常换行 */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Search */}
            <div className="relative w-full max-w-md">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                />
              </svg>
              <input
                type="search"
                aria-label={t("search")}
                placeholder={t("search")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div
              ref={chipsRef}
              className="relative -mx-4 px-4 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible"
            >
              <button
                onClick={() => setSelectedCategory(null)}
                aria-pressed={!selectedCategory}
                className={`shrink-0 whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  !selectedCategory
                    ? "bg-amber-600 text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {t("allCategories")}
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`shrink-0 whitespace-nowrap px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    selectedCategory === cat
                      ? "bg-amber-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {catT(cat)}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p>{t("noProducts")}</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
