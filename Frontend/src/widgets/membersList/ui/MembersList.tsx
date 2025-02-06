"use client";

import "swiper/css";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";

import { TeamMember } from "@/app/[locale]/team/libs/team.types";
import { MemberCard } from "@/shared/memberCard";
import { Autoplay } from "swiper/modules";

interface MembersListProps {
  colleagues: TeamMember[];
}

export const MembersList = ({ colleagues }: MembersListProps) => {
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
      {colleagues.map((colleague, index) => (
        <SwiperSlide key={colleague.id}>
          <MemberCard
            colleague={colleague}
            loading={index < 5 ? "eager" : "lazy"}
            priority={index < 5}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
