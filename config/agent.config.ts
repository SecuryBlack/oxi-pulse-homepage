export interface InstallCommand {
  os: "Linux" | "Windows" | "Cargo" | "Docker";
  cmd: string;
  badge?: string;
}

export interface StatItem {
  label: string;
  value: string;
  note: string;
}

export interface BentoFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  colSpan?: "col-span-1" | "col-span-2" | "col-span-3";
  tag: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  feature: string;
  agent: string | boolean;
  bashScript: string | boolean;
  competitors: string | boolean;
}

export interface AgentTheme {
  primary: string; // e.g. #06B6D4 (Cyan for TitanVault)
  primaryDark: string; // e.g. #0891B2
  primaryLight: string; // e.g. #38BDF8
  glow: string; // rgba
  accentTag: string; // Tailwind color class for badges
}

export interface EcosystemAgent {
  id: string;
  name: string;
  role: string;
  tagline: string;
  url: string;
  githubUrl: string;
  color: string;
  badge: string;
}

export const ecosystemAgents: EcosystemAgent[] = [
  {
    id: "oxipulse",
    name: "OxiPulse",
    role: "Telemetry & Metrics",
    tagline: "Hardware, container, and OTLP metrics monitoring with near-zero server overhead.",
    url: "https://oxipulse.dev",
    githubUrl: "https://github.com/securyblack/oxi-pulse",
    color: "#33E1BF",
    badge: "OTLP Metrics",
  },
  {
    id: "ferrosentry",
    name: "FerroSentry",
    role: "Security & Hardening",
    tagline: "Lightweight EDR, auditd monitoring, brute-force mitigation, and active firewall control.",
    url: "https://ferrosentry.dev",
    githubUrl: "https://github.com/securyblack/ferro-sentry",
    color: "#F43F5E",
    badge: "EDR & Firewall",
  },
  {
    id: "cupraflow",
    name: "CupraFlow",
    role: "High Availability & Network",
    tagline: "VRRP VIP failover routing, WireGuard mesh, and intelligent traffic balancing.",
    url: "https://cupraflow.dev",
    githubUrl: "https://github.com/securyblack/cupra-flow",
    color: "#F97316",
    badge: "VIP Failover",
  },
  {
    id: "cromoforge",
    name: "CromoForge",
    role: "GitOps & Deployments",
    tagline: "Container continuous delivery and zero-downtime atomic rollouts across your servers.",
    url: "https://cromoforge.dev",
    githubUrl: "https://github.com/securyblack/cromo-forge",
    color: "#6366F1",
    badge: "GitOps Containers",
  },
  {
    id: "titanvault",
    name: "TitanVault",
    role: "Backups & Disaster Recovery",
    tagline: "Stream database dumps directly to cloud storage with zero intermediate disk usage and ChaCha20 encryption.",
    url: "https://titanvault.dev",
    githubUrl: "https://github.com/securyblack/titan-vault",
    color: "#06B6D4",
    badge: "Zero-Disk Backup",
  },
];

export interface AgentConfig {
  id: string;
  name: string;
  binaryName: string;
  productTitle: string;
  badge: string;
  version: string;
  tagline: string;
  description: string;
  theme: AgentTheme;
  githubUrl: string;
  docsUrl: string;
  installCommands: InstallCommand[];
  stats: StatItem[];
  features: BentoFeature[];
  comparisonRows: ComparisonRow[];
  faq: FAQItem[];
}

/* ==========================================================================
   PRESET: OxiPulse (Mint / Emerald) — Real-Time Telemetry & Vital Signs
   ========================================================================== */
export const oxiPulseConfig: AgentConfig = {
  id: "oxi-pulse",
  name: "OxiPulse",
  binaryName: "oxipulse",
  productTitle: "OxiPulse — Lightweight Server Telemetry & Vital Signs",
  badge: "Rust Native · Open Source · Apache 2.0",
  version: "v0.3.13",
  tagline: "Real-Time Vital Signs & Telemetry with Zero Overhead",
  description:
    "Monitor CPU, RAM, disk I/O, OTLP metrics, and network traffic in real time. Ultra-low Rust footprint, native gRPC streaming, and standalone interactive TUI for live troubleshooting.",
  theme: {
    primary: "#33E1BF", // Brand Mint
    primaryDark: "#1FB899",
    primaryLight: "#5EECD2",
    glow: "rgba(51, 225, 191, 0.15)",
    accentTag: "emerald",
  },
  githubUrl: "https://github.com/securyblack/oxi-pulse",
  docsUrl: "https://github.com/securyblack/oxi-pulse#readme",
  installCommands: [
    {
      os: "Linux",
      cmd: "curl -fsSL https://install.oxipulse.dev | sudo bash",
      badge: "Recommended",
    },
    {
      os: "Windows",
      cmd: "irm https://install.oxipulse.dev | iex",
    },
    {
      os: "Cargo",
      cmd: "cargo install oxi-pulse",
    },
  ],
  stats: [
    { label: "CPU Overhead", value: "< 0.1%", note: "Invisible in production" },
    { label: "RAM Footprint", value: "< 8 MB", note: "Static Rust binary" },
    { label: "Metrics Latency", value: "100 ms", note: "Real-time streaming" },
    { label: "Protocol", value: "OTLP / gRPC", note: "OpenTelemetry compliant" },
  ],
  features: [
    {
      id: "telemetry",
      title: "Kernel-Level Telemetry",
      subtitle: "Zero-Overhead Sampling",
      description:
        "Samples directly from /proc and kernel counters without spawning shells or heavy Node/Python runtimes.",
      colSpan: "col-span-2",
      tag: "Architecture",
    },
    {
      id: "otlp",
      title: "Native OTLP Compatibility",
      subtitle: "OpenTelemetry Standard",
      description:
        "Exports standard OTLP metrics to Prometheus, VictoriaMetrics, Datadog, or SecuryBlack Cloud.",
      colSpan: "col-span-1",
      tag: "Standard",
    },
    {
      id: "tui",
      title: "Interactive htop-Style Console",
      subtitle: "Standalone TUI (top)",
      description:
        "Launch 'oxipulse top' on any server to view real-time CPU graphs, memory usage, and processes without extra dependencies.",
      colSpan: "col-span-1",
      tag: "Diagnostics",
    },
    {
      id: "alerts",
      title: "Edge Anomaly Detection",
      subtitle: "Local Thresholds",
      description:
        "Evaluates disk saturation, RAM exhaustion, and network spikes locally at the node before cascading failures occur.",
      colSpan: "col-span-2",
      tag: "Resilience",
    },
  ],
  comparisonRows: [
    {
      feature: "RAM Footprint",
      agent: "< 8 MB (Static Rust)",
      bashScript: "Blind scripts (Disconnected)",
      competitors: "150–350 MB (Datadog/Node/Telegraf)",
    },
    {
      feature: "Sampling Latency",
      agent: "100 ms (gRPC streaming)",
      bashScript: "1–5 minutes (cron)",
      competitors: "15–60 s (HTTP scraping)",
    },
    {
      feature: "Interactive Console (TUI)",
      agent: "Native ('oxipulse top')",
      bashScript: "Requires manual htop/top",
      competitors: "No (Web dashboard only)",
    },
    {
      feature: "OpenTelemetry Exporter",
      agent: "Native OTLP / Protobuf",
      bashScript: "No",
      competitors: "Requires OTEL Collector daemon",
    },
    {
      feature: "SecuryBlack Cloud Integration",
      agent: "Native (gRPC Tunnel + Heartbeats)",
      bashScript: "None",
      competitors: "None",
    },
  ],
  faq: [
    {
      question: "Does OxiPulse require a SecuryBlack Cloud account?",
      answer:
        "No. OxiPulse is 100% open source under Apache-2.0. You can run it fully standalone with its 'oxipulse top' TUI or export telemetry to your own OTLP/Prometheus collector without ever creating an account.",
    },
    {
      question: "How does it achieve such low CPU utilization?",
      answer:
        "It is written in pure, native Rust with no garbage collector or runtime overhead. Metric sampling reads kernel counters through direct syscalls without process forking.",
    },
    {
      question: "Is it compatible with Docker and Podman containers?",
      answer:
        "Yes, it automatically detects cgroups v1 and v2 container namespaces, breaking down resource consumption per container in real time.",
    },
  ],
};

/* ==========================================================================
   PRESET: FerroSentry (Scarlet / Rose) — Host Security & EDR
   ========================================================================== */
export const ferroSentryConfig: AgentConfig = {
  id: "ferro-sentry",
  name: "FerroSentry",
  binaryName: "ferrosentry",
  productTitle: "FerroSentry — High-Performance Host Security & EDR Agent",
  badge: "Rust Native · Open Source · Apache 2.0",
  version: "v0.2.25",
  tagline: "Active Server Defense & Continuous Posture Auditing",
  description:
    "Ultralightweight host security and EDR in Rust. Continuous auditd monitoring, SSH brute-force mitigation, dynamic nftables/UFW firewall management, and File Integrity Monitoring (FIM) with a standalone TUI.",
  theme: {
    primary: "#F43F5E", // Scarlet / Rose
    primaryDark: "#E11D48",
    primaryLight: "#FB7185",
    glow: "rgba(244, 63, 94, 0.15)",
    accentTag: "rose",
  },
  githubUrl: "https://github.com/securyblack/ferro-sentry",
  docsUrl: "https://github.com/securyblack/ferro-sentry#readme",
  installCommands: [
    {
      os: "Linux",
      cmd: "curl -fsSL https://install.ferrosentry.dev | sudo bash",
      badge: "Recommended",
    },
    {
      os: "Windows",
      cmd: "irm https://install.ferrosentry.dev | iex",
    },
    {
      os: "Cargo",
      cmd: "cargo install ferro-sentry",
    },
  ],
  stats: [
    { label: "RAM Footprint", value: "< 15 MB", note: "Zero JVM / Python" },
    { label: "Brute-Force Mitigation", value: "< 50 ms", note: "Immediate nftables blocking" },
    { label: "FIM Monitoring", value: "Inotify", note: "Real-time kernel events" },
    { label: "Compliance", value: "CIS Benchmark", note: "Automated audit" },
  ],
  features: [
    {
      id: "edr",
      title: "Active Detection & Response",
      subtitle: "Real-time Host EDR",
      description:
        "Intercepts suspicious behavior, anomalous shell spawns, and privilege escalation using Linux auditd.",
      colSpan: "col-span-2",
      tag: "EDR",
    },
    {
      id: "firewall",
      title: "Network Shield & Firewall",
      subtitle: "nftables / iptables / UFW",
      description:
        "Applies automated blacklists for malicious IPs and syncs boundary rules without restarting network services.",
      colSpan: "col-span-1",
      tag: "Firewall",
    },
    {
      id: "tui",
      title: "Interactive Security TUI",
      subtitle: "Terminal Inspector",
      description:
        "Inspect live security events, active alerts, and firewall rules directly in your terminal via 'ferrosentry tui'.",
      colSpan: "col-span-1",
      tag: "TUI",
    },
    {
      id: "fim",
      title: "File Integrity Monitoring (FIM)",
      subtitle: "Real-time File Integrity",
      description:
        "Instant cryptographic auditing of unauthorized modifications in /etc, /bin, and critical system paths.",
      colSpan: "col-span-2",
      tag: "Integrity",
    },
  ],
  comparisonRows: [
    {
      feature: "Memory Consumption",
      agent: "< 15 MB RAM (Rust)",
      bashScript: "Fail2ban + UFW scripts",
      competitors: "600 MB – 1.5 GB (CrowdStrike/Wazuh)",
    },
    {
      feature: "Brute-force Blocking",
      agent: "< 50 ms (Native nftables)",
      bashScript: "5–30 s (Python log parsing)",
      competitors: "Variable (Heavy agents)",
    },
    {
      feature: "Interactive Console (TUI)",
      agent: "Native ('ferrosentry tui')",
      bashScript: "No",
      competitors: "No (Web panel only)",
    },
    {
      feature: "Continuous FIM Auditing",
      agent: "Kernel inotify / fanotify",
      bashScript: "Periodic cron diff",
      competitors: "Batch scanning",
    },
    {
      feature: "SecuryBlack Cloud Integration",
      agent: "Native (gRPC Tunnel + EDR)",
      bashScript: "None",
      competitors: "None",
    },
  ],
  faq: [
    {
      question: "Does FerroSentry replace Fail2ban?",
      answer:
        "Yes, and much more efficiently. Instead of parsing text log files with regular expressions in Python, FerroSentry hooks into system socket events and enforces nftables drops in nanoseconds.",
    },
    {
      question: "Can I use it without SecuryBlack Cloud?",
      answer:
        "Absolutely. It is open source under Apache-2.0. You can configure it locally in /etc/ferrosentry/config.toml and inspect your security posture with the built-in TUI.",
    },
    {
      question: "Does it affect database or application performance?",
      answer:
        "No. It is optimized with Tokio async threads and stays below 0.2% CPU utilization, making it completely safe for production nodes.",
    },
  ],
};

/* ==========================================================================
   PRESET: CupraFlow (Amber / Copper) — High Availability & Network
   ========================================================================== */
export const cupraFlowConfig: AgentConfig = {
  id: "cupra-flow",
  name: "CupraFlow",
  binaryName: "cupraflow",
  productTitle: "CupraFlow — Resilient High-Availability & Network Traffic Agent",
  badge: "Rust Native · Open Source · Apache 2.0",
  version: "v0.1.3",
  tagline: "High-Availability VIP Failover & Intelligent Network Routing",
  description:
    "Resilient high-availability and networking. Virtual IP (VIP) floating failover via modern VRRP, secure WireGuard overlay mesh, intelligent health probing, and sub-second failover with an interactive TUI.",
  theme: {
    primary: "#F97316", // Amber / Copper
    primaryDark: "#EA580C",
    primaryLight: "#FB923C",
    glow: "rgba(249, 115, 22, 0.15)",
    accentTag: "orange",
  },
  githubUrl: "https://github.com/securyblack/cupra-flow",
  docsUrl: "https://github.com/securyblack/cupra-flow#readme",
  installCommands: [
    {
      os: "Linux",
      cmd: "curl -fsSL https://install.cupraflow.dev | sudo bash",
      badge: "Recommended",
    },
    {
      os: "Windows",
      cmd: "irm https://install.cupraflow.dev | iex",
    },
    {
      os: "Cargo",
      cmd: "cargo install cupra-flow",
    },
  ],
  stats: [
    { label: "Failover Speed", value: "< 500 ms", note: "Sub-second failure detection" },
    { label: "RAM Footprint", value: "< 12 MB", note: "Static Rust binary" },
    { label: "VRRP Protocol", value: "v2 / v3 native", note: "Virtual Router Redundancy" },
    { label: "WireGuard Mesh", value: "Kernel crypto", note: "P2P encrypted tunnels" },
  ],
  features: [
    {
      id: "vip",
      title: "Floating VIP Failover",
      subtitle: "Zero Downtime",
      description:
        "Immediately migrates the virtual or elastic service IP to a backup node if the active master becomes unreachable.",
      colSpan: "col-span-2",
      tag: "Availability",
    },
    {
      id: "wireguard",
      title: "WireGuard Overlay Mesh",
      subtitle: "Encrypted Overlay Mesh",
      description:
        "Interconnects hybrid clusters across Hetzner, AWS, and bare metal with auto-discovered point-to-point tunnels.",
      colSpan: "col-span-1",
      tag: "Private Network",
    },
    {
      id: "tui",
      title: "Network Status TUI",
      subtitle: "Interactive Cluster Status",
      description:
        "Monitor MASTER/BACKUP node states, VRRP ping latencies, and WireGuard peers in real time with 'cupraflow tui'.",
      colSpan: "col-span-1",
      tag: "TUI",
    },
    {
      id: "health",
      title: "Multi-Layer Health Checks",
      subtitle: "L4 / L7 Active Probing",
      description:
        "Verifies HTTP/gRPC socket responsiveness and database health before routing traffic, going far beyond basic ICMP ping.",
      colSpan: "col-span-2",
      tag: "Healthcheck",
    },
  ],
  comparisonRows: [
    {
      feature: "Failover Switching Time",
      agent: "< 500 ms (Optimized VRRP)",
      bashScript: "Manual restart scripts",
      competitors: "3–15 s (Legacy keepalived / DNS)",
    },
    {
      feature: "Interactive Console (TUI)",
      agent: "Native ('cupraflow tui')",
      bashScript: "No (Syslog only)",
      competitors: "No",
    },
    {
      feature: "Built-in Encrypted Mesh",
      agent: "Native WireGuard P2P",
      bashScript: "Requires manual OpenVPN / IPsec",
      competitors: "Not included",
    },
    {
      feature: "Custom L7 Health Checks",
      agent: "Native (HTTP/TCP/Custom scripts)",
      bashScript: "Fragile shell scripts",
      competitors: "Basic only",
    },
    {
      feature: "SecuryBlack Cloud Integration",
      agent: "Native (gRPC Tunnel + Failover)",
      bashScript: "None",
      competitors: "None",
    },
  ],
  faq: [
    {
      question: "How does floating IP failover work across multi-cloud environments?",
      answer:
        "CupraFlow supports Layer-2 VRRP on private cloud networks (Hetzner, Proxmox, bare metal) as well as direct Cloud Provider API failover (Hetzner Floating IP, AWS EIP, DigitalOcean Floating IP) to switch public IPs dynamically.",
    },
    {
      question: "Do I need a complex Kubernetes or Consul cluster?",
      answer:
        "No. CupraFlow is purpose-built to eliminate unnecessary complexity. With just 2 or 3 standard VPS nodes, you achieve instant high availability with sub-second failover.",
    },
    {
      question: "Can I run it standalone without SecuryBlack Cloud?",
      answer:
        "Yes, CupraFlow is fully open source under Apache-2.0. You can install it on your servers and manage everything locally via TOML configuration and the interactive TUI.",
    },
  ],
};

/* ==========================================================================
   PRESET: CromoForge (Indigo / Chrome) — GitOps & Deployments
   ========================================================================== */
export const cromoForgeConfig: AgentConfig = {
  id: "cromo-forge",
  name: "CromoForge",
  binaryName: "cromoforge",
  productTitle: "CromoForge — Autonomous GitOps & Container Continuous Delivery",
  badge: "Rust Native · Open Source · Apache 2.0",
  version: "v0.1.4",
  tagline: "Zero-Downtime GitOps & Container Deployments on Any Server",
  description:
    "Atomic deployments and GitOps synchronization directly on your servers. Intelligent Docker/Podman image pulls, pre-switch health checks, instant zero-downtime rollback, and interactive TUI.",
  theme: {
    primary: "#6366F1", // Indigo / Chrome
    primaryDark: "#4F46E5",
    primaryLight: "#818CF8",
    glow: "rgba(99, 102, 241, 0.15)",
    accentTag: "indigo",
  },
  githubUrl: "https://github.com/securyblack/cromo-forge",
  docsUrl: "https://github.com/securyblack/cromo-forge#readme",
  installCommands: [
    {
      os: "Linux",
      cmd: "curl -fsSL https://install.cromoforge.dev | sudo bash",
      badge: "Recommended",
    },
    {
      os: "Windows",
      cmd: "irm https://install.cromoforge.dev | iex",
    },
    {
      os: "Cargo",
      cmd: "cargo install cromo-forge",
    },
  ],
  stats: [
    { label: "Deployment Time", value: "< 3s", note: "Atomic container swap" },
    { label: "RAM Footprint", value: "< 18 MB", note: "Static Rust binary" },
    { label: "Rollback", value: "Zero-Latency", note: "Previous image preserved" },
    { label: "Supported Engines", value: "Docker & Podman", note: "Native socket API" },
  ],
  features: [
    {
      id: "gitops",
      title: "Local Declarative GitOps",
      subtitle: "Webhook & Polling",
      description:
        "Syncs compose files and containers automatically on Git commits or release tags without bulky CI runners.",
      colSpan: "col-span-2",
      tag: "GitOps",
    },
    {
      id: "atomic",
      title: "Atomic Container Replacement",
      subtitle: "Zero-Downtime Rolling Switch",
      description:
        "Starts the new container, validates health checks, and only then shifts traffic and drains the older instance.",
      colSpan: "col-span-1",
      tag: "Zero-Downtime",
    },
    {
      id: "tui",
      title: "Deployment TUI Cockpit",
      subtitle: "Deployment Cockpit",
      description:
        "Inspect running containers, release history, and streaming logs, or trigger rollbacks with a single keystroke.",
      colSpan: "col-span-1",
      tag: "TUI",
    },
    {
      id: "rollback",
      title: "Automated Failure Rollback",
      subtitle: "Self-Healing Watchdog",
      description:
        "If the new version returns 5xx errors or crashes within the warm-up window, CromoForge instantly restores the previous working version.",
      colSpan: "col-span-2",
      tag: "Resilience",
    },
  ],
  comparisonRows: [
    {
      feature: "Deployment Complexity",
      agent: "Single binary ('cromoforge')",
      bashScript: "Fragile docker pull/restart scripts",
      competitors: "Kubernetes / Helm / Heavy CI agents",
    },
    {
      feature: "Atomic Rollback",
      agent: "Instant (Keeps previous image tagged)",
      bashScript: "Manual rebuild & redeploy",
      competitors: "Rollout undo",
    },
    {
      feature: "Interactive Console (TUI)",
      agent: "Native ('cromoforge tui')",
      bashScript: "No",
      competitors: "K9s (Requires k8s cluster)",
    },
    {
      feature: "Memory Footprint",
      agent: "< 18 MB (Rust)",
      bashScript: "Negligible but blind",
      competitors: "1–4 GB (K3s/k8s plane / GitLab runner)",
    },
    {
      feature: "SecuryBlack Cloud Integration",
      agent: "Native (gRPC tunnel + webhooks)",
      bashScript: "None",
      competitors: "None",
    },
  ],
  faq: [
    {
      question: "Does CromoForge replace GitHub Actions or GitLab CI?",
      answer:
        "It complements your CI pipeline: your CI builds and pushes the container image to the registry, while CromoForge handles safe, atomic on-host deployment with automated rollbacks.",
    },
    {
      question: "Does it require root privileges?",
      answer:
        "It can connect to the Docker daemon socket via the docker group or operate rootless with Podman for enhanced security.",
    },
    {
      question: "Can I use it completely standalone?",
      answer:
        "Yes, CromoForge is free and open-source software under Apache-2.0. You can run it on any Linux/Windows server without requiring SecuryBlack Cloud.",
    },
  ],
};

/* ==========================================================================
   PRESET: TitanVault (Titanium / Cyan) — Backup & Disaster Recovery
   ========================================================================== */
export const titanVaultConfig: AgentConfig = {
  id: "titan-vault",
  name: "TitanVault",
  binaryName: "titanvault",
  productTitle: "TitanVault — Resilient Multi-Cloud Backup Agent",
  badge: "Rust Native · Open Source · Apache 2.0",
  version: "v0.1.0",
  tagline: "High-Performance Streaming Backups & Disaster Recovery",
  description:
    "Zero intermediate disk storage. Streams database dumps, compresses with zstd, encrypts at source with ChaCha20-Poly1305, and syncs directly to Cloudflare R2, Hetzner, and Google Drive with an interactive TUI.",
  theme: {
    primary: "#06B6D4", // Cyan
    primaryDark: "#0891B2",
    primaryLight: "#38BDF8",
    glow: "rgba(6, 182, 212, 0.15)",
    accentTag: "cyan",
  },
  githubUrl: "https://github.com/securyblack/titan-vault",
  docsUrl: "https://github.com/securyblack/titan-vault#readme",
  installCommands: [
    {
      os: "Linux",
      cmd: "curl -fsSL https://install.titanvault.dev | sudo bash",
      badge: "Recommended",
    },
    {
      os: "Windows",
      cmd: "irm https://install.titanvault.dev | iex",
    },
    {
      os: "Cargo",
      cmd: "cargo install titan-vault",
    },
  ],
  stats: [
    { label: "Disk Footprint", value: "0 MB", note: "Direct cloud streaming" },
    { label: "RAM Footprint", value: "< 20 MB", note: "Static Rust binary" },
    { label: "Encryption", value: "ChaCha20", note: "Zero-Knowledge at source" },
    { label: "Multi-Cloud", value: "OpenDAL", note: "R2, Hetzner, AWS, GDrive" },
  ],
  features: [
    {
      id: "streaming",
      title: "Zero-Disk Streaming Dumps",
      subtitle: "Zero-Disk Footprint",
      description:
        "Traditional scripts dump entire databases to local disk before uploading, risking VPS storage saturation. TitanVault streams dumps through memory straight to remote object storage.",
      colSpan: "col-span-2",
      tag: "Architecture",
    },
    {
      id: "crypto",
      title: "Zero-Knowledge Encryption",
      subtitle: "ChaCha20-Poly1305 AEAD",
      description:
        "Your data is encrypted with client-side symmetric keys before leaving your machine for Cloudflare, Hetzner, or Google Drive.",
      colSpan: "col-span-1",
      tag: "Security",
    },
    {
      id: "tui",
      title: "Standalone TUI (Ratatui)",
      subtitle: "Zero Lock-in",
      description:
        "Configure data sources, test S3 endpoints with <T>, explore snapshots, and trigger restores with <R> without requiring a cloud account.",
      colSpan: "col-span-1",
      tag: "Experience",
    },
    {
      id: "gfs",
      title: "Smart GFS Retention Policy",
      subtitle: "Grandfather-Father-Son",
      description:
        "Automated lifecycle management pruning hourly, daily, weekly, monthly, and yearly backups across remote buckets without manual scripts.",
      colSpan: "col-span-2",
      tag: "Automation",
    },
  ],
  comparisonRows: [
    {
      feature: "Intermediate Disk Usage",
      agent: "0 MB (Direct memory stream)",
      bashScript: "2x database size (Fills VPS disk)",
      competitors: "Variable (Requires temporary cache)",
    },
    {
      feature: "Interactive Console (TUI)",
      agent: "Native (Ratatui)",
      bashScript: "No (Blind shell scripts)",
      competitors: "No (Complex CLI flags only)",
    },
    {
      feature: "Authenticated Encryption",
      agent: "ChaCha20-Poly1305 Zero-Knowledge",
      bashScript: "Plain text or rclone crypt",
      competitors: "AES / GPG",
    },
    {
      feature: "Native Multi-Cloud",
      agent: "Apache OpenDAL (R2/Hetzner/Drive)",
      bashScript: "Requires awscli + rclone",
      competitors: "S3-compatible only",
    },
    {
      feature: "SecuryBlack Cloud Integration",
      agent: "Native (gRPC Tunnel + Heartbeats)",
      bashScript: "Disconnected manual scripts",
      competitors: "None",
    },
  ],
  faq: [
    {
      question: "Can I use TitanVault completely free without SecuryBlack Cloud?",
      answer:
        "Yes. TitanVault is 100% open source under Apache-2.0. Install it on any VPS, launch the TUI with 'titanvault tui', and schedule backups as systemd services with zero vendor lock-in.",
    },
    {
      question: "Why does it not fill the disk during large PostgreSQL dumps?",
      answer:
        "TitanVault never writes intermediate dump files to disk. It pipes stdout directly through zstd compression and memory encryption, uploading chunks to Cloudflare R2 or Hetzner in real time.",
    },
    {
      question: "What happens if the internet connection drops mid-backup?",
      answer:
        "The agent detects the network disruption, safely aborts the remote multipart upload, and logs a clean failure report. Your source database is untouched, and heartbeat telemetry alerts you immediately.",
    },
  ],
};

/* ==========================================================================
   PRESET DICTIONARY
   ========================================================================== */
export const agentPresets: Record<string, AgentConfig> = {
  "oxi-pulse": oxiPulseConfig,
  "oxipulse": oxiPulseConfig,
  "ferro-sentry": ferroSentryConfig,
  "ferrosentry": ferroSentryConfig,
  "cupra-flow": cupraFlowConfig,
  "cupraflow": cupraFlowConfig,
  "cromo-forge": cromoForgeConfig,
  "cromoforge": cromoForgeConfig,
  "titan-vault": titanVaultConfig,
  "titanvault": titanVaultConfig,
};

/* ==========================================================================
   ACTIVE CONFIGURATION: Exports current agent for this web
   ========================================================================== */
export const activeAgentConfig: AgentConfig = oxiPulseConfig;
