import axios from "axios";

const getApiBaseUrl = () => {
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === "true";
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  if (useMock) {
    return "/api";
  }

  return apiBaseUrl || "/api";
};

export const axiosInstance = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
    } else if (error.request) {
      console.error("Network Error:", error.request);
    } else {
      console.error("Error:", error.message);
    }
    return Promise.reject(error);
  }
);
