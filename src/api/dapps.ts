import { axiosInstance } from "@/src/lib/axios";
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
  // DApp 리스트 조회 (무한 스크롤용)
  getList: async (params: DAppListParams): Promise<DAppListResponse> => {
    const response = await axiosInstance.get<DAppListResponse>("/dapps", {
      params,
    });
    return response.data;
  },
};

