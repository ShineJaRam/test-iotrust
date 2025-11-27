"use client";

import { memo, useMemo } from "react";
import Image from "next/image";
import { DApp } from "@/src/data/dapps";
import { Icon } from "@/src/components/atoms";
import { IMAGE_SIZES, IMAGE_QUALITY } from "@/src/constants/images";

interface DAppItemProps {
  dapp: DApp;
  locale: string;
  searchQuery?: string;
  onClick: () => void;
}

export const DAppItem = memo(
  ({ dapp, locale, searchQuery = "", onClick }: DAppItemProps) => {
    const description = useMemo(
      () => (locale === "ko" ? dapp.description_ko : dapp.description_en),
      [locale, dapp.description_ko, dapp.description_en]
    );

    const highlightText = useMemo(() => {
      return (text: string) => {
        if (!searchQuery.trim() || !text) return text;

        const regex = new RegExp(`(${searchQuery})`, "gi");
        const parts = text.split(regex);

        return parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index} className="bg-yellow-200 text-gray-900">
              {part}
            </mark>
          ) : (
            part
          )
        );
      };
    }, [searchQuery]);

    return (
      <button
        onClick={onClick}
        className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
      >
        <div className="relative w-12 h-12 shrink-0">
          <Image
            src={dapp.icon}
            alt={dapp.name}
            width={48}
            height={48}
            className="rounded-lg"
            loading="lazy"
            quality={IMAGE_QUALITY.HIGH}
            sizes={IMAGE_SIZES.ICON_SM}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-gray-900 mb-1">
            {highlightText(dapp.name)}
          </h3>
          {description && (
            <p className="text-xs text-gray-600 line-clamp-2">
              {highlightText(description)}
            </p>
          )}
          {dapp.networks && dapp.networks.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {dapp.networks.map((network, index) => (
                <span
                  key={index}
                  className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
                >
                  {highlightText(network)}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="shrink-0">
          <Icon.ChevronRight size="md" color="text-gray-400" />
        </div>
      </button>
    );
  }
);

DAppItem.displayName = "DAppItem";
