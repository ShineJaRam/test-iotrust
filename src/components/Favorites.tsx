"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FAVORITES_DATA } from "@/src/data/favorites";
import { useModalStore } from "@/src/store/modalStore";

export const Favorites = () => {
  const t = useTranslations();
  const [favorites, setFavorites] = useState(FAVORITES_DATA);
  const openModal = useModalStore((state) => state.openModal);

  const handleDeleteClick = (id: number) => {
    openModal(
      t("dapp_favorite_delete"),
      t("dapp_favorite_delete_confirm"),
      () => {
        setFavorites(favorites.filter((fav) => fav.id !== id));
      }
    );
  };

  if (favorites.length === 0) {
    return null;
  }

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
                loading="lazy" // Lazy loading 적용
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
              className="shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label={t("dapp_favorite_delete")}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};
