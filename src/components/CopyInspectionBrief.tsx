"use client";

import { useRef, useState } from "react";

export default function CopyInspectionBrief({ text, label, button, success, failure }: {
  text: string;
  label: string;
  button: string;
  success: string;
  failure: string;
}) {
  const field = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState("");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(success);
    } catch {
      field.current?.focus();
      field.current?.select();
      setStatus(failure);
    }
  }
  return (
    <div className="mt-5">
      <label htmlFor="inspection-brief" className="sr-only">{label}</label>
      <textarea id="inspection-brief" ref={field} readOnly value={text} rows={14} spellCheck={false} className="block w-full resize-y rounded-lg border border-gray-300 bg-white p-4 text-sm leading-relaxed text-gray-800" />
      <button type="button" onClick={copy} className="mt-4 rounded-lg bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-700">{button}</button>
      <p role="status" aria-live="polite" className="mt-3 text-sm text-gray-600">{status}</p>
    </div>
  );
}
