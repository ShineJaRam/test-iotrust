import { useQuery } from "@tanstack/react-query";
import { useLocale } from "next-intl";
import { bannerApi } from "@/src/api/banners";

export const useBanners = () => {
  const locale = useLocale();

  return useQuery({
    queryKey: ["banners", locale],
    queryFn: () => bannerApi.getList(locale),
    staleTime: 10 * 60 * 1000, // 10분
    gcTime: 30 * 60 * 1000, // 30분
  });
};

