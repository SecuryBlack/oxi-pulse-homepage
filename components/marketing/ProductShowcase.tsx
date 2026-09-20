"use client";

import React, { useState } from "react";
import { activeAgentConfig } from "@/config/agent.config";
import { useLatestRelease } from "@/lib/useLatestRelease";
import {
  Terminal,
  Check,
  Play,
  RefreshCw,
  HardDrive,
  Shield,
  Clock,
  Layers,
  Activity,
  Cpu,
  Network,
  AlertTriangle,
  Lock,
  Radio,
  Server,
  Zap,
} from "lucide-react";

export function ProductShowcase() {
  const version = useLatestRelease();
  const agentId = activeAgentConfig.id.toLowerCase();

  // State for TitanVault simulation
  const [activeTab, setActiveTab] = useState<number>(0);
  const [isRunningBackup, setIsRunningBackup] = useState<boolean>(false);
  const [testResult, setTestResult] = useState<string | null>(null);
  const [backupProgress, setBackupProgress] = useState<number>(0);
  const [backupLog, setBackupLog] = useState<string[]>([]);

  // State for OxiPulse simulation
  const [cpuSpike, setCpuSpike] = useState<boolean>(false);

  // State for FerroSentry simulation
  const [blockedIp, setBlockedIp] = useState<boolean>(false);

  // State for CupraFlow simulation
  const [vipMaster, setVipMaster] = useState<"node-01" | "node-02">("node-01");
  const [failoverInProgress, setFailoverInProgress] = useState<boolean>(false);

  /* --- TitanVault handlers --- */
  const handleTestConnection = () => {
    setTestResult("Connecting to Hetzner Object Storage & Cloudflare R2...");
    setTimeout(() => {
      setTestResult("✅ hetzner: OK (de-nur-sb-bkp-01) │ ✅ cloudflare_r2: OK (prod-backups)");
    }, 600);
  };

  const handleRunBackup = () => {
    if (isRunningBackup) return;
    setIsRunningBackup(true);
    setBackupProgress(10);
    setBackupLog(["[INIT] Connecting to Postgres dumper pipe..."]);

    setTimeout(() => {
      setBackupProgress(40);
      setBackupLog((prev) => [
        ...prev,
        "[DUMP] Streaming pg_dump directly into zstd compression stream...",
      ]);
    }, 500);

    setTimeout(() => {
      setBackupProgress(75);
      setBackupLog((prev) => [
        ...prev,
        "[CRYPTO] Encrypted with ChaCha20-Poly1305 AEAD (Nonce generated)",
        "[UPLOAD] Uploading chunk multipart to Hetzner S3 & R2...",
      ]);
    }, 1100);

    setTimeout(() => {
      setBackupProgress(100);
      setBackupLog((prev) => [
        ...prev,
        "✅ SUCCESS: db_securyblack_daily_2026-09-18.sql.zst.enc (28.4 MB in 1.4s, -74.2%)",
        "[HEARTBEAT] Ping sent to SecuryBlack Cloud monitor OK",
      ]);
      setTimeout(() => {
        setIsRunningBackup(false);
      }, 2500);
    }, 1800);
  };

  /* --- OxiPulse handlers --- */
  const triggerCpuSpike = () => {
    setCpuSpike(true);
    setTimeout(() => setCpuSpike(false), 3000);
  };

  /* --- FerroSentry handlers --- */
  const triggerBlockIp = () => {
    setBlockedIp(true);
    setTimeout(() => setBlockedIp(false), 4000);
  };

  /* --- CupraFlow handlers --- */
  const triggerFailover = () => {
    if (failoverInProgress) return;
    setFailoverInProgress(true);
    setTimeout(() => {
      setVipMaster((prev) => (prev === "node-01" ? "node-02" : "node-01"));
      setFailoverInProgress(false);
    }, 450);
  };

  /* ==========================================================================
     TABS DEFINITION PER AGENT
     ========================================================================== */
  const getTabs = () => {
    if (agentId.includes("oxi")) {
      return [
        { id: 0, label: "1. Vitals & CPU/RAM", icon: Activity },
        { id: 1, label: "2. Disks & I/O Stats", icon: HardDrive },
        { id: 2, label: "3. OTLP Exporters", icon: Radio },
        { id: 3, label: "4. Containers & Procs", icon: Layers },
      ];
    }
    if (agentId.includes("ferro")) {
      return [
        { id: 0, label: "1. Security Alerts & EDR", icon: Shield },
        { id: 1, label: "2. Firewall & nftables", icon: Lock },
        { id: 2, label: "3. Auditd & FIM Watchers", icon: Clock },
        { id: 3, label: "4. CIS Benchmark Posture", icon: Check },
      ];
    }
    if (agentId.includes("cupra")) {
      return [
        { id: 0, label: "1. VIP State & Interfaces", icon: Network },
        { id: 1, label: "2. Keepalived VRRP Nodes", icon: Server },
        { id: 2, label: "3. WireGuard Mesh Peers", icon: Shield },
        { id: 3, label: "4. L4/L7 Health Checks", icon: Activity },
      ];
    }
    // Default: TitanVault
    return [
      { id: 0, label: "1. Sources (DB & Files)", icon: Layers },
      { id: 1, label: "2. Targets (R2/S3/Drive)", icon: HardDrive },
      { id: 2, label: "3. Policy & Crypto", icon: Shield },
      { id: 3, label: "4. Snapshots & Restore", icon: Clock },
    ];
  };

  const tabs = getTabs();

  return (
    <div className="w-full max-w-5xl mx-auto mt-12">
      {/* Terminal Container */}
      <div className="rounded-2xl border border-zinc-300/80 dark:border-zinc-800 bg-[#0c0c0e] shadow-2xl overflow-hidden font-mono text-xs sm:text-sm text-left">
        {/* Terminal Titlebar */}
        <div className="px-4 py-3 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <span className="size-3 rounded-full bg-red-500/80 inline-block" />
            <span className="size-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="size-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 text-zinc-400 font-sans text-xs hidden sm:inline">
              {activeAgentConfig.binaryName} {version} — Ratatui Standalone TUI
            </span>
          </div>

          <div className="flex items-center gap-x-3 text-xs text-zinc-400 font-sans">
            <span className="hidden md:inline text-zinc-500">
              Interactive TUI Simulator
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">
              STANDALONE
            </span>
          </div>
        </div>

        {/* TUI Navigation Tabs */}
        <div className="bg-zinc-950/60 border-b border-zinc-800/80 px-4 py-2 flex items-center gap-x-2 overflow-x-auto scrollbar-none">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg flex items-center gap-x-2 cursor-pointer transition-all duration-150 whitespace-nowrap ${
                  isSelected
                    ? "bg-[var(--agent-glow)] text-[var(--agent-primary-light)] border border-[var(--agent-primary-dark)]/50 font-medium"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                }`}
              >
                <Icon className="size-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TUI Body Content */}
        <div className="p-6 sm:p-8 min-h-[320px] bg-zinc-950/90 text-zinc-300">
          {/* ================================================================
              OXIPULSE TUI CONTENT
              ================================================================ */}
          {agentId.includes("oxi") && (
            <>
              {activeTab === 0 && (
                <div className="space-y-5">
                  <div className="text-zinc-500 text-xs">
                    // Real-Time Kernel Metrics via direct /proc & syscalls (0.08% CPU overhead)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white font-semibold">CPU Cores (x4)</span>
                        <span className="text-[var(--agent-primary-light)] font-bold">
                          {cpuSpike ? "78.4% (Spike Test)" : "4.2% Total"}
                        </span>
                      </div>
                      <div className="space-y-1.5 text-xs text-zinc-400">
                        <div>
                          Core 0:{" "}
                          <span className="text-zinc-300 font-mono">
                            [{cpuSpike ? "|||||||||||||||||||| 84%" : "|||| 14%"}]
                          </span>
                        </div>
                        <div>
                          Core 1:{" "}
                          <span className="text-zinc-300 font-mono">
                            [{cpuSpike ? "|||||||||||||||| 72%" : "||| 9%"}]
                          </span>
                        </div>
                        <div>
                          Core 2:{" "}
                          <span className="text-zinc-300 font-mono">
                            [{cpuSpike ? "|||||||||||||||||||| 81%" : "||||| 18%"}]
                          </span>
                        </div>
                        <div>
                          Core 3:{" "}
                          <span className="text-zinc-300 font-mono">
                            [{cpuSpike ? "||||||||||||||| 68%" : "|| 6%"}]
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-white font-semibold">Memory & Swap</span>
                        <span className="text-emerald-400 font-bold">1.42 GB / 16.0 GB (8.8%)</span>
                      </div>
                      <div className="w-full bg-zinc-800 rounded-full h-2 overflow-hidden">
                        <div className="bg-emerald-400 h-2 rounded-full w-[8.8%]" />
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-400">
                        <div>Cached: 2.14 GB</div>
                        <div>Buffers: 480 MB</div>
                        <div>Swap Used: 0 MB</div>
                        <div>Load Avg: 0.14, 0.08, 0.05</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs">
                    // Block Storage I/O & Filesystem mount tracking
                  </div>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-white font-medium">/dev/nvme0n1 (OS & DB Volume)</span>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          Read: 14.2 MB/s · Write: 6.8 MB/s · IOPS: 940 · IO Util: 1.2%
                        </div>
                      </div>
                      <span className="text-emerald-400 font-semibold">[OPTIMAL]</span>
                    </div>
                    <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 flex items-center justify-between text-xs">
                      <div>
                        <span className="text-white font-medium">Mount Point: /</span>
                        <div className="text-[11px] text-zinc-400 mt-0.5">
                          Used: 42.1 GB / 240.0 GB (17.5%) · Free: 197.9 GB
                        </div>
                      </div>
                      <span className="text-zinc-400 font-mono">ext4 rw,noatime</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs">
                    // OpenTelemetry (OTLP) gRPC & HTTP Exporters
                  </div>
                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">OTLP / gRPC Exporter</span>
                      <span className="text-emerald-400 font-semibold">[● CONNECTED]</span>
                    </div>
                    <div className="text-zinc-400">Endpoint: https://otel.securyblack.com:4317</div>
                    <div className="text-zinc-500">Pushed: 2,410,290 data points · Drop rate: 0.00%</div>
                  </div>
                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Prometheus Scrape Endpoint</span>
                      <span className="text-emerald-400 font-semibold">[● LISTENING]</span>
                    </div>
                    <div className="text-zinc-400">Listen: http://127.0.0.1:9100/metrics</div>
                    <div className="text-zinc-500">Formats: OpenMetrics / Prometheus 2.0</div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-3">
                  <div className="text-zinc-500 text-xs">// Monitored processes & container cgroups</div>
                  <div className="divide-y divide-zinc-800/60 text-xs">
                    <div className="py-2 flex items-center justify-between">
                      <span className="text-white font-medium">postgres:16 (container)</span>
                      <span className="text-zinc-400 font-mono">CPU: 1.4% · RAM: 240 MB</span>
                    </div>
                    <div className="py-2 flex items-center justify-between">
                      <span className="text-white font-medium">nginx-proxy (container)</span>
                      <span className="text-zinc-400 font-mono">CPU: 0.2% · RAM: 32 MB</span>
                    </div>
                    <div className="py-2 flex items-center justify-between">
                      <span className="text-white font-medium">securyblack-api (service)</span>
                      <span className="text-zinc-400 font-mono">CPU: 0.8% · RAM: 110 MB</span>
                    </div>
                    <div className="py-2 flex items-center justify-between">
                      <span className="text-cyan-400 font-medium">oxipulse (agent daemon)</span>
                      <span className="text-emerald-400 font-mono font-semibold">
                        CPU: &lt; 0.1% · RAM: 5.4 MB
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================================================================
              FERROSENTRY TUI CONTENT
              ================================================================ */}
          {agentId.includes("ferro") && (
            <>
              {activeTab === 0 && (
                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs">
                    // Real-Time EDR alerts & kernel audit events
                  </div>
                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-rose-900/50 bg-rose-950/20 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-rose-400 font-bold flex items-center gap-x-1.5">
                          <AlertTriangle className="size-3.5" />
                          [● MITIGATED] SSH Brute-Force Attack
                        </span>
                        <span className="text-zinc-500 font-mono">32 ms ago</span>
                      </div>
                      <div className="text-zinc-300">
                        IP <span className="font-mono text-white">185.220.101.5</span> performed 7 failed SSH handshakes.
                      </div>
                      <div className="text-emerald-400 font-mono text-[11px]">
                        Action: Added to nftables `@blacklist_ssh` for 86400s (Zero CPU impact).
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-zinc-800 bg-zinc-900/30 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 font-bold">[● AUDITED] Sudo Privilege Escalation</span>
                        <span className="text-zinc-500 font-mono">14m ago</span>
                      </div>
                      <div className="text-zinc-400">
                        User <span className="text-white">deploy</span> ran `/usr/bin/systemctl reload nginx` via sudo.
                      </div>
                    </div>

                    {blockedIp && (
                      <div className="p-3.5 rounded-xl border border-amber-500/60 bg-amber-950/30 text-xs animate-in fade-in">
                        <span className="text-amber-300 font-bold">
                          [DEMO] Simulación: IP 198.51.100.42 interceptada y bloqueada en nftables en 18ms.
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs">// Live nftables kernel packet filter rules</div>
                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 font-mono text-xs text-zinc-300 space-y-1">
                    <div className="text-zinc-500">table inet ferrosentry_filter {"{"}</div>
                    <div className="pl-4 text-emerald-400">chain input {"{"}</div>
                    <div className="pl-8">type filter hook input priority -10; policy accept;</div>
                    <div className="pl-8 text-rose-400">
                      ip saddr @blacklist_auto counter drop;
                    </div>
                    <div className="pl-8">ct state established,related accept;</div>
                    <div className="pl-8">tcp dport {"{ 22, 80, 443 }"} accept;</div>
                    <div className="pl-4 text-emerald-400">{"}"}</div>
                    <div className="text-zinc-500">{"}"}</div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-3">
                  <div className="text-zinc-500 text-xs">
                    // File Integrity Monitoring (FIM) via Inotify
                  </div>
                  <div className="divide-y divide-zinc-800/60 text-xs">
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-white font-medium">/etc/passwd</span>
                      <span className="text-emerald-400 font-mono">[SHA256 VERIFIED - OK]</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-white font-medium">/etc/ssh/sshd_config</span>
                      <span className="text-emerald-400 font-mono">[SHA256 VERIFIED - OK]</span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <span className="text-white font-medium">/usr/bin/sudo</span>
                      <span className="text-emerald-400 font-mono">[INTEGRITY CLEAN]</span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs">// Automated CIS Benchmark Audit</div>
                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 flex items-center justify-between text-xs">
                    <div>
                      <div className="text-white font-bold text-sm">CIS Linux Benchmark Score</div>
                      <div className="text-zinc-400 mt-1">78 rules passed · 4 warnings · 0 critical</div>
                    </div>
                    <div className="text-2xl font-bold text-emerald-400">94 / 100</div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================================================================
              CUPRAFLOW TUI CONTENT
              ================================================================ */}
          {agentId.includes("cupra") && (
            <>
              {activeTab === 0 && (
                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs">
                    // Virtual IP (VIP) state & VRRP advertisement
                  </div>
                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-3">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-white font-bold">Virtual IP: 192.168.10.100/24</span>
                      <span
                        className={`font-semibold px-2 py-0.5 rounded ${
                          vipMaster === "node-01"
                            ? "bg-emerald-950/80 text-emerald-300 border border-emerald-800"
                            : "bg-zinc-800 text-zinc-400"
                        }`}
                      >
                        {vipMaster === "node-01" ? "● LOCAL MASTER" : "○ BACKUP STANDBY"}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-zinc-400 pt-2 border-t border-zinc-800">
                      <div>
                        Interface: <span className="text-white font-mono">eth0</span>
                      </div>
                      <div>
                        Virtual MAC: <span className="text-white font-mono">00:00:5e:00:01:01</span>
                      </div>
                      <div>
                        Priority: <span className="text-white font-mono">110</span>
                      </div>
                      <div>
                        VRRP Advert: <span className="text-white font-mono">1000ms</span>
                      </div>
                    </div>
                  </div>

                  {failoverInProgress && (
                    <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-500/50 text-xs text-amber-300 animate-pulse">
                      ⚡ Conmutando VIP failover hacia el nodo secundario en 340ms...
                    </div>
                  )}
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-3">
                  <div className="text-zinc-500 text-xs">// Cluster Nodes & VRRP priority hierarchy</div>
                  <div className="divide-y divide-zinc-800/60 text-xs">
                    <div className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="text-white font-medium">node-01 (This Node - BareMetal)</span>
                        <div className="text-[11px] text-zinc-500">Priority: 110 · Ping: 0.02ms</div>
                      </div>
                      <span className="text-emerald-400 font-mono font-semibold">
                        {vipMaster === "node-01" ? "[HOLDING VIP]" : "[STANDBY]"}
                      </span>
                    </div>
                    <div className="py-2.5 flex items-center justify-between">
                      <div>
                        <span className="text-white font-medium">node-02 (Hetzner Cloud VPS)</span>
                        <div className="text-[11px] text-zinc-500">Priority: 100 · Ping: 0.42ms</div>
                      </div>
                      <span className="text-zinc-400 font-mono font-semibold">
                        {vipMaster === "node-02" ? "[HOLDING VIP]" : "[BACKUP ONLINE]"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs">// Encrypted WireGuard P2P Mesh Overlay</div>
                  <div className="p-4 rounded-xl border border-zinc-800 bg-zinc-900/40 space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">Interface wg0 (10.88.0.1/24)</span>
                      <span className="text-emerald-400 font-semibold">[● MESH READY]</span>
                    </div>
                    <div className="text-zinc-400">Crypto: ChaCha20-Poly1305 · 4 active peers</div>
                    <div className="text-zinc-500">MTU: 1420 · Handshake: 18s ago</div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-3">
                  <div className="text-zinc-500 text-xs">// L4/L7 Active health-checks</div>
                  <div className="divide-y divide-zinc-800/60 text-xs">
                    <div className="py-2 flex items-center justify-between">
                      <span className="text-white font-medium">check_http_api (HTTP :443 /health)</span>
                      <span className="text-emerald-400 font-mono font-semibold">200 OK (1.2ms)</span>
                    </div>
                    <div className="py-2 flex items-center justify-between">
                      <span className="text-white font-medium">check_postgres (TCP :5432)</span>
                      <span className="text-emerald-400 font-mono font-semibold">ACCEPT (0.4ms)</span>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ================================================================
              TITANVAULT TUI CONTENT (DEFAULT)
              ================================================================ */}
          {!agentId.includes("oxi") && !agentId.includes("ferro") && !agentId.includes("cupra") && (
            <>
              {activeTab === 0 && (
                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs">
                    // Configured backup sources (auto-detected or declared in config.toml)
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 font-semibold">[● ACTIVE]</span>
                        <span className="text-xs text-zinc-500">PostgreSQL</span>
                      </div>
                      <div className="text-white font-medium">production-db (securyblack)</div>
                      <div className="text-xs text-zinc-400">
                        Mode: Docker container (<span className="text-cyan-400">postgres</span>)
                      </div>
                      <div className="text-xs text-zinc-500">Stream: Direct stdout pipe</div>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-emerald-400 font-semibold">[● ACTIVE]</span>
                        <span className="text-xs text-zinc-500">Filesystem</span>
                      </div>
                      <div className="text-white font-medium">stack-configs (/opt/stack)</div>
                      <div className="text-xs text-zinc-400">
                        Tar stream excluding <span className="text-amber-400">**/data/**, **/backups/**</span>
                      </div>
                      <div className="text-xs text-zinc-500">Compression: zstd level 3</div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 1 && (
                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs">
                    // Unified Storage Drivers via Apache OpenDAL (Zero external CLI dependencies)
                  </div>

                  <div className="space-y-3">
                    <div className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-x-3">
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        <div>
                          <span className="text-white font-medium">Hetzner Object Storage</span>
                          <span className="text-xs text-zinc-500 ml-2">Bucket: de-nur-sb-bkp-01</span>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 font-mono">CONNECTED (S3 API)</span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-x-3">
                        <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                        <div>
                          <span className="text-white font-medium">Cloudflare R2</span>
                          <span className="text-xs text-zinc-500 ml-2">Bucket: prod-backups</span>
                        </div>
                      </div>
                      <span className="text-xs text-emerald-400 font-mono">CONNECTED (Zero Egress)</span>
                    </div>

                    <div className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/30 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-x-3">
                        <span className="size-2 rounded-full bg-zinc-500" />
                        <div>
                          <span className="text-white font-medium">Google Drive</span>
                          <span className="text-xs text-zinc-500 ml-2">Folder: /Backups/SecuryBlack</span>
                        </div>
                      </div>
                      <span className="text-xs text-zinc-400 font-mono">STANDBY (OAuth2)</span>
                    </div>
                  </div>

                  {testResult && (
                    <div className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 text-xs text-emerald-300">
                      {testResult}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 2 && (
                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs">
                    // Grandfather-Father-Son (GFS) prune policy and client-side encryption
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 space-y-2 text-xs">
                      <div className="text-white font-semibold flex items-center gap-x-2">
                        <Clock className="size-4 text-cyan-400" />
                        <span>GFS Retention Schedule</span>
                      </div>
                      <div className="space-y-1 text-zinc-400">
                        <div>
                          Keep Hourly: <span className="text-white font-bold">24 snapshots</span>
                        </div>
                        <div>
                          Keep Daily: <span className="text-white font-bold">7 snapshots</span>
                        </div>
                        <div>
                          Keep Weekly: <span className="text-white font-bold">4 snapshots</span>
                        </div>
                        <div>
                          Keep Monthly: <span className="text-white font-bold">12 snapshots</span>
                        </div>
                        <div>
                          Keep Yearly: <span className="text-white font-bold">3 snapshots</span>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/30 space-y-2 text-xs">
                      <div className="text-white font-semibold flex items-center gap-x-2">
                        <Shield className="size-4 text-emerald-400" />
                        <span>Client-Side Cryptography</span>
                      </div>
                      <div className="space-y-1 text-zinc-400">
                        <div>
                          Cipher: <span className="text-white font-bold">ChaCha20-Poly1305 AEAD</span>
                        </div>
                        <div>
                          Key Derivation: <span className="text-white font-bold">Argon2id (Zero-Knowledge)</span>
                        </div>
                        <div>
                          Nonce: <span className="text-white font-bold">96-bit CSPRNG per snapshot</span>
                        </div>
                        <div>
                          Integrity: <span className="text-white font-bold">Poly1305 MAC validated on restore</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 3 && (
                <div className="space-y-4">
                  <div className="text-zinc-500 text-xs">
                    // Available remote snapshots across Cloudflare R2 & Hetzner
                  </div>

                  <div className="space-y-2 text-xs">
                    {[
                      {
                        name: "db_securyblack_daily_2026-09-18.sql.zst.enc",
                        size: "28.4 MB (orig: 110.2 MB)",
                        date: "Today, 02:00 UTC",
                        tag: "DAILY",
                      },
                      {
                        name: "db_securyblack_hourly_2026-09-18_14.sql.zst.enc",
                        size: "29.1 MB (orig: 112.5 MB)",
                        date: "2 hours ago",
                        tag: "HOURLY",
                      },
                    ].map((snap, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-lg border border-zinc-800 bg-zinc-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:border-zinc-700"
                      >
                        <div>
                          <div className="text-white font-medium">{snap.name}</div>
                          <div className="text-zinc-500 text-[11px]">
                            {snap.size} · {snap.date}
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded bg-zinc-800 text-[10px] text-zinc-300 font-mono self-start sm:self-auto">
                          {snap.tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {/* Backup running modal overlay for TitanVault */}
          {isRunningBackup && (
            <div className="mt-4 p-4 rounded-xl border border-cyan-500/40 bg-zinc-900/90 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-cyan-400 font-semibold flex items-center gap-x-2">
                  <RefreshCw className="size-3.5 animate-spin" />
                  Streaming Live Pipeline...
                </span>
                <span className="text-white font-mono">{backupProgress}%</span>
              </div>
              <div className="w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-cyan-400 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${backupProgress}%` }}
                />
              </div>
              <div className="space-y-1 font-mono text-[11px] text-zinc-400 max-h-24 overflow-y-auto">
                {backupLog.map((log, i) => (
                  <div key={i} className="truncate">
                    {log}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Terminal Action Bar / Footer */}
        <div className="px-4 py-3 bg-zinc-900/80 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-x-2">
            {agentId.includes("oxi") && (
              <button
                onClick={triggerCpuSpike}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-x-1.5 cursor-pointer transition-colors"
              >
                <Zap className="size-3.5 text-amber-400" />
                <span>Simular Pico de Carga</span>
              </button>
            )}

            {agentId.includes("ferro") && (
              <button
                onClick={triggerBlockIp}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-x-1.5 cursor-pointer transition-colors"
              >
                <Lock className="size-3.5 text-rose-400" />
                <span>Simular Bloqueo Fuerza Bruta</span>
              </button>
            )}

            {agentId.includes("cupra") && (
              <button
                onClick={triggerFailover}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-x-1.5 cursor-pointer transition-colors"
              >
                <RefreshCw className="size-3.5 text-orange-400" />
                <span>Simular Failover VIP</span>
              </button>
            )}

            {!agentId.includes("oxi") && !agentId.includes("ferro") && !agentId.includes("cupra") && (
              <>
                <button
                  onClick={handleTestConnection}
                  className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 border border-zinc-700 flex items-center gap-x-1.5 cursor-pointer transition-colors"
                >
                  <RefreshCw className="size-3.5" />
                  <span>Test Destinos &lt;T&gt;</span>
                </button>
                <button
                  onClick={handleRunBackup}
                  disabled={isRunningBackup}
                  className="px-3 py-1.5 rounded-lg bg-[var(--agent-primary)] text-zinc-950 font-semibold hover:brightness-110 flex items-center gap-x-1.5 cursor-pointer disabled:opacity-50 transition-all"
                >
                  <Play className="size-3.5 fill-current" />
                  <span>Ejecutar Backup &lt;B&gt;</span>
                </button>
              </>
            )}
          </div>

          <div className="text-zinc-500 font-mono text-[11px] flex items-center gap-x-4">
            <span>&lt;Tab&gt; Navegar</span>
            <span>&lt;q&gt; Salir TUI</span>
          </div>
        </div>
      </div>
    </div>
  );
}
