import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-border mt-auto relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-4 py-12 relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              {/* Logo */}
              <svg className="w-8 h-8" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient id="footerLogoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{stopColor: '#7c3aed'}}/>
                    <stop offset="50%" style={{stopColor: '#a855f7'}}/>
                    <stop offset="100%" style={{stopColor: '#06b6d4'}}/>
                  </linearGradient>
                </defs>
                <path 
                  d="M 175 70 C 175 70 50 200 50 200 C 50 200 175 330 175 330 C 185 340 175 350 165 340 C 165 340 30 200 30 200 C 30 200 165 60 165 60 C 175 50 185 60 175 70 Z" 
                  fill="url(#footerLogoGradient)" 
                />
                <path 
                  d="M 225 70 C 225 70 350 200 350 200 C 350 200 225 330 225 330 C 215 340 225 350 235 340 C 235 340 370 200 370 200 C 370 200 235 60 235 60 C 225 50 215 60 225 70 Z" 
                  fill="url(#footerLogoGradient)" 
                />
                <circle cx="200" cy="200" r="5" fill="white" opacity="0.9"/>
              </svg>
              <span className="font-bold text-lg gradient-text">DevMagic</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Portable development environments for everyone. Zero friction, infinite possibilities.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Product</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/getting-started" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                  Getting Started
                </Link>
              </li>
              <li>
                <Link href="/features" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/docs" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/changelog" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Community</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://github.com/marcelocra/devmagic" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://github.com/marcelocra/devmagic/issues" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                  Issue Tracker
                </a>
              </li>
              <li>
                <Link href="/showcase" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                  Showcase
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="https://github.com/marcelocra/devmagic/blob/main/LICENSE.md" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block">
                  Apache 2.0 License
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} DevMagic. Made with ✨ for developers.
          </p>
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/marcelocra/devmagic"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
