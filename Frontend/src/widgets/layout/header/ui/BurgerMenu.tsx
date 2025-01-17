"use client";

import { navItems } from "@/shared/config/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const pathname = usePathname();
  const t = useTranslations("BurgerMenu");

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

  return (
    <div className="relative xl:hidden">
      <button
        ref={buttonRef}
        onClick={toggleMenu}
        className={`flex h-8 w-8 flex-col items-center justify-center space-y-1 rounded-md ${isOpen ? "" : "gap-1"}`}
      >
        <span
          className={`block h-1 w-8 rounded-sm bg-blck transition-transform duration-300 dark:bg-wht ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        ></span>
        <span
          className={`block h-1 w-8 rounded-sm bg-blck transition-opacity duration-300 dark:bg-wht ${
            isOpen ? "opacity-0" : "opacity-100"
          }`}
        ></span>
        <span
          className={`block h-1 w-8 rounded-sm bg-blck transition-transform duration-300 dark:bg-wht ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        ></span>
      </button>

      <nav
        ref={menuRef}
        className={`absolute -right-3 top-10 h-screen w-96 bg-grn p-3 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ul className="flex flex-col items-center justify-center gap-4 px-4 py-8">
          {navItems.map((item) => (
            <li
              key={item.id}
              className="flex h-14 w-full items-center justify-center text-blck transition-colors hover:bg-wht hover:text-blck/70 dark:text-wht dark:hover:bg-blck dark:hover:text-wht/70"
            >
              <Link href={item.href} className="text-3xl font-bold uppercase">
                {t(item.label)}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};
