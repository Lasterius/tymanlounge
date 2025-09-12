import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "@/shared/globals.css";

import { routing } from "@/i18n/routing";
import { TLocale } from "@/shared/services/types/dto.types";

type Props = {
  children: ReactNode;
  params: { locale: TLocale };
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
      "Tyman Lounge & Bar - a world of flavors with over 320 russian hookah blends and a curated selection of exquisite cocktails at the heart of Belgrade. Celebrate, connect and experience a truly delightful time in our hookah bar.",
    icons: {
      icon: "/favicon.png",
    },
    robots: "index, follow",
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/${locale}`,
    keywords:
      "russian shisha, hookah lounge Belgrade, best bar in Belgrade, Russian hookah, signature cocktails Belgrade, relaxing lounge in Belgrade, cozy bar, hookah bar in city center, Belgrade nightlife, bar for celebrations, unique drinks in Belgrade",
    openGraph: {
      title: t("title"),
      description:
        "Tyman Lounge & Bar - a world of flavors with over 320 russian hookah blends and a curated selection of exquisite cocktails at the heart of Belgrade.",
      image:
        "https://www.tyman.rs/_next/image?url=https%3A%2F%2Fstrapi-server-a2a6.onrender.com%2Fuploads%2FIMG_3635_959d62c61c.jpg&w=3840&q=75",
      url: "www.tyman.rs",
      type: "website",
      locale: locale,
      siteName: "Tyman Lounge & Bar",
    },
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

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
