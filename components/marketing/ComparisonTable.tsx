"use client";

import React from "react";
import { activeAgentConfig } from "@/config/agent.config";
import { Badge } from "@/components/catalyst/badge";

export function ComparisonTable() {
  return (
    <section id="comparison" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="neutral" className="mb-3">
          Precisión Técnica
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          ¿Por qué reemplazar los scripts tradicionales?
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
          Comparativa técnica entre {activeAgentConfig.name}, los scripts bash tradicionales
          y las herramientas complejas de backup heredadas.
        </p>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/60 shadow-lg dark:shadow-xl">
        <table className="w-full text-left text-xs sm:text-sm">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
              <th className="py-4 px-6 font-semibold text-zinc-700 dark:text-zinc-300">Capacidad Técnica</th>
              <th className="py-4 px-6 font-semibold text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)]">
                {activeAgentConfig.name}
              </th>
              <th className="py-4 px-6 font-semibold text-zinc-500 dark:text-zinc-400">Scripts Bash (infra actual)</th>
              <th className="py-4 px-6 font-semibold text-zinc-500 dark:text-zinc-400">Alternativas Legadas</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800/60 text-zinc-700 dark:text-zinc-300">
            {activeAgentConfig.comparisonRows.map((row, idx) => (
              <tr key={idx} className="hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 transition-colors">
                <td className="py-4 px-6 font-medium text-zinc-900 dark:text-white">{row.feature}</td>
                <td className="py-4 px-6 font-semibold text-cyan-700 dark:text-cyan-300 bg-cyan-50/60 dark:bg-cyan-950/10">
                  {row.agent}
                </td>
                <td className="py-4 px-6 text-zinc-600 dark:text-zinc-400">{row.bashScript}</td>
                <td className="py-4 px-6 text-zinc-500">{row.competitors}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
