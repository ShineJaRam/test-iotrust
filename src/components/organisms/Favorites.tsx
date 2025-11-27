"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useFavorites, useDeleteFavorite } from "@/src/hooks/useFavorites";
import { useModalStore } from "@/src/store/modalStore";
import { Icon, FavoriteListSkeleton } from "@/src/components/atoms";

export const Favorites = () => {
  const t = useTranslations();
  const { data, isLoading, isError } = useFavorites();
  const deleteFavorite = useDeleteFavorite();
  const openModal = useModalStore((state) => state.openModal);

  const handleDeleteClick = useCallback(
    (id: number) => {
      openModal(
        t("dapp_favorite_delete"),
        t("dapp_favorite_delete_confirm"),
        () => {
          deleteFavorite.mutate(id);
        }
      );
    },
    [openModal, t, deleteFavorite]
  );

  if (isLoading) {
    return (
      <section className="bg-gray-100 py-4 px-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">
          {t("dapp_favorite_title")}
        </h2>
        <FavoriteListSkeleton count={3} />
      </section>
    );
  }

  if (isError || !data || data.data.length === 0) {
    return null;
  }

  const favorites = data.data;

  return (
    <section className="bg-gray-100 py-4 px-4">
      <h2 className="text-base font-bold text-gray-900 mb-3">
        {t("dapp_favorite_title")}
      </h2>

      <div className="space-y-2">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="bg-white rounded-lg p-3 flex items-center gap-3"
          >
            <div className="relative w-12 h-12 shrink-0">
              <Image
                src={favorite.icon}
                alt={favorite.name}
                width={48}
                height={48}
                className="rounded-lg"
                loading="lazy"
                quality={85}
                sizes="48px"
              />
            </div>

            <a
              href={favorite.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-0"
            >
              <h3 className="text-sm font-semibold text-gray-900 truncate">
                {favorite.name}
              </h3>
              <p className="text-xs text-gray-500 truncate">{favorite.url}</p>
            </a>

            <button
              onClick={() => handleDeleteClick(favorite.id)}
              disabled={deleteFavorite.isPending}
              className="shrink-0 hover:text-gray-600 transition-colors disabled:opacity-50"
              aria-label={t("dapp_favorite_delete")}
            >
              <Icon.Trash size="md" color="text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
