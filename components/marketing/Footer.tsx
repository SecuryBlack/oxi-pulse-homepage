"use client";

import React from "react";
import { activeAgentConfig, ecosystemAgents } from "@/config/agent.config";
import { AgentLogo } from "@/components/catalyst/agent-logo";
import { Github, ExternalLink, ArrowUpRight, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-900 bg-white dark:bg-zinc-950 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-xs text-zinc-600 dark:text-zinc-500">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Ecosystem Cross-linking Matrix (SEO Inbound Mesh) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-zinc-200 dark:border-zinc-850">
            <div>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 tracking-tight flex items-center gap-x-2">
                <Cpu className="size-4 text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)]" />
                <span>Ecosistema de Agentes Nativos SecuryBlack</span>
              </h4>
              <p className="text-xs text-zinc-500 mt-1">
                Herramientas modulares de código abierto en Rust diseñadas para operar de forma
                autónoma o conectadas con SecuryBlack Cloud.
              </p>
            </div>
            <a
              href="https://securyblack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-1.5 text-xs font-semibold text-zinc-900 dark:text-white hover:text-[var(--agent-primary)] transition-colors self-start sm:self-auto"
            >
              <span>Conoce SecuryBlack Cloud</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {ecosystemAgents.map((agent) => {
              const isCurrent = agent.id === activeAgentConfig.id.replace("-", "");
              return (
                <div
                  key={agent.id}
                  className={`p-4 rounded-2xl border transition-all ${
                    isCurrent
                      ? "border-[var(--agent-primary)]/50 bg-[var(--agent-glow)] shadow-xs"
                      : "border-zinc-200 dark:border-zinc-850/80 bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-zinc-300 dark:hover:border-zinc-700"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-x-1.5">
                      <span
                        className="size-5 rounded-md flex items-center justify-center border border-zinc-200 dark:border-zinc-800"
                        style={{ color: agent.color }}
                      >
                        <AgentLogo id={agent.id} className="size-3" />
                      </span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: agent.color }}
                      >
                        {agent.name}
                      </span>
                    </div>
                    {isCurrent ? (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[var(--agent-primary)] text-zinc-950 font-semibold">
                        Este Agente
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-500">
                        {agent.badge}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] text-zinc-600 dark:text-zinc-400 line-clamp-2 mb-3 leading-relaxed">
                    {agent.tagline}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-zinc-200/60 dark:border-zinc-800/60 text-[11px]">
                    <a
                      href={agent.url}
                      target={isCurrent ? "_self" : "_blank"}
                      rel="noopener noreferrer"
                      className="font-medium text-zinc-800 dark:text-zinc-200 hover:text-[var(--agent-primary)] transition-colors inline-flex items-center gap-x-1"
                    >
                      <span>Web Oficial</span>
                      <ExternalLink className="size-3" />
                    </a>
                    <a
                      href={agent.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                      title={`${agent.name} en GitHub`}
                    >
                      <Github className="size-3.5" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-zinc-200 dark:border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-x-3">
            <div className="size-6 rounded-md bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800 flex items-center justify-center text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)]">
              <AgentLogo id={activeAgentConfig.id} className="size-3.5" />
            </div>
            <span className="font-semibold text-zinc-800 dark:text-zinc-300">
              {activeAgentConfig.name} by SecuryBlack
            </span>
            <span className="text-zinc-400 dark:text-zinc-600">·</span>
            <span className="text-zinc-500">Open Source Apache-2.0 License</span>
          </div>

          <div className="flex items-center gap-x-6 text-zinc-600 dark:text-zinc-400">
            <a
              href="https://securyblack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              SecuryBlack Home
            </a>
            <a
              href="https://app.securyblack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors"
            >
              Cloud Dashboard
            </a>
            <a
              href={activeAgentConfig.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-zinc-900 dark:hover:text-white transition-colors flex items-center gap-x-1"
            >
              <Github className="size-3.5" />
              <span>GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
