import { NextResponse } from "next/server";

export interface Banner {
  id: number;
  image_en?: string;
  image_ko?: string;
  description_en?: string;
  description_ko?: string;
  link_en: string;
  link_ko: string;
  button_en?: string;
  button_ko?: string;
  order: number;
  isActive: boolean;
}

const MOCK_BANNERS: Banner[] = [
  {
    id: 1,
    image_en: "/images/banner_mapo_en.png",
    image_ko: "/images/banner_mapo_kr.png",
    link_en:
      "https://store.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
    link_ko:
      "https://store-kr.dcentwallet.com/blogs/post/tap-that-drop-with-map-protocol",
    order: 1,
    isActive: true,
  },
  {
    id: 2,
    image_en: "/images/banner_dcent.png",
    image_ko: "/images/banner_dcent.png",
    description_en: "Enhance your security with D'CENT biometric wallet",
    description_ko:
      "디센트 지문인증형 지갑으로 한층 더 강화된 보안을 경험하세요!",
    link_en: "https://store.dcentwallet.com",
    link_ko: "https://store-kr.dcentwallet.com",
    button_en: "Buy Now",
    button_ko: "구매하기",
    order: 2,
    isActive: true,
  },
  {
    id: 3,
    image_en: "/images/banner_blog.png",
    image_ko: "/images/banner_blog.png",
    description_en:
      "Visit the new D'CENT Blog to explore the latest updates first!",
    description_ko:
      "새로운 디센트 블로그를 방문하여 최신 업데이트를 먼저 확인해보세요!",
    link_en: "https://store.dcentwallet.com/blogs/post",
    link_ko: "https://store-kr.dcentwallet.com/blogs/post",
    button_en: "Explore",
    button_ko: "확인하기",
    order: 3,
    isActive: true,
  },
];

export async function GET() {
  try {
    const activeBanners = MOCK_BANNERS.filter((banner) => banner.isActive).sort(
      (a, b) => a.order - b.order
    );

    await new Promise((resolve) => setTimeout(resolve, 300));

    return NextResponse.json({
      data: activeBanners,
      total: activeBanners.length,
    });
  } catch (error) {
    console.error("Banner API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
