"use client";

import { useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { isIOS } from "react-device-detect";
import Image from "next/image";
import { DAPP_LIST } from "@/src/data/dapps";

export const DAppList = () => {
  const t = useTranslations();
  const locale = useLocale();
  const env = process.env.NEXT_PUBLIC_ENV || "production";

  const filteredDApps = useMemo(() => {
    return DAPP_LIST.filter((dapp) => {
      // iOS 전용 필터
      if (dapp.showOnlyForIOS && !isIOS) {
        return false;
      }

      // 영어 전용 필터
      if (dapp.showOnlyForEnglish && locale !== "en") {
        return false;
      }

      // 한국어 전용 필터
      if (dapp.showOnlyForKorean && locale !== "ko") {
        return false;
      }

      // dev/stage 환경 전용 필터
      if (dapp.showOnlyInDevStage && env === "production") {
        return false;
      }

      return true;
    });
  }, [locale, env]);

  return (
    <section className="bg-white py-4 px-4">
      <h2 className="text-base font-bold text-gray-900 mb-3">
        {t("dapp_list_title")}
      </h2>

      <div className="space-y-3">
        {filteredDApps.map((dapp) => {
          const description =
            locale === "ko" ? dapp.description_ko : dapp.description_en;

          return (
            <a
              key={dapp.id}
              href={dapp.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {/* Icon */}
              <div className="relative w-12 h-12 shrink-0">
                <Image
                  src={dapp.icon}
                  alt={dapp.name}
                  width={48}
                  height={48}
                  className="rounded-lg"
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">
                  {dapp.name}
                </h3>
                {description && (
                  <p className="text-xs text-gray-600 line-clamp-2">
                    {description}
                  </p>
                )}
                {dapp.networks && dapp.networks.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {dapp.networks.map((network, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                      >
                        {network}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Arrow Icon */}
              <div className="shrink-0 text-gray-400">
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
};
