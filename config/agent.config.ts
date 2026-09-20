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
    role: "Telemetría & Métricas",
    tagline: "Supervisión de hardware, contenedores y métricas OTLP sin sobrecargar el servidor.",
    url: "https://oxipulse.dev",
    githubUrl: "https://github.com/securyblack/oxi-pulse",
    color: "#33E1BF",
    badge: "Métricas OTLP",
  },
  {
    id: "ferrosentry",
    name: "FerroSentry",
    role: "Seguridad & Hardening",
    tagline: "EDR ligero, auditoría auditd, detección de fuerza bruta y gestión activa de cortafuegos.",
    url: "https://ferrosentry.dev",
    githubUrl: "https://github.com/securyblack/ferro-sentry",
    color: "#F43F5E",
    badge: "EDR & Firewall",
  },
  {
    id: "cupraflow",
    name: "CupraFlow",
    role: "Alta Disponibilidad & Red",
    tagline: "Enrutamiento VIP failover keepalived, mallas WireGuard y balanceo de tráfico.",
    url: "https://cupraflow.dev",
    githubUrl: "https://github.com/securyblack/cupra-flow",
    color: "#F97316",
    badge: "Failover VIP",
  },
  {
    id: "cromoforge",
    name: "CromoForge",
    role: "GitOps & Despliegues",
    tagline: "Gestión de contenedores y despliegues atómicos zero-downtime en tu infraestructura.",
    url: "https://cromoforge.dev",
    githubUrl: "https://github.com/securyblack/cromo-forge",
    color: "#6366F1",
    badge: "GitOps Contenedores",
  },
  {
    id: "titanvault",
    name: "TitanVault",
    role: "Backups & Disaster Recovery",
    tagline: "Vuelca bases de datos en streaming sin tocar disco, cifrado ChaCha20 y sync multi-cloud.",
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
    "Monitoriza CPU, memoria RAM, I/O de disco, métricas OTLP y tráfico de red en tiempo real. Huella imperceptible en Rust, streaming gRPC nativo y consola TUI standalone para diagnóstico en caliente.",
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
      badge: "Recomendado",
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
    { label: "CPU Overhead", value: "< 0.1%", note: "Invisible en producción" },
    { label: "Huella de RAM", value: "< 8 MB", note: "Binario estático Rust" },
    { label: "Latencia Métricas", value: "100 ms", note: "Streaming en tiempo real" },
    { label: "Protocolo", value: "OTLP / gRPC", note: "OpenTelemetry compatible" },
  ],
  features: [
    {
      id: "telemetry",
      title: "Telemetría a nivel de kernel",
      subtitle: "Zero-Overhead Sampling",
      description:
        "Lee directamente de /proc y contadores del kernel sin invocar shells ni subprocesos pesados de Node o Python.",
      colSpan: "col-span-2",
      tag: "Arquitectura",
    },
    {
      id: "otlp",
      title: "Compatibilidad OTLP nativa",
      subtitle: "OpenTelemetry Standard",
      description:
        "Exporta métricas estándar OTLP hacia Prometheus, VictoriaMetrics, Datadog o SecuryBlack Cloud.",
      colSpan: "col-span-1",
      tag: "Estándar",
    },
    {
      id: "tui",
      title: "Consola interactiva htop-style",
      subtitle: "Standalone TUI (top)",
      description:
        "Lanza 'oxipulse top' en cualquier servidor para ver gráficos de carga, uso de memoria y procesos sin instalar nada más.",
      colSpan: "col-span-1",
      tag: "Diagnóstico",
    },
    {
      id: "alerts",
      title: "Detección de anomalías en origen",
      subtitle: "Local Thresholds",
      description:
        "Evalúa umbrales locales de saturación de disco, saturación de RAM o anomalías de red antes de colapsar el nodo.",
      colSpan: "col-span-2",
      tag: "Resiliencia",
    },
  ],
  comparisonRows: [
    {
      feature: "Consumo de RAM",
      agent: "< 8 MB (Rust estático)",
      bashScript: "Scripts ciegos (Desconectados)",
      competitors: "150-350 MB (Datadog/Node/Telegraf)",
    },
    {
      feature: "Latencia de muestreo",
      agent: "100 ms (gRPC streaming)",
      bashScript: "1-5 minutos (cron)",
      competitors: "15-60 s (Scraping HTTP)",
    },
    {
      feature: "Consola interactiva (TUI)",
      agent: "Nativa ('oxipulse top')",
      bashScript: "Requiere htop/top manual",
      competitors: "No (Solo dashboard web)",
    },
    {
      feature: "Exportador OpenTelemetry",
      agent: "Nativo OTLP / Protobuf",
      bashScript: "No",
      competitors: "Requiere OTEL Collector daemon",
    },
    {
      feature: "Integración SecuryBlack Cloud",
      agent: "Nativa (gRPC Tunnel + Heartbeats)",
      bashScript: "Ninguna",
      competitors: "Ninguna",
    },
  ],
  faq: [
    {
      question: "¿OxiPulse requiere cuenta en SecuryBlack Cloud?",
      answer:
        "No. OxiPulse es 100% de código abierto bajo licencia Apache-2.0. Puedes usarlo de forma autónoma con su TUI 'oxipulse top' o exportando a tu propio colector OTLP/Prometheus sin crearte cuenta.",
    },
    {
      question: "¿Cómo consigue un consumo tan bajo de CPU?",
      answer:
        "Está compilado en Rust nativo sin recolector de basura ni runtime. Los muestreos se realizan accediendo a contadores del kernel por syscalls eficientes sin fork de procesos.",
    },
    {
      question: "¿Es compatible con contenedores Docker y Podman?",
      answer:
        "Sí, detecta automáticamente namespaces de contenedores cgroups v1 y v2, desglosando el consumo de recursos por contenedor en tiempo real.",
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
    "EDR ultraligero y endurecimiento de host en Rust. Monitorización continua de auditd, detección de fuerza bruta SSH, cortafuegos dinámico con nftables/UFW y auditoría de integridad de archivos (FIM) con consola TUI.",
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
      badge: "Recomendado",
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
    { label: "Huella de RAM", value: "< 15 MB", note: "Zero JVM / Python" },
    { label: "Detección Brute-Force", value: "< 50 ms", note: "Bloqueo nftables en origen" },
    { label: "Monitoreo FIM", value: "Inotify", note: "Detección kernel en tiempo real" },
    { label: "Compliance", value: "CIS Benchmark", note: "Auditoría automatizada" },
  ],
  features: [
    {
      id: "edr",
      title: "Detección y Respuesta Activa",
      subtitle: "Real-time Host EDR",
      description:
        "Intercepta comportamientos sospechosos, spawn de shells anómalas y elevación indebida de privilegios mediante auditd.",
      colSpan: "col-span-2",
      tag: "EDR",
    },
    {
      id: "firewall",
      title: "Escudo de Red & Cortafuegos",
      subtitle: "nftables / iptables / UFW",
      description:
        "Aplica listas negras automáticas de IPs atacantes y sincroniza reglas perimetrales sin reiniciar servicios.",
      colSpan: "col-span-1",
      tag: "Cortafuegos",
    },
    {
      id: "tui",
      title: "Consola de Seguridad TUI",
      subtitle: "Terminal Inspector",
      description:
        "Explora eventos de seguridad, alertas activas y reglas de cortafuegos en vivo mediante 'ferrosentry tui'.",
      colSpan: "col-span-1",
      tag: "TUI",
    },
    {
      id: "fim",
      title: "Integridad de Archivos (FIM)",
      subtitle: "File Integrity Monitoring",
      description:
        "Auditoría criptográfica instantánea de modificaciones no autorizadas en /etc, /bin y directorios críticos.",
      colSpan: "col-span-2",
      tag: "Integridad",
    },
  ],
  comparisonRows: [
    {
      feature: "Consumo de memoria",
      agent: "< 15 MB RAM (Rust)",
      bashScript: "Scripts Fail2ban + UFW",
      competitors: "600 MB - 1.5 GB (CrowdStrike/Wazuh)",
    },
    {
      feature: "Bloqueo de fuerza bruta",
      agent: "< 50 ms (nftables nativo)",
      bashScript: "5-30 s (Parsing logs en Python)",
      competitors: "Variable (Agente pesado)",
    },
    {
      feature: "Consola interactiva (TUI)",
      agent: "Nativa ('ferrosentry tui')",
      bashScript: "No",
      competitors: "No (Solo panel web)",
    },
    {
      feature: "Auditoría FIM continua",
      agent: "Inotify/Fanotify en kernel",
      bashScript: "Diff periódico por cron",
      competitors: "Escaneos por lotes",
    },
    {
      feature: "Integración SecuryBlack Cloud",
      agent: "Nativa (gRPC Tunnel + EDR)",
      bashScript: "Ninguna",
      competitors: "Ninguna",
    },
  ],
  faq: [
    {
      question: "¿Sustituye FerroSentry a Fail2ban?",
      answer:
        "Sí, de forma mucho más eficiente. En vez de parsear ficheros de texto con expresiones regulares en Python, FerroSentry escucha eventos de socket del sistema y bloquea con nftables en nanosegundos.",
    },
    {
      question: "¿Puedo usarlo sin SecuryBlack Cloud?",
      answer:
        "Totalmente. Es software libre Apache-2.0. Puedes configurarlo en /etc/ferrosentry/config.toml y gestionar la seguridad con su TUI interactiva.",
    },
    {
      question: "¿Afecta al rendimiento de bases de datos o apps en el servidor?",
      answer:
        "No. Está optimizado con threads asíncronos Tokio y consumo de CPU inferior al 0.2%, sin impactar en entornos de producción.",
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
    "Alta disponibilidad sin fisuras. Gestión de IP flotante VIP mediante VRRP/Keepalived moderno, enmallado seguro con WireGuard, health-checks inteligentes y conmutación por fallo en milisegundos con TUI interactiva.",
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
      badge: "Recomendado",
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
    { label: "Conmutación Failover", value: "< 500 ms", note: "Detección de fallo ultra-rápida" },
    { label: "Huella de RAM", value: "< 12 MB", note: "Binario estático Rust" },
    { label: "Protocolo VRRP", value: "v2 / v3 nativo", note: "Virtual Router Redundancy" },
    { label: "Malla WireGuard", value: "Kernel crypto", note: "Túneles cifrados P2P" },
  ],
  features: [
    {
      id: "vip",
      title: "Failover de IP Flotante VIP",
      subtitle: "Zero Downtime",
      description:
        "Transfiere la IP elástica o virtual de servicio inmediatamente al nodo secundario si el nodo primario deja de responder.",
      colSpan: "col-span-2",
      tag: "Disponibilidad",
    },
    {
      id: "wireguard",
      title: "Malla Privada WireGuard",
      subtitle: "Encrypted Overlay Mesh",
      description:
        "Interconecta clusters híbridos entre Hetzner, AWS y bare-metal mediante túneles seguros punto a punto con autodescubrimiento.",
      colSpan: "col-span-1",
      tag: "Red Privada",
    },
    {
      id: "tui",
      title: "Consola TUI de Estado de Red",
      subtitle: "Interactive Cluster Status",
      description:
        "Visualiza el estado de los nodos MASTER/BACKUP, latencia de ping VRRP y peers WireGuard mediante 'cupraflow tui'.",
      colSpan: "col-span-1",
      tag: "TUI",
    },
    {
      id: "health",
      title: "Health-Checks Multicapa",
      subtitle: "L4 / L7 Active Probing",
      description:
        "Verifica no solo el ping del host sino la salud del socket HTTP/gRPC de tu base de datos o servicio antes de enrutar tráfico.",
      colSpan: "col-span-2",
      tag: "Healthcheck",
    },
  ],
  comparisonRows: [
    {
      feature: "Conmutación ante caídas",
      agent: "< 500 ms (VRRP optimizado)",
      bashScript: "Scripts de reinicio manual",
      competitors: "3-15 s (Keepalived clásico / DNS)",
    },
    {
      feature: "Consola interactiva (TUI)",
      agent: "Nativa ('cupraflow tui')",
      bashScript: "No (Solo syslog)",
      competitors: "No",
    },
    {
      feature: "Malla cifrada integrada",
      agent: "WireGuard P2P nativo",
      bashScript: "Requiere OpenVPN/IPsec manual",
      competitors: "No incluida",
    },
    {
      feature: "Health-checks L7 personalizados",
      agent: "Nativos (HTTP/TCP/Custom script)",
      bashScript: "Scripts bash frágiles",
      competitors: "Básicos",
    },
    {
      feature: "Integración SecuryBlack Cloud",
      agent: "Nativa (gRPC Tunnel + Failover)",
      bashScript: "Ninguna",
      competitors: "Ninguna",
    },
  ],
  faq: [
    {
      question: "¿Cómo funciona la IP flotante entre diferentes proveedores de nube?",
      answer:
        "CupraFlow soporta tanto VRRP directo en capa 2 (en redes privadas Hetzner, Proxmox o bare-metal) como integración con APIs de Cloud Providers (Hetzner Floating IP, AWS EIP, DigitalOcean Float IP) para conmutar la IP pública automáticamente.",
    },
    {
      question: "¿Necesito un cluster complejo de Kubernetes o Consul?",
      answer:
        "No. CupraFlow fue creado para evitar la sobreingeniería. Con solo 2 o 3 servidores VPS tienes alta disponibilidad instantánea con conmutación en milisegundos.",
    },
    {
      question: "¿Puedo usarlo en modo autónomo sin cuenta en SecuryBlack Cloud?",
      answer:
        "Sí, CupraFlow es código abierto Apache-2.0. Puedes instalarlo en tus nodos y gestionarlo localmente con su TUI y ficheros TOML.",
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
    "Despliegues atómicos y sincronización GitOps directamente en tus servidores. Pull inteligente de imágenes Docker/Podman, verificaciones de salud previas al switch, rollback instantáneo y TUI interactiva.",
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
      badge: "Recomendado",
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
    { label: "Tiempo de Despliegue", value: "< 3s", note: "Switch de contenedor atómico" },
    { label: "Huella de RAM", value: "< 18 MB", note: "Binario estático Rust" },
    { label: "Rollback", value: "Zero-Latency", note: "Preservación versión anterior" },
    { label: "Motores Soportados", value: "Docker & Podman", note: "API socket nativo" },
  ],
  features: [
    {
      id: "gitops",
      title: "GitOps Declarativo Local",
      subtitle: "Webhook & Polling",
      description:
        "Sincroniza tus compose files y contenedores automáticamente ante commits o tags de release sin agentes pesados de CI.",
      colSpan: "col-span-2",
      tag: "GitOps",
    },
    {
      id: "atomic",
      title: "Reemplazo Atómico de Contenedores",
      subtitle: "Zero-Downtime Rolling Switch",
      description:
        "Arranca el nuevo contenedor, valida sus health-checks y sólo entonces redirige el tráfico y apaga la versión anterior.",
      colSpan: "col-span-1",
      tag: "Zero-Downtime",
    },
    {
      id: "tui",
      title: "Consola TUI de Despliegues",
      subtitle: "Deployment Cockpit",
      description:
        "Inspecciona contenedores activos, historial de releases, logs en streaming y ejecuta rollbacks con un clic de tecla.",
      colSpan: "col-span-1",
      tag: "TUI",
    },
    {
      id: "rollback",
      title: "Rollback Automático en Fallos",
      subtitle: "Self-Healing Watchdog",
      description:
        "Si la nueva versión arroja errores 5xx o el contenedor colapsa en los primeros segundos, restaura la versión anterior de inmediato.",
      colSpan: "col-span-2",
      tag: "Resiliencia",
    },
  ],
  comparisonRows: [
    {
      feature: "Complejidad de despliegue",
      agent: "1 binario ('cromoforge')",
      bashScript: "Scripts frágiles de docker pull/restart",
      competitors: "Kubernetes / Helm / Runners pesados",
    },
    {
      feature: "Rollback atómico",
      agent: "Instantáneo con preservación de imagen previa",
      bashScript: "Nuevo build/push manual",
      competitors: "Rollout undo",
    },
    {
      feature: "Consola interactiva (TUI)",
      agent: "Nativa ('cromoforge tui')",
      bashScript: "No",
      competitors: "K9s (requiere cluster k8s)",
    },
    {
      feature: "Huella de memoria",
      agent: "< 18 MB (Rust)",
      bashScript: "Despreciable pero ciego",
      competitors: "1-4 GB (K3s/k8s plane / GitLab runner)",
    },
    {
      feature: "Integración SecuryBlack Cloud",
      agent: "Nativa (gRPC tunnel + webhooks)",
      bashScript: "Ninguna",
      competitors: "Ninguna",
    },
  ],
  faq: [
    {
      question: "¿Sustituye a GitHub Actions o GitLab CI?",
      answer:
        "Complementa a tu CI: tu CI genera la imagen Docker y la sube al registry. CromoForge se encarga del despliegue final en el servidor, de forma segura, atómica y con rollback automático si algo falla.",
    },
    {
      question: "¿Requiere privilegios root?",
      answer:
        "Puede comunicarse con el socket de Docker mediante el grupo docker o con Podman en modo rootless para máxima seguridad.",
    },
    {
      question: "¿Puedo usarlo en modo autónomo?",
      answer:
        "Sí, CromoForge es software libre bajo licencia Apache-2.0. Puedes usarlo en cualquier máquina sin depender de SecuryBlack Cloud.",
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
    "Cero consumo de disco intermedio. Vuelca bases de datos en streaming, comprime con zstd, cifra en origen con ChaCha20-Poly1305 y sincroniza directamente a Cloudflare R2, Hetzner y Google Drive con TUI interactiva.",
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
      badge: "Recomendado",
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
    { label: "Consumo de Disco", value: "0 MB", note: "Streaming directo a la nube" },
    { label: "Huella de RAM", value: "< 20 MB", note: "Binario estático Rust" },
    { label: "Cifrado", value: "ChaCha20", note: "Zero-Knowledge en origen" },
    { label: "Multi-Cloud", value: "OpenDAL", note: "R2, Hetzner, AWS, GDrive" },
  ],
  features: [
    {
      id: "streaming",
      title: "Streaming sin tocar disco",
      subtitle: "Zero-Disk Footprint",
      description:
        "Los scripts clásicos hacen el dump en disco antes de sincronizar, arriesgando llenar el VPS. TitanVault canaliza los datos por memoria directamente a los buckets remotos.",
      colSpan: "col-span-2",
      tag: "Arquitectura",
    },
    {
      id: "crypto",
      title: "Cifrado Zero-Knowledge",
      subtitle: "ChaCha20-Poly1305 AEAD",
      description:
        "Tus datos se cifran con una clave simétrica en el servidor del cliente antes de que salgan a Cloudflare, Hetzner o Google Drive.",
      colSpan: "col-span-1",
      tag: "Seguridad",
    },
    {
      id: "tui",
      title: "TUI Standalone (Ratatui)",
      subtitle: "Zero Lock-in",
      description:
        "Configura orígenes, prueba destinos S3 con tecla <T>, explora snapshots y realiza restores con <R> desde la consola sin crearte cuenta en la nube.",
      colSpan: "col-span-1",
      tag: "Experiencia",
    },
    {
      id: "gfs",
      title: "Retención Inteligente GFS",
      subtitle: "Grandfather-Father-Son",
      description:
        "Poda automática en caliente de copias horarias, diarias, semanales, mensuales y anuales en los buckets remotos sin intervención manual.",
      colSpan: "col-span-2",
      tag: "Automatización",
    },
  ],
  comparisonRows: [
    {
      feature: "Huella en disco intermedio",
      agent: "0 MB (Streaming directo)",
      bashScript: "Doble de la BD (Satura disco)",
      competitors: "Variable (Requiere caché temporal)",
    },
    {
      feature: "Consola Interactiva (TUI)",
      agent: "Nativa (Ratatui)",
      bashScript: "No (Solo scripts ciegos)",
      competitors: "No (Solo flags CLI complejos)",
    },
    {
      feature: "Cifrado autenticado",
      agent: "ChaCha20-Poly1305 Zero-Knowledge",
      bashScript: "Texto plano o rclone crypt",
      competitors: "AES / GPG",
    },
    {
      feature: "Multi-Cloud Nativo",
      agent: "Apache OpenDAL (R2/Hetzner/Drive)",
      bashScript: "Requiere awscli + rclone",
      competitors: "Solo S3",
    },
    {
      feature: "Integración SecuryBlack Cloud",
      agent: "Nativa (gRPC Tunnel + Heartbeats)",
      bashScript: "Scripts manuales desconectados",
      competitors: "Ninguna",
    },
  ],
  faq: [
    {
      question: "¿Puedo usar TitanVault completamente gratis sin SecuryBlack Cloud?",
      answer:
        "Sí. TitanVault es 100% de código abierto bajo licencia Apache-2.0. Puedes instalarlo en cualquier VPS, lanzar la TUI con 'titanvault tui' y programar backups como servicio de systemd sin cuenta en SecuryBlack.",
    },
    {
      question: "¿Por qué no llena el disco durante un backup grande de PostgreSQL?",
      answer:
        "Porque TitanVault no escribe ficheros temporales. Ejecuta el volcado conectando la salida directamente con el compresor zstd y el cifrador en memoria, subiendo los chunks multipart a Cloudflare R2 o Hetzner en tiempo real.",
    },
    {
      question: "¿Qué pasa si se cae la conexión a internet durante el backup?",
      answer:
        "El agente detecta la interrupción, limpia el estado de la tarea y emite un reporte de fallo. La base de datos no se ve afectada y los heartbeats de observabilidad alertan del problema.",
    },
  ],
};

/* ==========================================================================
   DICCIONARIO DE PRESETS
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
   CONFIGURACIÓN ACTIVA: Exporta el agente actual para esta web
   ========================================================================== */
export const activeAgentConfig: AgentConfig = oxiPulseConfig;

