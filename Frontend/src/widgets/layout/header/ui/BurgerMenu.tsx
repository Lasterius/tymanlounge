"use client";

import { navItems } from "@/shared/services/constants";
import { LangSwitcher, ReserveButton, ThemeToggle } from "@/shared/ui";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { IGlobalDataDTO } from "@/shared/services/types/dto.types";

type BurgerMenuProps = {
  globalData?: IGlobalDataDTO;
};

export const BurgerMenu = ({ globalData }: BurgerMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const [, locale, point] = pathname.split("/");
  const t = useTranslations("BurgerMenu");
  const tr = useTranslations("HomePage");

  const menu = globalData?.Menu;

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current?.contains(event.target as Node) // Исключаем кнопку
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="relative max-md:flex max-md:flex-1 max-md:justify-end xl:hidden">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`flex h-8 w-8 flex-col items-center justify-center space-y-1 rounded-md ${isOpen ? "" : "gap-1"}`}
        aria-label="Burger menu"
        data-title="Burger menu"
      >
        <span
          className={`block h-1 w-8 rounded-sm bg-wht transition-transform duration-300 ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        ></span>
        <span
          className={`block h-1 w-8 rounded-sm bg-wht transition-opacity duration-300 ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block h-1 w-8 rounded-sm bg-wht transition-transform duration-300 ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        ></span>
      </button>

      <nav
        ref={menuRef}
        className={`absolute -right-3 top-12 flex h-screen w-screen flex-col bg-gradient-to-b from-blck/65 to-blck/95 p-3 shadow-lg transition-transform duration-300 md:w-96 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center justify-center gap-4 px-4 py-8">
          {navItems.map((item) => {
            const localizedHref = `/${locale}/${point}${item.href}`;
            return (
              <li
                key={item.id}
                onClick={() => setIsOpen(false)}
                className={`flex h-14 w-full cursor-pointer items-center justify-center text-wht transition-colors hover:bg-wht hover:text-blck/70 ${pathname === localizedHref && item.label !== "menu" ? "pointer-events-none bg-wht !text-blck" : ""}`}
              >
                {item.label === "menu" ? (
                  <a
                    href={menu?.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-full w-full items-center justify-center text-3xl font-bold uppercase"
                  >
                    {t(item.label)}
                  </a>
                ) : (
                  <Link
                    href={localizedHref}
                    className="flex h-full w-full items-center justify-center text-3xl font-bold uppercase"
                  >
                    {t(item.label)}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
        <div className="mt-4 flex items-center justify-evenly md:hidden">
          <ReserveButton buttonText={tr("reserve")} globalData={globalData} />
          <LangSwitcher />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
};
