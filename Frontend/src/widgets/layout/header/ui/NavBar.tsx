"use client";

import { navItems } from "@/shared/services/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IGlobalDataDTO } from "@/shared/services/types/dto.types";

type NavBarProps = {
  globalData?: IGlobalDataDTO;
};

export const NavBar = ({ globalData }: NavBarProps) => {
  const t = useTranslations("BurgerMenu");
  const pathname = usePathname();
  const [, locale, point, section] = pathname.split("/");
  const menu = globalData?.Menu;

  return (
    <nav className="hidden justify-center xl:flex">
      <ul className="flex gap-16 font-bold uppercase">
        {navItems.map((item) => {
          const localizedHref = `/${locale}/${point}${item.href}`;
          return (
            <li
              key={item.id}
              className={`group relative text-wht transition-all hover:text-grn ${
                (item.label === "home" && !section) || item.label === section
                  ? "pointer-events-none border-t-2 border-grn"
                  : ""
              }`}
            >
              {item.label === "menu" ? (
                <a href={menu?.link} target="_blank" rel="noopener noreferrer">
                  {t(item.label)}
                </a>
              ) : (
                <Link href={localizedHref}>{t(item.label)}</Link>
              )}
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center transform bg-grn transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
