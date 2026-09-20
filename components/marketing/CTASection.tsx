"use client";

import React from "react";
import { activeAgentConfig } from "@/config/agent.config";
import { Button } from "@/components/catalyst/button";
import { ArrowRight, Github } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-gradient-to-b from-zinc-50 via-white to-zinc-100 dark:from-zinc-900/80 dark:via-zinc-950 dark:to-zinc-950 p-8 sm:p-12 shadow-xl dark:shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div
          className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[250px] pointer-events-none blur-3xl opacity-15 dark:opacity-20"
          style={{
            background: `radial-gradient(ellipse at center, var(--agent-primary) 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Comienza a proteger tus servidores hoy mismo
          </h2>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
            Instálalo en 1 minuto como agente de código abierto independiente o conéctalo con
            el panel de SecuryBlack Cloud para orquestación centralizada.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href={activeAgentConfig.githubUrl} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" icon={<Github className="size-4" />}>
                Ver Código en GitHub
              </Button>
            </a>
            <a href="https://app.securyblack.com" target="_blank" rel="noopener noreferrer">
              <Button variant="primary" size="lg" icon={<ArrowRight className="size-3.5" />}>
                Probar SecuryBlack Cloud
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
