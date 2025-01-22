import { useTranslations } from "next-intl";

// This page renders when a route like `/unknown.txt` is requested.
// In this case, the layout at `app/[locale]/layout.tsx` receives
// an invalid value as the `[locale]` param and calls `notFound()`.

export default function NotFound() {
  const t = useTranslations("NotFoundPage");

  return (
    <div className="flex min-h-[calc(100vh-208px)] flex-col items-center justify-center gap-10">
      <h1>{t("title")}</h1>
      <p className="max-w-[460px] text-center">{t("description")}</p>
    </div>
  );
}
