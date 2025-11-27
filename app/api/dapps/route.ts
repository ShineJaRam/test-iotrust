import { NextRequest, NextResponse } from "next/server";
import { DAPP_LIST, DApp } from "@/src/data/dapps";

// Mock 데이터 생성: 기존 DApp 데이터를 반복하여 1000개 이상 생성
const generateMockDApps = (): DApp[] => {
  const mockDApps: DApp[] = [];
  const repeatCount = Math.ceil(1200 / DAPP_LIST.length); // 1200개 생성

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

    // 필터링 로직
    let filteredDApps = MOCK_DAPPS.filter((dapp) => {
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

    // iOS 필터는 클라이언트에서 처리 (서버에서는 user-agent 확인 필요)

    const total = filteredDApps.length;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredDApps.slice(startIndex, endIndex);
    const hasMore = endIndex < total;

    // 네트워크 지연 시뮬레이션 (실제 API 호출처럼 보이게)
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

