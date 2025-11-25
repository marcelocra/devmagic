import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Architecture - DevMagic",
  description: "DevMagic architecture, design decisions, and separation of concerns.",
};

export default function ArchitecturePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8">
          <Link href="/docs" className="text-primary hover:underline">
            ← Documentation
          </Link>
        </nav>

        <h1 className="text-4xl font-bold mb-4">Architecture</h1>
        <p className="text-xl text-muted-foreground mb-12">How DevMagic is designed and why.</p>

        {/* Design Principles */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Design Principles</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>
              <strong>Zero friction</strong> — From "fresh OS" to "coding" in minutes
            </li>
            <li>
              <strong>Consistency</strong> — Same environment on every machine
            </li>
            <li>
              <strong>Modularity</strong> — Start minimal, add services as needed
            </li>
            <li>
              <strong>Transparency</strong> — Open source, well-documented, no magic
            </li>
            <li>
              <strong>Portability</strong> — Works on Windows, Linux, macOS identically
            </li>
            <li>
              <strong>Separation of concerns</strong> — Container infrastructure vs personal preferences
            </li>
          </ul>
        </section>

        {/* Separation of Concerns */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Separation of Concerns</h2>
          <p className="text-muted-foreground mb-6">
            DevMagic deliberately separates <strong>container infrastructure</strong> from{" "}
            <strong>personal environment preferences</strong>:
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-primary">DevMagic (Container)</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• SSH keys setup</li>
                <li>• AI CLI tools</li>
                <li>• Container-specific config</li>
                <li>• Base dev environment</li>
              </ul>
            </div>
            <div className="bg-card border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold mb-3 text-primary">Your Dotfiles (Personal)</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Homebrew, fzf, CLI tools</li>
                <li>• Zsh plugins & shell config</li>
                <li>• VS Code settings/keybindings</li>
                <li>• Personal aliases & functions</li>
              </ul>
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-6">
            <h4 className="font-medium mb-2">Why this separation?</h4>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>
                ✅ <strong>Your machine</strong>: Full personal setup with all your tools
              </li>
              <li>
                ✅ <strong>Others using DevMagic</strong>: Working container without your config
              </li>
              <li>
                ✅ <strong>Portable</strong>: Dotfiles work anywhere, not just containers
              </li>
              <li>
                ✅ <strong>No lock-in</strong>: Works with VS Code, Neovim, Cursor, etc.
              </li>
            </ul>
          </div>
        </section>

        {/* Installation Flow */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Installation Flow</h2>
          <div className="bg-card border border-primary/20 rounded-lg p-6 font-mono text-sm">
            <pre className="whitespace-pre-wrap text-muted-foreground">{`curl https://devmagic.run/install | bash
  → downloads .devcontainer/ to your project
  → you open in VS Code

Container starts:
  → postCreateCommand runs devcontainer-setup.sh
    → SSH keys setup
    → AI CLI tools installed
    → Runs ~/prj/dotfiles/shell/install.sh (if exists)
      → Your personal tools & config`}</pre>
          </div>
        </section>

        {/* Dotfiles Integration */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Dotfiles Integration</h2>
          <p className="text-muted-foreground mb-4">
            DevMagic automatically runs your dotfiles install script when the container starts.
          </p>

          <div className="bg-card border border-primary/20 rounded-lg p-6 mb-4">
            <h4 className="font-medium mb-3">Quick Setup</h4>
            <ol className="space-y-3 text-sm text-muted-foreground">
              <li>
                <span className="font-medium text-foreground">1. Configure VS Code</span>
                <pre className="mt-1 bg-muted/50 rounded p-2 text-xs">{`"dotfiles.repository": "yourusername/dotfiles"
"dotfiles.targetPath": "~/prj/dotfiles"`}</pre>
              </li>
              <li>
                <span className="font-medium text-foreground">2. Create install script</span>
                <p className="mt-1">
                  Add <code className="bg-muted px-1 rounded">shell/install.sh</code> to your dotfiles with your
                  personal setup
                </p>
              </li>
              <li>
                <span className="font-medium text-foreground">3. Done!</span>
                <p className="mt-1">DevMagic will run it automatically on container start</p>
              </li>
            </ol>
          </div>
        </section>

        {/* Technical Decisions */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Technical Decisions</h2>
          <div className="space-y-4 text-muted-foreground">
            <div>
              <h4 className="font-medium text-foreground">Homebrew over Conda</h4>
              <p className="text-sm">
                Better package availability for CLI tools (fzf, babashka, hugo), no licensing concerns.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">Custom forks for security</h4>
              <p className="text-sm">
                Security-critical tools can be installed from your own forks for code review before updates.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-foreground">VS Code configs via symlinks</h4>
              <p className="text-sm">
                Settings stored in dotfiles, symlinked to VS Code's User directory. Works in containers and native.
              </p>
            </div>
          </div>
        </section>

        {/* GitHub Link */}
        <div className="border-t pt-8">
          <p className="text-muted-foreground text-sm">
            For the complete technical documentation, see{" "}
            <a
              href="https://github.com/marcelocra/devmagic/blob/main/docs/ARCHITECTURE.md"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              docs/ARCHITECTURE.md
            </a>{" "}
            on GitHub.
          </p>
        </div>
      </div>
    </div>
  );
}
