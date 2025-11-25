import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Documentation - DevMagic",
  description: "Complete documentation for DevMagic portable development environments.",
};

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Everything you need to know about using and customizing DevMagic.
        </p>

        <div className="grid gap-6 mb-8">
          <Link
            href="/getting-started"
            className="block bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">🚀 Getting Started</h2>
            <p className="text-muted-foreground">Quick start instructions to add DevMagic to your project.</p>
          </Link>

          <Link
            href="/docs/architecture"
            className="block bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">🏗️ Architecture</h2>
            <p className="text-muted-foreground">Design principles, separation of concerns, and technical decisions.</p>
          </Link>

          <Link
            href="/features"
            className="block bg-card border border-primary/20 rounded-lg p-6 hover:border-primary/40 transition-colors"
          >
            <h2 className="text-xl font-semibold mb-2">✨ Features</h2>
            <p className="text-muted-foreground">What's included in DevMagic and how to customize it.</p>
          </Link>
        </div>

        <div className="bg-muted/50 rounded-lg p-6">
          <h3 className="font-semibold mb-3">External Resources</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href="https://github.com/marcelocra/devmagic/blob/main/README.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                README.md
              </a>{" "}
              — Full project documentation on GitHub
            </li>
            <li>
              <a
                href="https://github.com/marcelocra/devmagic/blob/main/CONTRIBUTING.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                CONTRIBUTING.md
              </a>{" "}
              — Development and contribution guidelines
            </li>
            <li>
              <a
                href="https://github.com/marcelocra/devmagic/blob/main/docs/ARCHITECTURE.md"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                docs/ARCHITECTURE.md
              </a>{" "}
              — Complete technical architecture
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
