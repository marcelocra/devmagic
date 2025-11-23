import { Button } from '@/components/button'
import { CodeBlock } from '@/components/code-block'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
            Your Development Environment, Anywhere
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Zero host installation. Cross-platform. Consistent. Portable development environments using VS Code Dev Containers.
          </p>

          <div className="mb-8">
            <CodeBlock
              code="curl -fsSL https://devmagic.run/install | bash"
              className="max-w-2xl mx-auto"
            />
            <p className="text-sm text-muted-foreground mt-2">
              (Always recommended to <Link href="/install" className="underline hover:text-foreground transition-colors">inspect the script</Link> first)
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button href="/getting-started" variant="primary" size="lg">
              Get Started
            </Button>
            <Button href="https://github.com/marcelocra/devmagic" variant="outline" size="lg" target="_blank" rel="noopener noreferrer">
              View on GitHub
            </Button>
          </div>
        </div>
      </section>

      {/* Key Benefits */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why DevMagic?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Zero Friction</h3>
              <p className="text-muted-foreground">
                One command for a complete dev environment. No language runtimes, no package managers, just container runtime + VS Code.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Truly Portable</h3>
              <p className="text-muted-foreground">
                Same environment on Windows, Linux, macOS. Move between machines seamlessly. Fresh OS? Up and running in minutes.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Start Minimal, Scale Up</h3>
              <p className="text-muted-foreground">
                Begin with a basic dev container. Add databases, AI tools, and services only when needed via Docker Compose profiles.
              </p>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Battle-Tested</h3>
              <p className="text-muted-foreground">
                Open source and transparent. Used in real development workflows. Customize freely or use as-is.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Usage Modes */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Three Ways to Use DevMagic</h2>
          <p className="text-center text-muted-foreground mb-12">
            Flexible enough for any workflow
          </p>

          <div className="space-y-8">
            <div className="border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Standalone - Portable Dev Terminal</h3>
                  <p className="text-muted-foreground mb-3">
                    Use DevMagic directly as your primary development environment. Perfect for fresh OS installations or throw-away workspaces.
                  </p>
                  <code className="text-sm bg-muted px-2 py-1 rounded">git clone → open in VS Code → Reopen in Container</code>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Project Setup - Add to Your Projects</h3>
                  <p className="text-muted-foreground mb-3">
                    Add DevMagic to any project with one command. Contributors get instant, consistent development environments.
                  </p>
                  <code className="text-sm bg-muted px-2 py-1 rounded">curl -fsSL https://devmagic.run/install | bash</code>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Maintainer - Develop DevMagic Itself</h3>
                  <p className="text-muted-foreground mb-3">
                    Work on DevMagic (including this website) using its own dev container. Self-hosting at its finest.
                  </p>
                  <code className="text-sm bg-muted px-2 py-1 rounded">Clone → VS Code → Reopen in Container → hack on DevMagic</code>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button href="/getting-started" variant="primary">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="bg-muted/50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Quick Start</h2>
            <div className="bg-card border border-border rounded-lg p-8">
              <h3 className="text-xl font-semibold mb-4">Prerequisites</h3>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span>Container runtime (<a href="https://podman-desktop.io" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Podman Desktop</a> or Docker)</span>
                </li>
                <li className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span><a href="https://code.visualstudio.com/" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Visual Studio Code</a> (or any Dev Container compatible editor)</span>
                </li>
              </ul>

              <h3 className="text-xl font-semibold mb-4">Installation</h3>
              <CodeBlock
                code={`git clone https://github.com/marcelocra/devmagic.git
cd devmagic
# Open in VS Code and select "Reopen in Container"`}
                className="mb-4"
              />

              <p className="text-muted-foreground">
                That&apos;s it! You now have a fully-featured development environment without installing anything else on your host system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
