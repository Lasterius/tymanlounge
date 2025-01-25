"use client";

import { useGlobalData } from "@/app/context/GlobalDataContext";
import { navItems } from "@/shared/config/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const t = useTranslations("BurgerMenu");
  const pathname = usePathname();
  const [, locale, section] = pathname.split("/");
  const { globalData } = useGlobalData();
  const { menu } = globalData || {};

  return (
    <nav className="hidden justify-center xl:flex">
      <ul className="flex gap-16 font-bold uppercase">
        {navItems.slice(1).map((item) => {
          const localizedHref = `/${locale}${item.href}`;
          return (
            <li
              key={item.id}
              className={`group relative text-wht transition-all hover:text-grn ${item.label === section ? "pointer-events-none border-t-2 border-grn" : ""}`}
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
