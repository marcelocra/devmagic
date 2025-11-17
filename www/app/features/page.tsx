import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Features - DevMagic',
  description: 'Explore the powerful features that make DevMagic the ideal portable development environment.',
}

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Features</h1>
          <p className="text-xl text-muted-foreground">
            Everything you need for a modern, portable development environment
          </p>
        </div>

        {/* Core Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Zero Host Installation</h3>
              <p className="text-muted-foreground">
                Only need a container runtime (Podman/Docker) and VS Code. No language runtimes, no package managers, no environment pollution on your host system.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Cross-Platform</h3>
              <p className="text-muted-foreground">
                Works identically on Windows, Linux, and macOS. Same environment, same tools, same experience everywhere.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">On-Demand Services</h3>
              <p className="text-muted-foreground">
                Start with a minimal environment. Add databases, AI tools, and other services only when you need them via Docker Compose profiles.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Persistent Configuration</h3>
              <p className="text-muted-foreground">
                Mount your SSH keys, dotfiles, and configurations from the host. Your personal setup follows you into the container.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pre-configured Extensions</h3>
              <p className="text-muted-foreground">
                Comes with popular VS Code extensions for code formatting, linting, Git integration, and more. Customize as needed.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Fast Setup</h3>
              <p className="text-muted-foreground">
                Uses pre-built images for quick container startup. From fresh OS to coding in minutes, not hours.
              </p>
            </div>
          </div>
        </section>

        {/* Available Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-4">Auxiliary Services</h2>
          <p className="text-muted-foreground mb-8">
            Start services on-demand using Docker Compose profiles. All services run in isolated containers and can communicate with your dev container.
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">PostgreSQL</h3>
                  <p className="text-sm text-muted-foreground">
                    Full-featured PostgreSQL database with persistent data storage. Perfect for development and testing.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Redis</h3>
                  <p className="text-sm text-muted-foreground">
                    In-memory data structure store for caching, sessions, and real-time features.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">MongoDB</h3>
                  <p className="text-sm text-muted-foreground">
                    Document-oriented NoSQL database for flexible, schema-less data storage.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-purple-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">MinIO</h3>
                  <p className="text-sm text-muted-foreground">
                    S3-compatible object storage for file uploads, backups, and cloud storage development.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-orange-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Ollama</h3>
                  <p className="text-sm text-muted-foreground">
                    Run large language models locally for AI-powered development tools and experiments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flexibility */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Flexibility & Customization</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Multiple Usage Modes</h3>
              <p className="text-muted-foreground mb-4">
                Use DevMagic as a standalone environment, embed it in your projects, or use it to develop DevMagic itself. One tool, multiple workflows.
              </p>
              <Link href="/getting-started" className="text-primary hover:underline font-medium">
                Learn about usage modes →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Fully Customizable</h3>
              <p className="text-muted-foreground mb-4">
                Edit the devcontainer.json to change base images, add tools, modify settings. Fork it, customize it, make it yours.
              </p>
              <Link href="/docs" className="text-primary hover:underline font-medium">
                View documentation →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Open Source</h3>
              <p className="text-muted-foreground mb-4">
                Apache 2.0 licensed. Transparent, community-driven, and free forever. No vendor lock-in, no hidden costs.
              </p>
              <a href="https://github.com/marcelocra/devmagic" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                View source code →
              </a>
            </div>

            <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Version Pinning</h3>
              <p className="text-muted-foreground mb-4">
                Pin to specific versions via git tags for reproducible environments. Perfect for teams and production workflows.
              </p>
              <Link href="/docs" className="text-primary hover:underline font-medium">
                Learn about versioning →
              </Link>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-muted/50 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Set up your portable development environment in minutes. No complex configuration, no dependency hell, just a clean, consistent workspace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/getting-started"
              className="inline-flex items-center justify-center h-11 px-8 text-lg rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Get Started
            </Link>
            <Link
              href="/docs"
              className="inline-flex items-center justify-center h-11 px-8 text-lg rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input hover:bg-accent hover:text-accent-foreground"
            >
              Read the Docs
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
