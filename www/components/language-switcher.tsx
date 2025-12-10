"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { locales, localeNames, type Locale } from "@/i18n/config";

const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

export function LanguageSwitcher() {
  const t = useTranslations("languageSwitcher");
  const currentLocale = useLocale() as Locale;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLocaleChange = (locale: Locale) => {
    // Set cookie for persistence (1 year expiry)
    // Using document.cookie is safe for client-side cookie operations
    const cookieValue = `${LOCALE_COOKIE_NAME}=${locale};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    document.cookie = cookieValue;

    // Reload the page to apply the new locale from the server
    // This is necessary because next-intl loads locale from cookies server-side
    window.location.reload();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors p-2 hover:bg-muted rounded-lg"
        aria-label={t("currentLanguage", { language: localeNames[currentLocale] })}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        {/* Official Language Icon from languageicon.org */}
        <img src="/language-icon.svg" alt="Change language" className="w-5 h-5" />
        <span className="text-sm font-medium hidden sm:inline">{currentLocale === "en" ? "EN" : "PT"}</span>
        {/* Dropdown arrow */}
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-background border border-border rounded-lg shadow-lg py-1 z-50"
          role="listbox"
          aria-label={t("label")}
        >
          {locales.map((locale) => (
            <button
              key={locale}
              type="button"
              onClick={() => handleLocaleChange(locale)}
              className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center justify-between ${
                locale === currentLocale ? "bg-primary/10 text-primary font-medium" : "text-foreground hover:bg-muted"
              }`}
              role="option"
              aria-selected={locale === currentLocale}
            >
              <span>{localeNames[locale]}</span>
              {locale === currentLocale && (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
