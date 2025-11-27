import { useInfiniteQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { isIOS } from "react-device-detect";
import { dappApi } from "@/src/api/dapps";

interface UseDAppListOptions {
  pageSize?: number;
}

export const useDAppList = (options: UseDAppListOptions = {}) => {
  const { pageSize = 20 } = options;
  const locale = useLocale();
  const env = process.env.NEXT_PUBLIC_ENV || "production";

  return useInfiniteQuery({
    queryKey: ["dapps", { locale, env, pageSize }],
    queryFn: ({ pageParam = 1 }) =>
      dappApi.getList({
        page: pageParam,
        pageSize,
        locale,
        env,
      }),
    getNextPageParam: (lastPage) => {
      return lastPage.hasMore ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000, // 5분
  });
};

