"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import { HOME_AB_COOKIE } from "@/lib/home-ab";
import { readStoredSource } from "@/lib/source-tracking";

// 读浏览器里的 nc_home cookie(首页 A/B 分流标记),没有就返回 undefined
function readHomeVariantCookie(): string | undefined {
  if (typeof document === "undefined") return undefined;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${HOME_AB_COOKIE}=([^;]*)`)
  );
  return match ? decodeURIComponent(match[1]) : undefined;
}

// 设计图附件限制:跟接口那边(src/app/api/inquiry/route.ts)保持一致,前端先挡一道给友好提示
const MAX_FILES = 3;
const MAX_TOTAL_BYTES = 4 * 1024 * 1024;
const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png", ".webp", ".pdf"];

function getExtension(filename: string): string {
  const idx = filename.lastIndexOf(".");
  return idx === -1 ? "" : filename.slice(idx).toLowerCase();
}

type ContactFormProps = {
  // "page" = /contact 独立页(带深色大标题头),"embedded" = 嵌进首页某个板块,只出表单本身
  variant?: "page" | "embedded";
};

export default function ContactForm({ variant = "page" }: ContactFormProps) {
  const t = useTranslations("Contact");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [attachmentFiles, setAttachmentFiles] = useState<File[]>([]);
  const [attachmentErrorKey, setAttachmentErrorKey] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resetAttachments() {
    if (fileInputRef.current) fileInputRef.current.value = "";
    setAttachmentFiles([]);
  }

  // 选文件时先在前端查一遍(数量/格式/总大小),不合规就给友好提示 + 清空选择,不让坏文件跟着表单一起交上去
  function handleFilesChange(e: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);

    if (files.length === 0) {
      setAttachmentErrorKey(null);
      setAttachmentFiles([]);
      return;
    }

    if (files.length > MAX_FILES) {
      setAttachmentErrorKey("attachmentsTooMany");
      resetAttachments();
      return;
    }

    const hasInvalidType = files.some((file) => !ALLOWED_EXTENSIONS.includes(getExtension(file.name)));
    if (hasInvalidType) {
      setAttachmentErrorKey("attachmentsInvalidType");
      resetAttachments();
      return;
    }

    const totalBytes = files.reduce((sum, file) => sum + file.size, 0);
    if (totalBytes > MAX_TOTAL_BYTES) {
      setAttachmentErrorKey("attachmentsTooLarge");
      resetAttachments();
      return;
    }

    setAttachmentErrorKey(null);
    setAttachmentFiles(files);
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    // 改用 multipart/form-data(而不是 JSON),这样才能把设计图附件一起带上
    const formData = new FormData(e.currentTarget);
    // 标注这条询盘来自首页 A 版还是 B 版,没有 cookie(没经过首页/单版模式)就带空字符串
    formData.set("homeVersion", readHomeVariantCookie() ?? "");

    // 带上"访客第一次从哪来"的记录(选填,读不到就不带)
    const source = readStoredSource();
    if (source) {
      formData.set("srcReferrer", source.referrer);
      formData.set("srcReferrerPath", source.referrerPath);
      formData.set("srcUtmSource", source.utmSource);
      formData.set("srcUtmMedium", source.utmMedium);
      formData.set("srcUtmCampaign", source.utmCampaign);
      formData.set("srcLandingPage", source.landingPage);
      formData.set("srcFirstVisit", source.firstVisit);
    }

    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setStatus("success");
        (e.target as HTMLFormElement).reset();
        resetAttachments();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const productOptions = [
    "baseball",
    "trucker",
    "bucket",
    "visor",
    "camp",
    "running",
    "cadet",
    "outdoor",
    "winter",
    "other",
  ] as const;

  const foundViaOptions = [
    "chatgpt",
    "other_ai",
    "google",
    "alibaba_1688",
    "instagram",
    "tiktok",
    "referral",
    "other",
  ] as const;

  return (
    <>
      {/* Header —— 嵌进首页时(variant="embedded")不要这段大标题,首页自己有对应板块的标题 */}
      {variant === "page" && (
        <section className="bg-gray-900 text-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl sm:text-4xl font-bold">{t("title")}</h1>
            <p className="mt-2 text-gray-400 text-lg">{t("subtitle")}</p>
          </div>
        </section>
      )}

      <section className={variant === "page" ? "py-16" : undefined}>
        <div className={variant === "page" ? "mx-auto max-w-3xl px-4 sm:px-6 lg:px-8" : undefined}>
          {status === "success" ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
              <svg
                className="h-12 w-12 text-green-500 mx-auto mb-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-green-800 font-medium">{t("success")}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 防机器人暗格:真人看不见(CSS 移出屏幕,不是 display:none)、Tab 键跳不到、浏览器不会自动填。
                  label 文字特意留着"Leave this field empty"——读页面结构的 AI 代理(不是靠肉眼看)能读到这句提示,
                  就知道该跳过它;只有那种不管三七二十一见输入框就填的机器人才会中招。
                  中招也不拦截,照常发信,只是邮件标题和表格里会标一下,人工再判断。 */}
              <div
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: "auto",
                  width: "1px",
                  height: "1px",
                  overflow: "hidden",
                }}
              >
                <label htmlFor="nc_hp">Leave this field empty</label>
                <input id="nc_hp" name="nc_hp" type="text" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("name")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="name"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("email")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="email"
                    type="email"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("company")}
                  </label>
                  <input
                    name="company"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("country")}
                  </label>
                  <input
                    name="country"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("product")} <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="product"
                    required
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                  >
                    <option value="">{t("selectProduct")}</option>
                    {productOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {t(`productOptions.${opt}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("quantity")}
                  </label>
                  <input
                    name="quantity"
                    type="text"
                    placeholder="e.g. 500"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t("message")} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("foundVia")}
                  </label>
                  <select
                    name="foundVia"
                    defaultValue=""
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent bg-white"
                  >
                    <option value="">{t("selectFoundVia")}</option>
                    {foundViaOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {t(`foundViaOptions.${opt}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {t("attachments")}
                  </label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    name="attachments"
                    multiple
                    accept=".jpg,.jpeg,.png,.webp,.pdf,image/jpeg,image/png,image/webp,application/pdf"
                    onChange={handleFilesChange}
                    className="w-full text-sm text-gray-600 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-amber-50 file:text-amber-700 file:text-sm file:font-medium file:cursor-pointer hover:file:bg-amber-100"
                  />
                  <p className="mt-1 text-xs text-gray-500">{t("attachmentsHint")}</p>
                  {attachmentErrorKey && (
                    <p className="mt-1 text-xs text-red-600">{t(attachmentErrorKey)}</p>
                  )}
                  {!attachmentErrorKey && attachmentFiles.length > 0 && (
                    <ul className="mt-1 text-xs text-gray-500 space-y-0.5">
                      {attachmentFiles.map((file, i) => (
                        <li key={`${file.name}-${i}`}>
                          {file.name} · {(file.size / 1024).toFixed(0)} KB
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              {status === "error" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
                  {t("error")}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full sm:w-auto px-8 py-3 text-base font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "sending" ? t("sending") : t("submit")}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
