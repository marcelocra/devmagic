import type { Metadata } from "next";
import { parseChangelog } from "@/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog - DevMagic",
  description: "Version history and changes for DevMagic.",
};

export default function ChangelogPage() {
  const entries = parseChangelog();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Changelog</h1>
        <p className="text-xl text-muted-foreground mb-8">All notable changes to DevMagic are documented here.</p>

        <div className="bg-card border border-primary/20 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📋 View Full Changelog</h2>
          <p className="text-muted-foreground mb-6">
            The changelog follows the{" "}
            <a
              href="https://keepachangelog.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Keep a Changelog
            </a>{" "}
            format and{" "}
            <a
              href="https://semver.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              Semantic Versioning
            </a>
            .
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/marcelocra/devmagic/blob/main/CHANGELOG.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              CHANGELOG.md
            </a>
            {/* <a
              href="https://github.com/marcelocra/devmagic/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-muted text-foreground px-6 py-3 rounded-lg font-medium hover:bg-muted/80 transition-colors"
            >
              GitHub Releases →
            </a> */}
          </div>
        </div>

        {/* Versions from CHANGELOG.md */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Versions</h2>

          {entries.map((entry, index) => (
            <article
              key={entry.version}
              className={`border-l-4 ${index === 0 ? "border-primary" : "border-muted"} pl-6`}
            >
              <div className="flex items-baseline gap-3 mb-2">
                <h3 className="text-lg font-bold">
                  {entry.version === "Unreleased" ? entry.version : `v${entry.version}`}
                </h3>
                {entry.date ? (
                  <time className="text-sm text-muted-foreground">{entry.date}</time>
                ) : (
                  <span className="text-xs bg-yellow-500/20 text-yellow-600 dark:text-yellow-400 px-2 py-0.5 rounded">
                    in development
                  </span>
                )}
              </div>

              {entry.sections.map((section) => (
                <div key={section.type} className="mb-3">
                  <h4
                    className={`text-sm font-medium mb-1 ${
                      section.type === "Added"
                        ? "text-green-600 dark:text-green-400"
                        : section.type === "Changed"
                          ? "text-blue-600 dark:text-blue-400"
                          : section.type === "Removed"
                            ? "text-red-600 dark:text-red-400"
                            : section.type === "Fixed"
                              ? "text-purple-600 dark:text-purple-400"
                              : "text-muted-foreground"
                    }`}
                  >
                    {section.type}
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {section.items.slice(0, 5).map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                    {section.items.length > 5 && (
                      <li className="text-xs text-muted-foreground/70 italic">
                        ...and {section.items.length - 5} more
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </article>
          ))}

          {entries.length === 0 && (
            <p className="text-muted-foreground">
              No changelog entries found. See the{" "}
              <a
                href="https://github.com/marcelocra/devmagic/blob/main/CHANGELOG.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                CHANGELOG.md on GitHub
              </a>
              .
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
