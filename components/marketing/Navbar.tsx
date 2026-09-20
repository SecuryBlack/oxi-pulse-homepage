"use client";

import React, { useState, useEffect, useRef } from "react";
import { activeAgentConfig, ecosystemAgents } from "@/config/agent.config";
import { Badge } from "@/components/catalyst/badge";
import { Button } from "@/components/catalyst/button";
import { AgentLogo } from "@/components/catalyst/agent-logo";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { useLatestRelease } from "@/lib/useLatestRelease";
import { Github, ExternalLink, ChevronDown, Layers } from "lucide-react";

export function Navbar() {
  const version = useLatestRelease();
  const [scrolled, setScrolled] = useState(false);
  const [ecosystemOpen, setEcosystemOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setEcosystemOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/85 dark:bg-zinc-950/85 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 py-3 shadow-xs"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand & Agent Identity */}
        <div className="flex items-center gap-x-3">
          <a
            href="/"
            className="flex items-center gap-x-2.5 text-zinc-900 dark:text-white font-semibold text-lg tracking-tight hover:opacity-90 transition-opacity"
          >
            <div className="size-8 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700/80 flex items-center justify-center shadow-inner text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)]">
              <AgentLogo id={activeAgentConfig.id} className="size-4.5" />
            </div>
            <span>{activeAgentConfig.name}</span>
          </a>
          <Badge variant="agent" className="hidden sm:inline-flex">
            {version}
          </Badge>
          <span className="text-xs text-zinc-500 hidden md:inline">
            by{" "}
            <a
              href="https://securyblack.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-700 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              SecuryBlack
            </a>
          </span>
        </div>

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-x-6 text-sm text-zinc-600 dark:text-zinc-400">
          <a href="#features" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
            Ventajas
          </a>
          <a href="#architecture" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
            Arquitectura
          </a>
          <a href="#comparison" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
            Comparativa
          </a>
          <a href="#faq" className="hover:text-zinc-950 dark:hover:text-white transition-colors">
            FAQ
          </a>

          {/* Ecosystem Dropdown (SEO Mesh) */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setEcosystemOpen(!ecosystemOpen)}
              className="flex items-center gap-x-1 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Layers className="size-3.5 text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)]" />
              <span>Ecosistema</span>
              <ChevronDown className={`size-3 transition-transform ${ecosystemOpen ? "rotate-180" : ""}`} />
            </button>

            {ecosystemOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-900">
                  Agentes SecuryBlack
                </div>
                <div className="space-y-1 mt-1">
                  {ecosystemAgents.map((agent) => {
                    const isCurrent = agent.id === activeAgentConfig.id.replace("-", "");
                    return (
                      <a
                        key={agent.id}
                        href={agent.url}
                        target={isCurrent ? "_self" : "_blank"}
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between p-2 rounded-xl text-xs transition-colors ${
                          isCurrent
                            ? "bg-zinc-100 dark:bg-zinc-900 font-semibold text-zinc-900 dark:text-white"
                            : "hover:bg-zinc-50 dark:hover:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300"
                        }`}
                      >
                        <div className="flex items-center gap-x-2">
                          <span
                            className="size-5 rounded-md flex items-center justify-center border border-zinc-200 dark:border-zinc-800"
                            style={{ color: agent.color }}
                          >
                            <AgentLogo id={agent.id} className="size-3" />
                          </span>
                          <span>{agent.name}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 font-mono">
                          {isCurrent ? "Actual" : agent.badge}
                        </span>
                      </a>
                    );
                  })}
                </div>
                <div className="mt-2 pt-2 border-t border-zinc-100 dark:border-zinc-900">
                  <a
                    href="https://securyblack.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between px-3 py-1.5 text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white font-medium"
                  >
                    <span>SecuryBlack Cloud &rarr;</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Action Buttons & Theme Toggle */}
        <div className="flex items-center gap-x-2.5">
          <ThemeToggle />

          <a
            href={activeAgentConfig.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="outline" size="sm" icon={<Github className="size-4" />}>
              GitHub
            </Button>
          </a>
          <a
            href="https://app.securyblack.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="primary" size="sm" icon={<ExternalLink className="size-3.5" />}>
              SecuryBlack Cloud
            </Button>
          </a>
        </div>
      </div>
    </header>
  );
}
