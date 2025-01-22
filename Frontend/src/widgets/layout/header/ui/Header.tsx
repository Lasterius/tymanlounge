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
    <header className="fixed left-0 right-0 top-0 z-[998] flex h-16 w-full items-center bg-gradient-to-b from-blck/90 to-blck/30 px-3">
      <Link href="./" className="flex flex-1">
        <LogoBlackFull className="h-12 w-auto text-wht" />
      </Link>
      <NavBar />
      <div className="flex flex-1 items-center justify-end gap-2">
        <ReserveButton buttonText={t("reserve")} />
        <LangSwitcher />
        <ThemeToggle />
        <BurgerMenu />
      </div>
    </header>
  );
};
