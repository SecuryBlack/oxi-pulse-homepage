import type { Metadata } from "next";
import { Prose } from "@/components/ui/Prose";
import { CodeBlock } from "@/components/ui/CodeBlock";

export const metadata: Metadata = {
  title: "Metrics",
  description: "Full list of metrics collected by the OxiPulse agent.",
};

const metrics = [
  { name: "system.uptime",               type: "Gauge",   unit: "seconds", desc: "System uptime in seconds" },
  { name: "system.cpu.count",             type: "Gauge",   unit: "cores",   desc: "Number of logical CPU cores" },
  { name: "system.cpu.usage",             type: "Gauge",   unit: "%",       desc: "Overall CPU usage percentage across all cores" },
  { name: "system.cpu.load_average.1m",   type: "Gauge",   unit: "1",       desc: "System load average over 1 minute (0 on Windows)" },
  { name: "system.cpu.load_average.5m",   type: "Gauge",   unit: "1",       desc: "System load average over 5 minutes (0 on Windows)" },
  { name: "system.cpu.load_average.15m",  type: "Gauge",   unit: "1",       desc: "System load average over 15 minutes (0 on Windows)" },
  { name: "system.memory.used",           type: "Gauge",   unit: "bytes",   desc: "RAM currently in use" },
  { name: "system.memory.total",          type: "Gauge",   unit: "bytes",   desc: "Total installed RAM" },
  { name: "system.memory.swap.used",     type: "Gauge",   unit: "bytes",   desc: "Swap space currently in use" },
  { name: "system.memory.swap.total",    type: "Gauge",   unit: "bytes",   desc: "Total Swap space capacity" },
  { name: "system.disk.used",             type: "Gauge",   unit: "bytes",   desc: "Disk space used per partition (with disk.name attribute)" },
  { name: "system.disk.total",            type: "Gauge",   unit: "bytes",   desc: "Total disk capacity per partition (with disk.name attribute)" },
  { name: "system.network.receive",      type: "Gauge",   unit: "bytes/s", desc: "Real-time network receive throughput" },
  { name: "system.network.transmit",     type: "Gauge",   unit: "bytes/s", desc: "Real-time network transmit throughput" },
  { name: "system.network.latency",      type: "Gauge",   unit: "ms",      desc: "Network latency to specified targets via TCP ping" },
];



export default function MetricsPage() {
  return (
    <Prose>
      <h1>Metrics</h1>
      <p>
        The agent collects the following metrics on every collection interval (default 10s).
        All metrics follow the <strong>OpenTelemetry semantic conventions</strong> and are exported
        via OTLP.
      </p>

      <h2>Metric reference</h2>

      <div className="not-prose overflow-x-auto rounded-[var(--radius-lg)] border border-[var(--color-border)] my-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
              <th className="text-left px-4 py-3 font-semibold text-[var(--color-text)]">Metric name</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--color-text)]">Type</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--color-text)]">Unit</th>
              <th className="text-left px-4 py-3 font-semibold text-[var(--color-text)]">Description</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((m) => (
              <tr key={m.name} className="border-b border-[var(--color-border)] last:border-0">
                <td className="px-4 py-3 font-mono text-[var(--color-primary)] text-xs">{m.name}</td>
                <td className="px-4 py-3 text-xs text-[var(--color-muted)]">{m.type}</td>
                <td className="px-4 py-3 font-mono text-xs text-[var(--color-muted)]">{m.unit}</td>
                <td className="px-4 py-3 text-sm text-[var(--color-muted)]">{m.desc}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>OTLP payload example</h2>
      <p>
        Each batch sent to the collector looks like the following (simplified JSON representation):
      </p>
      <CodeBlock
        code={`{
  "resource_metrics": [{
    "resource": {
      "attributes": {
        "host.name": "my-server",
        "os.type": "linux"
      }
    },
    "scope_metrics": [{
      "metrics": [
        {
          "name": "system.cpu.usage",
          "gauge": { "data_points": [{ "as_double": 12.4, "time_unix_nano": 1700000000000000000 }] }
        },
        {
          "name": "system.memory.used",
          "gauge": { "data_points": [{ "as_int": 3328000000, "time_unix_nano": 1700000000000000000 }] }
        }
      ]
    }]
  }]
}`}
        language="json"
        filename="OTLP payload (simplified)"
      />

      <h2>Collection details</h2>
      <ul>
        <li>
          <strong>CPU</strong> — read from <code>/proc/stat</code> (Linux) or{" "}
          <code>GetSystemTimes</code> (Windows). Averaged across all logical cores.
        </li>
        <li>
          <strong>Memory</strong> — read from <code>/proc/meminfo</code> (Linux) or{" "}
          <code>GlobalMemoryStatusEx</code> (Windows).
        </li>
        <li>
          <strong>Disk</strong> — read from <code>statvfs("/")</code> (Linux) or the system
          drive (Windows). Only the root/system partition is measured in v0.1.
        </li>
        <li>
          <strong>Network</strong> — cumulative counters from <code>/proc/net/dev</code> (Linux)
          or <code>GetIfTable</code> (Windows). All interfaces are summed.
        </li>
      </ul>

      <h2>Timestamps</h2>
      <p>
        Timestamps are generated at the <strong>moment of collection</strong>, not at the moment of
        transmission. This ensures accurate time-series data even when the offline buffer replays
        delayed batches.
      </p>
    </Prose>
  );
}
