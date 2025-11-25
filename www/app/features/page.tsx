import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/button'

export const metadata: Metadata = {
  title: 'Features - DevMagic',
  description: 'Explore the powerful features that make DevMagic the ideal portable development environment.',
}

export default function FeaturesPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            <span className="gradient-text">Features</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need for a modern, portable development environment
          </p>
        </div>

        {/* Core Features */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Core Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Zero Host Installation</h3>
              <p className="text-muted-foreground leading-relaxed">
                Only need a container runtime (Podman/Docker) and VS Code. No language runtimes, no package managers, no environment pollution on your host system.
              </p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Cross-Platform</h3>
              <p className="text-muted-foreground leading-relaxed">
                Works identically on Windows, Linux, and macOS. Same environment, same tools, same experience everywhere.
              </p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">On-Demand Services</h3>
              <p className="text-muted-foreground leading-relaxed">
                Start with a minimal environment. Add databases, AI tools, and other services only when you need them via Docker Compose profiles.
              </p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Persistent Configuration</h3>
              <p className="text-muted-foreground leading-relaxed">
                Mount your SSH keys, dotfiles, and configurations from the host. Your personal setup follows you into the container.
              </p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Pre-configured Extensions</h3>
              <p className="text-muted-foreground leading-relaxed">
                Comes with popular VS Code extensions for code formatting, linting, Git integration, and more. Customize as needed.
              </p>
            </div>

            <div className="group glass rounded-2xl p-6 card-hover">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Fast Setup</h3>
              <p className="text-muted-foreground leading-relaxed">
                Uses pre-built images for quick container startup. From fresh OS to coding in minutes, not hours.
              </p>
            </div>
          </div>
        </section>

        {/* Available Services */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-4 text-center">Auxiliary Services</h2>
          <p className="text-muted-foreground mb-10 text-center max-w-2xl mx-auto">
            Start services on-demand using Docker Compose profiles. All services run in isolated containers and can communicate with your dev container.
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">PostgreSQL</h3>
                  <p className="text-sm text-muted-foreground">
                    Full-featured PostgreSQL database with persistent data storage.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Redis</h3>
                  <p className="text-sm text-muted-foreground">
                    In-memory data structure store for caching and sessions.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">MongoDB</h3>
                  <p className="text-sm text-muted-foreground">
                    Document-oriented NoSQL database for flexible data storage.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">MinIO</h3>
                  <p className="text-sm text-muted-foreground">
                    S3-compatible object storage for file uploads and backups.
                  </p>
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 card-hover">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Ollama</h3>
                  <p className="text-sm text-muted-foreground">
                    Run large language models locally for AI development.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Flexibility */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Flexibility & Customization</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="gradient-border rounded-2xl overflow-hidden">
              <div className="bg-card p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">Multiple Usage Modes</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Use DevMagic as a standalone environment, embed it in your projects, or use it to develop DevMagic itself. One tool, multiple workflows.
                </p>
                <Link href="/getting-started" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                  Learn about usage modes
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="gradient-border rounded-2xl overflow-hidden">
              <div className="bg-card p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">Fully Customizable</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Edit the devcontainer.json to change base images, add tools, modify settings. Fork it, customize it, make it yours.
                </p>
                <Link href="/docs" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                  View documentation
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="gradient-border rounded-2xl overflow-hidden">
              <div className="bg-card p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">Open Source</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Apache 2.0 licensed. Transparent, community-driven, and free forever. No vendor lock-in, no hidden costs.
                </p>
                <a href="https://github.com/marcelocra/devmagic" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                  View source code
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="gradient-border rounded-2xl overflow-hidden">
              <div className="bg-card p-6 h-full">
                <h3 className="text-xl font-semibold mb-3">Version Pinning</h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  Pin to specific versions via git tags for reproducible environments. Perfect for teams and production workflows.
                </p>
                <Link href="/docs" className="text-primary hover:underline font-medium inline-flex items-center gap-1">
                  Learn about versioning
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="glass rounded-2xl p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Set up your portable development environment in minutes. No complex configuration, no dependency hell, just a clean, consistent workspace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/getting-started" variant="primary" size="lg">
              Get Started
            </Button>
            <Button href="/docs" variant="outline" size="lg">
              Read the Docs
            </Button>
          </div>
        </section>
      </div>
    </div>
  )
}
