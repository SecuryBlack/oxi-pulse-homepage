import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { Callout } from "@/components/ui/Callout";

export const metadata: Metadata = {
  title: "CLI & Live Status",
  description: "Inspect a running OxiPulse agent from the command line: version, JSON status, and a live TUI.",
};

export default function CliPage() {
  return (
    <Prose>
      <h1>CLI & live status</h1>
      <p>
        Since v0.3.9, OxiPulse exposes a small set of local commands to inspect a running agent
        without touching your OTLP backend or dashboard. These read from a local status
        socket that the agent keeps open while it runs — a Unix socket on Linux/macOS, a named
        pipe on Windows.
      </p>

      <h2><code>--version</code></h2>
      <p>Prints the installed version and exits.</p>
      <CodeBlock code={`oxipulse --version`} language="bash" />
      <CodeBlock
        code={`oxipulse 0.3.10`}
        language="bash"
        filename="Output"
        showCopy={false}
      />

      <h2><code>status</code></h2>
      <p>
        Prints a single JSON snapshot of the running agent&apos;s state — useful for scripting,
        health checks, or piping into <code>jq</code>.
      </p>
      <CodeBlock code={`oxipulse status`} language="bash" />
      <CodeBlock
        code={`{
  "agent": "oxipulse",
  "version": "0.3.10",
  "state": "running",
  "since_unix": 1755970483,
  "details": {
    "cpu_percent": 32.6,
    "ram_used_mb": 17780,
    "buffered": 0,
    "offline": false
  }
}`}
        language="json"
        filename="Output"
        showCopy={false}
      />
      <p>
        If the agent isn&apos;t running, the command fails with a connection error instead of
        printing a payload — safe to use as a liveness check in scripts.
      </p>

      <h2><code>top</code></h2>
      <p>
        Opens a live, auto-refreshing terminal view of the agent&apos;s status — state, version,
        uptime, and the same <code>details</code> object shown as pretty-printed JSON. Refreshes
        roughly once per second. Press <code>q</code> or <code>Esc</code> to quit.
      </p>
      <CodeBlock code={`oxipulse top`} language="bash" />

      <Callout variant="info">
        <code>status</code> and <code>top</code> only work while the agent service is actually
        running on that machine — they talk to the local socket/pipe directly, not to
        SecuryBlack&apos;s backend. They&apos;re a local debugging tool, not a replacement for the
        dashboard.
      </Callout>

      <h2>Under the hood</h2>
      <p>
        These commands are provided by{" "}
        <a href="https://crates.io/crates/sb-agent-core" target="_blank" rel="noreferrer">
          sb-agent-core
        </a>
        , the runtime OxiPulse shares with SecuryBlack&apos;s other Rust agents (FerroSentry,
        Nexus Agent, CupraFlow). All four expose the same <code>status</code>/<code>top</code>{" "}
        interface, so the same muscle memory works across agents.
      </p>
    </Prose>
  );
}
