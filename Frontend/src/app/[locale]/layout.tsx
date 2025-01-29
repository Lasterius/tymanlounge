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
      "Tyman Lounge & Bar - a world of flavors with over 320 russian hookah blends and a curated selection of exquisite cocktails at the heart of Belgrade. Celebrate, connect and experince a truly delightful time in our hookah bar.",
    icons: {
      icon: "/favicon.png",
    },
    robots: "index, follow",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
    keywords:
      "russian shisha, hookah lounge Belgrade, best bar in Belgrade, Russian hookah, signature cocktails Belgrade, relaxing lounge in Belgrade, cozy bar, hookah bar in city center, Belgrade nightlife, bar for celebrations, unique drinks in Belgrade",
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
