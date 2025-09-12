import { ReactNode } from "react";
import { EB_Garamond, Roboto, Rubik_Mono_One } from "next/font/google";
import "@/shared/globals.css";

const rubikMonoOne = Rubik_Mono_One({
  weight: "400",
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
});

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
});

const garamond = EB_Garamond({
  weight: ["400", "700"],
  subsets: ["latin", "cyrillic"],
  variable: "--font-eb-garamond",
});

type Props = {
  children: ReactNode;
  params: { locale?: string };
};

// Since we have a `not-found.tsx` page on the root, a layout file
// is required, even if it's just passing children through.
export default function RootLayout({ children, params }: Props) {
  const lang = params.locale || "en";

  return (
    <html lang={lang}>
      <body
        className={`${roboto.className} ${rubikMonoOne.variable} ${garamond.variable} flex min-h-screen flex-col text-base md:text-lg`}
      >
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              const theme = localStorage.getItem('theme') || 'light';
              document.documentElement.classList.add(theme);
            })();
          `,
          }}
        />
      </body>
    </html>
  );
}
