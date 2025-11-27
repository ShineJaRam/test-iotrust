import { NextRequest, NextResponse } from "next/server";
import { DAPP_LIST, DApp } from "@/src/data/dapps";

const generateMockDApps = (): DApp[] => {
  const mockDApps: DApp[] = [];
  const repeatCount = Math.ceil(1200 / DAPP_LIST.length);

  for (let i = 0; i < repeatCount; i++) {
    DAPP_LIST.forEach((dapp, index) => {
      mockDApps.push({
        ...dapp,
        id: i * DAPP_LIST.length + index + 1,
        name: `${dapp.name} #${i * DAPP_LIST.length + index + 1}`,
      });
    });
  }

  return mockDApps;
};

const MOCK_DAPPS = generateMockDApps();

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const locale = searchParams.get("locale") || "en";
    const env = searchParams.get("env") || "production";

    const filteredDApps = MOCK_DAPPS.filter((dapp) => {
      if (dapp.showOnlyForEnglish && locale !== "en") {
        return false;
      }

      if (dapp.showOnlyForKorean && locale !== "ko") {
        return false;
      }

      if (dapp.showOnlyInDevStage && env === "production") {
        return false;
      }

      return true;
    });

    const total = filteredDApps.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredDApps.slice(startIndex, endIndex);
    const hasMore = endIndex < total;

    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      data: paginatedData,
      total,
      page,
      pageSize,
      hasMore,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
