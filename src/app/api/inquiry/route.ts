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

// ============ 客户自动回执(询盘确认信)============
// 支持的语言;表单带上来的 locale 不在这四个里就一律当 en
type ConfirmLocale = "en" | "es" | "fr" | "de";
const SUPPORTED_LOCALES: readonly ConfirmLocale[] = ["en", "es", "fr", "de"];

function resolveConfirmLocale(raw: string): ConfirmLocale {
  const v = raw.trim().toLowerCase();
  return (SUPPORTED_LOCALES as readonly string[]).includes(v) ? (v as ConfirmLocale) : "en";
}

// 报价页链接按语言分开
const PRICING_URLS: Record<ConfirmLocale, string> = {
  en: "https://nancrown.com/pricing",
  es: "https://nancrown.com/es/pricing",
  fr: "https://nancrown.com/fr/pricing",
  de: "https://nancrown.com/de/pricing",
};

// 确认信标题(四语言,老板给的文案原样)
const CONFIRMATION_SUBJECTS: Record<ConfirmLocale, string> = {
  en: "We received your inquiry – NanCrown Caps",
  es: "Hemos recibido su consulta – NanCrown Caps",
  fr: "Nous avons bien reçu votre demande – NanCrown Caps",
  de: "Wir haben Ihre Anfrage erhalten – NanCrown Caps",
};

type ConfirmationBodyParams = {
  name: string;
  product: string;
  quantity: string;
  pricingUrl: string;
};

// 确认信正文(四语言,老板给的文案原样,一字不改,只替换占位符)
const CONFIRMATION_BODY_TEMPLATES: Record<ConfirmLocale, (p: ConfirmationBodyParams) => string> = {
  en: ({ name, product, quantity, pricingUrl }) => `Hi ${name},

Thank you for contacting NanCrown. This is an automatic confirmation that your inquiry has reached our sales team.

Carrie from our sales team will reply personally within one business day (Guangzhou time, GMT+8) with questions or a quote.

To get an accurate quote faster, you can reply to this email with:
- your logo or design file (AI, PDF or PNG)
- the quantity per style and per colour
- the colours you need
- your delivery country

Indicative prices, minimum order and lead times: ${pricingUrl}

Your inquiry:
Product: ${product}
Quantity: ${quantity}

Best regards,
NanCrown Caps
Guangzhou, China
info@nancrown.com`,
  es: ({ name, product, quantity, pricingUrl }) => `Hola, ${name}:

Gracias por contactar con NanCrown. Este es un mensaje automático para confirmarle que su consulta ha llegado a nuestro equipo de ventas.

Carrie, de nuestro equipo de ventas, le responderá personalmente en un plazo de un día laborable (hora de Cantón, GMT+8) con preguntas o un presupuesto.

Para recibir un presupuesto exacto más rápido, puede responder a este correo con:
- el archivo de su logo o diseño (AI, PDF o PNG)
- la cantidad por modelo y por color
- los colores que necesita
- el país de entrega

Precios orientativos, pedido mínimo y plazos: ${pricingUrl}

Su consulta:
Producto: ${product}
Cantidad: ${quantity}

Saludos cordiales,
NanCrown Caps
Cantón (Guangzhou), China
info@nancrown.com`,
  fr: ({ name, product, quantity, pricingUrl }) => `Bonjour ${name},

Merci d'avoir contacté NanCrown. Ceci est une confirmation automatique : votre demande est bien arrivée à notre équipe commerciale.

Carrie, de notre équipe commerciale, vous répondra personnellement sous un jour ouvré (heure de Canton, GMT+8) avec ses questions ou un devis.

Pour obtenir un devis précis plus rapidement, vous pouvez répondre à cet e-mail en joignant :
- votre logo ou fichier de design (AI, PDF ou PNG)
- la quantité par modèle et par couleur
- les couleurs souhaitées
- le pays de livraison

Prix indicatifs, minimum de commande et délais : ${pricingUrl}

Votre demande :
Produit : ${product}
Quantité : ${quantity}

Cordialement,
NanCrown Caps
Canton (Guangzhou), Chine
info@nancrown.com`,
  de: ({ name, product, quantity, pricingUrl }) => `Hallo ${name},

vielen Dank für Ihre Anfrage bei NanCrown. Dies ist eine automatische Bestätigung: Ihre Anfrage ist bei unserem Vertriebsteam angekommen.

Carrie aus unserem Vertriebsteam antwortet Ihnen persönlich innerhalb eines Werktags (Ortszeit Guangzhou, GMT+8) mit Rückfragen oder einem Angebot.

Für ein genaues Angebot können Sie einfach auf diese E-Mail antworten und Folgendes mitschicken:
- Ihr Logo oder Ihre Designdatei (AI, PDF oder PNG)
- die Menge pro Modell und pro Farbe
- die gewünschten Farben
- das Lieferland

Richtpreise, Mindestmenge und Lieferzeiten: ${pricingUrl}

Ihre Anfrage:
Produkt: ${product}
Menge: ${quantity}

Mit freundlichen Grüßen
NanCrown Caps
Guangzhou, China
info@nancrown.com`,
};

// 客户输入拼进确认信正文前:去换行(防止伪造出新的一行/字段)+ 限长
function sanitizeForBody(value: string, maxLength: number): string {
  return truncate(value.replace(/[\r\n]+/g, " ").trim(), maxLength);
}

// 产品下拉值 → 该语言里给客户看的显示名(messages/<locale>.json 的 Contact.productOptions);找不到就用原样
async function resolveProductLabel(locale: ConfirmLocale, product: string): Promise<string> {
  try {
    const messages = (await import(`../../../../messages/${locale}.json`)).default as {
      Contact?: { productOptions?: Record<string, string> };
    };
    const label = messages?.Contact?.productOptions?.[product];
    return typeof label === "string" && label ? label : product;
  } catch {
    return product;
  }
}

// 纯文本转成"最简单"的 HTML 版本:转义 + 链接可点 + 换行变 <br>,不做花样排版
function textToSimpleHtml(text: string): string {
  const escaped = escapeHtml(text);
  const linked = escaped.replace(/(https?:\/\/[^\s<]+)/g, (url) => `<a href="${url}">${url}</a>`);
  return linked.replace(/\n/g, "<br>\n");
}

// 简单校验邮箱格式(不追求完美,够用来挡明显打错的地址)
const EMAIL_FORMAT_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 判断是不是我们自己测试用的内部地址(nancrown.com 或其子域名)
function isInternalNancrownEmail(email: string): boolean {
  const domain = email.trim().toLowerCase().split("@")[1] ?? "";
  return domain === "nancrown.com" || domain.endsWith(".nancrown.com");
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
  const localeField = strField("locale");
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

  // ---- 客户自动回执:先判断要不要发、发哪种语言,再(如果要发)把内容备好 ----
  const confirmLocale = resolveConfirmLocale(localeField);
  const trimmedEmail = email.trim();
  const isValidEmailFormat = EMAIL_FORMAT_RE.test(trimmedEmail);
  const isInternalEmail = isValidEmailFormat && isInternalNancrownEmail(trimmedEmail);

  // 三种不发确认信的情况,按顺序判断,只留一个理由
  type ConfirmSkipReason = "bot" | "invalid_email" | "internal_email" | null;
  const confirmSkipReason: ConfirmSkipReason = isBotSuspect
    ? "bot"
    : !isValidEmailFormat
      ? "invalid_email"
      : isInternalEmail
        ? "internal_email"
        : null;

  const CONFIRM_SKIP_LABELS: Record<Exclude<ConfirmSkipReason, null>, string> = {
    bot: "Not sent (possible bot)",
    invalid_email: "Not sent (invalid email)",
    internal_email: "Not sent (internal address)",
  };

  let confirmationEmail: { subject: string; text: string; html: string } | null = null;
  if (confirmSkipReason === null) {
    const productLabel = await resolveProductLabel(confirmLocale, product);
    const bodyParams: ConfirmationBodyParams = {
      name: sanitizeForBody(name, 80),
      product: sanitizeForBody(productLabel, 60),
      quantity: sanitizeForBody(quantity, 60) || "—",
      pricingUrl: PRICING_URLS[confirmLocale],
    };
    const confirmationSubject = CONFIRMATION_SUBJECTS[confirmLocale];
    const confirmationText = CONFIRMATION_BODY_TEMPLATES[confirmLocale](bodyParams);
    confirmationEmail = {
      subject: confirmationSubject,
      text: confirmationText,
      html: textToSimpleHtml(confirmationText),
    };
  }

  // 通知信表格里这一行只反映"准备发"的状态:通知信本来就先发出去,不等确认信真的发完才写表格
  const autoConfirmDisplay =
    confirmSkipReason === null
      ? `Sent to customer (${confirmLocale.toUpperCase()})`
      : CONFIRM_SKIP_LABELS[confirmSkipReason];

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
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Auto-confirmation</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(autoConfirmDisplay)}</td></tr>
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
      wouldSendConfirmation: confirmationEmail
        ? {
            to: trimmedEmail,
            subject: confirmationEmail.subject,
            text: confirmationEmail.text,
          }
        : {
            to: null,
            subject: null,
            text: null,
            reason: confirmSkipReason ? CONFIRM_SKIP_LABELS[confirmSkipReason] : null,
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

    // 通知信发出去之后,再发客户确认信(不影响接口返回成功;失败只记日志)
    if (confirmationEmail) {
      try {
        const { error: confirmError } = await resend.emails.send({
          from: "NanCrown Caps <inquiry@notify.nancrown.com>",
          to: [trimmedEmail],
          replyTo: "info@nancrown.com",
          subject: confirmationEmail.subject,
          text: confirmationEmail.text,
          html: confirmationEmail.html,
        });
        if (confirmError) {
          console.error("Failed to send inquiry auto-confirmation email:", confirmError);
        }
      } catch (confirmException) {
        console.error("Unexpected error sending inquiry auto-confirmation email:", confirmException);
      }
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
