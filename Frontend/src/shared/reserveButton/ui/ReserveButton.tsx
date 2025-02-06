"use client";

import { useGlobalData } from "@/app/context/GlobalDataContext";
import { IReserveButtonProps } from "@/shared/config/types/ui.types";

export const ReserveButton = ({
  buttonText,
  className,
}: IReserveButtonProps) => {
  const { globalData } = useGlobalData();
  const { reservation } = globalData || {};

  return (
    <button
      className={`group flex h-8 w-36 items-center justify-center rounded-full bg-wht p-1 font-mainPicture font-bold uppercase text-blck ${className}`}
      aria-label="Reserve button"
      data-title="Reserve button"
    >
      <a
        href={reservation?.link}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-transform duration-300 group-hover:scale-105"
      >
        {buttonText}
      </a>
    </button>
  );
};
