import type { Metadata } from "next";
import { activeAgentConfig } from "@/config/agent.config";
import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";
import { Badge } from "@/components/catalyst/badge";
import { parseChangelog, type ChangelogRelease } from "@/lib/changelog";
import { ArrowLeft, Tag, Calendar, ExternalLink, GitCommit, CheckCircle2, Wrench, ShieldCheck, Sparkles } from "lucide-react";

export const revalidate = 3600; // Cache 1 hour

export const metadata: Metadata = {
  title: `Changelog — ${activeAgentConfig.name}`,
  description: `Official release history and release notes for ${activeAgentConfig.name}.`,
};

function getSectionBadge(type: string) {
  const normalized = type.toLowerCase();
  if (normalized.includes("add")) {
    return {
      label: "Added",
      color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
      icon: <Sparkles className="size-3.5" />,
    };
  }
  if (normalized.includes("fix")) {
    return {
      label: "Fixed",
      color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
      icon: <Wrench className="size-3.5" />,
    };
  }
  if (normalized.includes("sec")) {
    return {
      label: "Security",
      color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
      icon: <ShieldCheck className="size-3.5" />,
    };
  }
  return {
    label: type,
    color: "bg-zinc-500/10 text-zinc-600 dark:text-zinc-400 border-zinc-500/20",
    icon: <CheckCircle2 className="size-3.5" />,
  };
}

// Format item markdown bold tags e.g. **Config**: text...
function formatItem(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return (
    <span>
      {parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={i} className="font-semibold text-zinc-900 dark:text-zinc-100">
              {part.slice(2, -2)}
            </strong>
          );
        }
        return part;
      })}
    </span>
  );
}

async function getChangelog(): Promise<ChangelogRelease[]> {
  const match = activeAgentConfig.githubUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  if (!match) return [];
  const [, owner, repo] = match;

  // Try main and master branches
  for (const branch of ["main", "master"]) {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/CHANGELOG.md`,
        { next: { revalidate: 3600 } }
      );
      if (res.ok) {
        const text = await res.text();
        return parseChangelog(text);
      }
    } catch {
      // Continue to next branch
    }
  }

  return [];
}

export default async function ChangelogPage() {
  const releases = await getChangelog();

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        <div className="mb-10">
          <a
            href="/"
            className="inline-flex items-center gap-x-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors mb-6"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to {activeAgentConfig.name}</span>
          </a>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-x-3 mb-2">
                <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                  Changelog
                </h1>
                <Badge variant="agent">{releases.length > 0 ? `v${releases[0].version}` : activeAgentConfig.version}</Badge>
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Official releases, new features, and fixes for {activeAgentConfig.name}.
              </p>
            </div>

            <a
              href={`${activeAgentConfig.githubUrl}/releases`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-x-2 text-xs font-semibold px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs transition-colors self-start sm:self-auto"
            >
              <span>GitHub Releases</span>
              <ExternalLink className="size-3.5 text-zinc-400" />
            </a>
          </div>
        </div>

        {releases.length === 0 ? (
          <div className="text-center py-20 text-zinc-500 text-sm">
            No changelog entries found. Check{" "}
            <a
              href={`${activeAgentConfig.githubUrl}/releases`}
              className="text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)] underline"
            >
              GitHub Releases
            </a>
            .
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 border-l border-zinc-200 dark:border-zinc-800 space-y-12">
            {releases.map((release) => (
              <article key={release.version} className="relative group">
                {/* Timeline node */}
                <div className="absolute -left-[31px] sm:-left-[39px] top-1 size-3.5 rounded-full border-2 border-zinc-300 dark:border-zinc-700 bg-white dark:bg-[#09090b] group-hover:border-[var(--agent-primary)] group-hover:scale-110 transition-all" />

                <header className="mb-4">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-1">
                    <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white flex items-center gap-x-2">
                      <Tag className="size-4 text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)]" />
                      <span>{release.isUnreleased ? "Unreleased" : `v${release.version.replace(/^v/, "")}`}</span>
                    </h2>
                    {release.date && (
                      <span className="inline-flex items-center gap-x-1 text-xs text-zinc-500 font-mono">
                        <Calendar className="size-3" />
                        <span>{release.date}</span>
                      </span>
                    )}
                  </div>
                </header>

                <div className="space-y-6">
                  {release.sections.map((section, idx) => {
                    const badge = getSectionBadge(section.type);
                    return (
                      <div key={idx} className="space-y-2.5">
                        <div className="inline-flex items-center gap-x-1.5 px-2.5 py-0.5 rounded-md text-[11px] font-semibold border uppercase tracking-wider font-mono">
                          <span className={badge.color}>{badge.icon}</span>
                          <span className="text-zinc-700 dark:text-zinc-300">{section.type}</span>
                        </div>
                        <ul className="space-y-2 pl-3">
                          {section.items.map((item, itemIdx) => (
                            <li
                              key={itemIdx}
                              className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed flex items-start gap-x-2.5"
                            >
                              <span className="size-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700 mt-2 shrink-0" />
                              <div className="flex-1">{formatItem(item)}</div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
