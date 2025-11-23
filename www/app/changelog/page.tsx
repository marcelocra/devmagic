import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog - DevMagic',
  description: 'Version history and changes for DevMagic.',
}

export default function ChangelogPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Changelog</h1>
        <p className="text-xl text-muted-foreground mb-8">
          All notable changes to DevMagic are documented here.
        </p>

        <div className="space-y-8">
          {/* Version 0.1.0 */}
          <article className="border-l-4 border-primary pl-6">
            <div className="flex items-baseline gap-3 mb-2">
              <h2 className="text-2xl font-bold">v0.1.0</h2>
              <time className="text-sm text-muted-foreground">2025-11-16</time>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-green-600 dark:text-green-400 mb-2">Added</h3>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Initial release of DevMagic portable development environment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>One-command installer for adding DevMagic to any project</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>VS Code Dev Container configuration with official Features (common-utils, node, git, git-lfs, github-cli, docker-in-docker, homebrew)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>AI CLI tools: aider, GitHub Copilot CLI, Gemini CLI, Claude CLI</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>VS Code extensions for AI development: Claude Dev, Continue.dev</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Auxiliary services via Docker Compose: PostgreSQL, Redis, MongoDB, MinIO, Ollama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Automatic mounting of host credentials (SSH, GitHub, Claude, Gemini)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Persistent shell history across containers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Documentation website at devmagic.run</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    <span>Apache 2.0 license</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>

          {/* Future versions will be added here */}
          <div className="bg-muted/50 rounded-lg p-6 text-center">
            <p className="text-muted-foreground text-sm">
              This changelog is automatically generated from commit history using conventional commits.
            </p>
            <p className="text-muted-foreground text-sm mt-2">
              For the latest changes, see the <a href="https://github.com/marcelocra/devmagic/commits/main" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">commit history on GitHub</a>.
            </p>
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-3">Release Schedule</h3>
            <p className="text-sm text-muted-foreground">
              DevMagic follows semantic versioning. New versions are released as needed based on features and fixes.
            </p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6">
            <h3 className="font-semibold mb-3">GitHub Releases</h3>
            <p className="text-sm text-muted-foreground mb-3">
              Detailed release notes are available on GitHub:
            </p>
            <a
              href="https://github.com/marcelocra/devmagic/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline text-sm font-medium"
            >
              View all releases →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
