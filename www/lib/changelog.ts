import { readFileSync } from "fs";
import { join } from "path";

export interface ChangelogEntry {
  version: string;
  date: string | null;
  sections: {
    type: "Added" | "Changed" | "Removed" | "Fixed" | "Security" | "Deprecated";
    items: string[];
  }[];
}

/**
 * Simple parser for Keep a Changelog format.
 * Reads CHANGELOG.md from the repository root.
 */
export function parseChangelog(): ChangelogEntry[] {
  const changelogPath = join(process.cwd(), "..", "CHANGELOG.md");

  let content: string;
  try {
    content = readFileSync(changelogPath, "utf-8");
  } catch {
    // Fallback for different working directories
    try {
      content = readFileSync(join(process.cwd(), "CHANGELOG.md"), "utf-8");
    } catch {
      return [];
    }
  }

  const entries: ChangelogEntry[] = [];
  const lines = content.split("\n");

  let currentEntry: ChangelogEntry | null = null;
  let currentSection: ChangelogEntry["sections"][0] | null = null;

  for (const line of lines) {
    // Match version headers: ## [0.2.0] - 2025-11-25 or ## [Unreleased]
    const versionMatch = line.match(/^## \[([^\]]+)\](?:\s*-\s*(.+))?/);
    if (versionMatch) {
      if (currentEntry) {
        entries.push(currentEntry);
      }
      currentEntry = {
        version: versionMatch[1],
        date: versionMatch[2]?.trim() || null,
        sections: [],
      };
      currentSection = null;
      continue;
    }

    // Match section headers: ### Added, ### Changed, etc.
    const sectionMatch = line.match(/^### (Added|Changed|Removed|Fixed|Security|Deprecated)/);
    if (sectionMatch && currentEntry) {
      currentSection = {
        type: sectionMatch[1] as ChangelogEntry["sections"][0]["type"],
        items: [],
      };
      currentEntry.sections.push(currentSection);
      continue;
    }

    // Match list items: - Item text or - **BREAKING**: Item text
    const itemMatch = line.match(/^-\s+(.+)/);
    if (itemMatch && currentSection) {
      currentSection.items.push(itemMatch[1].trim());
    }
  }

  // Don't forget the last entry
  if (currentEntry) {
    entries.push(currentEntry);
  }

  return entries;
}

/**
 * Get a brief summary of a changelog entry (first few items).
 */
export function getEntrySummary(entry: ChangelogEntry, maxItems = 3): string {
  const allItems = entry.sections.flatMap((s) => s.items);
  const summary = allItems.slice(0, maxItems);

  if (allItems.length > maxItems) {
    return summary.join(", ") + `, and ${allItems.length - maxItems} more changes`;
  }
  return summary.join(", ");
}
