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
  getList: async (params: DAppListParams): Promise<DAppListResponse> => {
    return ApiClient.get<DAppListResponse>("/dapps", params);
  },
};
