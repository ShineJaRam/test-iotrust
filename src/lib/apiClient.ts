import { axiosInstance } from "./axios";
import { ENV } from "@/src/config/env";

/**
 * API 클라이언트 유틸리티
 * Mock/Real API를 환경에 따라 자동으로 분기합니다.
 */

export class ApiClient {
  /**
   * GET 요청
   */
  static async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await axiosInstance.get<T>(url, { params });
    return response.data;
  }

  /**
   * POST 요청
   */
  static async post<T>(url: string, data?: any): Promise<T> {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  }

  /**
   * PUT 요청
   */
  static async put<T>(url: string, data?: any): Promise<T> {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
  }

  /**
   * DELETE 요청
   */
  static async delete<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await axiosInstance.delete<T>(url, { params });
    return response.data;
  }

  /**
   * 현재 Mock 모드인지 확인
   */
  static isMockMode(): boolean {
    return ENV.USE_MOCK;
  }

  /**
   * 현재 API Base URL 반환
   */
  static getBaseUrl(): string {
    return ENV.API_BASE_URL;
  }
}

