import { languages, defaultLang } from "./langs";


/**
 * Get i18n lang from url
 * @param url 
 * @returns 
 * 
 * @example
 * ```astro
 * ---
 * const currentLocale = getLangFromUrl(Astro.url);
 * ---
 * ```
 */
export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang in languages) return lang as keyof typeof languages;
  return defaultLang;
}

/**
 * Used to compute i18n prefix.
 * @param currentLocale 
 * @returns 
 * 
 * @example
 * ```astro
 * <a href=`${getI18nPrefix}/blog` />
 * ```
 */
export const getI18nPrefix = (currentLocale: keyof typeof languages) =>
  currentLocale == defaultLang ? "" : `/${currentLocale}`;
