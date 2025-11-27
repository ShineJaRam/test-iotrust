import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000, // 1분
      gcTime: 5 * 60 * 1000, // 5분 (이전 cacheTime)
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});
