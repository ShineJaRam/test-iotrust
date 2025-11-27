"use client";

import { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useModalStore } from "@/src/store/modalStore";

export const Modal = () => {
  const t = useTranslations();
  const { isOpen, title, message, onConfirm, closeModal } = useModalStore();

  const handleConfirm = useCallback(() => {
    if (onConfirm) {
      onConfirm();
    }
    closeModal();
  }, [onConfirm, closeModal]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-sm w-full overflow-hidden shadow-2xl">
        <div className="px-6 pt-6 pb-4 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-3">{title}</h3>
          <div className="w-full h-px bg-gray-200 mb-3" />
          <p className="text-sm text-gray-700 leading-relaxed">{message}</p>
        </div>
        <div className="flex gap-3 px-6 pb-6">
          <button
            onClick={closeModal}
            className="flex-1 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("button_cancel")}
          </button>
          <button
            onClick={handleConfirm}
            className="flex-1 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t("button_confirm")}
          </button>
        </div>
      </div>
    </div>
  );
};
