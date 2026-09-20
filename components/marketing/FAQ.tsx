"use client";

import React, { useState } from "react";
import { activeAgentConfig } from "@/config/agent.config";
import { Badge } from "@/components/catalyst/badge";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-16">
        <Badge variant="neutral" className="mb-3">
          Preguntas Frecuentes
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Todo lo que necesitas saber
        </h2>
      </div>

      <div className="space-y-4">
        {activeAgentConfig.faq.map((item, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="rounded-xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 overflow-hidden shadow-xs transition-colors"
            >
              <button
                onClick={() => toggle(idx)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-zinc-900 dark:text-white text-sm sm:text-base cursor-pointer hover:text-[var(--agent-primary-dark)] dark:hover:text-[var(--agent-primary-light)] transition-colors"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={`size-4 text-zinc-400 dark:text-zinc-500 shrink-0 transition-transform duration-200 ${
                    isOpen ? "rotate-180 text-zinc-900 dark:text-white" : ""
                  }`}
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed border-t border-zinc-100 dark:border-zinc-800/60 pt-3">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
