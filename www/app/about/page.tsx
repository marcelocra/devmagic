import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About - DevMagic',
  description: 'Learn about DevMagic, its goals, and how to contribute.',
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About DevMagic</h1>

        {/* Project Overview */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">What is DevMagic?</h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-muted-foreground mb-4">
              DevMagic is a portable development environment system built on VS Code Dev Containers. It eliminates the need to install development tools on your host machine, providing consistent, reproducible environments across any operating system.
            </p>
            <p className="text-muted-foreground mb-4">
              Whether you&apos;re setting up a fresh OS, onboarding new team members, or just want a clean separation between projects, DevMagic gives you a fully-featured development workspace in minutes.
            </p>
          </div>
        </section>

        {/* Goals */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Project Goals</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">🎯 Zero Friction</h3>
              <p className="text-sm text-muted-foreground">
                Get from &quot;fresh OS&quot; to &quot;coding&quot; in the shortest time possible, with minimal manual configuration.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">🔄 Consistency</h3>
              <p className="text-sm text-muted-foreground">
                Same environment on every machine. No more &quot;works on my machine&quot; problems.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">📦 Modularity</h3>
              <p className="text-sm text-muted-foreground">
                Start minimal, add services as needed. Don&apos;t pay for what you don&apos;t use.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold mb-2">🔓 Transparency</h3>
              <p className="text-sm text-muted-foreground">
                Open source, well-documented, and easy to understand. No magic, no vendor lock-in.
              </p>
            </div>
          </div>
        </section>

        {/* Author */}
        <section className="mb-12 bg-muted/50 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-4">Author</h2>
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <p className="text-muted-foreground mb-4">
                DevMagic is created and maintained by <strong>Marcelo de Castro Rodrigues e Almeida</strong> (<a href="https://github.com/marcelocra" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@marcelocra</a>).
              </p>
              <p className="text-muted-foreground">
                This is primarily a personal project designed to solve real development workflow challenges. However, contributions from the community are welcome and appreciated!
              </p>
            </div>
          </div>
        </section>

        {/* Contributing */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Contributing</h2>
          <p className="text-muted-foreground mb-4">
            While DevMagic is primarily a personal project, contributions are welcome! Whether it&apos;s bug reports, feature suggestions, or pull requests, your input helps make DevMagic better.
          </p>

          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <h3 className="font-semibold mb-1">Contributing Guidelines</h3>
                <p className="text-sm text-muted-foreground">
                  Read the <a href="https://github.com/marcelocra/devmagic/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">CONTRIBUTING.md</a> file for detailed information on how to contribute.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <h3 className="font-semibold mb-1">Report Issues</h3>
                <p className="text-sm text-muted-foreground">
                  Found a bug or have a feature request? <a href="https://github.com/marcelocra/devmagic/issues/new" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Open an issue</a> on GitHub.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <div>
                <h3 className="font-semibold mb-1">Share Your Project</h3>
                <p className="text-sm text-muted-foreground">
                  Using DevMagic? <Link href="/showcase" className="text-primary hover:underline">Add your project to the showcase</Link> to help others discover new use cases.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* License */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">License</h2>
          <p className="text-muted-foreground mb-4">
            DevMagic is licensed under the <strong>Apache License 2.0</strong>. This means you can:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground mb-4">
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              Use it commercially
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              Modify it freely
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              Distribute it
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary">✓</span>
              Place warranty
            </li>
          </ul>
          <p className="text-sm text-muted-foreground">
            See the <a href="https://github.com/marcelocra/devmagic/blob/main/LICENSE.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">LICENSE.md</a> file for full details.
          </p>
        </section>

        {/* Links */}
        <section className="bg-primary/5 rounded-lg p-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Links & Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://github.com/marcelocra/devmagic"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              <div>
                <div className="font-semibold">GitHub Repository</div>
                <div className="text-sm text-muted-foreground">Source code and issues</div>
              </div>
            </a>

            <a
              href="https://github.com/marcelocra/devmagic/issues"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <div>
                <div className="font-semibold">Issue Tracker</div>
                <div className="text-sm text-muted-foreground">Report bugs and request features</div>
              </div>
            </a>

            <Link
              href="/docs"
              className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <div>
                <div className="font-semibold">Documentation</div>
                <div className="text-sm text-muted-foreground">Learn how to use DevMagic</div>
              </div>
            </Link>

            <Link
              href="/changelog"
              className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:shadow-md transition-shadow"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div>
                <div className="font-semibold">Changelog</div>
                <div className="text-sm text-muted-foreground">Version history and updates</div>
              </div>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
