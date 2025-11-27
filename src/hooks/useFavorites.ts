import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoriteApi } from "@/src/api/favorites";

export const useFavorites = () => {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoriteApi.getList(),
    staleTime: 5 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
  });
};

export const useDeleteFavorite = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => favoriteApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
};
