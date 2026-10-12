import type { ReactNode } from "react";

// Backend guides live in the agent repo (docs/backends/*.md), next to the CI
// job that tests them; the site renders them so there is one copy to maintain.
const RAW = "https://raw.githubusercontent.com/SecuryBlack/oxi-pulse/main/docs/backends/";
const BLOB = "https://github.com/SecuryBlack/oxi-pulse/blob/main/docs/backends/";

export const guides = [
  { slug: "signoz", name: "SigNoz", summary: "Directly over OTLP/gRPC, self-hosted or SigNoz Cloud. Not yet tested in CI." },
  { slug: "openobserve", name: "OpenObserve", summary: "Directly over OTLP/gRPC with Basic auth headers." },
  { slug: "uptrace", name: "Uptrace", summary: "Directly over OTLP/gRPC with the project DSN header." },
  { slug: "victoriametrics", name: "VictoriaMetrics", summary: "Through an OTel Collector, with Prometheus-style names." },
];

export async function getGuide(slug: string): Promise<string | null> {
  const res = await fetch(`${RAW}${slug}.md`, { next: { revalidate: 3600 } });
  return res.ok ? res.text() : null;
}

// Links between guides stay on the site; everything else relative goes to GitHub.
function resolveHref(href: string): string {
  if (/^https?:/.test(href) || href.startsWith("#")) return href;
  const guide = href.match(/^([a-z]+)\.md(#.*)?$/);
  if (guide) return `/guides/${guide[1]}/${guide[2] ?? ""}`;
  return new URL(href, BLOB).toString();
}

function inline(text: string): ReactNode[] {
  // `code`, **bold** and [text](href)
  return text.split(/(`[^`]+`|\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g).map((part, i) => {
    if (part.startsWith("`")) {
      return <code key={i} className="px-1 py-0.5 rounded [overflow-wrap:anywhere] bg-zinc-100 dark:bg-zinc-800 text-[0.9em] font-mono">{part.slice(1, -1)}</code>;
    }
    if (part.startsWith("**")) return <strong key={i} className="font-semibold text-zinc-900 dark:text-zinc-100">{part.slice(2, -2)}</strong>;
    const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (link) {
      return <a key={i} href={resolveHref(link[2])} className="text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)] underline underline-offset-2">{inline(link[1])}</a>;
    }
    return part;
  });
}

// ponytail: renders only the markdown subset the guides use (headings, paragraphs,
// lists, fenced code, tables); swap in a markdown library if guides outgrow it.
export function renderMarkdown(md: string): { title: string; body: ReactNode[] } {
  const lines = md.replace(/\r/g, "").split("\n");
  const body: ReactNode[] = [];
  let title = "";
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const key = body.length;
    if (line.startsWith("```")) {
      const code: string[] = [];
      for (i++; i < lines.length && !lines[i].startsWith("```"); i++) code.push(lines[i]);
      i++;
      body.push(
        <pre key={key} className="overflow-x-auto rounded-xl bg-zinc-950 text-zinc-100 text-[13px] leading-relaxed p-4 font-mono">
          <code>{code.join("\n")}</code>
        </pre>,
      );
    } else if (line.startsWith("# ")) {
      title = line.slice(2);
      i++;
    } else if (line.startsWith("## ")) {
      body.push(<h2 key={key} className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white pt-4">{inline(line.slice(3))}</h2>);
      i++;
    } else if (line.startsWith("- ")) {
      const items: string[] = [];
      for (; i < lines.length && lines[i].startsWith("- "); i++) items.push(lines[i].slice(2));
      body.push(<ul key={key} className="list-disc pl-5 space-y-1.5">{items.map((t, j) => <li key={j}>{inline(t)}</li>)}</ul>);
    } else if (line.startsWith("|")) {
      const rows: string[][] = [];
      for (; i < lines.length && lines[i].startsWith("|"); i++) {
        if (!/^\|[\s|:-]+\|$/.test(lines[i])) rows.push(lines[i].slice(1, -1).split("|").map((c) => c.trim()));
      }
      const [head, ...rest] = rows;
      body.push(
        <div key={key} className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead><tr>{head.map((c, j) => <th key={j} className="text-left font-semibold p-2 border-b border-zinc-200 dark:border-zinc-800">{inline(c)}</th>)}</tr></thead>
            <tbody>{rest.map((r, j) => <tr key={j}>{r.map((c, k) => <td key={k} className="p-2 border-b border-zinc-100 dark:border-zinc-900 align-top">{inline(c)}</td>)}</tr>)}</tbody>
          </table>
        </div>,
      );
    } else if (line.trim() === "") {
      i++;
    } else {
      const para: string[] = [];
      for (; i < lines.length && lines[i].trim() !== "" && !/^(#|```|- |\|)/.test(lines[i]); i++) para.push(lines[i]);
      body.push(<p key={key}>{inline(para.join(" "))}</p>);
    }
  }
  return { title, body };
}
