"use client";

import { LogoBlackFull } from "@/shared/icons/LogoBlackFull";
import { LangSwitcher, ReserveButton, ThemeToggle } from "@/shared/ui";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IGlobalDataDTO } from "@/shared/services/types/dto.types";
import { BurgerMenu } from "./ui/BurgerMenu";
import { NavBar } from "./ui/NavBar";

type HeaderProps = {
  globalData?: IGlobalDataDTO;
};

export const Header = ({ globalData }: HeaderProps) => {
  const t = useTranslations("HomePage");
  const pathname = usePathname();
  const [, locale] = pathname.split("/");

  return (
    <header className="fixed left-0 right-0 top-0 z-[998] flex h-16 w-full items-center justify-between gap-2 bg-gradient-to-b from-blck/95 to-blck/65 px-3 backdrop-blur-sm">
      <Link
        href={`/${locale}`}
        className="flex w-auto content-start items-start justify-start xl:w-[275px]"
        aria-label="Home"
        data-title="Home"
      >
        <LogoBlackFull className="h-12 w-auto text-wht" />
      </Link>
      <NavBar globalData={globalData} />
      <div className="hidden items-center justify-end gap-2 max-xl:flex-1 md:flex xl:w-[275px]">
        <ReserveButton buttonText={t("reserve")} globalData={globalData} />
        <LangSwitcher />
        <ThemeToggle />
      </div>
      <BurgerMenu globalData={globalData} />
    </header>
  );
};
