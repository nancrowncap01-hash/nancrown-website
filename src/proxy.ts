import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import {
  HOME_AB_MODE,
  HOME_AB_COOKIE,
  HOME_AB_HEADER,
  HOME_AB_COOKIE_MAX_AGE_SECONDS,
  isHomeVariant,
  type HomeVariant,
} from "./lib/home-ab";

const intlMiddleware = createMiddleware(routing);

// 四种语言首页的路径:英文默认不带前缀是"/",其余是"/es"、"/fr"、"/de"
// (localePrefix 是 as-needed,所以只在这几个精确路径上做 A/B 分流,子页面不受影响)
const HOME_PATH_RE = /^\/(en|es|fr|de)?\/?$/;

export function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;

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

  // 把分流结果写进请求头,传给下游的 Server Component——
  // 这样哪怕浏览器这次请求里还没带上 cookie(第一次访问/刚强制切换),也能一次性渲染对的版本。
  // next-intl 的 createMiddleware 内部会用 `new Headers(request.headers)` 克隆请求头,
  // 所以这里直接在传给它之前把自定义请求头写进 request.headers 即可一并带过去。
  request.headers.set(HOME_AB_HEADER, variant);

  const response = intlMiddleware(request);

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
