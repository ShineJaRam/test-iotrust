/**
 * 환경 변수 설정
 * 환경별로 다른 설정값을 제공합니다.
 */

export const ENV = {
  // 현재 환경 (development | staging | production)
  CURRENT: process.env.NEXT_PUBLIC_ENV || "development",

  // API Base URL
  API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || "/api",

  // Mock 데이터 사용 여부
  USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK === "true",

  // 환경 체크 헬퍼
  isDevelopment: () =>
    process.env.NEXT_PUBLIC_ENV === "development" ||
    process.env.NODE_ENV === "development",
  isStaging: () => process.env.NEXT_PUBLIC_ENV === "staging",
  isProduction: () =>
    process.env.NEXT_PUBLIC_ENV === "production" ||
    process.env.NODE_ENV === "production",
} as const;

// 환경 정보 로깅 (개발 환경에서만)
if (ENV.isDevelopment()) {
  console.log("🌍 Environment Configuration:", {
    ENV: ENV.CURRENT,
    API_BASE_URL: ENV.API_BASE_URL,
    USE_MOCK: ENV.USE_MOCK,
  });
}

