import { ApiClient } from "@/src/lib/apiClient";

export interface Banner {
  id: number;
  image_en?: string;
  image_ko?: string;
  description_en?: string;
  description_ko?: string;
  link_en: string;
  link_ko: string;
  button_en?: string;
  button_ko?: string;
  order: number;
  isActive: boolean;
}

export interface BannerListResponse {
  data: Banner[];
  total: number;
}

export const bannerApi = {
  /**
   * 배너 목록 조회
   * Mock 모드: /api/banners (Next.js API Route)
   * Real 모드: {API_BASE_URL}/banners
   */
  getList: async (locale?: string): Promise<BannerListResponse> => {
    return ApiClient.get<BannerListResponse>("/banners", { locale });
  },
};

