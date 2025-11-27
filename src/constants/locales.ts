export const LOCALES = {
  EN: "en",
  KO: "ko",
} as const;

export type Locale = (typeof LOCALES)[keyof typeof LOCALES];

export const LOCALE_LIST: readonly Locale[] = Object.values(LOCALES);

export const DEFAULT_LOCALE: Locale = LOCALES.KO;

export const LOCALE_LABELS: Record<Locale, string> = {
  [LOCALES.EN]: "English",
  [LOCALES.KO]: "한국어",
};

export const isValidLocale = (locale: string): locale is Locale => {
  return LOCALE_LIST.includes(locale as Locale);
};
