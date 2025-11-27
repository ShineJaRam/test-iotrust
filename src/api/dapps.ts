import { ApiClient } from "@/src/lib/apiClient";
import { DApp } from "@/src/data/dapps";

export interface DAppListResponse {
  data: DApp[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface DAppListParams {
  page?: number;
  pageSize?: number;
  locale?: string;
  env?: string;
}

export const dappApi = {
  /**
   * DApp 리스트 조회 (무한 스크롤용)
   * Mock 모드: /api/dapps (Next.js API Route)
   * Real 모드: {API_BASE_URL}/dapps
   */
  getList: async (params: DAppListParams): Promise<DAppListResponse> => {
    return ApiClient.get<DAppListResponse>("/dapps", params);
  },
};

