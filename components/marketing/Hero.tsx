"use client";

import React, { useState } from "react";
import { activeAgentConfig } from "@/config/agent.config";
import { Badge } from "@/components/catalyst/badge";
import { ProductShowcase } from "./ProductShowcase";
import { Copy, Check, Terminal as TerminalIcon, Sparkles } from "lucide-react";

export function Hero() {
  const [activeOsIndex, setActiveOsIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  const activeCommand = activeAgentConfig.installCommands[activeOsIndex] || activeAgentConfig.installCommands[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeCommand.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] pointer-events-none blur-3xl opacity-15 dark:opacity-20"
        style={{
          background: `radial-gradient(ellipse at center, var(--agent-primary) 0%, transparent 70%)`,
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Top Badge */}
        <Badge variant="agent" dot className="mb-6">
          <Sparkles className="size-3" />
          <span>{activeAgentConfig.badge}</span>
        </Badge>

        {/* Main Headline with Catalyst subtle gradient */}
        <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white max-w-4xl leading-[1.1]">
          {activeAgentConfig.name}:{" "}
          <span className="bg-gradient-to-r from-zinc-900 via-zinc-700 to-zinc-500 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-500 bg-clip-text text-transparent">
            {activeAgentConfig.tagline}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl font-normal leading-relaxed">
          {activeAgentConfig.description}
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 w-full max-w-3xl">
          {activeAgentConfig.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl border border-zinc-200 dark:border-zinc-850 bg-white/90 dark:bg-zinc-900/40 text-left shadow-xs"
            >
              <div className="text-xs text-zinc-500 font-medium">{stat.label}</div>
              <div className="text-lg font-bold text-zinc-900 dark:text-white mt-0.5 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 truncate">{stat.note}</div>
            </div>
          ))}
        </div>

        {/* Quick Install Command Box (Catalyst Terminal Style) */}
        <div className="w-full max-w-2xl mt-8">
          <div className="rounded-xl border border-zinc-300/80 dark:border-zinc-800 bg-zinc-950 text-white shadow-xl overflow-hidden text-left">
            {/* Tabs for OS */}
            <div className="flex items-center justify-between border-b border-zinc-800 px-3 bg-zinc-900/80">
              <div className="flex items-center gap-x-1">
                {activeAgentConfig.installCommands.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveOsIndex(idx)}
                    className={`px-3 py-2 text-xs font-medium transition-colors cursor-pointer border-b-2 -mb-[1px] ${
                      activeOsIndex === idx
                        ? "border-[var(--agent-primary)] text-white"
                        : "border-transparent text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    {item.os}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-zinc-400 font-mono hidden sm:inline">
                Zero external dependencies
              </span>
            </div>

            {/* Code Line */}
            <div className="p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-center gap-x-2 text-xs sm:text-sm font-mono text-zinc-200 truncate select-all">
                <TerminalIcon className="size-4 text-[var(--agent-primary-light)] shrink-0" />
                <span className="truncate">{activeCommand.cmd}</span>
              </div>
              <button
                onClick={handleCopy}
                className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer shrink-0 border border-zinc-700/60"
                title="Copiar comando"
              >
                {copied ? (
                  <Check className="size-4 text-emerald-400" />
                ) : (
                  <Copy className="size-4" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Interactive Product Showcase (TUI Simulator) */}
        <ProductShowcase />
      </div>
    </section>
  );
}
