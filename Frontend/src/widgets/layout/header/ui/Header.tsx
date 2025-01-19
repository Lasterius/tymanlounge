import { bookingLink } from "@/shared/config/constants";
import { LogoBlackFull } from "@/shared/icons/LogoBlackFull";
import { LangSwitcher } from "@/shared/langSwitcher";
import { ThemeToggle } from "@/shared/themeToggle";
import Link from "next/link";
import { BurgerMenu } from "./BurgerMenu";
import { NavBar } from "./NavBar";

export const Header = () => {
  return (
    <header className="fixed left-0 right-0 top-0 z-[998] flex h-16 w-full items-center bg-gradient-to-b from-blck/90 to-blck/30 px-3">
      <Link href="./" className="flex flex-1">
        <LogoBlackFull className="h-12 w-auto text-wht" />
      </Link>
      {/* <div className="flex flex-1 justify-center"> */}
      <NavBar />
      {/* </div> */}
      <div className="flex flex-1 items-center justify-end gap-2">
        <a
          href={bookingLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-wht"
        >
          Book table
        </a>
        <LangSwitcher />
        <ThemeToggle />
        <BurgerMenu />
      </div>
    </header>
  );
};
