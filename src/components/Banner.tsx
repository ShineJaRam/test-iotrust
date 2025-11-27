"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useLocale } from "next-intl";
import Image from "next/image";
import { useState } from "react";
import { BANNER_DATA } from "@/src/data/banners";

import "swiper/css";
import "swiper/css/pagination";

export const Banner = () => {
  const locale = useLocale();
  const [currentSlide, setCurrentSlide] = useState(1);

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
        loop={true}
        onSlideChange={(swiper) => {
          setCurrentSlide(swiper.realIndex + 1);
        }}
        className="banner-swiper"
      >
        {BANNER_DATA.map((banner) => {
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
                    priority={banner.id === 1}
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

      <div className="absolute top-4 right-4 z-30 bg-black/50 text-white text-xs px-3 py-1 rounded-full">
        {currentSlide} / {BANNER_DATA.length}
      </div>

      <style jsx global>{`
        .banner-swiper {
          width: 100%;
          height: 200px;
        }

        .banner-swiper .swiper-pagination {
          bottom: 16px !important;
          z-index: 30;
        }

        .banner-swiper .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }

        .banner-swiper .swiper-pagination-bullet-active {
          background: white;
          width: 24px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
};
