import { DApp } from "@/src/data/dapps";

/**
 * DApp 검색 필터 유틸리티
 * 이름과 설명(한글/영문)으로 검색
 */
export const filterDAppsBySearch = (
  dapps: DApp[],
  searchQuery: string
): DApp[] => {
  if (!searchQuery.trim()) {
    return dapps;
  }

  const query = searchQuery.toLowerCase().trim();

  return dapps.filter((dapp) => {
    // 이름으로 검색
    const nameMatch = dapp.name.toLowerCase().includes(query);

    // 영문 설명으로 검색
    const descEnMatch =
      dapp.description_en?.toLowerCase().includes(query) || false;

    // 한글 설명으로 검색
    const descKoMatch =
      dapp.description_ko?.toLowerCase().includes(query) || false;

    // 네트워크 이름으로 검색
    const networkMatch =
      dapp.networks?.some((network) =>
        network.toLowerCase().includes(query)
      ) || false;

    return nameMatch || descEnMatch || descKoMatch || networkMatch;
  });
};

/**
 * 검색 결과 하이라이트를 위한 유틸리티
 */
export const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;

  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<mark>$1</mark>");
};

