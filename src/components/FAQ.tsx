"use client";

import { useState } from "react";

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-t border-gray-200">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-6 text-left cursor-pointer"
      >
        <h3 className="text-lg sm:text-xl font-bold text-gray-900 pr-8">
          {question}
        </h3>
        <span className="text-2xl text-gray-400 shrink-0 leading-none">
          {open ? "−" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-6 text-gray-600 leading-relaxed -mt-2">
          {answer}
        </p>
      )}
    </div>
  );
}

interface FAQProps {
  title: string;
  subtitle: string;
  items: { question: string; answer: string }[];
}

export default function FAQ({ title, subtitle, items }: FAQProps) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl sm:text-5xl font-black text-center text-gray-900">
          {title}
        </h2>
        <p className="text-center text-gray-500 mt-3 mb-10">
          {subtitle}
        </p>
        <div>
          {items.map((item, i) => (
            <FAQItem key={i} question={item.question} answer={item.answer} />
          ))}
          <div className="border-t border-gray-200" />
        </div>
      </div>
    </section>
  );
}
