import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    // 이미지 포맷 최적화 설정
    formats: ["image/webp", "image/avif"], // WebP 우선, AVIF도 지원

    // 외부 이미지 도메인 허용 (필요시)
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],

    // 이미지 품질 설정 (1-100, 기본값 75)
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // 최적화된 이미지 품질
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1년 캐싱
  },
};

export default withNextIntl(nextConfig);
