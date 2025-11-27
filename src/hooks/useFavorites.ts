import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteApi } from "@/src/api/favorites";

export const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoriteApi.getList(),
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 15 * 60 * 1000, // 15분
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => favoriteApi.delete(id),
    onSuccess: () => {
      // 즐겨찾기 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};

