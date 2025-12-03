"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("footer");

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
                <path d="M 180 80 L 60 200 L 180 320 L 180 260 L 140 200 L 180 140 Z" fill="#8b5cf6" />
                <path d="M 220 80 L 340 200 L 220 320 L 220 260 L 260 200 L 220 140 Z" fill="#8b5cf6" />
              </svg>
              <span className="font-bold text-lg bg-linear-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent">
                DevMagic
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{t("tagline")}</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              {t("product")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/getting-started"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  {t("gettingStarted")}
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  {t("features")}
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  {t("documentation")}
                </Link>
              </li>
              <li>
                <Link
                  href="/changelog"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  {t("changelog")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">
              {t("community")}
            </h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/marcelocra/devmagic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  {t("githubRepository")}
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/marcelocra/devmagic/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  {t("issueTracker")}
                </a>
              </li>
              <li>
                <Link
                  href="/showcase"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  {t("showcase")}
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  {t("about")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">{t("legal")}</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com/marcelocra/devmagic/blob/main/LICENSE.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors hover:translate-x-1 inline-block"
                >
                  {t("license")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">{t("copyright", { year: new Date().getFullYear() })}</p>
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
  );
}
