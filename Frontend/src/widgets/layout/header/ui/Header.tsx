import { LogoBlackFull } from "@/shared/icons/LogoBlackFull";
import { LangSwitcher } from "@/shared/langSwitcher";
import { ThemeToggle } from "@/shared/themeToggle";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-[999] flex h-14 w-full items-center justify-between bg-grn px-3">
      <Link href="./">
        <LogoBlackFull className="h-12 w-auto text-wht" />
      </Link>
      <div className="flex items-center justify-center gap-2">
        <LangSwitcher />
        <ThemeToggle />
        <nav>
          <div className="text-wht">Burger</div>
        </nav>
      </div>
    </header>
  );
};
