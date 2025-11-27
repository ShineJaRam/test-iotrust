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
  getList: async (): Promise<FavoriteListResponse> => {
    return ApiClient.get<FavoriteListResponse>("/favorites");
  },

  delete: async (
    id: number
  ): Promise<{ success: boolean; message: string }> => {
    return ApiClient.delete(`/favorites`, { id });
  },
};
