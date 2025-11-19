import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Documentation - DevMagic',
  description: 'Complete documentation for DevMagic portable development environments.',
}

export default function DocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-xl text-muted-foreground mb-12">
          Everything you need to know about using and customizing DevMagic.
        </p>

        <div className="bg-card border border-primary/20 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4">📖 Documentation Coming Soon</h2>
          <p className="text-muted-foreground mb-4">
            Comprehensive documentation is being prepared. For now, please refer to:
          </p>
          <ul className="space-y-2">
            <li>
              <Link href="/getting-started" className="text-primary hover:underline">Getting Started Guide</Link> - Quick start instructions
            </li>
            <li>
              <a href="https://github.com/marcelocra/devmagic/blob/main/README.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                README.md
              </a> - Full project documentation
            </li>
            <li>
              <a href="https://github.com/marcelocra/devmagic/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                CONTRIBUTING.md
              </a> - Development and contribution guidelines
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
