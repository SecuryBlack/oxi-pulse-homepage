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
