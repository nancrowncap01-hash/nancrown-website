// 访客来源追踪(首触归因:只记"第一次从哪来",以后再访问不覆盖)
//
// 用在两处:
// 1. 浏览器端(SourceTracker 组件 + ContactForm 提交时读取)—— captureFirstTouchSource / readStoredSource
// 2. 服务器端(询盘接口 /api/inquiry)—— classifySource,把域名/utm 翻成人看得懂的标签(重点识别 AI 来源)
//
// 这个文件两边都会被 import,所以浏览器专属的函数(读 localStorage/cookie/document)
// 一律先判断 typeof window === "undefined" 直接短路,服务器端 import 不会报错、也不会跑起来。

export const SOURCE_STORAGE_KEY = "nc_src";
const SOURCE_COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 90; // 90 天兜底
// 浏览器存储可能用不了:内存里留一份,当前页面和站内跳转还能带上首次来源
let memorySource: SourceData | null = null;

export type SourceData = {
  referrer: string; // 来源网站域名(已去掉 www,自家域名 nancrown.com 不算"来源")
  referrerPath: string; // 来源页面的路径(目前只用来区分 bing.com/chat 这种,其余场景用不上)
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  landingPage: string; // 访客第一次落地的页面路径
  firstVisit: string; // 第一次访问的 ISO 时间戳
};

const EMPTY_SOURCE: SourceData = {
  referrer: "",
  referrerPath: "",
  utmSource: "",
  utmMedium: "",
  utmCampaign: "",
  landingPage: "",
  firstVisit: "",
};

// 自家域名,来路是这些就不算"外部来源"
const OWN_HOSTS = ["nancrown.com"];

function isOwnHost(host: string): boolean {
  const h = host.toLowerCase().replace(/^www\./, "");
  return OWN_HOSTS.some((own) => h === own || h.endsWith(`.${own}`));
}

function readCookieRaw(name: string): string | null {
  if (typeof document === "undefined") return null;
  try {
    const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
    return match ? decodeURIComponent(match[1]) : null;
  } catch {
    return null; // cookie 被禁或内容编码坏了,都不能挡住表单提交
  }
}

function writeCookieRaw(name: string, value: string, maxAgeSeconds: number): void {
  if (typeof document === "undefined") return;
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeSeconds}; SameSite=Lax`;
  } catch {
    // 存不进去也没关系,内存里还有一份
  }
}

function parseSource(json: string | null): SourceData | null {
  if (!json) return null;
  try {
    const parsed = JSON.parse(json);
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed) &&
        Object.keys(EMPTY_SOURCE).every((key) => typeof parsed[key] === "string") &&
        parsed.landingPage.startsWith("/") && Number.isFinite(Date.parse(parsed.firstVisit))) {
      // 只保留约定的来源字段,多余内容不带
      return Object.fromEntries(Object.keys(EMPTY_SOURCE).map((key) => [key, parsed[key]])) as SourceData;
    }
  } catch {
    // 存的内容损坏了,当没存过处理
  }
  return null;
}

// 记录"访客第一次从哪来"。已经记过(localStorage 或 cookie 任一有)就什么都不做——
// 这样保证是"首触"而不是"最近一次"。
export function captureFirstTouchSource(): void {
  if (typeof window === "undefined") return;

  const existing = readStoredSource();
  if (existing) {
    memorySource = existing;
    try {
      // 用 cookie 那份补回 localStorage;读 localStorage 报错时也不影响
      const json = JSON.stringify(existing);
      if (window.localStorage.getItem(SOURCE_STORAGE_KEY) !== json) {
        window.localStorage.setItem(SOURCE_STORAGE_KEY, json);
      }
    } catch { /* 存不进去不影响提交 */ }
    return;
  }

  // 真·第一次:采集这次访问的来源信息
  let referrer = "";
  let referrerPath = "";
  try {
    if (document.referrer) {
      const url = new URL(document.referrer);
      if (!isOwnHost(url.hostname)) {
        referrer = url.hostname.replace(/^www\./, "").toLowerCase();
        referrerPath = url.pathname;
      }
    }
  } catch {
    // referrer 不是合法 URL,忽略
  }

  let params: URLSearchParams;
  try {
    params = new URLSearchParams(window.location.search);
  } catch {
    params = new URLSearchParams();
  }

  const data: SourceData = {
    referrer,
    referrerPath,
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    landingPage: window.location.pathname,
    firstVisit: new Date().toISOString(),
  };

  memorySource = data;
  const json = JSON.stringify(data);
  try {
    window.localStorage.setItem(SOURCE_STORAGE_KEY, json);
  } catch {
    // 存不了就算了(隐私模式常见),下面 cookie 兜底还能存一份
  }
  writeCookieRaw(SOURCE_STORAGE_KEY, json, SOURCE_COOKIE_MAX_AGE_SECONDS);
}

// 表单提交时读出"第一次从哪来"的记录;两边都读不到就返回 null
export function readStoredSource(): SourceData | null {
  if (typeof window === "undefined") return null;
  try {
    const local = window.localStorage.getItem(SOURCE_STORAGE_KEY);
    const parsed = parseSource(local);
    if (parsed) return parsed;
  } catch {
    // ignore
  }
  return parseSource(readCookieRaw(SOURCE_STORAGE_KEY)) ?? memorySource;
}

export type SourceClassification = {
  label: string;
  isAI: boolean;
};

// 把 referrer 域名 / utm_source 翻成人看得懂的标签,重点识别几个主流 AI 助手来源。
// 纯字符串判断,不碰 DOM,服务器端(询盘接口)放心用。
export function classifySource(
  referrer: string,
  referrerPath: string,
  utmSource: string
): SourceClassification {
  const host = (referrer || "").toLowerCase().replace(/^www\./, "");
  const path = (referrerPath || "").toLowerCase();
  const utm = (utmSource || "").toLowerCase();

  const aiRules: Array<{ label: string; test: () => boolean }> = [
    {
      label: "ChatGPT",
      test: () => host === "chatgpt.com" || host === "chat.openai.com" || utm === "chatgpt.com",
    },
    {
      label: "Perplexity",
      test: () => host === "perplexity.ai" || host.endsWith(".perplexity.ai") || utm === "perplexity.ai",
    },
    {
      label: "Gemini",
      test: () => host === "gemini.google.com" || utm === "gemini.google.com",
    },
    {
      label: "Copilot",
      test: () =>
        host === "copilot.microsoft.com" ||
        utm === "copilot.microsoft.com" ||
        (host === "bing.com" && path.startsWith("/chat")),
    },
    {
      label: "Claude",
      test: () => host === "claude.ai" || utm === "claude.ai",
    },
  ];

  for (const rule of aiRules) {
    if (rule.test()) return { label: rule.label, isAI: true };
  }

  // google.com / google.co.uk / google.de 等各国域名统一算"Google search"
  if (/^google\.[a-z.]+$/.test(host)) return { label: "Google search", isAI: false };
  if (host === "bing.com") return { label: "Bing search", isAI: false };

  if (host) return { label: referrer, isAI: false }; // 其它域名原样显示
  if (utmSource) return { label: utmSource, isAI: false }; // 只有 utm_source,没有 referrer(比如邮件/短链)
  return { label: "Direct / unknown", isAI: false };
}
