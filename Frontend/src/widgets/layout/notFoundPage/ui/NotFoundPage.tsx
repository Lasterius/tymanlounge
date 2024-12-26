import { useLocale, useTranslations } from "next-intl";
import { BaseLayout } from "../../baseLayout";

export default function NotFoundPage() {
  const t = useTranslations("NotFoundPage");
  const localActive = useLocale();

  return (
    <BaseLayout locale={localActive}>
      <h1>{t("title")}</h1>
      <p className="max-w-[460px]">{t("description")}</p>
    </BaseLayout>
  );
}
