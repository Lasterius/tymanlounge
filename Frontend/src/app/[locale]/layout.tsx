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
      "Welcome to Tyman Lounge & Bar at the heart of the Belgrade. Discover a world of flavors with over 320 hookah blends and a curated selection of exquisite cocktails and beverages. Whether you’re here to unwind, celebrate, or connect, we promise a one-of-a-kind experience that will delight your senses and leave you craving more.",
    icons: {
      icon: "/favicon.png",
    },
    robots: "index, follow",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
    keywords:
      "Tyman Lounge & Bar, hookah lounge Belgrade, best bar in Belgrade, Russian hookah, signature cocktails Belgrade, relaxing lounge in Belgrade, cozy bar, hookah bar in city center, Belgrade nightlife, bar for celebrations, unique drinks in Belgrade",
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
