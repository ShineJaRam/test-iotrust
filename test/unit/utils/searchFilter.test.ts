import { describe, it, expect } from "vitest";
import { filterDAppsBySearch } from "@/src/utils/searchFilter";
import { DApp } from "@/src/data/dapps";

const mockDApps: DApp[] = [
  {
    id: 1,
    name: "Uniswap",
    icon: "/images/uniswap.png",
    url: "https://uniswap.org",
    description_en: "Decentralized exchange protocol",
    description_ko: "탈중앙화 거래소 프로토콜",
    networks: ["Ethereum", "Polygon"],
  },
  {
    id: 2,
    name: "OpenSea",
    icon: "/images/opensea.png",
    url: "https://opensea.io",
    description_en: "NFT marketplace",
    description_ko: "NFT 마켓플레이스",
    networks: ["Ethereum"],
  },
  {
    id: 3,
    name: "Aave",
    icon: "/images/aave.png",
    url: "https://aave.com",
    description_en: "Lending protocol",
    description_ko: "대출 프로토콜",
    networks: ["Ethereum", "Avalanche"],
  },
];

describe("filterDAppsBySearch", () => {
  it("검색어가 없으면 모든 DApp을 반환한다", () => {
    const result = filterDAppsBySearch(mockDApps, "");
    expect(result).toEqual(mockDApps);
  });

  it("이름으로 검색한다", () => {
    const result = filterDAppsBySearch(mockDApps, "Uniswap");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Uniswap");
  });

  it("영문 설명으로 검색한다", () => {
    const result = filterDAppsBySearch(mockDApps, "marketplace");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("OpenSea");
  });

  it("한글 설명으로 검색한다", () => {
    const result = filterDAppsBySearch(mockDApps, "대출");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Aave");
  });

  it("네트워크로 검색한다", () => {
    const result = filterDAppsBySearch(mockDApps, "Polygon");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Uniswap");
  });

  it("대소문자를 구분하지 않는다", () => {
    const result = filterDAppsBySearch(mockDApps, "uniswap");
    expect(result).toHaveLength(1);
    expect(result[0].name).toBe("Uniswap");
  });

  it("여러 DApp이 매칭되면 모두 반환한다", () => {
    const result = filterDAppsBySearch(mockDApps, "Ethereum");
    expect(result).toHaveLength(3);
  });

  it("매칭되는 DApp이 없으면 빈 배열을 반환한다", () => {
    const result = filterDAppsBySearch(mockDApps, "NonExistent");
    expect(result).toHaveLength(0);
  });

  it("공백만 있는 검색어는 모든 DApp을 반환한다", () => {
    const result = filterDAppsBySearch(mockDApps, "   ");
    expect(result).toEqual(mockDApps);
  });
});

