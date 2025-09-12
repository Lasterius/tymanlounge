"use client";

import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";

import { MemberCard } from "@/shared/ui";
import { Autoplay } from "swiper/modules";
import { IDetailedPictureDTO } from "@/shared/services/types/dto.types";

interface MembersListProps {
  pictures: IDetailedPictureDTO[];
}

export const MembersList = ({ pictures }: MembersListProps) => {
  return (
    <Swiper
      freeMode={true}
      modules={[Autoplay]}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={3000}
      loop={true}
      grabCursor={true}
      spaceBetween={10}
      slidesPerView={1}
      breakpoints={{
        580: { slidesPerView: 2 },
        900: { slidesPerView: 3 },
        1200: { slidesPerView: 4 },
        1560: { slidesPerView: 5 },
        2000: { slidesPerView: 6 },
      }}
    >
      {pictures.map((picture, index) => (
        <SwiperSlide key={picture.id}>
          <MemberCard
            picture={picture}
            loading={index < 5 ? "eager" : "lazy"}
            priority={index < 5}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
