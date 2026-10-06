import { NextResponse, type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import {
  HOME_AB_MODE,
  HOME_AB_COOKIE,
  HOME_AB_COOKIE_MAX_AGE_SECONDS,
  HOME_B_PATH,
  isHomeVariant,
  type HomeVariant,
} from "./lib/home-ab";

const intlMiddleware = createMiddleware(routing);

// 四种语言首页的路径:英文默认不带前缀是"/",其余是"/es"、"/fr"、"/de"
// (localePrefix 是 as-needed,所以只在这几个精确路径上做 A/B 分流,子页面不受影响)
const HOME_PATH_RE = /^\/(en|es|fr|de)?\/?$/;

// B 版首页的内部静态页路径(/home-b、/es/home-b……)。只该由下面的改写到达,不许当独立页面被看到
const HOME_B_DIRECT_RE = new RegExp(
  `^/(?:(en|es|fr|de)/)?${HOME_B_PATH.slice(1)}/?$`
);

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

  // 有人直接访问 B 版内部页:跳回对应语言的首页(英文是 "/",其余是 "/es" 等)。
  // 匹配前先还原 %68ome-b 这类转义、合并连续斜杠(next-intl 和路由匹配都会这么处理,不还原就能绕过)
  let readablePathname = pathname;
  try {
    readablePathname = decodeURI(pathname).replace(/\/+/g, "/");
  } catch {
    // 转义不合法就用原值;后面 next-intl 会交给 Next.js 回 400
  }
  const directHomeB = HOME_B_DIRECT_RE.exec(readablePathname);
  if (directHomeB) {
    const url = request.nextUrl.clone();
    const locale = directHomeB[1];
    url.pathname = locale && locale !== routing.defaultLocale ? `/${locale}` : "/";
    return NextResponse.redirect(url);
  }

  if (!HOME_PATH_RE.test(pathname)) {
    return intlMiddleware(request);
  }

  // ?home=a / ?home=b 强制切某一版(老板和我预览用),同时写进 cookie
  const forcedParam = searchParams.get("home");
  const forcedVariant = isHomeVariant(forcedParam) ? forcedParam : null;
  const existingCookie = request.cookies.get(HOME_AB_COOKIE)?.value;
  const existingVariant = isHomeVariant(existingCookie) ? existingCookie : null;

  let variant: HomeVariant;
  let shouldPersistCookie = false;

  if (HOME_AB_MODE !== "split") {
    // 总开关锁定单版本:所有访客看同一版,不再随机、也不看/写 cookie
    variant = HOME_AB_MODE;
  } else if (forcedVariant) {
    variant = forcedVariant;
    shouldPersistCookie = true;
  } else if (existingVariant) {
    variant = existingVariant;
  } else {
    // 第一次访问:50/50 随机分流,所有访客(含搜索引擎爬虫)走同一套逻辑,不做特殊处理
    variant = Math.random() < 0.5 ? "a" : "b";
    shouldPersistCookie = true;
  }

  // 先用原始请求走 next-intl:语言跳转、NEXT_LOCALE cookie、hreflang 的 Link 头都和分流前完全一致
  const intlResponse = intlMiddleware(request);

  let response: NextResponse = intlResponse;

  // 是跳转(如 /en → /、带 Accept-Language 的 / → /es)就原样返回,不改写;
  // 否则分到 B 的请求内部改写到 B 版静态页(浏览器地址栏不变),分到 A 的不动,直接落在 A 版静态页。
  // 总开关锁定为 "b" 时 variant 恒为 "b",所有首页请求都走这条改写(A 版页面本身不带 B 版代码)
  const isRedirect = intlResponse.headers.has("location");
  if (!isRedirect && variant === "b") {
    // 走到这里的只有两种路径:"/"(默认语言,next-intl 内部改写到 /en)和已带前缀的 /es /fr /de
    const locale = HOME_PATH_RE.exec(pathname)?.[1] ?? routing.defaultLocale;
    const target = request.nextUrl.clone();
    target.pathname = `/${locale}${HOME_B_PATH}`;

    // 把 next-intl 响应里的头(Set-Cookie、hreflang 的 Link 头、传给页面的语言请求头)整套带到改写响应上;
    // x-middleware-rewrite 会被 rewrite() 换成新目标,"放行"标记要去掉,免得和改写打架
    const headers = new Headers(intlResponse.headers);
    headers.delete("x-middleware-next");
    response = NextResponse.rewrite(target, { headers });
  }

  // cookie 照旧写在最终响应上(含跳转响应),和分流前的行为一致
  if (shouldPersistCookie) {
    response.cookies.set(HOME_AB_COOKIE, variant, {
      path: "/",
      maxAge: HOME_AB_COOKIE_MAX_AGE_SECONDS,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
