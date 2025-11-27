import { ApiClient } from "@/src/lib/apiClient";

export interface Favorite {
  id: number;
  name: string;
  url: string;
  icon: string;
  order: number;
  createdAt: string;
}

export interface FavoriteListResponse {
  data: Favorite[];
  total: number;
}

export const favoriteApi = {
  /**
   * 즐겨찾기 목록 조회
   * Mock 모드: /api/favorites (Next.js API Route)
   * Real 모드: {API_BASE_URL}/favorites
   */
  getList: async (): Promise<FavoriteListResponse> => {
    return ApiClient.get<FavoriteListResponse>("/favorites");
  },

  /**
   * 즐겨찾기 삭제
   * Mock 모드: /api/favorites?id={id} (Next.js API Route)
   * Real 모드: {API_BASE_URL}/favorites/{id}
   */
  delete: async (id: number): Promise<{ success: boolean; message: string }> => {
    return ApiClient.delete(`/favorites`, { id });
  },
};

