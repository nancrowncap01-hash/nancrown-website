import { useTranslations } from "next-intl";

// 全站右下角 WhatsApp 悬浮按钮（2026-11-12 老板开了 WhatsApp Business @nancrowncaps）
export default function WhatsAppButton() {
  const t = useTranslations("WhatsApp");
  return (
    <a
      href="https://wa.me/nancrowncaps"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={t("ariaLabel")}
      title={t("ariaLabel")}
      className="fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] z-50 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:right-6 sm:bottom-[calc(1.5rem+env(safe-area-inset-bottom))] sm:h-14 sm:w-14 print:hidden"
    >
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" className="h-7 w-7">
        <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.43 0 .05 5.38.05 11.990c0 2.11.55 4.17 1.6 5.99L0 24l6.17-1.62a11.98 11.98 0 0 0 5.86 1.49h.01c6.61 0 11.99-5.38 11.99-11.99 0-3.2-1.25-6.21-3.51-8.4ZM12.04 21.85h-.01a9.95 9.95 0 0 1-5.07-1.39l-.36-.21-3.66.96.98-3.57-.23-.37a9.96 9.96 0 0 1-1.530-5.28c0-5.45 4.43-9.88 9.88-9.88a9.81 9.81 0 0 1 6.99 2.9 9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.43 9.880-9.88 9.880Zm5.42-7.4c-.3-.15-1.77-.87-2.05-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.47-.88-.78-1.47-1.75-1.64-2.05-.18-.3-.02-.46.13-.61.14-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.040 1.02-1.040 2.49s1.07 2.89 1.22 3.09c.15.2 2.1 3.21 5.08 4.5.71.31 1.27.49 1.71.63.72.23 1.37.2 1.89.12.57-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
      </svg>
    </a>
  );
}
