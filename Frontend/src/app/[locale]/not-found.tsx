import { useTranslations } from "next-intl";
import Link from "next/link";

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="flex min-h-[calc(100vh-208px)] flex-col items-center justify-center gap-10">
      <h1>{t("title")}</h1>
      <p className="max-w-[460px] text-center">{t("description")}</p>
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href="/en"
          className="flex h-12 w-48 items-center justify-center rounded-xl border-2 border-solid border-blck bg-blck text-center font-bold uppercase text-wht transition-colors hover:bg-wht hover:text-blck dark:bg-wht dark:text-blck hover:dark:bg-blck hover:dark:text-wht"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
