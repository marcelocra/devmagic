import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold mb-3">DevMagic</h3>
            <p className="text-sm text-muted-foreground">
              Portable development environments for everyone.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/marcelocra/devmagic" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://github.com/marcelocra/devmagic/issues" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Issue Tracker
                </a>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://github.com/marcelocra/devmagic/blob/main/LICENSE.md" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                  Apache 2.0 License
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} DevMagic. Apache 2.0 Licensed.</p>
        </div>
      </div>
    </footer>
  )
}
