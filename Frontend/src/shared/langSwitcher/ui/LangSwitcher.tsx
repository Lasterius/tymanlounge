"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { languages } from "@/shared/config/constants";
import { EnglishFlag } from "@/shared/icons/EnglishFlag";
import { RussianFlag } from "@/shared/icons/RussianFlag";
import { SerbianFlag } from "@/shared/icons/SerbianFlag";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useEffect, useRef, useState, useTransition } from "react";

const flagIcons: Record<string, JSX.Element> = {
  sr: <SerbianFlag className="h-5 w-5" />,
  en: <EnglishFlag className="h-5 w-5" />,
  ru: <RussianFlag className="h-5 w-5" />,
};

export const LangSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const switcherRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const localActive = useLocale();

  const currentLanguage = languages.find((lang) => lang.id === localActive);

  const handleSelect = (languageId: string) => {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: languageId },
      );
    });
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        switcherRef.current &&
        !switcherRef.current.contains(event.target as Node)
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

  return (
    <div className="relative inline-block" ref={switcherRef}>
      <button
        className="group flex h-8 w-12 items-center justify-center gap-2 rounded-full bg-wht p-1"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        aria-label="Language switcher"
        data-title="Language switcher"
      >
        <div className="h-5 w-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110">
          {flagIcons[currentLanguage?.id || "en"]}
        </div>
      </button>

      {isOpen && (
        <ul className="absolute -top-2 left-0 z-10 mt-1 w-12 translate-y-[-100%] overflow-hidden rounded-xl bg-wht shadow-lg transition-all md:top-auto md:translate-y-0">
          {languages.map((language) => (
            <li
              key={language.id}
              className={`flex h-8 cursor-pointer items-center justify-center gap-2 p-1 transition-colors hover:bg-blck ${
                localActive === language.id ? "pointer-events-none bg-grn" : ""
              }`}
              onClick={() =>
                localActive !== language.id && handleSelect(language.id)
              }
            >
              {flagIcons[language.id]}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
