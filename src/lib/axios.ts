import axios from "axios";

// 환경별 API Base URL 설정
const getApiBaseUrl = () => {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  // Mock 사용 시 로컬 API 사용
  if (useMock) {
    return "/api";
  }

  // 실제 백엔드 API URL 사용
  return apiBaseUrl || "/api";
};

export const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // 필요시 토큰 추가 등의 작업 수행
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 에러 핸들링
    if (error.response) {
      // 서버 응답이 있는 경우
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      // 요청은 보냈지만 응답이 없는 경우
      console.error("Network Error:", error.request);
    } else {
      // 요청 설정 중 에러 발생
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);

