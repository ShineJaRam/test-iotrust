"use client";

import { useEffect, useCallback } from "react";
import { useLocale } from "next-intl";
import { isIOS } from "react-device-detect";
import Image from "next/image";
import { useDAppList } from "@/src/hooks/useDAppList";
import { useBottomSheetStore } from "@/src/store/bottomSheetStore";
import { DAppListSkeleton } from "./DAppSkeleton";
import { DApp } from "@/src/data/dapps";

export const VirtualDAppList = () => {
  const locale = useLocale();
  const openSheet = useBottomSheetStore((state) => state.openSheet);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useDAppList({ pageSize: 20 });

  // 모든 페이지의 데이터를 평탄화
  const allDApps = data?.pages.flatMap((page) => page.data) ?? [];

  // iOS 필터링 적용
  const filteredDApps = allDApps.filter((dapp) => {
    if (dapp.showOnlyForIOS && !isIOS) {
      return false;
    }
    return true;
  });

  // 무한 스크롤 핸들러 (전체 페이지 스크롤 기반)
  const handleScroll = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 스크롤이 하단에서 300px 이내에 도달하면 다음 페이지 로드
    if (scrollTop + windowHeight >= documentHeight - 300) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // 스크롤 이벤트 리스너 등록
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // 로딩 상태
  if (isLoading) {
    return (
      <section className="bg-white py-4 px-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">DApp List</h2>
        <DAppListSkeleton count={10} />
      </section>
    );
  }

  // 에러 상태
  if (isError) {
    return (
      <section className="bg-white py-4 px-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">DApp List</h2>
        <div className="text-center py-8">
          <p className="text-red-600 mb-2">데이터를 불러오는데 실패했습니다.</p>
          <p className="text-sm text-gray-500">
            {error instanceof Error ? error.message : "Unknown error"}
          </p>
        </div>
      </section>
    );
  }

  // 데이터가 없는 경우
  if (filteredDApps.length === 0) {
    return (
      <section className="bg-white py-4 px-4">
        <h2 className="text-base font-bold text-gray-900 mb-3">DApp List</h2>
        <div className="text-center py-8">
          <p className="text-gray-500">표시할 DApp이 없습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-4 px-4">
      <h2 className="text-base font-bold text-gray-900 mb-3">
        DApp List ({filteredDApps.length.toLocaleString()} items)
      </h2>

      <div className="space-y-3">
        {filteredDApps.map((dapp) => (
          <DAppItem
            key={dapp.id}
            dapp={dapp}
            locale={locale}
            onClick={() => openSheet(dapp)}
          />
        ))}
      </div>

      {/* 로딩 인디케이터 */}
      {isFetchingNextPage && (
        <div className="text-center py-6">
          <div className="inline-block w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-500 mt-2">Loading more...</p>
        </div>
      )}

      {/* 더 이상 데이터가 없을 때 */}
      {!hasNextPage && filteredDApps.length > 0 && (
        <div className="text-center py-6">
          <p className="text-sm text-gray-500">
            모든 DApp을 불러왔습니다. ({filteredDApps.length.toLocaleString()}{" "}
            items)
          </p>
        </div>
      )}
    </section>
  );
};

// DApp 아이템 컴포넌트
interface DAppItemProps {
  dapp: DApp;
  locale: string;
  onClick: () => void;
}

const DAppItem = ({ dapp, locale, onClick }: DAppItemProps) => {
  const description =
    locale === "ko" ? dapp.description_ko : dapp.description_en;

  return (
    <button
      onClick={onClick}
      className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors text-left"
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
          <p className="text-xs text-gray-600 line-clamp-2">{description}</p>
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
    </button>
  );
};
