export const ENV = {
  CURRENT: process.env.NEXT_PUBLIC_ENV || "development",
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",
  USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK === "true",

  isDevelopment: () =>
    process.env.NEXT_PUBLIC_ENV === "development" ||
    process.env.NODE_ENV === "development",
  isStaging: () => process.env.NEXT_PUBLIC_ENV === "staging",
  isProduction: () =>
    process.env.NEXT_PUBLIC_ENV === "production" ||
    process.env.NODE_ENV === "production",
} as const;
