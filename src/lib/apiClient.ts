import { axiosInstance } from "./axios";
import { ENV } from "@/src/config/env";

export class ApiClient {
  static async get<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await axiosInstance.get<T>(url, { params });
    return response.data;
  }

  static async post<T>(url: string, data?: any): Promise<T> {
    const response = await axiosInstance.post<T>(url, data);
    return response.data;
  }

  static async put<T>(url: string, data?: any): Promise<T> {
    const response = await axiosInstance.put<T>(url, data);
    return response.data;
  }

  static async delete<T>(url: string, params?: Record<string, any>): Promise<T> {
    const response = await axiosInstance.delete<T>(url, { params });
    return response.data;
  }

  static isMockMode(): boolean {
    return ENV.USE_MOCK;
  }

  static getBaseUrl(): string {
    return ENV.API_BASE_URL;
  }
}
