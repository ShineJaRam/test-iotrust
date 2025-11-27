"use client";

import { Drawer } from "vaul";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useBottomSheetStore } from "@/src/store/bottomSheetStore";

export const DAppBottomSheet = () => {
  const locale = useLocale();
  const { isOpen, dapp, closeSheet } = useBottomSheetStore();

  // dapp 정보가 없으면 렌더링하지 않음
  if (!dapp) return null;

  const description =
    locale === "ko" ? dapp.description_ko : dapp.description_en;

  const handleGoClick = () => {
    window.open(dapp.url, "_blank");
    closeSheet();
  };

  return (
    <Drawer.Root open={isOpen} onOpenChange={(open) => !open && closeSheet()}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40" />
        <Drawer.Content className="bg-white flex flex-col rounded-t-[16px] h-[85%] mt-24 fixed bottom-0 left-0 right-0 z-50 max-w-[759px] mx-auto">
          {/* Handle */}
          <div className="flex justify-center py-4">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Content */}
          <div className="px-6 pb-6 overflow-y-auto flex-1">
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="relative w-16 h-16 shrink-0">
                <Image
                  src={dapp.icon}
                  alt={dapp.name}
                  width={64}
                  height={64}
                  className="rounded-xl"
                  loading="lazy" // Lazy loading 적용
                  quality={85}
                  sizes="64px"
                />
              </div>
              <div className="flex-1 min-w-0">
                <Drawer.Title className="text-xl font-bold text-gray-900 mb-1">
                  {dapp.name}
                </Drawer.Title>
                {dapp.networks && dapp.networks.length > 0 && (
                  <p className="text-sm text-gray-500">
                    {dapp.networks.join(", ")}
                  </p>
                )}
              </div>
            </div>

            {/* URL */}
            <a
              href={dapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-sm text-blue-600 mb-6 hover:underline break-all"
            >
              {dapp.url}
            </a>

            {/* Description */}
            {description && (
              <div className="mb-8">
                <h3 className="text-base font-bold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {description}
                </p>
              </div>
            )}

            {/* Go Button */}
            <button
              onClick={handleGoClick}
              className="w-full py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-colors cursor-pointer"
            >
              Go
            </button>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};
