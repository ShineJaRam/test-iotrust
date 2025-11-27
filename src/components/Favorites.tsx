"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { FAVORITES_DATA } from "@/src/data/favorites";

export const Favorites = () => {
  const t = useTranslations();
  const [favorites, setFavorites] = useState(FAVORITES_DATA);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setFavorites(favorites.filter((fav) => fav.id !== id));
    setDeleteId(null);
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
              onClick={() => setDeleteId(favorite.id)}
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

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full overflow-hidden">
            <div className="p-6 text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {t("dapp_favorite_delete")}
              </h3>
              <p className="text-sm text-gray-600">
                {t("dapp_favorite_delete_confirm")}
              </p>
            </div>
            <div className="flex border-t border-gray-200">
              <button
                onClick={() => setDeleteId(null)}
                className="flex-1 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                {t("button_cancel")}
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="flex-1 py-3 text-sm font-medium text-blue-600 hover:bg-gray-50 transition-colors border-l border-gray-200"
              >
                {t("button_confirm")}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
