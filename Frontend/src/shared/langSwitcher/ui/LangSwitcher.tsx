"use client";

import { usePathname, useRouter } from "@/i18n/routing";
import { EnglishFlag } from "@/shared/icons/EnglishFlag";
import { RussianFlag } from "@/shared/icons/RussianFlag";
import { SerbianFlag } from "@/shared/icons/SerbianFlag";
import { useLocale } from "next-intl";
import { useParams } from "next/navigation";
import { useState, useTransition } from "react";

const languages = [
  { id: "en", icon: <EnglishFlag className="h-5 w-5" /> },
  {
    id: "ru",
    icon: <RussianFlag className="h-5 w-5" />,
  },
  { id: "sr", icon: <SerbianFlag className="h-5 w-5" /> },
];

export const LangSwitcher = () => {
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const localActive = useLocale();

  // function onSelectSwitch(event: ChangeEvent<HTMLSelectElement>) {
  //   const nextLocale = event.target.value;
  //   startTransition(() => {
  //     router.replace(
  //       // @ts-expect-error -- TypeScript will validate that only known `params`
  //       // are used in combination with a given `pathname`. Since the two will
  //       // always match for the current route, we can skip runtime checks.
  //       { pathname, params },
  //       { locale: nextLocale },
  //     );
  //   });
  // }

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
    // <label>
    //   <select
    //     defaultValue={localActive}
    //     onChange={onSelectSwitch}
    //     disabled={isPending}
    //   >
    //     <option value="en" disabled={localActive === "en"}>
    //       English
    //     </option>
    //     <option value="ru" disabled={localActive === "ru"}>
    //       Russian
    //     </option>
    //     <option value="sr" disabled={localActive === "sr"}>
    //       Serbian
    //     </option>
    //   </select>
    // </label>

    <div className="relative inline-block">
      <button
        className="flex h-8 w-12 items-center justify-center gap-2 rounded-full bg-blck p-1 dark:bg-wht"
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
      >
        {currentLanguage?.icon}
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-40 rounded border bg-white shadow-lg">
          {languages.map((language) => (
            <li
              key={language.id}
              className={`flex cursor-pointer items-center gap-2 px-4 py-2 hover:bg-gray-100 ${
                localActive === language.id
                  ? "cursor-not-allowed text-gray-400"
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
