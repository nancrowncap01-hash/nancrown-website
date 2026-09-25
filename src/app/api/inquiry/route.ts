import { NextRequest, NextResponse } from "next/server";
import { classifySource } from "@/lib/source-tracking";

// 把客户填的字段转义一下,拼进邮件 HTML 时不会被当成标签解析
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// 字段太长的话(恶意提交/复制粘贴出错)截断一下,邮件不至于被撑爆
function truncate(value: string, maxLength = 300): string {
  const v = value ?? "";
  return v.length > maxLength ? `${v.slice(0, maxLength)}…` : v;
}

// "怎么找到我们的"下拉选项 → 邮件里显示的英文文案(邮件固定英文,跟表格其它行一致)
const FOUND_VIA_LABELS: Record<string, string> = {
  chatgpt: "ChatGPT",
  other_ai: "Other AI assistant (Perplexity, Gemini, Claude...)",
  google: "Google search",
  alibaba_1688: "Alibaba or 1688",
  instagram: "Instagram",
  tiktok: "TikTok",
  referral: "Referral from a friend",
  other: "Other",
};

// 附件限制:最多 3 个、只收这几种、合计不超过 4MB
// (Vercel 无服务器函数请求体上限 4.5MB,留点余量给其它表单字段)
const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp", "application/pdf"];

function getExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  return idx === -1 ? "" : filename.slice(idx).toLowerCase();
}

// 后缀必须在白名单里;浏览器/系统给了 MIME 的话顺手核对一下(防止真实类型和后缀对不上),
// 没给 MIME(有些工具/curl 测试不带)就只信后缀
function isAllowedFile(file: File): boolean {
  const ext = getExtension(file.name || "");
  if (!ALLOWED_EXTENSIONS.includes(ext)) return false;
  const mime = (file.type || "").toLowerCase();
  if (mime && !ALLOWED_MIME_TYPES.includes(mime)) return false;
  return true;
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  return `${(bytes / 1024).toFixed(0)} KB`;
}

export async function POST(request: NextRequest) {
  let formData: FormData;
  try {
    formData = await request.formData();
  } catch (error) {
    console.error("Inquiry request is not valid form data:", error);
    return NextResponse.json({ error: "invalid_request", code: "invalid_form_data" }, { status: 400 });
  }

  const strField = (key: string): string => {
    const v = formData.get(key);
    return typeof v === "string" ? v : "";
  };

  const name = strField("name");
  const email = strField("email");
  const company = strField("company");
  const country = strField("country");
  const product = strField("product");
  const quantity = strField("quantity");
  const message = strField("message");
  const homeVersion = strField("homeVersion");
  const foundVia = strField("foundVia");
  // 防机器人暗格:真人看不见也点不到,正常情况下应该一直是空的
  const honeypotValue = strField("nc_hp");

  // 访客来源追踪字段(选填,见 src/lib/source-tracking.ts,ContactForm 提交时从 localStorage/cookie 带上来)
  const srcReferrer = strField("srcReferrer");
  const srcReferrerPath = strField("srcReferrerPath");
  const srcUtmSource = strField("srcUtmSource");
  const srcUtmMedium = strField("srcUtmMedium");
  const srcUtmCampaign = strField("srcUtmCampaign");
  const srcLandingPage = strField("srcLandingPage");
  const srcFirstVisit = strField("srcFirstVisit");

  // 首页 A/B 测试标记:只认 "a" / "b",别的一律显示 "—"(没经过首页,或单版模式下没写 cookie)
  const rawHomeVersion = homeVersion.toLowerCase();
  const homeVersionLabel = rawHomeVersion === "a" ? "A" : rawHomeVersion === "b" ? "B" : "—";

  if (!name || !email || !product || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // 设计图附件(选填):最多 3 个、只收几种常见格式、合计 ≤ 4MB
  const rawFiles = formData
    .getAll("attachments")
    .filter((entry): entry is File => entry instanceof File && entry.size > 0);

  if (rawFiles.length > MAX_FILES) {
    return NextResponse.json(
      {
        error: "too_many_files",
        code: "too_many_files",
        message: `You can attach up to ${MAX_FILES} files.`,
      },
      { status: 400 }
    );
  }

  for (const file of rawFiles) {
    if (!isAllowedFile(file)) {
      return NextResponse.json(
        {
          error: "invalid_file_type",
          code: "invalid_file_type",
          message: `Unsupported file type: ${file.name}. Please use JPG, PNG, WEBP or PDF.`,
        },
        { status: 400 }
      );
    }
  }

  const totalAttachmentBytes = rawFiles.reduce((sum, file) => sum + file.size, 0);
  if (totalAttachmentBytes > MAX_TOTAL_BYTES) {
    return NextResponse.json(
      {
        error: "attachment_too_large",
        code: "attachment_too_large",
        message: "Attachments exceed the 4MB total limit.",
      },
      { status: 400 }
    );
  }

  const attachmentSummaries = rawFiles.map((file) => ({ filename: file.name, size: file.size }));

  // 老板 0925 拍板:暗格被填了也照常发邮件(怕客户用 AI 代发的正常询盘被误拦),
  // 只在标题末尾加提示 + 表格里加一行"Bot check",不再假装成功、不再拦截发信
  const isBotSuspect = honeypotValue.trim().length > 0;

  const sourceClassification = classifySource(srcReferrer, srcReferrerPath, srcUtmSource);
  const cameFromDisplay = sourceClassification.isAI
    ? `${sourceClassification.label} (AI)`
    : sourceClassification.label;

  const utmDisplay =
    [
      srcUtmSource ? `utm_source=${srcUtmSource}` : "",
      srcUtmMedium ? `utm_medium=${srcUtmMedium}` : "",
      srcUtmCampaign ? `utm_campaign=${srcUtmCampaign}` : "",
    ]
      .filter(Boolean)
      .join(" · ") || "N/A";

  const foundViaDisplay = foundVia && FOUND_VIA_LABELS[foundVia] ? FOUND_VIA_LABELS[foundVia] : "N/A";

  const attachmentsDisplay = attachmentSummaries.length
    ? attachmentSummaries
        .map((a) => `${escapeHtml(truncate(a.filename, 300))} (${formatBytes(a.size)})`)
        .join("<br/>")
    : "N/A";

  const botCheckDisplay = isBotSuspect
    ? "⚠️ hidden field was filled — possibly a spam bot, please check"
    : "passed";

  const resendApiKey = process.env.RESEND_API_KEY;
  // 询盘固定发到公司邮箱。Vercel 上的 NOTIFY_EMAIL 填成了 nancrowncap@gmail.com(少了 01,不是在用的邮箱),所以不再读它
  const notifyEmail = "info@nancrown.com";

  // 标题前缀【官网询盘】不能动(老板靠它搜邮件);暗格被填了在末尾加提示,不改开头
  // 名字/产品在标题里限长并去掉换行,防止超长或带换行的输入把标题撑爆
  const subjectPart = (v: string, n: number) => truncate(v.replace(/[\r\n]+/g, " ").trim(), n);
  const subject = `【官网询盘】New Inquiry from ${subjectPart(name, 80)} - ${subjectPart(product, 40)}${isBotSuspect ? " (possible bot)" : ""}`;

  const html = `
        <h2>New Customer Inquiry</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(name))}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(email))}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(company) || "N/A")}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Country</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(country) || "N/A")}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Product Interest</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(product))}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Quantity</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(quantity) || "N/A")}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(message, 20000))}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Told us they found us via</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(foundViaDisplay)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Attachments</td><td style="padding: 8px; border: 1px solid #ddd;">${attachmentsDisplay}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Came from</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(cameFromDisplay))}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Referrer</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(srcReferrer) || "N/A")}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">UTM</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(utmDisplay))}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">First landing page</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(srcLandingPage) || "N/A")}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">First visit</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(truncate(srcFirstVisit) || "N/A")}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Bot check</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(botCheckDisplay)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Homepage version</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(homeVersionLabel)}</td></tr>
        </table>
      `;

  // 测试专用"只演练不发信"开关:线上不设这个环境变量,不影响正常发信
  if (process.env.INQUIRY_DRY_RUN === "1") {
    return NextResponse.json({
      success: true,
      dryRun: true,
      wouldSend: {
        to: notifyEmail,
        subject,
        html,
        attachments: attachmentSummaries,
      },
    });
  }

  // 没配 Resend API Key,邮件根本发不出去,不能再假装发送成功
  if (!resendApiKey) {
    console.error("Inquiry email not sent: RESEND_API_KEY is not configured", { name, email, product });
    return NextResponse.json(
      { error: "send_failed", code: "not_configured" },
      { status: 502 }
    );
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);

    const attachments = rawFiles.length
      ? await Promise.all(
          rawFiles.map(async (file) => ({
            filename: file.name,
            content: Buffer.from(await file.arrayBuffer()),
          }))
        )
      : undefined;

    const { data, error } = await resend.emails.send({
      // 用在 Resend 验证过的子域名 notify.nancrown.com 发信(测试通道 onboarding@resend.dev 只能发给注册 Resend 的那个邮箱)
      // 用子域名:不碰主域名的收信设置,也不会被公司邮箱当成「冒充本域」拦掉
      from: "NanCrown Website <inquiry@notify.nancrown.com>",
      to: [notifyEmail],
      replyTo: email,
      subject,
      html,
      attachments,
    });

    if (error) {
      console.error("Failed to send inquiry email:", error);
      return NextResponse.json(
        { error: "send_failed", code: error.name },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error("Unexpected error sending inquiry email:", error);
    return NextResponse.json(
      { error: "send_failed", code: "exception" },
      { status: 502 }
    );
  }
}
