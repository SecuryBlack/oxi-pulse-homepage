export type ReleaseType = "major" | "minor" | "patch";

export interface ChangelogEntry {
  version: string;
  date: string;
  type: ReleaseType;
  summary: string;
  sections: {
    label: "Added" | "Fixed" | "Changed" | "Removed" | "Security";
    items: string[];
  }[];
}

export const changelog: ChangelogEntry[] = [
  {
    version: "0.3.10",
    date: "2026-08-23",
    type: "patch",
    summary: "Consume sb-agent-core from crates.io instead of a git dependency.",
    sections: [
      {
        label: "Changed",
        items: [
          "The shared `sb-agent-core` runtime is now pulled from crates.io as a versioned dependency instead of a git branch reference, matching normal Rust dependency practice.",
        ],
      },
    ],
  },
  {
    version: "0.3.9",
    date: "2026-08-23",
    type: "minor",
    summary: "Retrofitted onto sb-agent-core: shared config, logging, service wrapper, updater and a new local status socket + TUI.",
    sections: [
      {
        label: "Added",
        items: [
          "New local `status` and `top` CLI commands — `status` prints a JSON snapshot of the running agent (state, version, uptime, CPU/RAM/buffer details); `top` opens a live-refreshing terminal view of the same data. See the CLI & live status docs page.",
          "Status socket (Unix socket / Windows named pipe) that Nexus Agent now reads directly to detect whether OxiPulse is running, instead of relying on process/PATH heuristics.",
        ],
      },
      {
        label: "Changed",
        items: [
          "Config loading, logging, the Windows Service wrapper, and the GitHub-Releases auto-updater now come from the shared `sb-agent-core` crate used by all SecuryBlack Rust agents, instead of duplicated per-agent code. No behavioral change for existing installs.",
        ],
      },
    ],
  },
  {
    version: "0.3.8",
    date: "2026-07-28",
    type: "patch",
    summary: "Auto-write version in config.toml on startup and system load average metrics.",
    sections: [
      {
        label: "Added",
        items: [
          "System load average metrics (`system.cpu.load_average.1m`, `5m`, `15m`).",
          "Automatic updating of version field in `config.toml` upon agent start.",
          "System uptime (`system.uptime`), CPU logical core count (`system.cpu.count`), and Swap usage metrics.",
        ],
      },
    ],
  },
  {
    version: "0.3.5",
    date: "2026-05-28",
    type: "patch",
    summary: "Add Cloudflare DNS as a default fallback latency target for instant out-of-the-box monitoring.",

    sections: [
      {
        label: "Added",
        items: [
          "Cloudflare DNS (1.1.1.1:53) is now automatically included as a default latency target when `latency_targets` is empty. This provides immediate, zero-config internet connection latency monitoring alongside the ingestor endpoint.",
        ],
      },
    ],
  },
  {
    version: "0.3.4",
    date: "2026-05-28",
    type: "minor",
    summary: "Dynamic network latency metrics via concurrent, non-privileged TCP pings.",
    sections: [
      {
        label: "Added",
        items: [
          "Network latency metric (`system.network.latency`) with `target` and `status` attributes.",
          "Asynchronous concurrent TCP ping mechanism to measure latencies of multiple targets in parallel without blocking the main telemetry loop.",
          "New `latency_targets` configuration key (and `OXIPULSE_LATENCY_TARGETS` environment variable) to define a custom list of hosts/ports to monitor.",
          "Automatic fallback to measure latency to the configured OTLP ingestor endpoint if no custom targets are specified.",
        ],
      },
      {
        label: "Fixed",
        items: [
          "Robust logging setup on Windows — automatically falls back to console logging (stdout) if the daily rolling log directory (`C:\\ProgramData\\oxipulse`) lacks write permissions or if `OXIPULSE_LOG_STDOUT` is enabled, eliminating start panics.",
        ],
      },
    ],
  },
  {
    version: "0.3.3",
    date: "2026-05-20",
    type: "patch",
    summary: "Use short device names for Linux disks.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Linux disk monitoring now uses short, clean device names instead of absolute sysfs paths.",
        ],
      },
    ],
  },
  {
    version: "0.3.2",
    date: "2026-05-14",
    type: "patch",
    summary: "Improve disk labeling for Windows and Linux mount points.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Uses the mount point as the primary disk label (e.g., `C:` on Windows, `/` on Linux) to make individual disk metrics clear in the dashboard.",
        ],
      },
    ],
  },
  {
    version: "0.3.1",
    date: "2026-05-13",
    type: "patch",
    summary: "Disk label fallback improvement on Linux.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Fallback to using mount points as the disk name when the standard disk label attribute is empty on Linux filesystems.",
        ],
      },
    ],
  },
  {
    version: "0.3.0",
    date: "2026-05-13",
    type: "minor",
    summary: "Granular per-disk telemetries utilizing OTel semantic conventions.",
    sections: [
      {
        label: "Added",
        items: [
          "Per-disk metric reporting attaching the OTel standard `disk.name` attribute on disk used and total indicators, enabling multiple disk visualization.",
        ],
      },
    ],
  },
  {
    version: "0.2.0",
    date: "2026-05-11",
    type: "minor",
    summary: "Telemetry pings now report agent type.",
    sections: [
      {
        label: "Added",
        items: [
          "Attaches the `agent_type` field to the daily opt-in usage telemetry pings to separate different agent kinds.",
        ],
      },
    ],
  },
  {
    version: "0.1.15",
    date: "2026-05-11",
    type: "patch",
    summary: "Add local version flag for easy agent discovery.",
    sections: [
      {
        label: "Added",
        items: [
          "Introduced `--version` and `-V` CLI flags to allow developers and scripts to easily retrieve the installed agent version locally.",
        ],
      },
    ],
  },
  {
    version: "0.1.14",
    date: "2026-05-11",
    type: "minor",
    summary: "Real-time network throughput instead of raw total counters.",
    sections: [
      {
        label: "Changed",
        items: [
          "Modified network metrics to calculate and report real-time throughput in bytes per second (`net_bps_in` and `net_bps_out`) rather than aggregate raw totals.",
        ],
      },
    ],
  },
  {
    version: "0.1.13",
    date: "2026-05-09",
    type: "patch",
    summary: "Documentation cleanups and minor updates.",
    sections: [
      {
        label: "Changed",
        items: [
          "Polished internal README guidelines, documentation files, and minor repository adjustments.",
        ],
      },
    ],
  },
  {
    version: "0.1.12",
    date: "2026-05-08",
    type: "patch",
    summary: "Typo corrections in changelog history.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Corrected minor version typos and adjusted dates in the OxiPulse changelog history.",
        ],
      },
    ],
  },
  {
    version: "0.1.11",
    date: "2026-05-08",
    type: "minor",
    summary: "Local agent mode for nexus-agent tunnel integration, and critical Windows fixes.",
    sections: [
      {
        label: "Added",
        items: [
          "New `local_agent` deployment mode in config to route OTLP payloads locally to the `nexus-agent` gRPC tunnel client.",
        ],
      },
      {
        label: "Fixed",
        items: [
          "Eliminated the `VCRUNTIME140.dll` dependency on Windows by statically linking the MSVC runtime inside release builds.",
          "Windows installer now stops any running agent service before overwriting the executable, resolving locked file errors.",
        ],
      },
    ],
  },
  {
    version: "0.1.10",
    date: "2026-04-06",
    type: "patch",
    summary: "Update checks now happen 5 minutes after startup instead of 24 hours.",
    sections: [
      {
        label: "Fixed",
        items: [
          "The auto-updater previously waited a full 24 hours before its first check, so restarting the agent never triggered a prompt update pickup. The agent now checks for a new release 5 minutes after startup and then every 24 hours, meaning a restart is enough to pull a pending update within minutes.",
        ],
      },
    ],
  },
  {
    version: "0.1.9",
    date: "2026-04-06",
    type: "minor",
    summary: "Opt-in usage telemetry and remote configuration.",
    sections: [
      {
        label: "Added",
        items: [
          "Opt-in usage telemetry — the agent can now send anonymous usage pings (version, OS, arch, uptime, metrics exported, buffer occupancy) to SecuryBlack once every 24 hours. Disabled by default for all installations, including agents upgrading from previous versions.",
          "Remote configuration fetch — on startup the agent calls the SecuryBlack API with its token to retrieve server-side settings. This allows telemetry to be enabled or disabled per agent from the dashboard without touching the local config file.",
          "New config key `telemetry_enabled` (absent → defers to server, `true` → always on, `false` → always off) and corresponding `OXIPULSE_TELEMETRY` environment variable override.",
          "New optional config key `api_url` and `OXIPULSE_API_URL` environment variable for self-hosted or staging deployments.",
        ],
      },
    ],
  },
  {
    version: "0.1.8",
    date: "2026-04-05",
    type: "patch",
    summary: "Report agent version as an OTLP resource attribute and update TLS dependencies.",
    sections: [
      {
        label: "Added",
        items: [
          "Agent version is now attached as the `service.version` resource attribute in every OTLP export, allowing the ingestor to track which version of OxiPulse each agent is running.",
        ],
      },
      {
        label: "Changed",
        items: [
          "Updated `rustls-webpki` to the latest patch release (security maintenance).",
        ],
      },
    ],
  },
  {
    version: "0.1.7",
    date: "2026-03-27",
    type: "patch",
    summary: "Dependency lockfile cleanup following 0.1.6.",
    sections: [
      {
        label: "Changed",
        items: [
          "Updated Cargo.lock to fully reflect the dependency changes shipped in 0.1.6. No functional changes.",
        ],
      },
    ],
  },
  {
    version: "0.1.6",
    date: "2026-03-27",
    type: "patch",
    summary: "Connectivity, installer fixes and a security dependency update.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Reachability check now tries IPv4 addresses before IPv6, preventing long stalls when the ingestor host has no IPv6 listener.",
          "Linux install script reads TTY input via `/dev/tty` so the installer works correctly when executed through a pipe (`curl … | bash`).",
          "Windows install script uses the `PROCESSOR_ARCHITECTURE` environment variable for architecture detection instead of .NET `RuntimeInformation`, improving compatibility across environments.",
        ],
      },
      {
        label: "Changed",
        items: [
          "Updated `tar` dependency to the latest patch release (security maintenance).",
        ],
      },
    ],
  },
  {
    version: "0.1.5",
    date: "2026-03-19",
    type: "patch",
    summary: "Maintenance release with updated dependencies.",
    sections: [
      {
        label: "Changed",
        items: [
          "Updated Cargo.lock to keep dependencies in sync with the published crate.",
        ],
      },
    ],
  },
  {
    version: "0.1.4",
    date: "2026-03-19",
    type: "patch",
    summary: "Critical TLS fixes for agents connecting to HTTPS ingestors.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Enabled explicit TLS in the OTLP exporter so metrics are correctly delivered over HTTPS endpoints.",
          "Activated TLS in the tonic transport layer to resolve connection failures when the ingestor is behind HTTPS.",
        ],
      },
    ],
  },
  {
    version: "0.1.3",
    date: "2026-03-15",
    type: "patch",
    summary: "Fix reachability check port for HTTPS ingestor endpoints.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Reachability pre-check now uses port 443 when the configured OTLP endpoint scheme is https://, preventing false \"unreachable\" results on standard HTTPS deployments.",
        ],
      },
    ],
  },
  {
    version: "0.1.2",
    date: "2026-03-15",
    type: "patch",
    summary: "Fix file logging in Windows Service mode and improve offline reconnection.",
    sections: [
      {
        label: "Fixed",
        items: [
          "Log output is now written to disk when the agent runs as a Windows Service (previously only visible in interactive mode).",
          "Offline reconnection logic corrected — agent resumes sending buffered metrics as soon as the ingestor becomes reachable again.",
        ],
      },
    ],
  },
  {
    version: "0.1.1",
    date: "2026-03-14",
    type: "patch",
    summary: "Windows Service integration and installer fix for non-English locales.",
    sections: [
      {
        label: "Added",
        items: [
          "Native Windows Service Manager integration — the agent can now be installed, started, stopped and uninstalled as a proper Windows Service via the PowerShell installer.",
        ],
      },
      {
        label: "Fixed",
        items: [
          "Windows installer now uses well-known SIDs when setting ACL permissions, fixing failures on systems with non-English locale account names.",
        ],
      },
    ],
  },
  {
    version: "0.1.0",
    date: "2025-03-01",
    type: "minor",
    summary: "Initial public release. Ultralight telemetry agent for Linux and Windows.",
    sections: [
      {
        label: "Added",
        items: [
          "CPU, RAM, disk and network metric collection via native OS APIs",
          "OTLP/gRPC export with configurable endpoint and interval",
          "Offline buffer — metrics persisted to disk when collector is unreachable",
          "Auto-update — daily check against GitHub Releases with SHA256 verification",
          "One-line install script for Linux (curl | bash) with systemd service registration",
          "One-line install script for Windows (irm | iex) with Windows Service registration",
          "Support for x86_64 and ARM64 on Linux; x86_64 on Windows",
          "Configuration via environment variables or config.toml file",
          "Apache 2.0 license",
        ],
      },
    ],
  },
];
