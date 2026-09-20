"use client";

import { useEffect, useState } from "react";
import { activeAgentConfig } from "@/config/agent.config";

export function useLatestRelease(): string {
  const [version, setVersion] = useState<string>(activeAgentConfig.version);

  useEffect(() => {
    // Extract owner/repo from githubUrl (e.g. https://github.com/securyblack/oxi-pulse -> securyblack/oxi-pulse)
    const repoMatch = activeAgentConfig.githubUrl.match(/github\.com\/([^\/]+\/[^\/]+)/);
    if (!repoMatch) return;

    const repo = repoMatch[1];
    const cacheKey = `gh_release_${repo}`;

    try {
      const cached = sessionStorage.getItem(cacheKey);
      if (cached) {
        setVersion(cached);
        return;
      }
    } catch (e) {
      // Ignore sessionStorage access errors
    }

    fetch(`https://api.github.com/repos/${repo}/releases/latest`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Release fetch failed");
        return res.json();
      })
      .then((data) => {
        if (data.tag_name) {
          const tag = data.tag_name.startsWith("v") ? data.tag_name : `v${data.tag_name}`;
          setVersion(tag);
          try {
            sessionStorage.setItem(cacheKey, tag);
          } catch (e) {
            // Ignore sessionStorage quota/disabled errors
          }
        }
      })
      .catch(() => {
        // Graceful fallback to activeAgentConfig.version
      });
  }, []);

  return version;
}
