import { getRequestConfig } from "next-intl/server";
import { cookies, headers } from "next/headers";
import { locales, defaultLocale, type Locale } from "./config";

const LOCALE_COOKIE_NAME = "NEXT_LOCALE";

export default getRequestConfig(async () => {
  // Try to get locale from cookie first (user preference)
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE_NAME)?.value as Locale | undefined;

  if (cookieLocale && locales.includes(cookieLocale)) {
    return {
      locale: cookieLocale,
      messages: (await import(`../messages/${cookieLocale}.json`)).default,
    };
  }

  // Fall back to browser's Accept-Language header
  const headersList = await headers();
  const acceptLanguage = headersList.get("accept-language") || "";

  // Parse Accept-Language header and find best match
  const browserLocale = parseAcceptLanguage(acceptLanguage);
  const locale = browserLocale && locales.includes(browserLocale as Locale) ? (browserLocale as Locale) : defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});

function parseAcceptLanguage(header: string): string | null {
  if (!header) return null;

  // Parse the Accept-Language header
  const languages = header
    .split(",")
    .map((lang) => {
      const [code, qValue] = lang.trim().split(";q=");
      return {
        code: code.trim(),
        q: qValue ? parseFloat(qValue) : 1,
      };
    })
    .sort((a, b) => b.q - a.q);

  // Find the best match from our supported locales
  for (const { code } of languages) {
    // Check exact match
    if (locales.includes(code as Locale)) {
      return code;
    }
    // Check language-only match (e.g., 'pt' matches 'pt-BR')
    const langOnly = code.split("-")[0];
    const matchedLocale = locales.find((locale) => locale.startsWith(langOnly + "-") || locale === langOnly);
    if (matchedLocale) {
      return matchedLocale;
    }
  }

  return null;
}
