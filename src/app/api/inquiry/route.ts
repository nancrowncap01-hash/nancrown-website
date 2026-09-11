import { NextRequest, NextResponse } from "next/server";

// 把客户填的字段转义一下,拼进邮件 HTML 时不会被当成标签解析
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, company, country, product, quantity, message } = body;

  if (!name || !email || !product || !message) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  // 询盘固定发到公司邮箱。Vercel 上的 NOTIFY_EMAIL 填成了 nancrowncap@gmail.com(少了 01,不是在用的邮箱),所以不再读它
  const notifyEmail = "info@nancrown.com";

  // 没配 Resend API Key,邮件根本发不出去,不能再假装发送成功
  if (!resendApiKey) {
    console.error("Inquiry email not sent: RESEND_API_KEY is not configured", body);
    return NextResponse.json(
      { error: "send_failed", code: "not_configured" },
      { status: 502 }
    );
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(resendApiKey);

    const { data, error } = await resend.emails.send({
      // 用在 Resend 验证过的子域名 notify.nancrown.com 发信(测试通道 onboarding@resend.dev 只能发给注册 Resend 的那个邮箱)
      // 用子域名:不碰主域名的收信设置,也不会被公司邮箱当成「冒充本域」拦掉
      from: "NanCrown Website <inquiry@notify.nancrown.com>",
      to: [notifyEmail],
      replyTo: email,
      // 标题前加【官网询盘】,在邮箱里一眼能认出是官网表单来的
      subject: `【官网询盘】New Inquiry from ${name} - ${product}`,
      html: `
        <h2>New Customer Inquiry</h2>
        <table style="border-collapse: collapse; width: 100%; max-width: 600px;">
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Name</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(name)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Email</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(email)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Company</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(company || "N/A")}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Country</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(country || "N/A")}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Product Interest</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(product)}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Quantity</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(quantity || "N/A")}</td></tr>
          <tr><td style="padding: 8px; border: 1px solid #ddd; font-weight: bold;">Message</td><td style="padding: 8px; border: 1px solid #ddd;">${escapeHtml(message)}</td></tr>
        </table>
      `,
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
