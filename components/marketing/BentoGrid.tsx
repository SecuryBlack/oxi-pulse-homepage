"use client";

import React from "react";
import { activeAgentConfig } from "@/config/agent.config";
import { Card } from "@/components/catalyst/card";
import { Badge } from "@/components/catalyst/badge";
import { Zap, Shield, Terminal, Clock, Cpu } from "lucide-react";

export function BentoGrid() {
  const iconMap: Record<string, React.ReactNode> = {
    streaming: <Zap className="size-5 text-cyan-500 dark:text-cyan-400" />,
    crypto: <Shield className="size-5 text-emerald-500 dark:text-emerald-400" />,
    tui: <Terminal className="size-5 text-amber-500 dark:text-amber-400" />,
    gfs: <Clock className="size-5 text-purple-500 dark:text-purple-400" />,
  };

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="neutral" className="mb-3">
          Ingeniería de Alta Resiliencia
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Construido para soportar cualquier desastre
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
          Diseñado en Rust nativo bajo el principio de menor privilegio, huella de memoria
          invisible y cero consumo de almacenamiento temporal en tu máquina.
        </p>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {activeAgentConfig.features.map((feature) => {
          const colClass =
            feature.colSpan === "col-span-2"
              ? "md:col-span-2"
              : "md:col-span-1";

          return (
            <Card
              key={feature.id}
              className={`${colClass} flex flex-col justify-between group overflow-hidden`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="size-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center group-hover:scale-105 transition-transform">
                    {iconMap[feature.id] || <Cpu className="size-5 text-cyan-500 dark:text-cyan-400" />}
                  </div>
                  <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                    {feature.tag}
                  </span>
                </div>

                <div className="text-xs font-semibold text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)] mb-1">
                  {feature.subtitle}
                </div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white tracking-tight mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {feature.description}
                </p>
              </div>

              {/* Bottom decorative element */}
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                <span>{activeAgentConfig.name} Core</span>
                <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors">
                  Ver detalle &rarr;
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
