"use client";

import { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useLocale, useTranslations } from "next-intl";
import { isIOS } from "react-device-detect";
import { useDAppList } from "@/src/hooks/useDAppList";
import { useBottomSheetStore } from "@/src/store/bottomSheetStore";
import { filterDAppsBySearch } from "@/src/utils/searchFilter";
import { Icon, ListLoadingIndicator } from "@/src/components/atoms";
import {
  SearchBar,
  DAppItem,
  DAppListLoading,
  DAppListError,
  DAppListEmpty,
} from "@/src/components/molecules";
import { DApp } from "@/src/data/dapps";

export const VirtualDAppList = () => {
  const t = useTranslations();
  const locale = useLocale();
  const openSheet = useBottomSheetStore((state) => state.openSheet);
  const [searchQuery, setSearchQuery] = useState("");
  const observerTarget = useRef<HTMLDivElement>(null);

  const handleSearchChange = useCallback((value: string) => {
    setSearchQuery(value);
  }, []);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = useDAppList({ pageSize: 20 });

  const allDApps = useMemo(
    () => data?.pages.flatMap((page) => page.data) ?? [],
    [data]
  );

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

  const filteredDApps = useMemo(
    () => filterDAppsBySearch(filteredByDevice, searchQuery),
    [filteredByDevice, searchQuery]
  );

  const handleDAppClick = useCallback(
    (dapp: DApp) => {
      openSheet(dapp);
    },
    [openSheet]
  );

  useEffect(() => {
    if (searchQuery.trim()) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 0.1, rootMargin: "100px" }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, searchQuery]);

  if (isLoading) {
    return <DAppListLoading title={t("dapp_list_title")} />;
  }

  if (isError) {
    return <DAppListError title={t("dapp_list_title")} error={error} />;
  }

  if (filteredByDevice.length === 0) {
    return <DAppListEmpty title={t("dapp_list_title")} />;
  }

  return (
    <section className="bg-white py-4 px-4">
      <h2 className="text-base font-bold text-gray-900 mb-4">
        {t("dapp_list_title")} ({filteredByDevice.length.toLocaleString()}{" "}
        {t("items")})
      </h2>

      <div className="mb-4">
        <SearchBar
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={t("search_placeholder")}
        />
      </div>

      {searchQuery.trim() && (
        <div className="mb-3 text-sm text-gray-600">
          {filteredDApps.length > 0 ? (
            <p>
              <span className="font-semibold text-green-600">
                {filteredDApps.length}
              </span>{" "}
              {t("search_results")}
            </p>
          ) : (
            <p className="text-gray-500">{t("search_no_results")}</p>
          )}
        </div>
      )}

      {filteredDApps.length > 0 ? (
        <>
          <div className="space-y-3">
            {filteredDApps.map((dapp) => (
              <DAppItem
                key={dapp.id}
                dapp={dapp}
                locale={locale}
                searchQuery={searchQuery}
                onClick={() => handleDAppClick(dapp)}
              />
            ))}
          </div>

          {!searchQuery.trim() && (
            <>
              <div ref={observerTarget} className="h-4" />

              {isFetchingNextPage && (
                <ListLoadingIndicator message={t("loading_more")} />
              )}

              {!hasNextPage && (
                <div className="text-center py-6">
                  <p className="text-sm text-gray-500">
                    {t("all_loaded")} (
                    {filteredByDevice.length.toLocaleString()} {t("items")})
                  </p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4">
            <Icon.Search size="xl" color="text-gray-400" className="mx-auto" />
          </div>
          <p className="text-gray-600 font-medium mb-2">
            &ldquo;{searchQuery}&rdquo; {t("search_no_results_for")}
          </p>
          <p className="text-sm text-gray-500">{t("search_try_different")}</p>
        </div>
      )}
    </section>
  );
};
