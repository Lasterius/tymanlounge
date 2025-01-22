import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";

import { routing } from "@/i18n/routing";
import { BaseLayout } from "@/widgets/layout/baseLayout";
import { Locale } from "../../shared/config/types/global.types";

type Props = {
  children: ReactNode;
  params: { locale: Locale };
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params: { locale },
}: Omit<Props, "children">) {
  const t = await getTranslations({ locale, namespace: "LocaleLayout" });

  return {
    title: t("title"),
    description:
      "Welcome to Tyman Hookah Lounge Bar in Belgrade, Serbia. With over 300 hookah flavors and an extensive collection of cocktails and beverages, we offer a unique and relaxing experience for every guest.",
    icons: {
      icon: "/favicon.png",
    },
    robots: "index, follow",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
    keywords: "hookah, shisha, lounge, bar, belgrade, serbia",
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  return <BaseLayout locale={locale}>{children}</BaseLayout>;
}
