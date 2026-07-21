"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Server, ArrowRight, Cpu, LayoutDashboard, Cloud, Share2 } from "lucide-react";

export function HowItWorks() {
  const [mode, setMode] = useState<"securyblack" | "selfhosted">("securyblack");

  return (
    <section className="py-16 md:py-24 px-4 border-y border-[var(--color-border)] bg-[var(--color-surface)]/40">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-widest mb-3">
            Architecture & Flexibility
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text)]">
            How it works — your choice of deployment
          </h2>
          <p className="mt-4 text-[var(--color-muted)] max-w-2xl mx-auto">
            Use OxiPulse directly with SecuryBlack Cloud for unified server management, or route data to your own custom OTLP collector with zero vendor lock-in.
          </p>
        </div>

        {/* Mode Selector Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex gap-1 p-1 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-[var(--radius-lg)]">
            <button
              onClick={() => setMode("securyblack")}
              className={[
                "flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-[var(--radius-md)] transition-all duration-200 cursor-pointer",
                mode === "securyblack"
                  ? "bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold shadow-md"
                  : "text-[var(--color-muted)] hover:text-[var(--color-text)]",
              ].join(" ")}
            >
              <Cloud size={16} />
              SecuryBlack Ecosystem (Default)
            </button>
            <button
              onClick={() => setMode("selfhosted")}
              className={[
                "flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-[var(--radius-md)] transition-all duration-200 cursor-pointer",
                mode === "selfhosted"
                  ? "bg-[var(--color-primary)] text-[var(--color-bg)] font-semibold shadow-md"
                  : "text-[var(--color-muted)] hover:text-[var(--color-text)]",
              ].join(" ")}
            >
              <Share2 size={16} />
              Self-Hosted / OpenTelemetry
            </button>
          </div>
        </div>

        {/* Flow Diagram */}
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0"
        >
          {mode === "securyblack" ? (
            <>
              <FlowNode
                icon={Server}
                label="Your Server"
                description="Linux / Windows"
                iconColor="var(--color-muted)"
              />
              <Connector label="System Metrics" />
              <FlowNode
                icon={Cpu}
                label="OxiPulse Agent"
                description="Rust Telemetry Engine"
                iconColor="var(--color-primary)"
                highlight
              />
              <Connector label="gRPC (4317)" />
              <FlowNode
                icon={Cpu}
                label="Nexus Agent"
                description="TLS Tunnel Orchestrator"
                iconColor="var(--color-muted)"
              />
              <Connector label="TLS Stream" />
              <FlowNode
                icon={LayoutDashboard}
                label="SecuryBlack Cloud"
                description="Unified Metrics Dashboard"
                iconColor="var(--color-muted)"
              />
            </>
          ) : (
            <>
              <FlowNode
                icon={Server}
                label="Your Server"
                description="Linux / Windows"
                iconColor="var(--color-muted)"
              />
              <Connector label="System Metrics" />
              <FlowNode
                icon={Cpu}
                label="OxiPulse Agent"
                description="Rust Telemetry Engine"
                iconColor="var(--color-primary)"
                highlight
              />
              <Connector label="OTLP / gRPC" />
              <FlowNode
                icon={LayoutDashboard}
                label="OTLP Collector"
                description="Any Compatible Backend"
                iconColor="var(--color-muted)"
              />
            </>
          )}
        </motion.div>

        {/* Feature callouts below diagram */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center"
        >
          {[
            {
              label: "Zero Lock-In",
              detail: "Export standard OpenTelemetry (OTLP) gRPC metrics anywhere",
            },
            {
              label: "Offline Buffer",
              detail: "Stores metrics locally on disk when collectors are unreachable",
            },
            {
              label: "Ultra Efficient",
              detail: "Sub-10MB static Rust binary with <0.1% CPU consumption",
            },
          ].map((item) => (
            <div key={item.label} className="flex flex-col items-center gap-2">
              <span className="text-sm font-semibold text-[var(--color-primary)]">
                {item.label}
              </span>
              <span className="text-sm text-[var(--color-muted)]">{item.detail}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FlowNode({
  icon: Icon,
  label,
  description,
  iconColor,
  highlight,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  iconColor: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "flex flex-col items-center gap-3 px-5 py-4 rounded-[var(--radius-lg)] border min-w-[140px] transition-all duration-200",
        highlight
          ? "border-[var(--color-primary-dim)] bg-[var(--color-primary-glow)] shadow-[0_0_30px_var(--color-primary-glow)]"
          : "border-[var(--color-border)] bg-[var(--color-surface)]",
      ].join(" ")}
    >
      <div
        className={[
          "w-10 h-10 rounded-[var(--radius-md)] flex items-center justify-center",
          highlight ? "bg-[var(--color-primary-glow)]" : "bg-[var(--color-surface-2)]",
        ].join(" ")}
      >
        <Icon size={18} style={{ color: iconColor }} />
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-[var(--color-text)]">{label}</p>
        <p className="text-[11px] text-[var(--color-muted)] mt-0.5">{description}</p>
      </div>
    </div>
  );
}

function Connector({ label }: { label?: string }) {
  return (
    <div className="flex flex-col items-center gap-1 px-1 md:px-3">
      {label && (
        <span className="text-[10px] text-[var(--color-muted)] font-mono hidden md:block mb-0.5">
          {label}
        </span>
      )}
      {/* horizontal on desktop */}
      <div className="hidden md:flex items-center gap-1">
        <div className="w-5 h-px bg-[var(--color-border)]" />
        <ArrowRight size={12} className="text-[var(--color-muted)]" />
      </div>
      {/* vertical on mobile */}
      <div className="flex md:hidden flex-col items-center gap-1 my-1">
        <div className="w-px h-4 bg-[var(--color-border)]" />
        <ArrowRight
          size={12}
          className="text-[var(--color-muted)] rotate-90"
        />
      </div>
    </div>
  );
}
