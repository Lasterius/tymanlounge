import { LogoBlackFull } from "@/shared/icons/LogoBlackFull";
import { LangSwitcher } from "@/shared/langSwitcher";
import { ReserveButton } from "@/shared/reserveButton";
import { ThemeToggle } from "@/shared/themeToggle";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { BurgerMenu } from "./BurgerMenu";
import { NavBar } from "./NavBar";

export const Header = () => {
  const t = useTranslations("HomePage");
  return (
    <header className="fixed left-0 right-0 top-0 z-[998] flex h-16 w-full items-center justify-between gap-2 bg-gradient-to-b from-blck/95 to-blck/65 px-3">
      <Link
        href="./"
        className="flex w-auto content-start items-start justify-start xl:w-[275px]"
        aria-label="Home"
        data-title="Home"
      >
        <LogoBlackFull className="h-12 w-auto text-wht" />
      </Link>
      <NavBar />
      <div className="hidden items-center justify-end gap-2 max-xl:flex-1 md:flex xl:w-[275px]">
        <ReserveButton buttonText={t("reserve")} />
        <LangSwitcher />
        <ThemeToggle />
      </div>
      <BurgerMenu />
    </header>
  );
};
