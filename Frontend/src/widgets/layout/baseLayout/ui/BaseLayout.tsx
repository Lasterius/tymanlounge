import "@/app/globals.css";
import { Header } from "@/widgets/layout/header";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Roboto, Rubik_Mono_One } from "next/font/google";

const rubikMonoOne = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
});

export const metadata = {
  title: "Tyman Lounge",
  description: "The best lounge bar ever",
  icons: {
    icon: "/favicon.png",
  },
};

type Props = {
  children: React.ReactNode;
  locale: string;
};

export default async function BaseLayout({ children, locale }: Props) {
  const messages = await getMessages();

  const themeScript = `
    (function() {
      const theme = localStorage.getItem('theme') || 'light';
      document.documentElement.classList.add(theme);
    })();
  `;

  return (
    <html lang={locale}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${roboto.className} ${rubikMonoOne.variable} text-lg`}>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="bg-wht text-blck dark:bg-blck dark:text-wht">
            {children}
          </main>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
