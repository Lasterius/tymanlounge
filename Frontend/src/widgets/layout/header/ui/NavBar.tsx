"use client";

import { navItems } from "@/shared/config/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const NavBar = () => {
  const t = useTranslations("BurgerMenu");
  const pathname = usePathname();
  const [, , section] = pathname.split("/");

  return (
    <nav className="hidden flex-1 justify-center xl:flex">
      <ul className="flex gap-16 font-bold uppercase">
        {navItems.slice(1).map((item) => {
          return (
            <li
              key={item.id}
              className={`group relative text-wht transition-all hover:text-grn ${item.label === section ? "pointer-events-none" : ""}`}
            >
              {item.label === "menu" ? (
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {t(item.label)}
                </a>
              ) : (
                <Link href={item.href}>{t(item.label)}</Link>
              )}
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center transform bg-grn transition-all duration-300 group-hover:left-0 group-hover:w-full"></span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
