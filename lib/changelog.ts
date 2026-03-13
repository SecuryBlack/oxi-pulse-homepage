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
