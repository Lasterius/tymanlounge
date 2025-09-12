"use client";

import { Age } from "@/shared/icons/Age";
import { Instagram } from "@/shared/icons/Instagram";
import { Location } from "@/shared/icons/Location";
import { Mail } from "@/shared/icons/Mail";
import { Watch } from "@/shared/icons/Watch";
import { formatWorkingTime } from "@/shared/services/utils/utils";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { IGlobalDataDTO } from "@/shared/services/types/dto.types";

type FooterProps = {
  globalData?: IGlobalDataDTO;
};

export const Footer = ({ globalData }: FooterProps) => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const t = useTranslations("Footer");

  const workingTime = globalData?.WorkingTime;
  const instagram = globalData?.Instagram;
  const address = globalData?.Address;
  const email = globalData?.Email;

  const weekdayStart = formatWorkingTime(workingTime?.weekdayStart);
  const weekdayFinish = formatWorkingTime(workingTime?.weekdayFinish);
  const weekendStart = formatWorkingTime(workingTime?.weekendStart);
  const weekendFinish = formatWorkingTime(workingTime?.weekendFinish);

  return (
    <footer className="mt-auto flex h-80 w-full flex-col items-center gap-1 bg-wht p-4 text-blck dark:bg-blck dark:text-wht max-md:justify-center sm:gap-3 sm:px-8 sm:pb-2 sm:pt-4 xl:h-72">
      <span className="mb-7 block h-[2px] w-full bg-blck dark:bg-wht" />
      <div className="mb-3 grid w-full items-start justify-items-center gap-3 max-sm:grid-cols-1 sm:grid-cols-2 sm:justify-items-start sm:gap-x-14 md:mb-8 xl:auto-cols-fr xl:grid-flow-col xl:justify-items-center xl:gap-x-3">
        <div
          id="1"
          className="flex items-center gap-3 sm:w-full sm:justify-end xl:justify-center"
        >
          <Watch className="mt-2 h-5 w-5" />
          <div className="flex flex-col gap-1">
            <div className="flex justify-between gap-2">
              <span>{t("weekdays")}:</span>{" "}
              <span>
                {weekdayStart} — {weekdayFinish}
              </span>
            </div>
            <div className="flex justify-between gap-2">
              <span>{t("weekend")}:</span>{" "}
              <span>
                {weekendStart} — {weekendFinish}
              </span>
            </div>
          </div>
        </div>
        <a
          href={address?.link}
          target="_blank"
          id="2"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-bold transition-colors hover:text-drkgrn hover:dark:text-grn"
        >
          <Location className="h-5 w-5" />
          <p>{address?.name}</p>
        </a>

        <a
          href={`mailto:${email}`}
          target="_blank"
          id="3"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-bold transition-colors hover:text-drkgrn hover:dark:text-grn sm:w-full sm:justify-end xl:justify-center"
        >
          <Mail className="h-5 w-5" />
          <p>{email}</p>
        </a>
        <a
          href={instagram?.link}
          target="_blank"
          id="4"
          rel="noopener noreferrer"
          className="flex w-[213px] items-center gap-2 font-bold transition-colors hover:text-drkgrn hover:dark:text-grn max-sm:justify-center"
        >
          <Instagram className="h-5 w-5" />
          <p>{instagram?.name}</p>
        </a>
      </div>

      <p className="max-sm:text-sm">
        © Tyman Lounge & Bar. All rights reserved.
      </p>
      <div className="flex items-center gap-2">
        <Age className="h-5 w-5" />
        <p>Adults only</p>
      </div>
      <p className="max-sm:text-sm">2024 — {currentYear}</p>
    </footer>
  );
};
