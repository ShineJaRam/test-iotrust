"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { useBanners } from "@/src/hooks/useBanners";
import "swiper/css";
import "swiper/css/pagination";
import "@/src/styles/Banner.css";

export const Banner = () => {
  const locale = useLocale();
  const [currentSlide, setCurrentSlide] = useState(1);
  const { data, isLoading, isError } = useBanners();

  // 로딩 상태
  if (isLoading) {
    return (
      <div className="relative w-full h-[200px] bg-gray-200 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-3 border-gray-400 border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  // 에러 상태
  if (isError || !data) {
    return null; // 에러 시 배너 숨김
  }

  const banners = data.data;

  if (banners.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletClass: "swiper-pagination-bullet",
          bulletActiveClass: "swiper-pagination-bullet-active",
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={banners.length > 1}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex + 1);
        }}
        className="banner-swiper"
      >
        {banners.map((banner, index) => {
          const image =
            locale === "ko"
              ? banner.image_ko || banner.image_en
              : banner.image_en || banner.image_ko;
          const description =
            locale === "ko" ? banner.description_ko : banner.description_en;
          const link = locale === "ko" ? banner.link_ko : banner.link_en;
          const buttonText =
            locale === "ko" ? banner.button_ko : banner.button_en;

          return (
            <SwiperSlide key={banner.id}>
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-full h-[200px] bg-gray-900 overflow-hidden"
              >
                {image && (
                  <Image
                    src={image}
                    alt={description || "Banner"}
                    fill
                    className="object-cover"
                    priority={index === 0} // 첫 번째 배너만 우선 로드
                    loading={index === 0 ? "eager" : "lazy"} // 나머지는 lazy loading
                    quality={85} // 이미지 품질 (1-100)
                    sizes="(max-width: 759px) 100vw, 759px" // 반응형 이미지 크기
                    placeholder="blur" // 로딩 중 블러 효과
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mN8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==" // 작은 placeholder
                  />
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />

                <div className="relative z-20 h-full flex flex-col justify-end p-6">
                  {description && (
                    <p className="text-white text-sm mb-4 max-w-[280px] drop-shadow-lg">
                      {description}
                    </p>
                  )}

                  {buttonText && (
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        window.open(link, "_blank");
                      }}
                      className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors w-fit"
                    >
                      {buttonText}
                    </button>
                  )}
                </div>
              </a>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {banners.length > 1 && (
        <div className="absolute top-4 right-4 z-30 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
          {currentSlide} / {banners.length}
        </div>
      )}
    </div>
  );
};
