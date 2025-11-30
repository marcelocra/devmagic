"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ThemeToggle } from "./theme-toggle";
import { LanguageSwitcher } from "./language-switcher";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { href: "/getting-started", label: t("gettingStarted") },
    { href: "/features", label: t("features") },
    { href: "/docs", label: t("docs") },
    { href: "/showcase", label: t("showcase") },
    { href: "/changelog", label: t("changelog") },
    { href: "/about", label: t("about") },
  ];

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold hover:opacity-90 transition-opacity group"
          >
            <svg className="w-8 h-8" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
              {/* Left angle bracket < */}
              <path d="M 180 80 L 60 200 L 180 320 L 180 260 L 140 200 L 180 140 Z" fill="#8b5cf6" />

              {/* Right angle bracket > */}
              <path d="M 220 80 L 340 200 L 220 320 L 220 260 L 260 200 L 220 140 Z" fill="#8b5cf6" />
            </svg>

            <span className="bg-linear-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent">
              DevMagic
            </span>
          </Link>
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative hover:text-foreground transition-colors font-medium ${
                  pathname === link.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.label}
                {pathname === link.href && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent rounded-full" />
                )}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <a
            href="https://github.com/marcelocra/devmagic"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
            aria-label={t("github")}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <LanguageSwitcher />
          <ThemeToggle />

          {/* Mobile menu button - Magic wand icon */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
            aria-label={isMobileMenuOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                /* X icon when menu is open */
                <g className="transition-all duration-300">
                  <path d="M6 6L18 18M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </g>
              ) : (
                /* Magic wand with sparkles when menu is closed */
                <g className="transition-all duration-300">
                  {/* Wand body */}
                  <path
                    d="M15 4L20 9L9 20L4 15L15 4Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    fill="none"
                  />
                  {/* Wand handle divider */}
                  <path d="M12 7L17 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Sparkle top */}
                  <path d="M3 3V5M3 3H5M3 3H1M3 3V1" stroke="#8b5cf6" strokeWidth="1.5" strokeLinecap="round" />
                  {/* Sparkle right */}
                  <path
                    d="M21 11V12.5M21 11H22.5M21 11H19.5M21 11V9.5"
                    stroke="#06b6d4"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 top-[65px] bg-black/20 backdrop-blur-sm md:hidden z-40"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile menu panel */}
      <div
        className={`fixed top-[65px] right-0 h-[calc(100vh-65px)] w-64 bg-background/95 backdrop-blur-lg border-l border-border shadow-xl md:hidden z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="flex flex-col p-4 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`relative px-4 py-3 rounded-lg transition-all duration-200 font-medium ${
                pathname === link.href
                  ? "text-foreground bg-gradient-to-r from-primary/10 to-accent/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              {link.label}
              {pathname === link.href && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-full" />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
