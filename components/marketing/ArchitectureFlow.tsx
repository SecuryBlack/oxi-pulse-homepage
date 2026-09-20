"use client";

import React from "react";
import { activeAgentConfig } from "@/config/agent.config";
import { Badge } from "@/components/catalyst/badge";
import {
  Database,
  Cpu,
  Lock,
  Cloud,
  CheckCircle2,
  Activity,
  Radio,
  Shield,
  Terminal,
  Network,
  RefreshCw,
  Layers,
} from "lucide-react";

export function ArchitectureFlow() {
  const agentId = activeAgentConfig.id.toLowerCase();

  const getSteps = () => {
    if (agentId.includes("oxi")) {
      return [
        {
          step: "01",
          icon: Activity,
          title: "Direct Kernel Syscalls",
          desc: "Non-blocking /proc sampling and eBPF counters with zero shell forks or process overhead.",
          tag: "Zero Overhead",
        },
        {
          step: "02",
          icon: Cpu,
          title: "Sub-Millisecond Batching",
          desc: "Efficient in-memory aggregation of CPU, memory, disk I/O, and container cgroups.",
          tag: "In-Memory",
        },
        {
          step: "03",
          icon: Radio,
          title: "OTLP Protobuf Packaging",
          desc: "Standard OpenTelemetry metric serialization with zero heap allocation per cycle.",
          tag: "OpenTelemetry",
        },
        {
          step: "04",
          icon: Cloud,
          title: "Multiplexed gRPC Stream",
          desc: "Encrypted HTTP/2 streaming pipeline delivering real-time telemetry to collectors or cloud.",
          tag: "Low Latency",
        },
      ];
    }
    if (agentId.includes("ferro")) {
      return [
        {
          step: "01",
          icon: Shield,
          title: "Auditd Netlink Socket",
          desc: "Continuous kernel security event monitoring for SSH logins, privilege escalation, and file drift.",
          tag: "Kernel Netlink",
        },
        {
          step: "02",
          icon: Lock,
          title: "Heuristic Defense Engine",
          desc: "Sub-50ms brute-force anomaly detection and CIS Benchmark security posture compliance checks.",
          tag: "Autonomous",
        },
        {
          step: "03",
          icon: Terminal,
          title: "Kernel Firewall Insertion",
          desc: "Direct atomic nftables & UFW rule enforcement to ban malicious actors without service reloads.",
          tag: "Instant Drop",
        },
        {
          step: "04",
          icon: Cloud,
          title: "Conduit Event Dispatch",
          desc: "Outbound gRPC event pipeline notifying SecuryBlack Cloud incident dashboard in real time.",
          tag: "Zero Inbound Port",
        },
      ];
    }
    if (agentId.includes("cupra")) {
      return [
        {
          step: "01",
          icon: Network,
          title: "L4 / L7 Active Probing",
          desc: "Continuous health-check interrogation of local services, databases, and upstream HTTP/gRPC ports.",
          tag: "Active Health",
        },
        {
          step: "02",
          icon: RefreshCw,
          title: "VRRP State Machine",
          desc: "Keepalived-compatible protocol maintaining peer cluster state over private networks.",
          tag: "VRRP v2/v3",
        },
        {
          step: "03",
          icon: Shield,
          title: "Instant VIP Migration",
          desc: "Atomic ARP announcement and kernel interface binding with failover triggered in < 500 ms.",
          tag: "Zero Downtime",
        },
        {
          step: "04",
          icon: Cloud,
          title: "WireGuard Overlay Mesh",
          desc: "Encrypted point-to-point WireGuard routing tables dynamically synchronized across multi-cloud nodes.",
          tag: "Kernel Crypto",
        },
      ];
    }
    if (agentId.includes("cromo")) {
      return [
        {
          step: "01",
          icon: Layers,
          title: "Desired State Reconciliation",
          desc: "Continuous declarative drift detection from GitOps repositories, Conduit tunnel, or local TOML.",
          tag: "Declarative",
        },
        {
          step: "02",
          icon: Cloud,
          title: "OCI Registry Image Pull",
          desc: "Layer caching and digest verification without building code on resource-constrained production hosts.",
          tag: "No Host Build",
        },
        {
          step: "03",
          icon: CheckCircle2,
          title: "Pre-Flight Health Probing",
          desc: "Spawning new container in isolation and waiting for verified health status before switching traffic.",
          tag: "Zero Downtime",
        },
        {
          step: "04",
          icon: RefreshCw,
          title: "Atomic Switch & Rollback",
          desc: "Instant traffic handover with automated zero-latency rollback if runtime faults or 5xx occur.",
          tag: "Self-Healing",
        },
      ];
    }
    // Default: TitanVault
    return [
      {
        step: "01",
        icon: Database,
        title: "Atomic Extraction Pipe",
        desc: "Streaming stdout capture from databases (PostgreSQL/MySQL) or tar volumes without disk spooling.",
        tag: "Memory Pipe",
      },
      {
        step: "02",
        icon: Cpu,
        title: "zstd High-Throughput",
        desc: "Real-time Zstandard compression reducing payload size by 75-85% with minimal CPU impact.",
        tag: "In-Flight zstd",
      },
      {
        step: "03",
        icon: Lock,
        title: "Zero-Knowledge Encryption",
        desc: "ChaCha20-Poly1305 AEAD authenticated cipher with CSPRNG nonces. Cloud never holds decryption keys.",
        tag: "Client-Side",
      },
      {
        step: "04",
        icon: Cloud,
        title: "Multi-Cloud OpenDAL Sync",
        desc: "Concurrent chunk upload to Cloudflare R2, Hetzner Storage, AWS S3, or Google Drive via OpenDAL.",
        tag: "Apache OpenDAL",
      },
    ];
  };

  const steps = getSteps();

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="neutral" className="mb-3">
          Architecture & Pipeline
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          How It Works Under the Hood
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
          Built from the ground up for maximum resilience, zero unneeded host resource consumption,
          and robust automated operations.
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
                <span>Verified in runtime</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
