"use client";

import { useGlobalData } from "@/app/context/GlobalDataContext";
import { Instagram } from "@/shared/icons/Instagram";
import { Location } from "@/shared/icons/Location";
import { Mail } from "@/shared/icons/Mail";
import { Watch } from "@/shared/icons/Watch";
import { formatWorkingTime } from "@/shared/lib/utils";
import { useTranslations } from "next-intl";
import { useMemo } from "react";

export const Footer = () => {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const t = useTranslations("Footer");

  const { globalData } = useGlobalData();
  const { workingTime, instagram, address, email } = globalData || {};

  const weekdayStart = formatWorkingTime(workingTime?.weekdayStart);
  const weekdayFinish = formatWorkingTime(workingTime?.weekdayFinish);
  const weekendStart = formatWorkingTime(workingTime?.weekendStart);
  const weekendFinish = formatWorkingTime(workingTime?.weekendFinish);

  return (
    <footer className="mt-auto flex h-52 w-full flex-col items-center gap-1 bg-wht px-8 pb-2 pt-4 text-blck dark:bg-blck dark:text-wht">
      <span className="mb-4 block h-[2px] w-full bg-blck dark:bg-wht" />
      <div className="mb-1 flex w-full justify-evenly">
        <div className="flex items-center gap-3">
          <Watch className="h-5 w-5" />
          <div className="flex flex-col gap-1">
            <p>
              {t("weekdays")}: {weekdayStart} — {weekdayFinish}
            </p>
            <p>
              {t("weekend")}: {weekendStart} — {weekendFinish}
            </p>
          </div>
        </div>
        <a
          href={address?.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-bold transition-colors hover:text-drkgrn hover:dark:text-grn"
        >
          <Location className="h-5 w-5" />
          <p>{address?.name}</p>
        </a>
        <a
          href={instagram?.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-bold transition-colors hover:text-drkgrn hover:dark:text-grn"
        >
          <Instagram className="h-5 w-5" />
          <p>{instagram?.name}</p>
        </a>
        <a
          href={`mailto:${email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 font-bold transition-colors hover:text-drkgrn hover:dark:text-grn"
        >
          <Mail className="h-5 w-5" />
          <p>{email}</p>
        </a>
      </div>
      <p>© Tyman Lounge & Bar. All rights reserved.</p>
      <p>Development by Tsivilev Konstantin</p>
      <p>2024 — {currentYear}</p>
    </footer>
  );
};
