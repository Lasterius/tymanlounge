"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { EnglishFlag } from "@/shared/icons/EnglishFlag";
import { RussianFlag } from "@/shared/icons/RussianFlag";
import { SerbianFlag } from "@/shared/icons/SerbianFlag";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";

const languages = [
  { id: "sr", icon: <SerbianFlag className="h-5 w-5" /> },
  { id: "en", icon: <EnglishFlag className="h-5 w-5" /> },
  {
    id: "ru",
    icon: <RussianFlag className="h-5 w-5" />,
  },
];

export const LangSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
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

  return (
    <div className="relative inline-block">
      <button
        className="flex h-8 w-12 items-center justify-center gap-2 rounded-full bg-blck p-1 dark:bg-wht"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
      >
        {currentLanguage?.icon}
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-12 rounded bg-blck shadow-lg dark:bg-wht">
          {languages.map((language) => (
            <li
              key={language.id}
              className={`flex h-8 cursor-pointer items-center justify-center gap-2 p-1 transition-colors hover:bg-wht dark:hover:bg-blck ${
                localActive === language.id
                  ? "pointer-events-none bg-gray-500"
                  : ""
              }`}
              onClick={() =>
                localActive !== language.id && handleSelect(language.id)
              }
            >
              {language.icon}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
