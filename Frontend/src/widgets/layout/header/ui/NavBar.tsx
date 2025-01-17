import { navItems } from "@/shared/config/constants";
import { useTranslations } from "next-intl";
import Link from "next/link";

export const NavBar = () => {
  const t = useTranslations("BurgerMenu");

  return (
    <nav className="mr-5 hidden xl:block">
      <ul className="flex gap-8 font-bold uppercase">
        {navItems.slice(1).map((item) => {
          return (
            <li
              key={item.id}
              className="group relative text-blck transition-all hover:text-wht dark:text-wht dark:hover:text-blck"
            >
              <Link href={item.href}>{t(item.label)}</Link>
              <span className="absolute bottom-0 left-1/2 h-0.5 w-0 origin-center transform bg-wht transition-all duration-300 group-hover:left-0 group-hover:w-full dark:bg-blck"></span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
