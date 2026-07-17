"use client";

import { useState } from "react";
import { CodeBlock } from "./code-block";

// Hardened flags baked into the default command (not an optional aside):
// curl's `--proto '=https' --tlsv1.2` and wget's equivalents refuse to
// silently follow a downgrade to plain HTTP or an old TLS version. Same
// pattern rustup and other installers use.
const CURL_FLAGS = "--proto '=https' --tlsv1.2 -fsSL";
const WGET_FLAGS = "--https-only --secure-protocol=TLSv1_2 -qO-";

interface InstallTarget {
  id: string;
  label: string;
  /** URL path appended to https://devmagic.run, e.g. "/install" or "/install/prettier". */
  path: string;
}

// A curated subset of the full catalog (see /install-scripts for everything).
// Devcontainer first and selected by default — it's the main recommendation.
const TARGETS: InstallTarget[] = [
  { id: "devcontainer", label: "Devcontainer", path: "/install" },
  { id: "prettier", label: "Prettier", path: "/install/prettier" },
  { id: "editorconfig", label: "EditorConfig", path: "/install/editorconfig" },
  { id: "gitignore", label: "Gitignore", path: "/install/gitignore" },
  { id: "changelog", label: "Changelog", path: "/install/changelog" },
];

function commandsFor(target: InstallTarget) {
  const url = `https://devmagic.run${target.path}`;
  return {
    curl: `curl ${CURL_FLAGS} ${url} | bash`,
    wget: `wget ${WGET_FLAGS} ${url} | bash`,
  };
}

export function InstallCommand({ className = "" }: { className?: string }) {
  const [selected, setSelected] = useState(0);
  const target = TARGETS[selected];
  const { curl, wget } = commandsFor(target);

  return (
    <div className={className}>
      <div className="flex flex-wrap justify-center gap-2 mb-4" role="tablist" aria-label="Install target">
        {TARGETS.map((t, i) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={selected === i}
            onClick={() => setSelected(i)}
            className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all ${
              selected === i
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-card text-muted-foreground border-border hover:border-primary hover:text-primary"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <CodeBlock
        code={curl}
        className="max-w-2xl mx-auto"
        alternatives={[
          { label: "curl", code: curl },
          { label: "wget", code: wget },
        ]}
      />
    </div>
  );
}
