"use client";

import React from "react";
import { Badge } from "@/components/catalyst/badge";
import { Database, Cpu, Lock, Cloud, CheckCircle2 } from "lucide-react";

export function ArchitectureFlow() {
  const steps = [
    {
      step: "01",
      icon: Database,
      title: "Extracción Atómica",
      desc: "Captura de pg_dump o volúmenes tar mediante stdout streaming sin escribir archivos intermedios.",
      tag: "Memory Pipe",
    },
    {
      step: "02",
      icon: Cpu,
      title: "Compresión zstd",
      desc: "Zstandard nivel 3 en tiempo real. Reducción del 70% al 85% del tamaño con uso mínimo de CPU.",
      tag: "High Throughput",
    },
    {
      step: "03",
      icon: Lock,
      title: "Cifrado Client-Side",
      desc: "ChaCha20-Poly1305 autenticado con nonces CSPRNG únicos. La nube nunca conoce tus claves.",
      tag: "Zero-Knowledge",
    },
    {
      step: "04",
      icon: Cloud,
      title: "Sync Multi-Cloud",
      desc: "Subida concurrente por chunks a Cloudflare R2, Hetzner Object Storage o Google Drive con OpenDAL.",
      tag: "Apache OpenDAL",
    },
  ];

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="neutral" className="mb-3">
          Pipeline de Streaming Nativo
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          Cómo viajan tus datos de forma segura
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
          El pipeline de extremo a extremo procesa los volcados en bloques de memoria en tiempo
          real, garantizando que el disco del servidor mantenga un 0% de uso adicional.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 flex flex-col justify-between relative group hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 font-bold">
                    STEP {item.step}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {item.tag}
                  </span>
                </div>

                <div className="size-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)] mb-4">
                  <Icon className="size-5" />
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center gap-x-2 text-xs text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-3.5" />
                <span>Verificado en memoria</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
