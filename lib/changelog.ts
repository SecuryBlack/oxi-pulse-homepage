export interface ChangelogSection {
  type: "Added" | "Changed" | "Fixed" | "Removed" | "Security" | string;
  items: string[];
}

export interface ChangelogRelease {
  version: string;
  date?: string;
  isUnreleased?: boolean;
  sections: ChangelogSection[];
}

export function parseChangelog(markdown: string): ChangelogRelease[] {
  const lines = markdown.split("\n");
  const releases: ChangelogRelease[] = [];

  let currentRelease: ChangelogRelease | null = null;
  let currentSection: ChangelogSection | null = null;

  for (let line of lines) {
    line = line.trimEnd();

    // Match Release Headers: "## [0.3.13] - 2026-09-15" or "## [Unreleased]"
    const releaseMatch = line.match(/^##\s+\[(.*?)\](?:\s+-\s+(\d{4}-\d{2}-\d{2}))?/);
    if (releaseMatch) {
      if (currentSection && currentRelease) {
        currentRelease.sections.push(currentSection);
        currentSection = null;
      }
      if (currentRelease) {
        releases.push(currentRelease);
      }

      const version = releaseMatch[1];
      const date = releaseMatch[2];
      const isUnreleased = version.toLowerCase() === "unreleased";

      currentRelease = {
        version,
        date,
        isUnreleased,
        sections: [],
      };
      continue;
    }

    // Match Section Headers: "### Added" or "### Fixed"
    const sectionMatch = line.match(/^###\s+(.*)/);
    if (sectionMatch && currentRelease) {
      if (currentSection) {
        currentRelease.sections.push(currentSection);
      }
      currentSection = {
        type: sectionMatch[1].trim(),
        items: [],
      };
      continue;
    }

    // Match List Items: "- **Telemetry**: Detail..."
    if (line.match(/^[-*]\s+/) && currentSection) {
      const itemText = line.replace(/^[-*]\s+/, "").trim();
      currentSection.items.push(itemText);
      continue;
    }

    // Continued list items (indented lines)
    if (line.match(/^\s{2,4}[-*]?\s*/) && currentSection && currentSection.items.length > 0) {
      const continuedText = line.trim();
      if (continuedText) {
        const lastIdx = currentSection.items.length - 1;
        currentSection.items[lastIdx] += ` ${continuedText}`;
      }
    }
  }

  if (currentSection && currentRelease) {
    currentRelease.sections.push(currentSection);
  }
  if (currentRelease) {
    releases.push(currentRelease);
  }

  // Filter out empty unreleased section if it has no items
  return releases.filter((r) => !r.isUnreleased || r.sections.length > 0);
}
