"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useLocale, useTranslations } from "next-intl";
import { isIOS } from "react-device-detect";
import Image from "next/image";
import { useDAppList } from "@/src/hooks/useDAppList";
import { useBottomSheetStore } from "@/src/store/bottomSheetStore";
import { DAppListSkeleton } from "./DAppSkeleton";
import { SearchBar } from "./SearchBar";
import { DApp } from "@/src/data/dapps";
import { filterDAppsBySearch } from "@/src/utils/searchFilter";

export const VirtualDAppList = () => {
  const t = useTranslations();
  const locale = useLocale();
  const openSheet = useBottomSheetStore((state) => state.openSheet);
  const [searchQuery, setSearchQuery] = useState("");

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
  const filteredByDevice = useMemo(
    () =>
      allDApps.filter((dapp) => {
        if (dapp.showOnlyForIOS && !isIOS) {
          return false;
        }
        return true;
      }),
    [allDApps]
  );

  // 검색 필터링 적용
  const filteredDApps = useMemo(
    () => filterDAppsBySearch(filteredByDevice, searchQuery),
    [filteredByDevice, searchQuery]
  );

  // 무한 스크롤 핸들러 (전체 페이지 스크롤 기반)
  const handleScroll = useCallback(() => {
    // 검색 중일 때는 무한 스크롤 비활성화
    if (searchQuery.trim()) return;
    if (!hasNextPage || isFetchingNextPage) return;

    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // 스크롤이 하단에서 300px 이내에 도달하면 다음 페이지 로드
    if (scrollTop + windowHeight >= documentHeight - 300) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, searchQuery]);

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
  if (filteredByDevice.length === 0) {
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
      <h2 className="text-base font-bold text-gray-900 mb-4">
        DApp List ({filteredByDevice.length.toLocaleString()} items)
      </h2>

      {/* 검색창 */}
      <div className="mb-4">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder={
            locale === "ko"
              ? "DApp 이름, 설명, 네트워크로 검색..."
              : "Search by name, description, network..."
          }
        />
      </div>

      {/* 검색 결과 정보 */}
      {searchQuery.trim() && (
        <div className="mb-3 text-sm text-gray-600">
          {filteredDApps.length > 0 ? (
            <p>
              <span className="font-semibold text-green-600">
                {filteredDApps.length}
              </span>{" "}
              {locale === "ko"
                ? "개의 검색 결과"
                : `result${filteredDApps.length !== 1 ? "s" : ""} found`}
            </p>
          ) : (
            <p className="text-gray-500">
              {locale === "ko" ? "검색 결과가 없습니다." : "No results found."}
            </p>
          )}
        </div>
      )}

      {/* DApp 리스트 */}
      {filteredDApps.length > 0 ? (
        <>
          <div className="space-y-3">
            {filteredDApps.map((dapp) => (
              <DAppItem
                key={dapp.id}
                dapp={dapp}
                locale={locale}
                searchQuery={searchQuery}
                onClick={() => openSheet(dapp)}
              />
            ))}
          </div>

          {/* 로딩 인디케이터 (검색 중이 아닐 때만) */}
          {!searchQuery.trim() && isFetchingNextPage && (
            <div className="text-center py-6">
              <div className="inline-block w-8 h-8 border-3 border-green-600 border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-gray-500 mt-2">Loading more...</p>
            </div>
          )}

          {/* 더 이상 데이터가 없을 때 (검색 중이 아닐 때만) */}
          {!searchQuery.trim() && !hasNextPage && (
            <div className="text-center py-6">
              <p className="text-sm text-gray-500">
                {locale === "ko"
                  ? `모든 DApp을 불러왔습니다. (${filteredByDevice.length.toLocaleString()} items)`
                  : `All DApps loaded. (${filteredByDevice.length.toLocaleString()} items)`}
              </p>
            </div>
          )}
        </>
      ) : (
        // 검색 결과가 없을 때
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg
              className="w-16 h-16 mx-auto"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <p className="text-gray-600 font-medium mb-2">
            {locale === "ko"
              ? `"${searchQuery}"에 대한 검색 결과가 없습니다.`
              : `No results found for "${searchQuery}"`}
          </p>
          <p className="text-sm text-gray-500">
            {locale === "ko"
              ? "다른 검색어를 입력해보세요."
              : "Try different keywords."}
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
  searchQuery: string;
  onClick: () => void;
}

const DAppItem = ({ dapp, locale, searchQuery, onClick }: DAppItemProps) => {
  const description =
    locale === "ko" ? dapp.description_ko : dapp.description_en;

  // 검색어 하이라이트 함수
  const highlightText = (text: string) => {
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
          loading="lazy" // Lazy loading 적용
          quality={85}
          sizes="48px"
        />
      </div>

      {/* Content */}
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
