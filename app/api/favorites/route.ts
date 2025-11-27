import { NextRequest, NextResponse } from "next/server";

export interface Favorite {
  id: number;
  name: string;
  url: string;
  icon: string;
  order: number;
  createdAt: string;
}

// Mock 즐겨찾기 데이터 (실제로는 DB 또는 사용자별 저장소에서 가져옴)
const MOCK_FAVORITES: Favorite[] = [
  {
    id: 1,
    name: "OpenSea",
    url: "https://opensea.io",
    icon: "/images/icon_opensea.png",
    order: 1,
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: 2,
    name: "MoonPay",
    url: "https://buy.moonpay.com/v2/buy",
    icon: "/images/icon_moonpay.png",
    order: 2,
    createdAt: "2024-01-02T00:00:00Z",
  },
  {
    id: 3,
    name: "Rarible",
    url: "https://rarible.com/",
    icon: "/images/icon_rarible.png",
    order: 3,
    createdAt: "2024-01-03T00:00:00Z",
  },
];

export async function GET(request: NextRequest) {
  try {
    // 순서대로 정렬
    const favorites = [...MOCK_FAVORITES].sort((a, b) => a.order - b.order);

    // 네트워크 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 200));

    return NextResponse.json({
      data: favorites,
      total: favorites.length,
    });
  } catch (error) {
    console.error("Favorites API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// 즐겨찾기 삭제 API
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    // 실제로는 DB에서 삭제
    const index = MOCK_FAVORITES.findIndex((fav) => fav.id === parseInt(id));

    if (index === -1) {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 }
      );
    }

    MOCK_FAVORITES.splice(index, 1);

    // 네트워크 지연 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 200));

    return NextResponse.json({
      success: true,
      message: "Favorite deleted successfully",
    });
  } catch (error) {
    console.error("Delete Favorite API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

